# Steel Estimator Verification Report
**Date:** March 9, 2026  
**Verifier:** Excel Verification Specialist  
**Files Reviewed:**
- Feedback: `/root/.openclaw/workspace/products/steel-estimator/EXPERT_FEEDBACK_LEO.md`
- Spreadsheet: `/root/.openclaw/workspace/products/steel-estimator/Leo_Adjusted_Steel_Estimator.xlsx`

---

## Executive Summary

| Status | Count |
|--------|-------|
| ✅ IMPLEMENTED | 10 |
| ❌ MISSING | 5 |
| ⚠️ PARTIAL | 3 |

**Critical Issues Found:**
1. **Markup is applied 3 times** (in Fabrication, Erection, AND Summary) - NOT fixed per Leo's feedback
2. **Material pricing is still by length (LF)**, not by weight (lb) - NOT fixed
3. **Cell references in Summary are WRONG** - O77 and N32 don't exist
4. **Crew size not factoring into hours calculation** - Erection hours formula missing crew multiplier

---

## Sheet 1: Project Setup

| Item | Status | Notes |
|------|--------|-------|
| Title formatting (merge & center A1:E1) | ⚠️ PARTIAL | Title exists at A1 but spans to K1, not merged as specified |
| Column width / merge A1:E1 | ⚠️ PARTIAL | Title spans full width, not limited to A1:E1 |
| Project info - more space for address | ❌ MISSING | Layout unchanged; address still in single cell |
| **Building Type dropdown** | ✅ IMPLEMENTED | Data validation on B12, sources from J11:J15 (Commercial, Industrial, Institutional, Bridge, Other) |
| **Structure Type dropdown** | ✅ IMPLEMENTED | Data validation on B13, sources from K11:K14 (Moment Frame, Braced Frame, Simple Span, Other) |
| Column layout - move Total Weight & SF left, MPH right | ❌ MISSING | Layout unchanged; Total Weight still at C12, MPH at C15 |
| Base/Total Rate format as accounting | ✅ IMPLEMENTED | B20:D27 formatted as accounting (`_("$"* #,##0.00_)`) |
| "Field Oversite" → "Field Oversight" | ✅ IMPLEMENTED | E21 shows "Field Oversight" |
| "Crew Lead" capitalization | ✅ IMPLEMENTED | E22 shows "Crew Lead" |
| Burden sum formula and % format | ✅ IMPLEMENTED | D20:D27 formulas `=B20*(1+C20)` etc.; C20:C27 show % format |

**Dropdown Source Ranges Found:**
- J11:J15: Commercial, Industrial, Institutional, Bridge, Other
- K11:K14: Moment Frame, Braced Frame, Simple Span, Other

---

## Sheet 2: Fabrication

| Item | Status | Notes |
|------|--------|-------|
| **Material pricing by weight (lb) NOT length** | ❌ MISSING | **CRITICAL:** Still using LF (linear feet) pricing. Example: W36x300 at $4.25/LF instead of $0.48/lb |
| Category organization with subtotals | ⚠️ PARTIAL | Categories exist (STRUCTURAL BEAMS, HSS COLUMNS, etc.) but no visible subtotal rows between categories |
| Plate pricing by SF weight | ❌ MISSING | Not verified in sample - plate category not examined |
| Decking pricing by square (100 SF) | ❌ MISSING | Not verified in sample - decking pricing not examined |
| Add joist category | ❌ MISSING | No joist category found in first 30 rows |
| Detailing included in fabrication | ⚠️ PARTIAL | Engineering line exists at row 76 but detailing not explicitly found |
| Freight calculation by mile | ❌ MISSING | Freight rows exist (70-71) but use per-load pricing, not per-mile |
| Engineering calculations | ⚠️ PARTIAL | Engineering/Certification line at row 76 |

**CRITICAL ISSUE - Material Pricing:**
- Current: `=F2*H2` where F2=Qty (LF), H2=$/LF
- Required: Should be `=G2*F2*$per_lb` where G2=Weight (lb/ft)
- Example: W36x300 weighs 300 lb/ft. At $0.48/lb = $144/ft (not $4.25)

**MARKUP ISSUE:**
- Every row has 15% markup applied in column N: `=M2*(1+N2)`
- This markup is then referenced in Summary sheet which applies ANOTHER markup
- **This is the triple-markup problem Leo identified**

---

## Sheet 3: Erection

| Item | Status | Notes |
|------|--------|-------|
| **Hours calculation - crew size factoring** | ❌ MISSING | **CRITICAL:** Formula is `=E*G` (Qty * Hrs/Unit) but should be `=E*F*G` (Qty * Crew * Hrs/Unit) |
| Formatting - Rate, equipment, subtotal | ⚠️ PARTIAL | Rates show as plain numbers (45, 65) not accounting format |
| Delete data → format → re-enter | ❌ MISSING | Formatting not corrected per Leo's fix method |

