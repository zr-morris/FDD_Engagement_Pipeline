# Test Corp, Inc. — Cost & Expense Detail

**Period:** FY2023 – FY2025E
**Currency:** USD ($000s)
**Prepared by:** David Park, CFO

---

## 1. Cost of Revenue (COGS) — Detailed Breakdown

### 1.1 Cloud Hosting & Infrastructure

| Component | FY2023 | FY2024 | FY2025E | Notes |
|-----------|--------|--------|---------|-------|
| AWS — Compute (EC2/EKS) | $785 | $1,032 | $1,285 | Multi-region EKS clusters |
| AWS — Database (RDS/ElastiCache) | $342 | $468 | $585 | PostgreSQL RDS + Redis |
| AWS — Storage (S3/EBS) | $168 | $235 | $312 | Customer data, backups, logs |
| AWS — Data Transfer | $128 | $182 | $245 | Inter-region + customer API traffic |
| AWS — Other (Lambda, SQS, CloudFront, etc.) | $112 | $168 | $218 | Serverless functions, CDN |
| **AWS Subtotal** | **$1,535** | **$2,085** | **$2,645** | |
| Datadog (Monitoring & APM) | $42 | $62 | $85 | Observability platform |
| Cloudflare (CDN/WAF/DNS) | $28 | $42 | $58 | CDN and security |
| PagerDuty (Incident Management) | $12 | $18 | $22 | On-call alerting |
| Elasticsearch Cloud | $22 | $39 | $52 | Search & analytics |
| Other Infrastructure | $0 | $0 | $27 | Kafka managed service migration |
| **Total Hosting & Infrastructure** | **$1,639** | **$2,246** | **$2,889** | 9.0% / 8.6% / 8.4% of rev |

**Hosting Cost per Customer:** $1,639 / 1,000 = **$1.64** (FY2023) → $2,889 / 1,200 = **$2.41** (FY2025E)
**Hosting as % of Subscription Revenue:** 10.9% (FY2023) → 9.9% (FY2025E) — reflecting improved unit economics through Reserved Instances and architecture optimization.

### 1.2 Customer Support Staff

| Role | FY2023 Headcount | FY2023 Cost | FY2024 Headcount | FY2024 Cost | FY2025E Headcount | FY2025E Cost |
|------|-----------------|------------|-----------------|------------|------------------|-------------|
| VP Customer Success | 1 | $195 | 1 | $205 | 1 | $215 |
| Customer Success Managers | 8 | $520 | 12 | $780 | 15 | $975 |
| Tier 1 Support Agents | 10 | $450 | 14 | $630 | 18 | $810 |
| Tier 2 Support Engineers | 4 | $240 | 6 | $360 | 8 | $480 |
| Support Team Lead | 1 | $85 | 1 | $90 | 2 | $180 |
| Training Specialists | 1 | $39 | 1 | $42 | 1 | $46 |
| Contractor Support (overflow) | — | $0 | — | $35 | — | $45 |
| **Total Customer Support** | **25** | **$1,529** | **35** | **$2,142** | **45** | **$2,751** |

**Customers per CSM:** 125 (FY2023) → 100 (FY2024) → 80 (FY2025E) — deliberate investment in customer success to improve retention.

### 1.3 Implementation & Onboarding Staff

| Role | FY2023 HC | FY2023 Cost | FY2024 HC | FY2024 Cost | FY2025E HC | FY2025E Cost |
|------|----------|------------|----------|------------|-----------|-------------|
| Director of Professional Services | 1 | $165 | 1 | $175 | 1 | $185 |
| Senior Implementation Consultants | 4 | $340 | 6 | $510 | 8 | $680 |
| Implementation Consultants | 5 | $350 | 8 | $560 | 10 | $700 |
| Technical Implementation Engineers | 2 | $170 | 3 | $255 | 4 | $340 |
| Project Coordinators | 2 | $108 | 3 | $162 | 4 | $216 |
| Contractor Implementation | — | $50 | — | $115 | — | $114 |
| **Total Implementation** | **14** | **$1,183** | **21** | **$1,777** | **27** | **$2,235** |

**Average Implementation Duration:** 45 days (FY2023) → 38 days (FY2024) → 35 days (FY2025E) — process improvements reducing time-to-value.

### 1.4 Third-Party Software & Data

| Vendor | Purpose | FY2023 | FY2024 | FY2025E |
|--------|---------|--------|--------|---------|
| Twilio | SMS notifications & 2FA | $98 | $142 | $178 |
| Google Maps API | Location services for multi-site scheduling | $52 | $72 | $92 |
| Plaid | Banking/payroll verification (PaySync) | $68 | $105 | $138 |
| ADP / Paychex APIs | Payroll data connectors | $45 | $68 | $85 |
| DocuSign | E-signatures for onboarding docs | $28 | $38 | $48 |
| Other APIs & Data | Various | $91 | $123 | $146 |
| **Total Third-Party** | | **$382** | **$548** | **$687** |

