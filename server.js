const express = require('express');
const Database = require('better-sqlite3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Multer for file uploads — store in uploads directory
const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const engId = req.params.id;
    const dir = path.join(__dirname, 'uploads', engId);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
const upload = multer({ storage: uploadStorage, limits: { fileSize: 100 * 1024 * 1024 } });

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database
const db = new Database(path.join(__dirname, 'db', 'fdd.db'));
db.pragma('journal_mode = WAL');

// ============================================================
// Stage Dependency Map
// ============================================================
const STAGE_DEPENDENCIES = {
  stage_0: [],
  stage_1: ['stage_0'],
  stage_2: ['stage_1'],
  stage_3a: ['stage_2'], stage_3b: ['stage_2'], stage_3c: ['stage_2'],
  stage_3d: ['stage_2'], stage_3e: ['stage_2'], stage_3f: ['stage_2'],
  stage_3g: ['stage_2'],
  stage_4: ['stage_3a'],
  stage_5: ['stage_4'],
  stage_6: ['stage_5'],
  stage_7: ['stage_6'],
  stage_8: ['stage_7']
};

// Stage expected inputs
const STAGE_EXPECTED_INPUTS = {
  stage_0: { user_uploads: [{ key: 'cim', label: 'Confidential Information Memorandum (CIM)', required: true, description: 'Target company CIM or investment overview document' }, { key: 'teaser', label: 'Deal Teaser / One-Pager', required: false, description: 'Initial deal summary document' }], prior_stage_outputs: [] },
  stage_1: { user_uploads: [{ key: 'engagement_letter', label: 'Signed Engagement Letter', required: false, description: 'Executed engagement letter (if already signed)' }], prior_stage_outputs: ['stage_0'] },
  stage_2: { user_uploads: [{ key: 'data_room_index', label: 'Data Room Index / File List', required: true, description: 'Index or manifest of data room contents' }, { key: 'financials', label: 'Historical Financial Statements', required: true, description: 'Audited or management-prepared financials (3+ years)' }, { key: 'trial_balance', label: 'Trial Balance / GL Detail', required: false, description: 'Detailed trial balance or general ledger export' }, { key: 'management_accounts', label: 'Monthly Management Accounts', required: false, description: 'Monthly P&L, BS, and CF for LTM period' }], prior_stage_outputs: ['stage_1'] },
  stage_3a: { user_uploads: [{ key: 'adjusted_financials', label: 'Adjusted Financial Statements', required: false, description: 'Management-adjusted financials or bridge schedules' }, { key: 'audit_reports', label: 'Audit Reports & Management Letters', required: false, description: 'External audit reports' }], prior_stage_outputs: ['stage_2'] },
  stage_3b: { user_uploads: [{ key: 'revenue_detail', label: 'Revenue Detail / Breakdown', required: false, description: 'Revenue by customer, product, geography' }, { key: 'contracts', label: 'Key Customer Contracts', required: false, description: 'Material customer agreements' }], prior_stage_outputs: ['stage_2'] },
  stage_3c: { user_uploads: [{ key: 'cost_detail', label: 'Cost / Expense Detail', required: false, description: 'Detailed COGS and OpEx breakdowns' }, { key: 'headcount', label: 'Headcount & Compensation Data', required: false, description: 'Employee roster with compensation' }], prior_stage_outputs: ['stage_2'] },
  stage_3d: { user_uploads: [{ key: 'balance_sheet_detail', label: 'Balance Sheet Detail', required: false, description: 'Detailed BS schedules including AR/AP aging' }], prior_stage_outputs: ['stage_2'] },
  stage_3e: { user_uploads: [{ key: 'debt_schedule', label: 'Debt Schedule / Loan Agreements', required: false, description: 'Outstanding debt instruments and credit agreements' }, { key: 'lease_schedule', label: 'Lease Schedule', required: false, description: 'Operating and finance lease details' }], prior_stage_outputs: ['stage_2'] },
  stage_3f: { user_uploads: [{ key: 'capex_detail', label: 'Capital Expenditure Detail', required: false, description: 'Historical CapEx by category and project' }, { key: 'fixed_asset_register', label: 'Fixed Asset Register', required: false, description: 'Detailed fixed asset listing' }], prior_stage_outputs: ['stage_2'] },
  stage_3g: { user_uploads: [{ key: 'tax_returns', label: 'Tax Returns (3 years)', required: false, description: 'Federal and state/local tax returns' }, { key: 'tax_provisions', label: 'Tax Provision Workpapers', required: false, description: 'Detailed tax provision calculations' }], prior_stage_outputs: ['stage_2'] },
  stage_4: { user_uploads: [], prior_stage_outputs: ['stage_3a','stage_3b','stage_3c','stage_3d','stage_3e','stage_3f','stage_3g'] },
  stage_5: { user_uploads: [], prior_stage_outputs: ['stage_4'] },
  stage_6: { user_uploads: [{ key: 'client_feedback', label: 'Client Feedback / Comments', required: false, description: 'Client comments on draft report' }], prior_stage_outputs: ['stage_5'] },
  stage_7: { user_uploads: [], prior_stage_outputs: ['stage_6'] },
  stage_8: { user_uploads: [], prior_stage_outputs: ['stage_7'] }
};

// Active executions tracking (replaces Athena thread tracking)
const activeExecutions = {}; // runId -> { process, stageKey, engagementId }

// ============================================================
// Helpers
// ============================================================
function checkPrerequisites(engagementId, stageKey) {
  const deps = STAGE_DEPENDENCIES[stageKey] || [];
  if (deps.length === 0) return { met: true, missing: [] };
  const missing = [];
  for (const dep of deps) {
    const run = db.prepare('SELECT id FROM stage_runs WHERE engagement_id = ? AND stage_key = ? AND status = ?').get(engagementId, dep, 'completed');
    if (!run) missing.push(dep);
  }
  return { met: missing.length === 0, missing };
}

function getStageInputAnalysis(engagementId, stageKey) {
  const expected = STAGE_EXPECTED_INPUTS[stageKey] || { user_uploads: [], prior_stage_outputs: [] };
  const stageFiles = db.prepare('SELECT * FROM uploaded_files WHERE engagement_id = ? AND stage_tag = ? ORDER BY uploaded_at DESC').all(engagementId, stageKey);
  const allFiles = db.prepare('SELECT * FROM uploaded_files WHERE engagement_id = ? ORDER BY uploaded_at DESC').all(engagementId);
  const priorOutputs = {};
  for (const priorKey of expected.prior_stage_outputs) {
    const run = db.prepare("SELECT deliverable_ids FROM stage_runs WHERE engagement_id = ? AND stage_key = ? AND status = 'completed' ORDER BY completed_at DESC LIMIT 1").get(engagementId, priorKey);
    priorOutputs[priorKey] = (run && run.deliverable_ids) ? JSON.parse(run.deliverable_ids) : null;
  }
  const gaps = [];
  for (const input of expected.user_uploads) {
    const hasFile = stageFiles.some(f => f.description === input.key || (f.filename || '').toLowerCase().includes(input.key.replace(/_/g, ' ')));
    if (!hasFile) gaps.push({ type: 'upload', key: input.key, label: input.label, severity: input.required ? 'required' : 'optional' });
  }
  for (const pk of expected.prior_stage_outputs) {
    if (!priorOutputs[pk]) gaps.push({ type: 'prior_output', key: pk, label: 'Output from ' + pk, severity: 'required' });
  }
  return { expected_uploads: expected.user_uploads, prior_stage_outputs: expected.prior_stage_outputs, tagged_files: stageFiles, all_engagement_files: allFiles, available_prior_outputs: priorOutputs, gaps, required_gaps: gaps.filter(g => g.severity === 'required'), is_input_ready: gaps.filter(g => g.severity === 'required' && g.type === 'prior_output').length === 0 };
}

function getStageStatuses(engagementId) {
  const stages = db.prepare('SELECT * FROM stage_config ORDER BY sort_order').all();
  const runs = db.prepare('SELECT * FROM stage_runs WHERE engagement_id = ? ORDER BY started_at DESC').all(engagementId);
  return stages.map(stage => {
    const stageRuns = runs.filter(r => r.stage_key === stage.stage_key);
    const latestRun = stageRuns[0] || null;
    const prereqs = checkPrerequisites(engagementId, stage.stage_key);
    let status = 'locked';
    if (latestRun) status = latestRun.status;
    else if (prereqs.met) status = 'ready';
    const inputAnalysis = getStageInputAnalysis(engagementId, stage.stage_key);
    return { ...stage, status, latest_run: latestRun, run_count: stageRuns.length, prerequisites_met: prereqs.met, missing_prerequisites: prereqs.missing, input_analysis: { tagged_files: inputAnalysis.tagged_files, available_prior_outputs: inputAnalysis.available_prior_outputs, gaps: inputAnalysis.gaps, required_gaps: inputAnalysis.required_gaps, expected_uploads: inputAnalysis.expected_uploads, prior_stage_outputs: inputAnalysis.prior_stage_outputs, is_input_ready: inputAnalysis.is_input_ready } };
  });
}

function getRunProgress(runId) {
  // Check for progress file from the Python execution engine
  const progressPath = path.join(__dirname, 'deliverables', runId + '.json.progress');
  const resultPath = path.join(__dirname, 'deliverables', runId + '.json');
  
  if (fs.existsSync(resultPath)) {
    try {
      return JSON.parse(fs.readFileSync(resultPath, 'utf8'));
    } catch(e) { return null; }
  }
  if (fs.existsSync(progressPath)) {
    try {
      return JSON.parse(fs.readFileSync(progressPath, 'utf8'));
    } catch(e) { return null; }
  }
  return null;
}

// ============================================================
// Configuration Endpoints
// ============================================================
app.get('/api/config/stages', (req, res) => {
  const stages = db.prepare('SELECT * FROM stage_config ORDER BY sort_order').all();
  res.json(stages.map(s => ({ ...s, expected_inputs: STAGE_EXPECTED_INPUTS[s.stage_key] || { user_uploads: [], prior_stage_outputs: [] } })));
});

app.get('/api/config/engagement-types', (req, res) => {
  res.json({ engagement_types: ['Full FDD', 'Red Flag / Phase I', 'Vendor DD'], deal_types: ['Buy-Side (PE Sponsor)', 'Buy-Side (Strategic)', 'Sell-Side'] });
});

// ============================================================
// Engagement CRUD
// ============================================================
app.get('/api/engagements', (req, res) => {
  try {
    const engagements = db.prepare('SELECT * FROM engagements ORDER BY created_at DESC').all();
    const totalStagesCount = db.prepare('SELECT COUNT(*) as count FROM stage_config').get().count;
    res.json(engagements.map(eng => {
      const completed = db.prepare("SELECT COUNT(DISTINCT stage_key) as count FROM stage_runs WHERE engagement_id = ? AND status = 'completed'").get(eng.engagement_id, ).count;
      const running = db.prepare("SELECT COUNT(DISTINCT stage_key) as count FROM stage_runs WHERE engagement_id = ? AND status = 'running'").get(eng.engagement_id).count;
      return { ...eng, total_stages: totalStagesCount, completed_stages: completed, running_stages: running, progress_pct: Math.round((completed / totalStagesCount) * 100) };
    }));
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/engagements', (req, res) => {
  try {
    const { target_company, client_name, engagement_type, deal_type, industry, estimated_ev, deal_timeline_weeks, engagement_partner } = req.body;
    if (!target_company || !client_name) return res.status(400).json({ error: 'target_company and client_name are required' });
    const engagement_id = uuidv4();
    const now = new Date().toISOString();
    db.prepare('INSERT INTO engagements (engagement_id, target_company, client_name, engagement_type, deal_type, industry, estimated_ev, deal_timeline_weeks, engagement_partner, status, current_stage, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)').run(engagement_id, target_company, client_name, engagement_type||'Full FDD', deal_type||'Buy-Side (PE Sponsor)', industry||'', estimated_ev||'', deal_timeline_weeks||4, engagement_partner||'', 'active', 'stage_0', now, now);
    res.status(201).json(db.prepare('SELECT * FROM engagements WHERE engagement_id = ?').get(engagement_id));
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/engagements/:id', (req, res) => {
  try {
    const eng = db.prepare('SELECT * FROM engagements WHERE engagement_id = ?').get(req.params.id);
    if (!eng) return res.status(404).json({ error: 'Engagement not found' });
    const stages = getStageStatuses(eng.engagement_id);
    const completed = stages.filter(s => s.status === 'completed').length;
    res.json({ ...eng, stages, total_stages: stages.length, completed_stages: completed, progress_pct: Math.round((completed / stages.length) * 100) });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.patch('/api/engagements/:id', (req, res) => {
  try {
    const eng = db.prepare('SELECT * FROM engagements WHERE engagement_id = ?').get(req.params.id);
    if (!eng) return res.status(404).json({ error: 'Engagement not found' });
    const allowed = ['target_company','client_name','engagement_type','deal_type','industry','estimated_ev','deal_timeline_weeks','engagement_partner','status','current_stage'];
    const updates = []; const values = [];
    for (const key of allowed) { if (req.body[key] !== undefined) { updates.push(`${key} = ?`); values.push(req.body[key]); } }
    if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });
    updates.push('updated_at = ?'); values.push(new Date().toISOString()); values.push(req.params.id);
    db.prepare(`UPDATE engagements SET ${updates.join(', ')} WHERE engagement_id = ?`).run(...values);
    res.json(db.prepare('SELECT * FROM engagements WHERE engagement_id = ?').get(req.params.id));
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ============================================================
// Stage Endpoints
// ============================================================
app.get('/api/engagements/:id/stages', (req, res) => {
  try {
    const eng = db.prepare('SELECT * FROM engagements WHERE engagement_id = ?').get(req.params.id);
    if (!eng) return res.status(404).json({ error: 'Engagement not found' });
    res.json(getStageStatuses(eng.engagement_id));
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/engagements/:id/stages/:stageKey/inputs', (req, res) => {
  try {
    const eng = db.prepare('SELECT * FROM engagements WHERE engagement_id = ?').get(req.params.id);
    if (!eng) return res.status(404).json({ error: 'Engagement not found' });
    res.json(getStageInputAnalysis(eng.engagement_id, req.params.stageKey));
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ============================================================
// LOCAL Execution Engine (replaces Athena AOP calls)
// ============================================================
app.post('/api/engagements/:id/execute/:stageKey', async (req, res) => {
  try {
    const eng = db.prepare('SELECT * FROM engagements WHERE engagement_id = ?').get(req.params.id);
    if (!eng) return res.status(404).json({ error: 'Engagement not found' });
    const stageKey = req.params.stageKey;
    const stageConfig = db.prepare('SELECT * FROM stage_config WHERE stage_key = ?').get(stageKey);
    if (!stageConfig) return res.status(404).json({ error: 'Stage not found' });
    const prereqs = checkPrerequisites(eng.engagement_id, stageKey);
    if (!prereqs.met) return res.status(400).json({ error: 'Prerequisites not met', missing: prereqs.missing });
    const running = db.prepare("SELECT id FROM stage_runs WHERE engagement_id = ? AND stage_key = ? AND status = 'running'").get(eng.engagement_id, stageKey);
    if (running) return res.status(409).json({ error: 'Stage is already running' });

    // Create run record
    const runId = uuidv4();
    const now = new Date().toISOString();
    db.prepare('INSERT INTO stage_runs (engagement_id, stage_key, aop_asset_id, thread_id, status, started_at) VALUES (?,?,?,?,?,?)').run(eng.engagement_id, stageKey, 'local', runId, 'running', now);
    db.prepare('UPDATE engagements SET current_stage = ?, updated_at = ? WHERE engagement_id = ?').run(stageKey, now, eng.engagement_id);

    // Prepare engagement data for the Python execution engine
    const engData = JSON.stringify({
      engagement_id: eng.engagement_id, target_company: eng.target_company, client_name: eng.client_name,
      engagement_type: eng.engagement_type, deal_type: eng.deal_type, industry: eng.industry,
      estimated_ev: eng.estimated_ev, deal_timeline_weeks: eng.deal_timeline_weeks, engagement_partner: eng.engagement_partner
    });
    const outputPath = path.join(__dirname, 'deliverables', runId + '.json');
    fs.mkdirSync(path.join(__dirname, 'deliverables'), { recursive: true });

    // Ensure uploaded files have a manifest for the Python engine
    const uploadsDir = path.join(__dirname, 'uploads', eng.engagement_id);
    if (fs.existsSync(uploadsDir)) {
      const files = db.prepare('SELECT * FROM uploaded_files WHERE engagement_id = ?').all(eng.engagement_id);
      const manifest = files.map(f => ({ filename: f.filename, stored_name: path.basename(f.asset_id || f.filename), stage_tag: f.stage_tag, description: f.description }));
      // Also write manifest with actual stored filenames
      const actualFiles = fs.readdirSync(uploadsDir).filter(f => f !== 'manifest.json');
      const enrichedManifest = files.map((f, i) => {
        const stored = actualFiles.find(af => af.includes(f.filename.replace(/[^a-zA-Z0-9.]/g, ''))) || actualFiles[i] || f.filename;
        return { ...manifest[i], stored_name: stored };
      });
      fs.writeFileSync(path.join(uploadsDir, 'manifest.json'), JSON.stringify(enrichedManifest, null, 2));
    }

    // Spawn Python execution engine as background process
    const child = spawn('python3', [
      path.join(__dirname, 'execute_stage.py'),
      stageKey, engData, outputPath
    ], { cwd: __dirname, env: { ...process.env }, detached: true, stdio: 'ignore' });
    child.unref();

    activeExecutions[runId] = { stageKey, engagementId: eng.engagement_id, startedAt: now };

    res.json({ thread_id: runId, status: 'running', stage_key: stageKey, started_at: now });
  } catch(e) {
    console.error('Execute error:', e);
    res.status(500).json({ error: e.message });
  }
});

// ============================================================
// Thread/Run Polling (reads from local files instead of Athena)
// ============================================================
app.get('/api/threads/:threadId', (req, res) => {
  try {
    const runId = req.params.threadId;
    const run = db.prepare('SELECT * FROM stage_runs WHERE thread_id = ?').get(runId);
    
    // Check for completed result or progress
    const progress = getRunProgress(runId);
    
    if (progress && progress.status === 'completed' && run && run.status === 'running') {
      // Update DB
      const now = new Date().toISOString();
      const resultSummary = (progress.result_summary || '').substring(0, 50000);
      const deliverableJson = progress.deliverables ? JSON.stringify(progress.deliverables) : null;
      db.prepare("UPDATE stage_runs SET status = 'completed', completed_at = ?, result_summary = ?, deliverable_ids = ? WHERE thread_id = ?").run(now, resultSummary, deliverableJson, runId);
    } else if (progress && progress.status === 'failed' && run && run.status === 'running') {
      const now = new Date().toISOString();
      db.prepare("UPDATE stage_runs SET status = 'failed', completed_at = ?, error_message = ? WHERE thread_id = ?").run(now, progress.error_message || 'Unknown error', runId);
    }

    const updatedRun = db.prepare('SELECT * FROM stage_runs WHERE thread_id = ?').get(runId);
    
    res.json({
      thread_id: runId,
      status: updatedRun ? updatedRun.status : 'unknown',
      num_messages: progress ? (progress.num_messages || 0) : 0,
      last_message_content: progress ? (progress.result_summary || progress.messages?.[progress.messages.length-1]?.content || '').substring(0, 10000) : '',
      last_message_role: 'assistant',
      messages: progress ? (progress.messages || []) : [],
      deliverables: progress ? (progress.deliverables || []) : []
    });
  } catch(e) {
    console.error('Thread poll error:', e);
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/threads/:threadId/stop', (req, res) => {
  try {
    const runId = req.params.threadId;
    const now = new Date().toISOString();
    db.prepare("UPDATE stage_runs SET status = 'cancelled', completed_at = ? WHERE thread_id = ? AND status = 'running'").run(now, runId);
    // Kill the process if still active
    if (activeExecutions[runId]) delete activeExecutions[runId];
    res.json({ status: 'cancelled', thread_id: runId });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ============================================================
// File Upload & Management
// ============================================================
app.post('/api/engagements/:id/files', upload.single('file'), (req, res) => {
  try {
    const eng = db.prepare('SELECT * FROM engagements WHERE engagement_id = ?').get(req.params.id);
    if (!eng) return res.status(404).json({ error: 'Engagement not found' });
    if (!req.file) return res.status(400).json({ error: 'No file provided' });
    const stageTag = req.body.stage_tag || null;
    const description = req.body.description || '';
    const now = new Date().toISOString();
    // Store the disk filename as asset_id for local reference
    const storedName = req.file.filename;
    db.prepare('INSERT INTO uploaded_files (engagement_id, asset_id, filename, file_size, media_type, stage_tag, description, uploaded_at) VALUES (?,?,?,?,?,?,?,?)').run(eng.engagement_id, storedName, req.file.originalname, req.file.size, req.file.mimetype, stageTag, description, now);
    const file = db.prepare('SELECT * FROM uploaded_files WHERE engagement_id = ? ORDER BY id DESC LIMIT 1').get(eng.engagement_id);
    res.status(201).json(file);
  } catch(e) { console.error('Upload error:', e); res.status(500).json({ error: e.message }); }
});

app.get('/api/engagements/:id/files', (req, res) => {
  try { res.json(db.prepare('SELECT * FROM uploaded_files WHERE engagement_id = ? ORDER BY uploaded_at DESC').all(req.params.id)); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

app.patch('/api/files/:fileId', (req, res) => {
  try {
    const file = db.prepare('SELECT * FROM uploaded_files WHERE id = ?').get(req.params.fileId);
    if (!file) return res.status(404).json({ error: 'File not found' });
    const updates = []; const vals = [];
    if (req.body.stage_tag !== undefined) { updates.push('stage_tag = ?'); vals.push(req.body.stage_tag || null); }
    if (req.body.description !== undefined) { updates.push('description = ?'); vals.push(req.body.description); }
    if (updates.length === 0) return res.status(400).json({ error: 'No fields' });
    vals.push(req.params.fileId);
    db.prepare('UPDATE uploaded_files SET ' + updates.join(', ') + ' WHERE id = ?').run(...vals);
    res.json(db.prepare('SELECT * FROM uploaded_files WHERE id = ?').get(req.params.fileId));
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/files/:fileId', (req, res) => {
  try {
    const file = db.prepare('SELECT * FROM uploaded_files WHERE id = ?').get(req.params.fileId);
    if (!file) return res.status(404).json({ error: 'File not found' });
    // Delete physical file
    const filePath = path.join(__dirname, 'uploads', file.engagement_id, file.asset_id);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    db.prepare('DELETE FROM uploaded_files WHERE id = ?').run(req.params.fileId);
    res.json({ deleted: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ============================================================
// Asset Content & Download (reads from local deliverables)
// ============================================================
app.get('/api/assets/:assetId/content', (req, res) => {
  try {
    const assetId = req.params.assetId;
    // Search in deliverables directory
    const delivDir = path.join(__dirname, 'deliverables');
    const found = findFileRecursive(delivDir, assetId);
    if (found) {
      const content = fs.readFileSync(found, 'utf8');
      return res.json({ asset_id: assetId, content });
    }
    // Search in uploads
    const uploadsDir = path.join(__dirname, 'uploads');
    const foundUpload = findFileRecursive(uploadsDir, assetId);
    if (foundUpload) {
      const content = fs.readFileSync(foundUpload, 'utf8');
      return res.json({ asset_id: assetId, content });
    }
    res.status(404).json({ error: 'Asset not found' });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/assets/:assetId/download', (req, res) => {
  try {
    const assetId = req.params.assetId;
    const delivDir = path.join(__dirname, 'deliverables');
    const found = findFileRecursive(delivDir, assetId);
    if (found && found.endsWith('.md')) {
      // Convert markdown to docx/xlsx on the fly
      const tmpDir = path.join(__dirname, 'tmp-convert');
      fs.mkdirSync(tmpDir, { recursive: true });
      const { execSync } = require('child_process');
      try {
        const result = execSync(
          `python3 "${path.join(__dirname, 'convert_doc.py')}" "${found}" "${tmpDir}"`,
          { encoding: 'utf8', timeout: 30000 }
        ).trim();
        const [outPath, mimeType] = result.split('|');
        if (outPath && fs.existsSync(outPath)) {
          const basename = path.basename(outPath);
          res.setHeader('Content-Type', mimeType || 'application/octet-stream');
          res.setHeader('Content-Disposition', 'attachment; filename="' + basename + '"');
          const stream = fs.createReadStream(outPath);
          stream.pipe(res);
          stream.on('end', () => { try { fs.unlinkSync(outPath); } catch(e) {} });
          return;
        }
      } catch(convErr) {
        console.error('Conversion error, falling back to markdown:', convErr.message);
      }
      // Fallback to raw markdown
      const basename = path.basename(found, '.md');
      res.setHeader('Content-Type', 'text/markdown');
      res.setHeader('Content-Disposition', 'attachment; filename="' + basename + '.md"');
      return res.send(fs.readFileSync(found, 'utf8'));
    }
    if (found) {
      return res.download(found);
    }
    const uploadsDir = path.join(__dirname, 'uploads');
    const foundUpload = findFileRecursive(uploadsDir, assetId);
    if (foundUpload) {
      return res.download(foundUpload);
    }
    res.status(404).json({ error: 'File not found' });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

function findFileRecursive(dir, filename) {
  if (!fs.existsSync(dir)) return null;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findFileRecursive(fullPath, filename);
      if (found) return found;
    } else if (entry.name === filename || entry.name.includes(filename)) {
      return fullPath;
    }
  }
  return null;
}

// ============================================================
// Stage Run History
// ============================================================
app.get('/api/engagements/:id/runs', (req, res) => {
  try { res.json(db.prepare('SELECT * FROM stage_runs WHERE engagement_id = ? ORDER BY started_at DESC').all(req.params.id)); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/engagements/:id/runs/:stageKey', (req, res) => {
  try { res.json(db.prepare('SELECT * FROM stage_runs WHERE engagement_id = ? AND stage_key = ? ORDER BY started_at DESC').all(req.params.id, req.params.stageKey)); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

// ============================================================
// SPA Fallback
// ============================================================
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============================================================
// Start Server
// ============================================================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`KPMG FDD Pipeline server running on port ${PORT}`);
  console.log('Execution engine: Local (Anthropic Claude via Python)');
  console.log(`ANTHROPIC_API_KEY configured: ${process.env.ANTHROPIC_API_KEY ? 'Yes' : 'No'}`);
});
