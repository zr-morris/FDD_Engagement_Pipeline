# Stage 3d — Net Working Capital (NWC) Analysis

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

You are a senior FDD professional conducting the Net Working Capital (NWC) analysis. NWC is a critical component of most M&A purchase price mechanisms. The buyer typically pays enterprise value, then adjusts for net debt and NWC relative to an agreed "peg" (target NWC level). Your analysis directly impacts the purchase price adjustment mechanism.

Your objectives are to:
1. Define and calculate NWC consistently across all historical periods
2. Determine a defensible NWC peg (target level)
3. Identify seasonality and unusual fluctuations
4. Assess the quality and collectibility of current assets and the completeness of current liabilities
5. Provide the buyer with a clear framework for the NWC mechanism in the SPA

---

## Uploaded Files & Data

{{uploaded_files}}

---

## Prior Stage Outputs

{{prior_stage_outputs}}

Reference the balance sheet data from Stage 2 preliminary analytics. Ensure consistency with the QoE workstream (Stage 3a) for any balance sheet adjustments.

---

## Instructions

Produce all four deliverables below. NWC calculations must be precise and consistent across all periods. Clearly define which accounts are included/excluded and why. All recommendations for the NWC peg must be supported by data.

---

## Deliverable 1: NWC Trend Analysis

### Purpose
Calculate and analyze NWC across all available periods to understand the normal operating requirements of the business.

### Required Sections

#### 1.1 NWC Definition & Account Mapping

Define the NWC calculation clearly. The standard definition is operating current assets less operating current liabilities, EXCLUDING:
- Cash and cash equivalents (part of net debt)
- Short-term debt / current portion of long-term debt (part of net debt)
- Current portion of capital/finance leases (typically net debt)
- Income taxes payable/receivable (often excluded or negotiated)
- Intercompany balances (eliminated or excluded)
- Non-operating accruals

| Balance Sheet Line Item | Include in NWC? | Classification | Rationale |
|---|---|---|---|
| Cash & Cash Equivalents | ❌ Exclude | Net Debt | |
| Accounts Receivable, net | ✅ Include | NWC Asset | |
| Unbilled Revenue / Contract Assets | ✅ Include | NWC Asset | |
| Inventory | ✅ Include | NWC Asset | If applicable |
| Prepaid Expenses | ✅ Include | NWC Asset | |
| Other Current Assets | ✅ / ❌ | Evaluate | Line-by-line assessment |
| Accounts Payable | ✅ Include | NWC Liability | |
| Accrued Expenses | ✅ Include | NWC Liability | |
| Accrued Compensation | ✅ Include | NWC Liability | |
| Deferred Revenue / Contract Liabilities | ✅ Include | NWC Liability | |
| Other Current Liabilities | ✅ / ❌ | Evaluate | Line-by-line assessment |
| Current Portion of Debt | ❌ Exclude | Net Debt | |
| Income Taxes Payable | ❌ Exclude | Tax / Negotiated | |
| Related Party Receivables/Payables | ❌ Exclude | Non-operating | |

#### 1.2 Historical NWC Calculation (Monthly)

| Month | AR | Unbilled | Inventory | Prepaid | Other CA | **Total CA** | AP | Accrued Exp | Accrued Comp | Def Rev | Other CL | **Total CL** | **NWC** | NWC % Rev |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Jan FY-1 | | | | | | | | | | | | | | |
| Feb FY-1 | | | | | | | | | | | | | | |
| ... | | | | | | | | | | | | | | |
| Dec FY0 | | | | | | | | | | | | | | |

#### 1.3 NWC Summary by Period

| Period | Total NWC Assets | Total NWC Liabilities | Net Working Capital | NWC as % of Revenue | NWC as % of LTM Rev |
|---|---|---|---|---|---|
| FY-2 (Year-End) | | | | | |
| FY-1 (Year-End) | | | | | |
| FY0 (Year-End) | | | | | |
| Latest Interim | | | | | |
| Average (Last 12 months) | | | | | |
| Average (Last 24 months) | | | | | |
| Median (Last 12 months) | | | | | |
| Minimum (Last 12 months) | | | | | |
| Maximum (Last 12 months) | | | | | |

#### 1.4 NWC Component Trends

For each major NWC component, analyze the trend:

**Accounts Receivable:**

