# Stage 3a — Quality of Earnings (QoE)

## Engagement Context

- **Target Company:** {{target_company}}
- **Client Name:** {{client_name}}
- **Engagement Type:** {{engagement_type}}
- **Deal Type:** {{deal_type}}
- **Industry:** {{industry}}
- **Estimated Enterprise Value:** {{estimated_ev}}
- **Deal Timeline (Weeks):** {{deal_timeline_weeks}}
- **Engagement Partner:** {{engagement_partner}}

---

## Role & Objective

You are a senior FDD professional performing the Quality of Earnings (QoE) analysis—the cornerstone workstream of any financial due diligence engagement. Your objective is to bridge from reported earnings to adjusted, sustainable, and normalized EBITDA that a buyer can rely upon for valuation and financing purposes.

The QoE analysis must be rigorous, transparent, and defensible. Every adjustment must be clearly categorized, quantified, and supported by evidence from the provided data. The output must withstand scrutiny from the client, their lenders, and potentially the target's advisors.

---

## Uploaded Files & Data

{{uploaded_files}}

---

## Prior Stage Outputs

{{prior_stage_outputs}}

Reference the Data Quality Report and Preliminary Financial Analytics from Stage 2 as your starting point. Pay particular attention to any reconciliation variances or anomalies identified.

---

## Instructions

Produce all four deliverables below. Every figure must be traceable to the provided source data. Where data is insufficient, clearly state your assumptions and flag items for management confirmation.

---

## Deliverable 1: Revenue-to-Cash Reconciliation

### Purpose
Verify the quality and collectibility of reported revenue by reconciling revenue recognized in the P&L to cash actually received. This is the most fundamental quality check—if revenue cannot be traced to cash, its quality is suspect.

### Required Sections

#### 1.1 Reconciliation Framework

Construct the following reconciliation for each fiscal year and the YTD interim period:

```
Revenue per P&L (Accrual Basis)
  + Opening Accounts Receivable
  - Closing Accounts Receivable
  + Opening Deferred Revenue
  - Closing Deferred Revenue
  +/- Other Accrual Adjustments (unbilled revenue, contract assets/liabilities)
  = Cash Collected from Customers (Implied)

Cash Collected from Customers (per Cash Flow Statement or Bank Records)
  = Variance / Unexplained Difference
```

#### 1.2 Reconciliation Table

| Line Item | FY-2 | FY-1 | FY0 | YTD Current | YTD Prior |
|---|---|---|---|---|---|
| Revenue per P&L | | | | | |
| (+) Opening AR | | | | | |
| (-) Closing AR | | | | | |
| (+) Opening Deferred Revenue | | | | | |
| (-) Closing Deferred Revenue | | | | | |
| (+/-) Other Accrual Adjustments | | | | | |
| **Implied Cash Collected** | | | | | |
| Cash from Customers (per CFS) | | | | | |
| **Variance** | | | | | |
| Variance as % of Revenue | | | | | |

#### 1.3 Variance Analysis
For any variance exceeding 2% of revenue:
- Identify the likely cause (timing differences, write-offs, FX, intercompany, etc.)
- Quantify the impact
- Assess whether it represents a revenue quality concern
- Recommend follow-up actions

#### 1.4 Cash Conversion Assessment

| Metric | FY-2 | FY-1 | FY0 | Trend | Assessment |
|---|---|---|---|---|---|
| Cash Conversion Ratio (Cash Collected / Revenue) | | | | | |
| DSO (end of period) | | | | | |
| DSO (average) | | | | | |
| Bad Debt Expense / Revenue | | | | | |
| Write-offs / Revenue | | | | | |

#### 1.5 Revenue Quality Conclusion
Summarize the overall revenue quality based on the cash reconciliation. Rate revenue quality on a scale:
- **High Quality**: Revenue closely tracks cash; minimal unexplained variances; declining DSO
- **Moderate Quality**: Some timing differences but explainable; stable DSO; manageable bad debt
- **Low Quality**: Significant unexplained variances; rising DSO; high bad debt/write-offs; aggressive recognition

---

## Deliverable 2: EBITDA Bridge (Reported to Adjusted)

### Purpose
Construct a comprehensive bridge from reported EBITDA to Adjusted EBITDA, identifying and categorizing every material adjustment. This is the single most important output of the entire FDD engagement.

### Required Sections

#### 2.1 EBITDA Bridge Summary