### 1.5 COGS Summary

| Category | FY2023 | % of COGS | FY2024 | % of COGS | FY2025E | % of COGS |
|----------|--------|-----------|--------|-----------|---------|-----------|
| Cloud Hosting & Infra | $1,639 | 32.2% | $2,246 | 30.7% | $2,889 | 30.0% |
| Customer Support Staff | $1,529 | 30.0% | $2,142 | 29.3% | $2,751 | 28.6% |
| Implementation Staff | $1,183 | 23.2% | $1,777 | 24.3% | $2,235 | 23.2% |
| Third-Party Software | $382 | 7.5% | $548 | 7.5% | $687 | 7.1% |
| Allocated Overhead | $364 | 7.1% | $604 | 8.3% | $1,067 | 11.1% |
| **Total COGS** | **$5,097** | **100%** | **$7,317** | **100%** | **$9,629** | **100%** |
| **Gross Margin** | **72.0%** | | **72.0%** | | **72.0%** | |

---

## 2. Operating Expense Detail by Department

### 2.1 Sales & Marketing ($8,942K — FY2025E)

| Sub-Category | FY2023 | FY2024 | FY2025E |
|-------------|--------|--------|---------|
| **Sales Compensation** | | | |
| AE Base Salaries (32 AEs) | $1,680 | $2,240 | $2,560 |
| AE Variable Commissions | $840 | $1,176 | $1,344 |
| SDR Compensation (12 SDRs) | $288 | $360 | $480 |
| Sales Management (VP + 4 Directors) | $425 | $485 | $548 |
| Sales Benefits & Taxes | $279 | $360 | $408 |
| *Subtotal Sales Comp* | *$3,512* | *$4,621* | *$5,340* |
| | | | |
| **Marketing Programs** | | | |
| Digital Advertising (Google, LinkedIn, Meta) | $425 | $548 | $687 |
| Content Marketing & SEO | $182 | $228 | $275 |
| Events & Trade Shows | $312 | $418 | $412 |
| Webinars & Virtual Events | $85 | $112 | $142 |
| PR & Communications | $68 | $82 | $98 |
| Brand & Creative | $125 | $162 | $198 |
| Marketing Ops & Analytics | $98 | $125 | $162 |
| Marketing Team Compensation (8 FTEs) | $512 | $648 | $762 |
| Marketing Benefits & Taxes | $108 | $136 | $162 |
| *Subtotal Marketing* | *$1,915* | *$2,459* | *$2,898* |
| | | | |
| **Sales Operations & Enablement** | | | |
| Salesforce CRM | $142 | $185 | $218 |
| Gong (Revenue Intelligence) | $48 | $62 | $72 |
| ZoomInfo (Data/Prospecting) | $65 | $82 | $95 |
| Outreach.io (Sales Engagement) | $32 | $42 | $52 |
| Other Sales Tools | $28 | $35 | $42 |
| Sales Ops Team (3 FTEs) | $185 | $242 | $292 |
| Sales Training & Enablement Programs | $62 | $82 | $102 |
| *Subtotal Sales Ops* | *$562* | *$730* | *$873* |
| | | | |
| **Other S&M** | | | |
| Travel & Entertainment | $312 | $362 | $268 |
| Partner & Channel Costs | $85 | $112 | $148 |
| Customer Events & Swag | $52 | $68 | $82 |
| Allocated Facilities & Overhead | $423 | $566 | $733 |
| *Subtotal Other S&M* | *$872* | *$1,108* | *$1,231* |
| | | | |
| **Total S&M** | **$5,461** | **$7,318** | **$8,942** |
| **S&M as % of Revenue** | **30.0%** | **28.0%** | **26.0%** |

### 2.2 Research & Development ($5,847K — FY2025E)

