const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'fdd.db');
console.log('Creating database at:', DB_PATH);

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS engagements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    engagement_id TEXT UNIQUE NOT NULL,
    target_company TEXT NOT NULL,
    client_name TEXT NOT NULL,
    engagement_type TEXT NOT NULL DEFAULT 'Full FDD',
    deal_type TEXT NOT NULL DEFAULT 'Buy-Side (PE Sponsor)',
    industry TEXT DEFAULT '',
    estimated_ev TEXT DEFAULT '',
    deal_timeline_weeks INTEGER DEFAULT 4,
    engagement_partner TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'active',
    current_stage TEXT DEFAULT 'stage_0',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS stage_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    engagement_id TEXT NOT NULL,
    stage_key TEXT NOT NULL,
    aop_asset_id TEXT NOT NULL,
    thread_id TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    started_at TEXT NOT NULL,
    completed_at TEXT,
    result_summary TEXT,
    error_message TEXT,
    deliverable_ids TEXT,
    FOREIGN KEY (engagement_id) REFERENCES engagements(engagement_id)
  );

  CREATE TABLE IF NOT EXISTS stage_config (
    stage_key TEXT PRIMARY KEY,
    stage_number TEXT NOT NULL,
    stage_name TEXT NOT NULL,
    stage_description TEXT NOT NULL,
    aop_asset_id TEXT NOT NULL,
    phase TEXT NOT NULL,
    sort_order INTEGER NOT NULL,
    engagement_type_scope TEXT NOT NULL DEFAULT 'all'
  );

  CREATE TABLE IF NOT EXISTS uploaded_files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    engagement_id TEXT NOT NULL,
    asset_id TEXT,
    filename TEXT NOT NULL,
    file_size INTEGER DEFAULT 0,
    media_type TEXT DEFAULT '',
    stage_tag TEXT DEFAULT NULL,
    description TEXT DEFAULT '',
    uploaded_at TEXT NOT NULL,
    FOREIGN KEY (engagement_id) REFERENCES engagements(engagement_id)
  );

  CREATE INDEX IF NOT EXISTS idx_uploaded_files_engagement ON uploaded_files(engagement_id);
  CREATE INDEX IF NOT EXISTS idx_uploaded_files_stage ON uploaded_files(stage_tag);
  CREATE INDEX IF NOT EXISTS idx_stage_runs_engagement ON stage_runs(engagement_id);
  CREATE INDEX IF NOT EXISTS idx_stage_runs_thread ON stage_runs(thread_id);
  CREATE INDEX IF NOT EXISTS idx_engagements_status ON engagements(status);