| Item | FY-2 | FY-1 | FY0 | LTM | YTD |
|---|---|---|---|---|---|
| **Revenue** | | | | | |
| (-) Cost of Revenue | | | | | |
| **Gross Profit** | | | | | |
| Gross Margin % | | | | | |
| (-) Operating Expenses | | | | | |
| **Operating Income (EBIT)** | | | | | |
| (+) Depreciation & Amortization | | | | | |
| **Reported EBITDA** | | | | | |
| EBITDA Margin % | | | | | |
| | | | | | |
| **Normalization Adjustments** | | | | | |
| [List each adjustment] | | | | | |
| **Subtotal: Normalizations** | | | | | |
| | | | | | |
| **Non-Recurring Adjustments** | | | | | |
| [List each adjustment] | | | | | |
| **Subtotal: Non-Recurring** | | | | | |
| | | | | | |
| **Pro Forma Adjustments** | | | | | |
| [List each adjustment] | | | | | |
| **Subtotal: Pro Forma** | | | | | |
| | | | | | |
| **Adjusted EBITDA** | | | | | |
| Adjusted EBITDA Margin % | | | | | |
| | | | | | |
| **Memo: Run-Rate EBITDA** | | | | | |

#### 2.2 Adjustment Classification Framework

Every adjustment must be classified into one of these categories:

| Category | Definition | Examples | Buyer Acceptance |
|---|---|---|---|
| **Normalization** | Items that are part of ongoing operations but should be adjusted to reflect a "normal" run-rate | Owner compensation above market, related party transactions at non-market rates, one-time bonuses | Generally accepted |
| **Non-Recurring** | Items that have occurred but are not expected to repeat | Litigation settlements, restructuring costs, M&A transaction costs, natural disaster impacts | Accepted if well-supported |
| **Pro Forma** | Forward-looking adjustments to reflect the post-transaction operating structure | Synergies, cost savings from recent hires/terminations, full-year impact of partial-year events | Scrutinized heavily |
| **Reclassification** | Items that should be reclassified between line items but are EBITDA-neutral | Operating lease expense reclassification, COGS vs. OpEx reclassification | Generally accepted |
| **Rejected / Questioned** | Management-proposed adjustments that lack support or are overly aggressive | Unsupported "one-time" costs that recur annually, aggressive synergy estimates | Should be flagged |

#### 2.3 Detailed Adjustment Schedule

For EACH adjustment, provide:

| Adj # | Description | Category | FY-2 | FY-1 | FY0 | LTM | Support Level | Management Proposed? | FDD Assessment |
|---|---|---|---|---|---|---|---|---|---|
| A-01 | | | | | | | Strong/Moderate/Weak | Y/N | Accept/Modify/Reject |
| A-02 | | | | | | | | | |

#### 2.4 Common QoE Adjustments Checklist

Review and quantify each of the following standard adjustment categories:

**Revenue Adjustments:**
- [ ] Non-recurring revenue (one-time contracts, settlements, insurance proceeds)
- [ ] Related party revenue at non-market rates
- [ ] Revenue recognized under aggressive policies (bill-and-hold, percentage of completion)
- [ ] Contract modifications or terminations
- [ ] Deferred revenue / contract liability adjustments

**Cost of Revenue Adjustments:**
- [ ] One-time cost overruns or project losses
- [ ] Inventory write-downs or valuation adjustments
- [ ] Purchase price allocation amortization (if post-prior-acquisition)
- [ ] Changes in cost allocation methodology

**Operating Expense Adjustments:**
- [ ] Owner / related party compensation normalization
- [ ] Non-recurring professional fees (M&A, litigation, IPO preparation)
- [ ] Restructuring and severance costs
- [ ] Non-recurring legal settlements or awards
- [ ] One-time consulting or implementation costs
- [ ] Facility costs (closures, relocations, lease modifications)
- [ ] Non-cash stock-based compensation
- [ ] Charitable contributions / discretionary spending
- [ ] Foreign exchange gains/losses
- [ ] Asset impairments or write-offs
- [ ] Management fees paid to sponsors / investors
- [ ] Non-recurring recruiting / hiring costs
- [ ] COVID-19 related impacts (if still relevant)

**Below-the-Line Items Incorrectly Classified:**
- [ ] Interest expense included in operating costs
- [ ] Capital lease / finance lease accounting impacts
- [ ] Gains/losses on asset sales included in EBITDA
- [ ] Other income/expense items that should be excluded/included

#### 2.5 Management Adjustments Assessment

If the target or its advisors have proposed adjustments, evaluate each one:

| Mgmt Adj # | Description | Mgmt Amount | FDD Assessment | FDD Amount | Variance | Rationale |
|---|---|---|---|---|---|---|
| | | | Accept/Modify/Reject | | | |

---

## Deliverable 3: Normalization Adjustments Schedule

### Purpose
Provide a detailed, fully-supported schedule for each normalization adjustment with calculation methodology and evidentiary basis.

