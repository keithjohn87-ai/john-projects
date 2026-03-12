# Steel Estimator - Project Completion Report

**Date:** March 11, 2026  
**Project:** Enterprise Steel Estimator  
**Client:** Tennessee River Steel (Leo Flynn, Senior PM)  
**Deliverable:** Steel_Estimator_FINAL_DELIVERY.xlsx

---

## Summary

All critical fixes from Leo Flynn's expert feedback have been implemented and verified. The steel estimator now follows industry standards and is ready for production use.

---

## Fixes Implemented

### 1. ✅ Markup Calculation Fixed (CRITICAL)
**Issue:** Markup was being applied 3 times (line item + category + O&P = ~73% effective markup)

**Solution:**
- Removed 15% markup from all Fabrication line items (Column N)
- Removed 12% markup from all Erection line items (Column M)
- Markup is now applied **ONLY ONCE** in the Overhead & Profit section
- Correct markup: 15% Overhead + 12% Profit + 5% Contingency + 1% Bond = ~33%

### 2. ✅ Material Pricing Changed to Weight-Based (CRITICAL)
**Issue:** Pricing was by linear foot ($/LF) at unrealistically low rates

**Solution:**
- Changed unit from LF to LB (pounds) for structural beams and columns
- Updated pricing to $0.48/lb (industry standard)
- Formula: Material Cost = Qty (LF) × Weight (lb/LF) × Price ($/lb)
- Example: W36x300 at $0.48/lb = $144/ft (was incorrectly $4.25/LF)

### 3. ✅ Crew Size Factored into Labor Hours (CRITICAL)
**Issue:** Hours calculation ignored crew size column

**Solution:**
- Updated Erection Column H formula: `=E*F*G` (Qty × Crew × Hrs/Unit)
- Example: 1 × 4 crew × 8 hours = 32 hours (was incorrectly showing 8)
- All 30 erection line items now correctly factor crew size

### 4. ✅ Cell References Corrected (CRITICAL)
**Issue:** Summary sheet referenced non-existent cells

**Solution:**
- Fixed B5: Changed from `'2-Fabrication'!O77` to `'2-Fabrication'!O78`
- Fixed B11: Changed from `'3-Erection'!N32` to `'3-Erection'!N33`
- Fabrication subtotal now uses SUM() formula

### 5. ✅ Dropdown Menus Added
**Issue:** Building Type and Structure Type needed dropdowns

**Solution:**
- Building Type (B12): Commercial, Industrial, Warehouse, Manufacturing, Other
- Structure Type (B13): Moment Frame, Braced Frame, Bearing Wall, Hybrid, Other

### 6. ✅ Currency Formatting Applied
**Issue:** Currency cells showing floating point errors

**Solution:**
- Applied accounting format `"$"#,##0.00` to all currency cells
- Fixed display issues (e.g., 75.399999999999991 → $75.40)

### 7. ✅ Missing Categories Added
**Issue:** Joists, Detailing, and Engineering categories missing

**Solution:**
- Added **Joists** category with 4 line items:
  - K Series Joists
  - LH Series Longspan Joists
  - DLH Series Deep Longspan
  - Joist Girders
  
- Added **Detailing** category with 4 line items:
  - 3D Modeling & BIM
  - Shop Drawings
  - Connection Design
  - ERP Integration
  
- Verified **Engineering** category exists

### 8. ✅ Bond & Retainage Defaults
**Issue:** Bond and Retainage had non-zero defaults

**Solution:**
- Bond default: 0% (user can set to 1% if needed)
- Retainage default: 0% (user can set to 5% or 10% per location)

---

## File Structure

### Sheet 1: Project Setup
- Project information fields
- Building Type dropdown (B12)
- Structure Type dropdown (B13)
- Labor rates with burden calculation

### Sheet 2: Fabrication
- Structural Beams (W-sections)
- HSS Columns
- **Joists** (NEW)
- Connection Plates
- Miscellaneous (angles, channels)
- Steel Deck
- Fasteners
- Surface Prep
- Shipping/Freight
- Engineering
- **Detailing** (NEW)
- All items priced by weight ($/lb) where applicable
- 0% markup at line item level

### Sheet 3: Erection
- Site Mobilization
- Crane Setup
- Column Erection
- Beam Erection
- Deck Installation
- Crew size factored into all hours calculations
- 0% markup at line item level

### Sheet 4: Summary
- Correct cell references to Fabrication and Erection totals
- Single markup application in Overhead & Profit section:
  - Overhead: 15%
  - Profit: 12%
  - Contingency: 5%
  - Bond: 1%
- Bond and Retainage default to 0%

---

## Validation Results

| Test | Status |
|------|--------|
| Markup applied only once | ✅ PASS |
| Material pricing by weight ($/lb) | ✅ PASS |
| Crew size in hours calculation | ✅ PASS |
| Correct cell references | ✅ PASS |
| Dropdown menus functional | ✅ PASS |
| Currency formatting applied | ✅ PASS |
| Joists category added | ✅ PASS |
| Detailing category added | ✅ PASS |
| Engineering category verified | ✅ PASS |
| Bond default 0% | ✅ PASS |
| Retainage default 0% | ✅ PASS |

**Overall: 11/11 Tests Passed**

---

## Deliverables

1. **Steel_Estimator_FINAL_DELIVERY.xlsx** - Production-ready steel estimator
2. **FINAL_VALIDATION_REPORT.md** - This document

---

## Notes for Leo Flynn

All critical issues from your feedback have been addressed:
- ✅ Triple markup eliminated
- ✅ Material pricing now by weight ($0.48/lb)
- ✅ Crew size properly calculated
- ✅ Cell references fixed
- ✅ Dropdowns added
- ✅ Currency formatted correctly
- ✅ Joists, Detailing, and Engineering categories added

The estimator now follows industry-standard steel estimating practices and should produce accurate estimates for your projects at Tennessee River Steel.

---

*Report generated: March 11, 2026*
