# Steel Estimator - Expert Feedback from Leo Flynn (Tennessee River Steel)

**Source:** Leo Flynn, Senior Project Manager at Tennessee River Steel, LLC  
**Date:** March 9, 2026  
**Contact:** leo@tennesseeriversteel.com | 850-982-0556  
**Context:** Professional steel estimator who builds these daily

---

## Sheet 1: Project Setup

| Item | Issue/Change | Priority |
|------|-------------|----------|
| Title formatting | Merge & center A1:E1 | Medium |
| Column width | Resize A1 for descriptions / merge A1:E1 | Medium |
| Project info | Add more space for address (move C column to D) | Medium |
| Building Type | Add dropdown menu | High |
| Structure Type | Add dropdown menu | High |
| Column layout | Move Total Weight & SF left, MPH right | Medium |
| Base/Total Rate | Format as accounting | Medium |
| Field Oversite | Capitalize O → "Field Oversight" | Low |
| Crew Lead | Capitalize L → "Crew Lead" | Low |
| Burden | Add sum formula, format total as % | High |

---

## Sheet 2: Fabrication

| Item | Issue/Change | Priority |
|------|-------------|----------|
| Material pricing | **CRITICAL:** Currently by length, should be by weight (lb). Example: W36x300 at $0.48/lb = $144/ft (not $4.25) | Critical |
| Category organization | Separate each category, add subtotals (tonnage, SF surface prep) | High |
| Plate pricing | By SF weight, not EA | High |
| Decking pricing | By square (100 SF), not SF | High |
| Missing category | Add joist category | High |
| Detailing | Include in fabrication pricing | High |
| Freight calculation | Fix - should be by mile, not current method | High |
| Engineering | Add calculations for miscellaneous and connections | Medium |

---

## Sheet 3: Erection

| Item | Issue/Change | Priority |
|------|-------------|----------|
| Hours calculation | Total hours not factoring crew size correctly | Critical |
| Formatting | Rate, equipment, subtotal showing wrong format (causing Summary errors) | Critical |
| Fix method | Delete data → format cells as accounting → re-enter data | High |

---

## Sheet 4: Summary

| Item | Issue/Change | Priority |
|------|-------------|----------|
| Structural Steel Materials | Wrong cell reference in fabrication sheet | Critical |
| Markup issue #1 | Applied in fabrication takeoff | Critical |
| Markup issue #2 | Applied again in summary | Critical |
| Markup issue #3 | Applied third time in Overhead & Profit | Critical |
| **Correct approach** | Markup should ONLY be in Overhead & Profit section | Critical |
| Fabrication subtotal | Referencing wrong cell, redundant. Use =sum() formula, no text in cells | High |
| Erection | Wrong cell reference, markup applied twice | Critical |
| Bond | Set default to 0% (not included by default) | Medium |
| Retainage | Set default to 0% (varies by location, user enters 5% or 10%) | Medium |
| Cell references | Adjust to work with Project Setup changes | Medium |

---

## Critical Issues to Fix First

1. **Triple markup application** - Only apply in Overhead & Profit
2. **Material pricing by weight not length** - Complete recalculation needed
3. **Crew size not factoring into hours** - Erection calculations broken
4. **Wrong cell references** - Summary sheet pulling from incorrect cells
5. **Formatting errors** - Causing downstream calculation failures

---

## Leo's Adjusted File

He attached his corrected version: "Copy of Enterprise-Steel-Estimator - Leo Adjustments.xlsx"

**Action:** Use his file as the new baseline/template.

---

## Notes for Future Development

- Leo is a domain expert - his feedback is authoritative
- These changes reflect industry-standard steel estimating practices
- The estimator should be validated against real projects before release
- Consider adding: dropdown standardization, formula protection, input validation
