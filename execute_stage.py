#!/usr/bin/env python3
"""
Local FDD Stage Execution Engine
Reads prompt template, injects context, calls Claude via Anthropic API, saves results.
Usage: python3 execute_stage.py <stage_key> <engagement_json> <output_path>
"""
import sys, json, os, glob

import anthropic

def load_prompt(stage_key):
    prompt_path = os.path.join(os.path.dirname(__file__), 'prompts', f'{stage_key}.md')
    if not os.path.exists(prompt_path):
        raise FileNotFoundError(f'Prompt not found: {prompt_path}')
    with open(prompt_path, 'r') as f:
        return f.read()

def load_uploaded_files(engagement_id, stage_key):
    """Load content of files tagged to this stage from the uploads directory."""
    uploads_dir = os.path.join(os.path.dirname(__file__), 'uploads', engagement_id)
    if not os.path.isdir(uploads_dir):
        return "No uploaded files available."
    
    # Read the file manifest
    manifest_path = os.path.join(uploads_dir, 'manifest.json')
    if not os.path.exists(manifest_path):
        return "No uploaded files available."
    
    with open(manifest_path, 'r') as f:
        manifest = json.load(f)
    
    content_parts = []
    for entry in manifest:
        tag = entry.get('stage_tag', '')
        # Include files tagged to this stage OR untagged files
        if tag == stage_key or not tag:
            filepath = os.path.join(uploads_dir, entry['stored_name'])
            if os.path.exists(filepath):
                try:
                    with open(filepath, 'r', errors='replace') as f:
                        file_content = f.read()
                    content_parts.append(f"### File: {entry['filename']}\n\n{file_content}")
                except:
                    content_parts.append(f"### File: {entry['filename']}\n\n[Binary file — content not readable as text]")
    
    return '\n\n---\n\n'.join(content_parts) if content_parts else "No files tagged to this stage."

def load_prior_outputs(engagement_id, stage_key, prior_stages):
    """Load deliverables from prior completed stages."""
    deliverables_dir = os.path.join(os.path.dirname(__file__), 'deliverables', engagement_id)
    if not os.path.isdir(deliverables_dir):
        return "No prior stage outputs available."
    
    content_parts = []
    for prior_key in prior_stages:
        stage_dir = os.path.join(deliverables_dir, prior_key)
        if os.path.isdir(stage_dir):
            for fname in sorted(os.listdir(stage_dir)):
                fpath = os.path.join(stage_dir, fname)
                if os.path.isfile(fpath):
                    try:
                        with open(fpath, 'r') as f:
                            content = f.read()
                        content_parts.append(f"### {prior_key} — {fname}\n\n{content}")
                    except:
                        pass
    
    return '\n\n---\n\n'.join(content_parts) if content_parts else "No prior stage outputs available yet."

STAGE_PRIOR_MAP = {
    'stage_0': [],
    'stage_1': ['stage_0'],
    'stage_2': ['stage_1'],
    'stage_3a': ['stage_2'], 'stage_3b': ['stage_2'], 'stage_3c': ['stage_2'],
    'stage_3d': ['stage_2'], 'stage_3e': ['stage_2'], 'stage_3f': ['stage_2'],
    'stage_3g': ['stage_2'],
    'stage_4': ['stage_3a','stage_3b','stage_3c','stage_3d','stage_3e','stage_3f','stage_3g'],
    'stage_5': ['stage_4'],
    'stage_6': ['stage_5'],
    'stage_7': ['stage_6'],
    'stage_8': ['stage_7']
}