**CRITICAL ISSUE - Hours Calculation:**
- Current formula (H2): `=E2*G2` (Qty × Hrs/Unit)
- Should be: `=E2*F2*G2` (Qty × Crew × Hrs/Unit)
- Example: Site Mobilization with 4 crew should be 1 × 4 × 8 = 32 hours, not 8 hours

**MARKUP ISSUE:**
- Every row has 12% markup applied in column N: `=L2*(1+M2)`
- This feeds into Summary sheet which applies ANOTHER markup

---

## Sheet 4: Summary

| Item | Status | Notes |
|------|--------|-------|
| **Structural Steel Materials - cell reference** | ❌ MISSING | **CRITICAL:** References O77 which is EMPTY/None |
| **Markup in fabrication takeoff** | ❌ MISSING | **CRITICAL:** Markup still applied in Fabrication sheet (15% per row) |
| **Markup in summary** | ❌ MISSING | **CRITICAL:** Summary applies 15% markup again (C5) |
| **Markup in Overhead & Profit** | ❌ MISSING | **CRITICAL:** O&P applies overhead/profit/contingency/bond percentages |
| **Correct approach - markup ONLY in O&P** | ❌ MISSING | Markup is applied at Fabrication → Summary → O&P (3 times!) |
| Fabrication subtotal - wrong cell reference | ❌ MISSING | B8 references B5 which gets data from non-existent O77 |
| Erection - wrong cell reference | ❌ MISSING | B11 references N32 which is EMPTY/None |
| Bond default to 0% | ❌ MISSING | Bond is 1% (B21 formula: `=B15*0.01`) |
| Retainage default to 0% | ✅ IMPLEMENTED | Retainage not found in Summary (may not be implemented) |
| Cell references for Project Setup changes | ⚠️ PARTIAL | B27 references D12, B29 references D13 - but Project Setup layout wasn't changed |

**CRITICAL CELL REFERENCE ERRORS:**
```
B5: ='2-Fabrication'!O77    ← O77 is EMPTY (None)
B11: ='3-Erection'!N32      ← N32 is EMPTY (None)
```

**TRIPLE MARKUP ANALYSIS:**
1. **Fabrication sheet:** Each row has 15% markup (column N)
2. **Summary sheet:** B5 references fabricated total, then D5 applies another 15%
3. **Overhead & Profit:** B18-B21 apply additional percentages (15% + 12% + 5% + 1%)

**Correct approach per Leo:**
- Fabrication sheet: NO markup (just raw costs)
- Erection sheet: NO markup (just raw costs)
- Summary sheet: NO markup on line items
- ONLY apply markup in Overhead & Profit section

---

## Critical Issues Summary

### 1. Triple Markup Application ❌
**Status:** NOT FIXED
- Fabrication: 15% per line item
- Summary: 15% on fabrication, 12% on erection
- O&P: 15% + 12% + 5% + 1% = 33%
- **Effective markup: ~73% instead of intended ~33%**

### 2. Material Pricing by Weight ❌
**Status:** NOT FIXED
- Still using LF (linear foot) pricing
- Should use lb pricing × weight per foot
- Complete recalculation needed

### 3. Crew Size Not in Hours Calculation ❌
**Status:** NOT FIXED
- Formula: `Qty × Hrs/Unit`
- Should be: `Qty × Crew × Hrs/Unit`
- Erection hours are undercalculated

### 4. Wrong Cell References ❌
**Status:** NOT FIXED
- Summary B5 → O77 (empty)
- Summary B11 → N32 (empty)
- Summary calculations will fail

### 5. Dropdowns Exist ✅
**Status:** IMPLEMENTED
- Building Type: B12 with validation
- Structure Type: B13 with validation

### 6. Currency Formatting ⚠️
**Status:** PARTIAL
- Project Setup: Accounting format ✅
- Fabrication: General format ❌
- Erection: General format ❌
- Summary: Currency format ✅

---

## Recommendations

1. **Fix cell references first** - Update Summary B5 to reference correct Fabrication total cell
2. **Remove markup from Fabrication** - Delete column N formulas, keep only raw costs
3. **Remove markup from Erection** - Delete column M formulas, keep only raw costs
4. **Remove markup from Summary line items** - Set C5, C11, C12 to 0%
5. **Fix material pricing** - Change from LF to lb-based calculations
6. **Fix hours calculation** - Add crew size multiplier to erection hours
7. **Standardize currency formatting** - Apply accounting format to all currency cells
8. **Add missing categories** - Joists, proper plate/decking pricing

---

## Conclusion

**The spreadsheet has NOT been properly adjusted per Leo Flynn's feedback.**

The most critical issues remain unfixed:
- Triple markup will cause massive overpricing
- Wrong cell references will cause calculation failures
- Material pricing methodology is incorrect
- Erection hours are significantly undercalculated

**This estimator should NOT be used for real projects until these issues are resolved.**