| Sub-Category | FY2023 | FY2024 | FY2025E |
|-------------|--------|--------|---------|
| **Engineering Compensation** | | | |
| US Engineering (48 → 55 → 62 FTEs) | $2,160 | $2,475 | $2,685 |
| Toronto Engineering (28 → 32 → 36 FTEs) | $1,120 | $1,280 | $1,440 |
| Engineering Benefits & Taxes (US) | $324 | $371 | $403 |
| Engineering Benefits & Taxes (Canada) | $168 | $192 | $216 |
| *Subtotal Eng Comp* | *$3,772* | *$4,318* | *$4,744* |
| | | | |
| **Product & Design** | | | |
| Product Management (4 → 5 → 6 FTEs) | $380 | $475 | $542 |
| UX/UI Design (3 → 3 → 4 FTEs) | $225 | $240 | $312 |
| *Subtotal Product & Design* | *$605* | *$715* | *$854* |
| | | | |
| **Contractors & Outsourced** | | | |
| Specialized Contractors (ML, Security) | $245 | $318 | $385 |
| QA Outsource (offshore) | $120 | $153 | $200 |
| *Subtotal Contractors* | *$365* | *$471* | *$585* |
| | | | |
| **Tools & Infrastructure** | | | |
| GitHub Enterprise | $42 | $52 | $62 |
| Jira / Confluence (Atlassian) | $38 | $45 | $52 |
| Figma (Design) | $18 | $22 | $28 |
| CircleCI / GitHub Actions (CI/CD) | $28 | $35 | $42 |
| Dev/Staging AWS Environments | $85 | $108 | $141 |
| Other Dev Tools | $62 | $67 | $85 |
| *Subtotal Tools* | *$273* | *$329* | *$410* |
| | | | |
| **Other R&D** | | | |
| Allocated Facilities & Overhead | $226 | $270 | $254 |
| *Subtotal Other R&D* | *$226* | *$270* | *$254* |
| | | | |
| **Total R&D (P&L)** | **$3,641** | **$4,703** | **$5,847** |
| (+) Capitalized Software Dev | $1,214 | $1,572 | $1,800 |
| **Total R&D Spend (incl. capitalized)** | **$4,855** | **$6,275** | **$7,647** |
| **Total R&D as % of Revenue** | **26.7%** | **24.0%** | **22.2%** |

**Note:** $1,800K of R&D costs were capitalized in FY2025E per ASC 350-40 (internal-use software), representing approximately 23.5% of total R&D spend. Capitalization rate has been consistent at 23–25% over the past 3 years.

### 2.3 General & Administrative ($3,612K — FY2025E)

| Sub-Category | FY2023 | FY2024 | FY2025E |
|-------------|--------|--------|---------|
| **Executive & Admin Compensation** | | | |
| CEO (Sarah Chen) | $285 | $310 | $325 |
| CFO (David Park) | $245 | $265 | $285 |
| VP People Operations | $168 | $182 | $195 |
| Finance & Accounting Team (4 FTEs) | $252 | $298 | $312 |
| HR Team (3 FTEs) | $168 | $198 | $248 |
| Office Admin / EA (2 FTEs) | $92 | $108 | $118 |
| G&A Benefits & Taxes | $164 | $207 | $222 |
| *Subtotal Comp* | *$1,374* | *$1,568* | *$1,705* |
| | | | |
| **Professional Services** | | | |
| Baker Tilly (Audit & Tax) | $185 | $215 | $285 |
| Wilson Sonsini (Legal — General) | $142 | $168 | $198 |
| Wilson Sonsini (Legal — Transaction) | $0 | $0 | $130 |
| Other Legal (Employment, IP, Canada) | $68 | $85 | $92 |
| Deloitte (Tax Advisory — Transfer Pricing) | $45 | $52 | $55 |
| Other Advisors | $70 | $107 | $62 |
| *Subtotal Professional* | *$510* | *$627* | *$822* |
| | | | |
| **Insurance** | | | |
| D&O Insurance (Chubb) | $98 | $118 | $142 |
| E&O / Professional Liability | $48 | $56 | $68 |
| Cyber Liability (CFC Underwriting) | $35 | $42 | $52 |
| General Liability + Property | $28 | $34 | $38 |
| EPLI | $9 | $11 | $10 |
| *Subtotal Insurance* | *$218* | *$261* | *$310* |
| | | | |
| **Facilities & Office** | | | |
| Austin HQ — Rent | $185 | $212 | $228 |
| Denver — Rent | $72 | $92 | $98 |
| Toronto — Rent (CAD converted) | $58 | $72 | $87 |
| Office Supplies & Equipment | $48 | $52 | $62 |
| Telecommunications / Internet | $38 | $42 | $48 |
| Janitorial & Maintenance | $18 | $22 | $25 |
| *Subtotal Facilities* | *$419* | *$492* | *$548* |
| | | | |
| **Other G&A** | | | |
| Software Subscriptions (NetSuite, Slack, Google Workspace, etc.) | $62 | $72 | $86 |
| Travel & Entertainment (exec/admin) | $85 | $98 | $128 |
| Bank Fees & Merchant Processing | $28 | $32 | $38 |
| Board Meeting Expenses | $12 | $15 | $18 |
| Recruiting Fees | $85 | $62 | $48 |
| Charitable Contributions | $15 | $18 | $22 |
| Miscellaneous G&A | $40 | $50 | $47 |
| G&A Overhead Allocation Offset | ($247) | ($260) | ($260) |
| *Subtotal Other* | *$80* | *($13)* | *$127* |
| | | | |
| **Total G&A** | **$2,548** | **$3,135** | **$3,612** |
| **G&A as % of Revenue** | **14.0%** | **12.0%** | **10.5%** |

