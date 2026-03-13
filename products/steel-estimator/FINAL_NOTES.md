# Final Steel Estimator - Completion Notes

## Date: March 10, 2026

## Project Overview

Completed all fixes for the Enterprise Steel Estimator based on expert feedback from Leo Flynn (Tennessee River Steel).

## Chunks Completed

### Chunk 1: Fix Cell References ✅
- Fixed Summary B5 reference from `'2-Fabrication'!O77` to `'2-Fabrication'!O78`
- Fixed Summary B11 reference from `'3-Erection'!N32` to `'3-Erection'!N33`
- Updated Fabrication subtotal formula to use SUM()

### Chunk 2: Remove Triple Markup ✅
- Set Fabrication markup (Column N) to 0% for all line items
- Set Erection markup (Column M) to 0% for all line items
- Markup now only applied in Overhead & Profit section of Summary

### Chunk 3: Material Pricing to $/lb ✅
- Changed unit from LF to LB for beams/columns
- Updated prices to $/lb ($0.48/lb for standard beams)
- Formula: Material Cost = Qty (LF) × Weight (lb/LF) × Price ($/lb)

### Chunk 4: Crew Size in Hours Calculation ✅
- Updated Erection Column H formula to: `E*F*G` (Qty × Crew × Hrs/Unit)
- Example: 1 × 4 × 8 = 32 hours (was incorrectly showing 8)

### Chunk 5: Dropdown Verification ✅
- **Building Type (B12)**: Commercial, Industrial, Warehouse, Manufacturing, Other
- **Structure Type (B13)**: Moment Frame, Braced Frame, Bearing Wall, Hybrid, Other
- Updated dropdown source cells (J11:J15 and K11:K15)

### Chunk 6: Currency Formatting ✅
- Applied accounting format to all currency cells
- Format: `"$"#,##0.00`
- Fixed floating point display issues

## Additional Fixes (Already Completed)

- Joist category added to Fabrication
- Detailing pricing added
- Engineering calculations for miscellaneous and connections
- Freight calculation (by mile)
- Plate pricing (by SF weight)
- Decking pricing (by square/100 SF)

## Files Delivered

1. **Enterprise_Steel_Estimator_FINAL.xlsx** - Final production file
2. **CHUNK_5_NOTES.md** - Dropdown verification notes
3. **CHUNK_6_NOTES.md** - Currency formatting notes
4. **FINAL_NOTES.md** - This file
5. **VALIDATION_REPORT.md** - Testing and validation results

## Testing Summary

All formulas tested and verified:
- Cell references resolve correctly
- No #REF! or #VALUE! errors
- Dropdowns functional
- Currency formatting applied consistently
- Calculations produce expected results

## Output File
- Enterprise_Steel_Estimator_FINAL.xlsx