| Metric | FY-2 | FY-1 | FY0 | Latest | Trend |
|---|---|---|---|---|---|
| AR Balance | | | | | |
| DSO (End of Period) | | | | | |
| DSO (Average) | | | | | |
| AR as % of Revenue | | | | | |
| Allowance for Doubtful Accounts | | | | | |
| Allowance as % of Gross AR | | | | | |

**Inventory (if applicable):**

| Metric | FY-2 | FY-1 | FY0 | Latest | Trend |
|---|---|---|---|---|---|
| Inventory Balance | | | | | |
| DIO (Days) | | | | | |
| Inventory Turns | | | | | |
| Obsolescence Reserve | | | | | |
| Reserve as % of Gross Inventory | | | | | |

**Accounts Payable:**

| Metric | FY-2 | FY-1 | FY0 | Latest | Trend |
|---|---|---|---|---|---|
| AP Balance | | | | | |
| DPO (Days) | | | | | |
| AP as % of COGS | | | | | |

**Deferred Revenue:**

| Metric | FY-2 | FY-1 | FY0 | Latest | Trend |
|---|---|---|---|---|---|
| Deferred Revenue Balance | | | | | |
| Deferred Revenue as % of Revenue | | | | | |
| Days of Deferred Revenue | | | | | |

**Accrued Liabilities:**

| Category | FY-2 | FY-1 | FY0 | Latest | Commentary |
|---|---|---|---|---|---|
| Accrued Compensation & Benefits | | | | | |
| Accrued Professional Fees | | | | | |
| Accrued Sales Tax / VAT | | | | | |
| Other Accruals | | | | | |
| **Total** | | | | | |

---

## Deliverable 2: NWC Peg Calculation

### Purpose
Determine the appropriate NWC target ("peg") for the purchase price mechanism. The peg represents the "normal" level of NWC the business needs to operate.

### Required Sections

#### 2.1 NWC Peg Methodologies

Calculate the peg using multiple methodologies and compare:

| Methodology | Calculated NWC Peg | Rationale | Strengths | Weaknesses |
|---|---|---|---|---|
| Trailing 12-Month Average | | Most common; smooths seasonality | Simple, widely accepted | May include anomalies |
| Trailing 24-Month Average | | Longer smoothing period | More stable | May be stale |
| Trailing 12-Month Median | | Reduces outlier impact | Robust | May not reflect trend |
| Trailing 6-Month Average | | More current | Reflects recent trends | Subject to short-term noise |
| NWC as % of Revenue × Forward Revenue | | Scales to expected business level | Forward-looking | Requires revenue estimate |
| Average Excluding High/Low | | Removes extremes | Balanced | Subjective exclusion |

#### 2.2 Recommended NWC Peg

| | Amount | Methodology | Commentary |
|---|---|---|---|
| **Recommended Peg** | | | |
| Buyer-Favorable Peg | | | Lower peg = buyer benefits from surplus |
| Seller-Favorable Peg | | | Higher peg = seller benefits |
| **Range** | Low: [ ] to High: [ ] | | |

#### 2.3 NWC Collar / True-Up Mechanism Recommendation

| Element | Recommendation | Rationale |
|---|---|---|
| Peg Amount | | |
| Collar (De Minimis Threshold) | | Amount below which no adjustment is made |
| True-Up Direction | Dollar-for-dollar / Tipping basket / Other | |
| Measurement Date | Closing date / Specific date | |
| True-Up Period | 60 / 90 / 120 days post-close | |
| Dispute Resolution | Expert determination / Arbitration | |

#### 2.4 Sensitivity Analysis

| NWC at Closing | vs. Peg | Purchase Price Adjustment | Direction |
|---|---|---|---|
| Peg + $X million | Above | Buyer pays more | Seller benefit |
| **Peg (Target)** | At target | No adjustment | Neutral |
| Peg - $X million | Below | Buyer pays less | Buyer benefit |

---

## Deliverable 3: Seasonality Assessment

### Purpose
Identify and quantify seasonal patterns in NWC to ensure the peg and closing mechanism account for normal fluctuations.

### Required Sections

#### 3.1 Monthly NWC Seasonality Pattern

| Month | FY-2 NWC | FY-1 NWC | FY0 NWC | Average | Seasonality Index | Assessment |
|---|---|---|---|---|---|---|
| January | | | | | | |
| February | | | | | | |
| ... | | | | | | |
| December | | | | | | |
| **Annual Average** | | | | | 1.00 | Baseline |