`);

// Seed stage configuration
const stages = [
  { stage_key: 'stage_0', stage_number: '0', stage_name: 'Opportunity Identification & Pursuit', stage_description: 'Identify and qualify new FDD engagement opportunities, assess deal parameters, and prepare pursuit materials.', aop_asset_id: 'asset_8bba8619-d888-4217-ab34-3cd24f8789e8', phase: 'pursuit', sort_order: 0, engagement_type_scope: 'all' },
  { stage_key: 'stage_1', stage_number: '1', stage_name: 'Pre-Diligence Planning & Mobilization', stage_description: 'Develop engagement plan, assemble team, define scope, and prepare data request lists.', aop_asset_id: 'asset_26b380b7-5b35-4d19-ab13-635d5ea6a3fc', phase: 'planning', sort_order: 1, engagement_type_scope: 'all' },
  { stage_key: 'stage_2', stage_number: '2', stage_name: 'Data Ingestion & Gap Analysis', stage_description: 'Ingest data room contents, catalog available information, and identify critical data gaps.', aop_asset_id: 'asset_c8f46d25-b16a-4e50-9c2b-961b71812c45', phase: 'planning', sort_order: 2, engagement_type_scope: 'all' },
  { stage_key: 'stage_3a', stage_number: '3A', stage_name: 'Quality of Earnings (QoE)', stage_description: 'Analyze historical earnings quality, identify non-recurring items, and normalize EBITDA.', aop_asset_id: 'asset_e27321ac-077e-4b35-89fb-1159c08ee4de', phase: 'analysis', sort_order: 3, engagement_type_scope: 'all' },
  { stage_key: 'stage_3b', stage_number: '3B', stage_name: 'Revenue Analysis', stage_description: 'Decompose revenue by customer, product, geography; assess sustainability and growth drivers.', aop_asset_id: 'asset_ab889a5c-f69c-4fa4-9eb0-2e52e10c4447', phase: 'analysis', sort_order: 4, engagement_type_scope: 'all' },
  { stage_key: 'stage_3c', stage_number: '3C', stage_name: 'Cost Structure & Margin Analysis', stage_description: 'Analyze cost structure, margin trends, and identify optimization opportunities.', aop_asset_id: 'asset_ea7a41bc-2dd5-413a-a13e-ba08e5db6ca9', phase: 'analysis', sort_order: 5, engagement_type_scope: 'all' },
  { stage_key: 'stage_3d', stage_number: '3D', stage_name: 'Net Working Capital (NWC)', stage_description: 'Analyze working capital components, seasonality, and determine normalized NWC target.', aop_asset_id: 'asset_1943bf6d-f09a-4239-a1ba-c306f7e41f3c', phase: 'analysis', sort_order: 6, engagement_type_scope: 'all' },
  { stage_key: 'stage_3e', stage_number: '3E', stage_name: 'Debt & Debt-Like Items', stage_description: 'Identify and quantify all debt and debt-like items for enterprise value bridge.', aop_asset_id: 'asset_3d7cc46b-4e16-4e9d-a516-3a24e69361c4', phase: 'analysis', sort_order: 7, engagement_type_scope: 'all' },
  { stage_key: 'stage_3f', stage_number: '3F', stage_name: 'Capital Expenditures', stage_description: 'Analyze historical capex, categorize maintenance vs. growth, and assess future requirements.', aop_asset_id: 'asset_08ba5af9-7467-4334-81ab-98debc909b73', phase: 'analysis', sort_order: 8, engagement_type_scope: 'all' },
  { stage_key: 'stage_3g', stage_number: '3G', stage_name: 'Tax Considerations', stage_description: 'Review tax positions, assess exposure risks, and identify structuring considerations.', aop_asset_id: 'asset_1d343e46-ad12-46a7-85ea-c4026b4a8452', phase: 'analysis', sort_order: 9, engagement_type_scope: 'all' },
  { stage_key: 'stage_4', stage_number: '4', stage_name: 'Management Session Preparation', stage_description: 'Prepare management interview guides, key questions, and presentation materials.', aop_asset_id: 'asset_d9cb4e77-bc14-44ad-b289-90e5485a201a', phase: 'synthesis', sort_order: 10, engagement_type_scope: 'all' },
  { stage_key: 'stage_5', stage_number: '5', stage_name: 'Report Drafting', stage_description: 'Draft the FDD report incorporating all analysis workstreams and key findings.', aop_asset_id: 'asset_6e8d6464-b4ca-43c5-9fe8-c71d13593f8d', phase: 'synthesis', sort_order: 11, engagement_type_scope: 'all' },
  { stage_key: 'stage_6', stage_number: '6', stage_name: 'Client Review & Iteration', stage_description: 'Present draft findings to client, incorporate feedback, and refine analysis.', aop_asset_id: 'asset_97a6d74d-3a02-44bb-b30f-92c507bf2794', phase: 'delivery', sort_order: 12, engagement_type_scope: 'all' },
  { stage_key: 'stage_7', stage_number: '7', stage_name: 'Final Report & Deal Support', stage_description: 'Finalize FDD report, prepare deal support materials, and assist with closing conditions.', aop_asset_id: 'asset_adc45f20-382a-480b-b82d-06a2d716c6e6', phase: 'delivery', sort_order: 13, engagement_type_scope: 'all' },
  { stage_key: 'stage_8', stage_number: '8', stage_name: 'Post-Engagement Wrap-Up', stage_description: 'Archive engagement materials, conduct lessons learned, and complete administrative closeout.', aop_asset_id: 'asset_0db1724e-2329-4cdb-8c13-2253d8bd1aa8', phase: 'closeout', sort_order: 14, engagement_type_scope: 'all' }
];

const insertStage = db.prepare(`
  INSERT OR REPLACE INTO stage_config (stage_key, stage_number, stage_name, stage_description, aop_asset_id, phase, sort_order, engagement_type_scope)
  VALUES (@stage_key, @stage_number, @stage_name, @stage_description, @aop_asset_id, @phase, @sort_order, @engagement_type_scope)
`);

const seedStages = db.transaction((stages) => {
  for (const stage of stages) {
    insertStage.run(stage);
  }
});

seedStages(stages);

console.log(`Seeded ${stages.length} stages into stage_config`);
console.log('Database setup complete!');
db.close();