def main():
    if len(sys.argv) < 4:
        print(json.dumps({"error": "Usage: execute_stage.py <stage_key> <engagement_json> <output_path>"}))
        sys.exit(1)
    
    stage_key = sys.argv[1]
    engagement = json.loads(sys.argv[2])
    output_path = sys.argv[3]
    
    # Load prompt template
    prompt_template = load_prompt(stage_key)
    
    engagement_id = engagement.get('engagement_id', '')
    
    # Load file context
    uploaded_files_content = load_uploaded_files(engagement_id, stage_key)
    prior_outputs_content = load_prior_outputs(engagement_id, stage_key, STAGE_PRIOR_MAP.get(stage_key, []))
    
    # Fill template
    prompt = prompt_template
    prompt = prompt.replace('{{target_company}}', engagement.get('target_company', 'Unknown'))
    prompt = prompt.replace('{{client_name}}', engagement.get('client_name', 'Unknown'))
    prompt = prompt.replace('{{engagement_type}}', engagement.get('engagement_type', 'Full FDD'))
    prompt = prompt.replace('{{deal_type}}', engagement.get('deal_type', 'Buy-Side'))
    prompt = prompt.replace('{{industry}}', engagement.get('industry', 'Unknown'))
    prompt = prompt.replace('{{estimated_ev}}', engagement.get('estimated_ev', 'Not specified'))
    prompt = prompt.replace('{{deal_timeline_weeks}}', str(engagement.get('deal_timeline_weeks', 4)))
    prompt = prompt.replace('{{engagement_partner}}', engagement.get('engagement_partner', 'Not specified'))
    prompt = prompt.replace('{{uploaded_files}}', uploaded_files_content)
    prompt = prompt.replace('{{prior_stage_outputs}}', prior_outputs_content)
    
    # Write progress update
    progress_path = output_path + '.progress'
    progress_messages = []
    def update_progress(msg_num, role, content, replace_last=False):
        nonlocal progress_messages
        if replace_last and progress_messages and progress_messages[-1]["role"] == role:
            progress_messages[-1]["content"] = content
        else:
            progress_messages.append({"role": role, "content": content})
        with open(progress_path, 'w') as f:
            json.dump({
                "status": "running",
                "num_messages": len(progress_messages),
                "messages": progress_messages
            }, f)
    
    update_progress(1, "user", "Executing " + stage_key + " analysis...")
    
    # Call Claude
    client = anthropic.Anthropic(api_key=os.environ.get('ANTHROPIC_API_KEY', ''))
    
    # Try to use streaming for progress updates
    update_progress(2, "assistant", "AI agent is analyzing the provided documents...", replace_last=False)
    
    try:
        # Use streaming to capture partial results
        full_response = ""
        msg_count = 2
        
        with client.messages.stream(
            model="claude-sonnet-4-20250514",
            max_tokens=16000,
            messages=[{"role": "user", "content": prompt}],
            system="You are a senior Financial Due Diligence analyst at a Big 4 accounting firm. Produce thorough, professional-grade analysis with specific data references, calculated metrics, and actionable findings. Format all output as well-structured markdown."
        ) as stream:
            for text in stream.text_stream:
                full_response += text
                # Update progress every ~2000 chars
                if len(full_response) % 2000 < len(text):
                    msg_count += 1
                    update_progress(msg_count, "assistant", full_response, replace_last=True)
        
        # Save deliverables
        deliv_dir = os.path.join(os.path.dirname(__file__), 'deliverables', engagement_id, stage_key)
        os.makedirs(deliv_dir, exist_ok=True)
        
        # Split response into individual deliverables by --- or # headers
        deliverable_files = []
        sections = full_response.split('\n---\n')
        
        if len(sections) > 1:
            for i, section in enumerate(sections):
                section = section.strip()
                if not section or len(section) < 50:
                    continue
                # Try to extract title from first heading
                lines = section.split('\n')
                title = 'Deliverable'
                for line in lines:
                    if line.startswith('#'):
                        title = line.lstrip('#').strip()
                        break
                safe_title = ''.join(c if c.isalnum() or c in ' -_' else '' for c in title)[:80].strip()
                fname = f"{stage_key}_{i+1}_{safe_title}.md"
                fpath = os.path.join(deliv_dir, fname)
                with open(fpath, 'w') as f:
                    f.write(section)
                deliverable_files.append({"filename": fname, "title": title, "path": fpath, "word_count": len(section.split())})
        else:
            # Single document output
            fname = f"{stage_key}_output.md"
            fpath = os.path.join(deliv_dir, fname)
            with open(fpath, 'w') as f:
                f.write(full_response)
            title_line = next((l for l in full_response.split('\n') if l.startswith('#')), stage_key)
            deliverable_files.append({"filename": fname, "title": title_line.lstrip('#').strip(), "path": fpath, "word_count": len(full_response.split())})
        
        # Write final result
        result = {
            "status": "completed",
            "result_summary": full_response,
            "deliverables": deliverable_files,
            "num_messages": msg_count,
            "messages": [
                {"role": "user", "content": prompt[:200] + "..."},
                {"role": "assistant", "content": full_response}
            ]
        }
        
        with open(output_path, 'w') as f:
            json.dump(result, f)
        
        # Clean up progress file
        if os.path.exists(progress_path):
            os.remove(progress_path)
        
        print(json.dumps({"status": "completed", "deliverables": len(deliverable_files)}))
        
    except Exception as e:
        error_result = {
            "status": "failed",
            "error_message": str(e),
            "num_messages": 1,
            "messages": [{"role": "system", "content": f"Error: {str(e)}"}]
        }
        with open(output_path, 'w') as f:
            json.dump(error_result, f)
        if os.path.exists(progress_path):
            os.remove(progress_path)
        print(json.dumps({"status": "failed", "error": str(e)}))
        sys.exit(1)

if __name__ == '__main__':
    main()