**Note on Transaction Costs:** FY2025E G&A includes $130K of Wilson Sonsini legal fees and approximately $50K of other advisory fees related to the Apex Growth Partners transaction process. These are considered non-recurring and would be excluded from Adjusted EBITDA in a Quality of Earnings analysis.

---

## 3. Top 20 Vendor Spend (FY2025E)

| Rank | Vendor | Category | Annual Spend ($K) | Contract Terms |
|------|--------|----------|------------------|---------------|
| 1 | Amazon Web Services (AWS) | Hosting / Infrastructure | $2,786 | 3-year Reserved Instance commitment (exp. 2027); on-demand for burst |
| 2 | Salesforce | CRM (Sales Cloud + Service Cloud) | $218 | 3-year enterprise agreement; 280 licenses |
| 3 | Google Workspace | Productivity Suite | $112 | Annual; 342 licenses @ $27/user/month avg |
| 4 | Baker Tilly US, LLP | Audit, Tax, Advisory | $285 | Annual engagement letter |
| 5 | Wilson Sonsini Goodrich & Rosati | Legal Counsel | $420 | Hourly engagement (incl. $130K transaction fees) |
| 6 | Atlassian (Jira/Confluence) | Project Management / Knowledge | $52 | Annual cloud subscription |
| 7 | Chubb Insurance | D&O Insurance | $142 | Annual policy (Jul-Jul) |
| 8 | Twilio | Communications API (SMS/Voice) | $178 | Usage-based; committed spend tier |
| 9 | HubSpot | Marketing Automation | $85 | Annual; Marketing Hub Enterprise |
| 10 | Datadog | Monitoring & Observability | $85 | Annual; Pro tier |
| 11 | GitHub | Source Code / CI-CD | $62 | Annual; Enterprise Cloud |
| 12 | Plaid | Financial Data API | $138 | Usage-based; enterprise agreement |
| 13 | ZoomInfo | Sales Intelligence | $95 | Annual; Advanced tier |
| 14 | Gong | Revenue Intelligence | $72 | Annual; 65 licenses |
| 15 | Cloudflare | CDN / WAF / DNS | $58 | Annual; Enterprise plan |
| 16 | CFC Underwriting | Cyber Insurance | $52 | Annual policy (Jul-Jul) |
| 17 | Outreach.io | Sales Engagement | $52 | Annual; 45 licenses |
| 18 | Gusto | Internal Payroll (Test Corp employees) | $48 | Monthly; per-employee pricing |
| 19 | Figma | Design Platform | $28 | Annual; Organization tier |
| 20 | Deloitte | Tax Advisory (Transfer Pricing) | $55 | Project-based engagement |
| | **Top 20 Total** | | **$5,073** | |
| | All Other Vendors | | $4,556 | |
| | **Total Vendor Spend** | | **$9,629** (COGS) + **$18,401** (OpEx) | |

---

## 4. Cost Efficiency Metrics

| Metric | FY2023 | FY2024 | FY2025E |
|--------|--------|--------|---------|
| Hosting Cost per Customer | $1,639 | $1,872 | $2,407 |
| Hosting as % of Subscription Rev | 10.9% | 10.2% | 9.9% |
| Support Cost per Customer | $1,529 | $1,785 | $2,293 |
| Implementation Cost per New Customer | $5,915 | $5,077 | $7,210 |
| Implementation Margin | 41.4% | 36.2% | 34.3% |
| CAC (Fully Loaded S&M / New Logos) | $27,305 | $20,908 | $28,845 |
| CAC Payback (months) | 22 | 19 | 17 |
| Revenue per Employee | $67K | $76K | $101K |
| OpEx per Employee | $43K | $44K | $54K |

**Note on Implementation Margin Compression:** Implementation margin has declined from 41% to 34% as the Company invests in more comprehensive onboarding for larger, more complex customers. Management expects implementation margins to stabilize at 32–35% as the Company moves upmarket.

---

*Cost detail sourced from NetSuite GL, vendor contracts, and departmental budgets. FY2025E figures include 11 months of actuals and 1 month of estimates.*