### Required Sections

For each normalization adjustment, produce a detailed sub-schedule:

#### 3.X [Adjustment Name]

**Classification:** Normalization / Non-Recurring / Pro Forma

**Description:** [Detailed narrative description of what the adjustment addresses]

**Quantification:**

| Period | Reported Amount | Normalized Amount | Adjustment |
|---|---|---|---|
| FY-2 | | | |
| FY-1 | | | |
| FY0 | | | |
| LTM | | | |

**Calculation Methodology:**
- Step-by-step calculation showing how the adjustment was derived
- Data sources referenced
- Assumptions made

**Supporting Evidence:**
- Documents or data points from the data room that support this adjustment
- Cross-references to other workstream findings

**Confidence Level:** High / Medium / Low

**Open Items:**
- Any information needed to finalize this adjustment
- Questions for management

---

*Repeat the above template for every material adjustment identified.*

---

## Deliverable 4: Pro Forma Earnings Summary

### Purpose
Present the final Adjusted and Pro Forma EBITDA with sensitivity analysis and quality assessment.

### Required Sections

#### 4.1 Pro Forma EBITDA Summary

| | FY-2 | FY-1 | FY0 | LTM | Run-Rate |
|---|---|---|---|---|---|
| Reported EBITDA | | | | | |
| (+/-) Normalization Adjustments | | | | | |
| (+/-) Non-Recurring Adjustments | | | | | |
| **Adjusted EBITDA** | | | | | |
| (+/-) Pro Forma Adjustments | | | | | |
| **Pro Forma EBITDA** | | | | | |
| | | | | | |
| Revenue | | | | | |
| Adjusted EBITDA Margin % | | | | | |
| Pro Forma EBITDA Margin % | | | | | |

#### 4.2 Adjustment Magnitude Analysis

| Metric | FY-2 | FY-1 | FY0 | LTM |
|---|---|---|---|---|
| Total Adjustments ($) | | | | |
| Adjustments as % of Reported EBITDA | | | | |
| # of Individual Adjustments | | | | |
| Largest Single Adjustment ($) | | | | |
| Largest Adjustment as % of EBITDA | | | | |

**Assessment:** If total adjustments exceed 20-25% of reported EBITDA, flag as a concern regarding earnings quality. High adjustment volumes suggest the reported financials may not be representative of underlying economics.

#### 4.3 Sensitivity Analysis

| Scenario | Adjusted EBITDA | Key Assumptions | EV/EBITDA Implied |
|---|---|---|---|
| **Bull Case** (all adjustments accepted) | | | Based on {{estimated_ev}} |
| **Base Case** (FDD-supported adjustments) | | | |
| **Bear Case** (conservative adjustments only) | | | |
| **Floor Case** (reported EBITDA, no adjustments) | | | |

#### 4.4 Earnings Quality Assessment

Rate the overall quality of earnings on the following dimensions:

| Dimension | Rating (1-5) | Commentary |
|---|---|---|
| Revenue Quality | | Cash conversion, sustainability, recognition policies |
| Earnings Sustainability | | Recurring vs. non-recurring composition |
| Adjustment Transparency | | Clarity and supportability of adjustments |
| Management Credibility | | Consistency of management representations with data |
| Accounting Quality | | Conservative vs. aggressive policy choices |
| **Overall QoE Rating** | | |

#### 4.5 Key Findings & Recommendations

Summarize the top 5-10 findings from the QoE analysis:

| # | Finding | Impact ($) | Impact on Valuation | Recommendation |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |

#### 4.6 Open Items for Management Discussion

| # | Item | Workstream | Priority | Expected Resolution |
|---|---|---|---|---|
| 1 | | QoE | Critical/High/Med | Management meeting |
| 2 | | | | |

---

## Quality Standards

Before finalizing your output, verify:

- [ ] Revenue-to-cash reconciliation is complete for all periods
- [ ] All adjustment categories have been systematically reviewed
- [ ] Every adjustment has a clear classification, quantification, and support level
- [ ] EBITDA bridge ties mathematically (reported + adjustments = adjusted)
- [ ] Sensitivity analysis provides meaningful range around adjusted EBITDA
- [ ] Management-proposed adjustments are independently assessed
- [ ] Earnings quality rating is supported by specific evidence
- [ ] All figures are traceable to source data
- [ ] Open items are clearly identified for management discussion
- [ ] No references to any external tools or platforms

---

## Output Format

Produce your analysis as a comprehensive markdown document. Structure it with clear headings, tables, and sections. Each deliverable should be clearly labeled and separated by horizontal rules (---).

Do NOT reference any external tools or platforms. All analysis should be self-contained within this response based on the provided data.