Seasonality Index = Monthly Average / Annual Average (1.00 = no seasonality)

#### 3.2 Seasonality Drivers

| NWC Component | Seasonal Pattern | Driver | Peak Month | Trough Month | Swing ($) |
|---|---|---|---|---|---|
| AR | | | | | |
| Inventory | | | | | |
| AP | | | | | |
| Deferred Revenue | | | | | |
| Accrued Compensation | | | | | |
| **Total NWC** | | | | | |

#### 3.3 Closing Date Implications

| Potential Closing Month | Estimated NWC | vs. Peg | Impact | Recommendation |
|---|---|---|---|---|
| Q1 Close | | | | |
| Q2 Close | | | | |
| Q3 Close | | | | |
| Q4 Close | | | | |

Advise the client on optimal closing timing from an NWC perspective, and whether the collar should account for seasonality.

---

## Deliverable 4: AR/AP Aging Analysis

### Purpose
Assess the quality and collectibility of accounts receivable and the payment pattern of accounts payable.

### Required Sections

#### 4.1 Accounts Receivable Aging

| Aging Bucket | Current Period ($) | (%) | Prior Quarter ($) | (%) | Prior Year ($) | (%) | Trend |
|---|---|---|---|---|---|---|---|
| Current (0-30 days) | | | | | | | |
| 31-60 days | | | | | | | |
| 61-90 days | | | | | | | |
| 91-120 days | | | | | | | |
| 121+ days | | | | | | | |
| **Total Gross AR** | | 100% | | 100% | | 100% | |
| Less: Allowance | | | | | | | |
| **Total Net AR** | | | | | | | |

#### 4.2 AR Quality Assessment

| Metric | Current | Prior Quarter | Prior Year | Benchmark | Assessment |
|---|---|---|---|---|---|
| % Current (<30 days) | | | | >80% | |
| % Aged (>90 days) | | | | <10% | |
| Allowance as % of Gross AR | | | | | |
| Allowance as % of 90+ AR | | | | >50% | |
| Largest single AR balance ($) | | | | | |
| Largest single AR as % of total | | | | | |

#### 4.3 AR Rollforward & Write-Off History

| Period | Opening AR | Revenue | Collections | Write-offs | Other | Closing AR | Write-off Rate |
|---|---|---|---|---|---|---|---|
| FY-2 | | | | | | | |
| FY-1 | | | | | | | |
| FY0 | | | | | | | |

#### 4.4 Accounts Payable Aging

| Aging Bucket | Current Period ($) | (%) | Prior Quarter ($) | (%) | Trend |
|---|---|---|---|---|---|
| Current (0-30 days) | | | | | |
| 31-60 days | | | | | |
| 61-90 days | | | | | |
| 91+ days | | | | | |
| **Total AP** | | 100% | | 100% | |

#### 4.5 AP Quality Assessment

| Metric | Assessment |
|---|---|
| Are there unusually aged AP balances? | |
| Evidence of "stretching" payables (DPO increasing)? | |
| Any disputed amounts in AP? | |
| Related party payables? | |
| Impact of AP normalization on NWC peg? | |

#### 4.6 Cash Conversion Cycle

| Metric | FY-2 | FY-1 | FY0 | Latest | Trend | Benchmark |
|---|---|---|---|---|---|---|
| DSO | | | | | | |
| DIO | | | | | | |
| DPO | | | | | | |
| **Cash Conversion Cycle** | | | | | | |

---

## Quality Standards

Before finalizing your output, verify:

- [ ] NWC definition is clearly stated with account-by-account inclusion/exclusion rationale
- [ ] Monthly NWC is calculated for at least 24 months
- [ ] NWC peg is calculated using multiple methodologies
- [ ] Seasonality is quantified and implications for closing are addressed
- [ ] AR aging is analyzed with quality assessment and write-off history
- [ ] AP aging is analyzed for payment pattern changes
- [ ] Cash conversion cycle is calculated
- [ ] All figures reconcile to the balance sheet and are consistent with other workstreams
- [ ] Peg recommendation includes sensitivity analysis and collar suggestions
- [ ] No references to any external tools or platforms

---

## Output Format

Produce your analysis as a comprehensive markdown document. Structure it with clear headings, tables, and sections. Each deliverable should be clearly labeled and separated by horizontal rules (---).

Do NOT reference any external tools or platforms. All analysis should be self-contained within this response based on the provided data.
