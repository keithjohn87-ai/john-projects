# Steel Estimator Fix Work Plan

**Project:** Enterprise Steel Estimator - Expert Feedback Implementation
**Source:** Leo Flynn (Tennessee River Steel)
**Date:** March 10, 2026

---

## Overview

This work plan breaks down the steel estimator fixes into small, testable chunks. Each chunk builds on the previous one, allowing for incremental validation.

---

## Chunk 1: Fix Cell References in Summary Sheet ✅ COMPLETE

**Priority:** Critical
**Difficulty:** Easy
**Files:** Leo_Adjusted_Steel_Estimator_v2.xlsx → CHUNK_1_FIXED.xlsx

### Issues to Fix:
1. **Summary B5** - Currently references `'2-Fabrication'!O77` (cell doesn't exist)
   - Should reference `'2-Fabrication'!O78` (actual total row)
   
2. **Summary B11** - Currently references `'3-Erection'!N32` (cell doesn't exist)
   - Should reference `'3-Erection'!N33` (actual total row)
   
3. **Fabrication subtotal formula** - Currently hard reference `B8 = B5`
   - Should use `=SUM()` formula
   - Remove any text from calculation cells

### Testing:
- Verify formulas calculate correctly
- Check for #REF! or #VALUE! errors
- Document changes in CHUNK_1_NOTES.md

---

## Chunk 2: Remove Triple Markup

**Priority:** Critical
**Difficulty:** Medium
**Files:** CHUNK_1_FIXED.xlsx → CHUNK_2_FIXED.xlsx

### Issues to Fix:
1. **Fabrication Sheet:** Remove markup from line items (Column N)
   - Set N2:N76 to 0% (currently 15%)
   - Keep raw totals only
   
2. **Erection Sheet:** Remove markup from line items (Column M)
   - Set M2:M31 to 0% (currently 12%)
   - Keep raw totals only
   
3. **Summary Sheet:** Keep markup ONLY in Overhead & Profit section
   - Verify no double/triple application

### Testing:
- Verify markup only applied once (in O&P)
- Check that raw totals are correct

---

## Chunk 3: Change Material Pricing to $/lb

**Priority:** Critical
**Difficulty:** Hard
**Files:** CHUNK_2_FIXED.xlsx → CHUNK_3_FIXED.xlsx

### Issues to Fix:
1. **Change Unit from LF to LB** for beams/columns
2. **Update prices to $/lb** (e.g., $0.48/lb for standard beams)
3. **Add Qty column** for linear feet
4. **Formula:** Material Cost = Qty (LF) × Weight (lb/LF) × Price ($/lb)

### Example from Leo:
- W36x300 at $0.48/lb = $144/ft (not $4.25)
- W36x230 at $0.48/lb = $110/ft (not $3.85)

### Testing:
- Verify material costs calculate correctly
- Compare against Leo's examples

---

## Chunk 4: Add Crew Size to Hours Calculation

**Priority:** Critical
**Difficulty:** Medium
**Files:** CHUNK_3_FIXED.xlsx → CHUNK_4_FIXED.xlsx

### Issues to Fix:
1. **Erection Sheet Column H (Total Hrs)**
   - Current formula: `E2*G2` (Qty × Hrs/Unit)
   - Should be: `E2*F2*G2` (Qty × Crew × Hrs/Unit)
   
2. **Example:** Row 2: E2=1, F2=4, G2=8 → Should be 32 hours (1×4×8), not 8

### Testing:
- Verify hours calculate correctly with crew size
- Check labor costs update properly

---

## Chunk 5: Add Dropdowns for Building/Structure Type

**Priority:** High
**Difficulty:** Easy
**Files:** CHUNK_4_FIXED.xlsx → CHUNK_5_FIXED.xlsx

### Issues to Fix:
1. **Building Type dropdown** (already implemented in Leo's file - verify)
2. **Structure Type dropdown** (already implemented in Leo's file - verify)
3. Ensure dropdowns are in correct cells

### Building Type Options:
- Commercial
- Industrial
- Warehouse
- Manufacturing
- Other

### Structure Type Options:
- Moment Frame
- Braced Frame
- Bearing Wall
- Hybrid
- Other

---

## Chunk 6: Format Currency Cells as Accounting

**Priority:** Medium
**Difficulty:** Easy
**Files:** CHUNK_5_FIXED.xlsx → CHUNK_6_FIXED.xlsx

### Issues to Fix:
1. **Base/Total Rate** in Project Setup - format as accounting
2. **Rate columns** in Erection sheet - format as accounting
3. **Equipment costs** - format as accounting
4. **Subtotals** - format as accounting
5. Fix floating point errors (e.g., 75.399999999999991)

### Testing:
- Verify all currency displays correctly
- Check for floating point issues

---

## Chunk 7: Add Missing Categories

**Priority:** High
**Difficulty:** Medium
**Files:** CHUNK_6_FIXED.xlsx → CHUNK_7_FIXED.xlsx

### Issues to Fix:
1. **Add Joist category** to Fabrication sheet
2. **Add Detailing** to Fabrication pricing
3. **Add Engineering** calculations for miscellaneous and connections
4. **Fix Freight calculation** - should be by mile, not flat rate
5. **Fix Plate pricing** - by SF weight, not EA
6. **Fix Decking pricing** - by square (100 SF), not SF

### Testing:
- Verify new categories calculate correctly
- Check subtotals include new categories

---

## Final Deliverable

After all chunks are complete:
- **Enterprise_Steel_Estimator_FINAL.xlsx**
- **FINAL_NOTES.md** documenting all changes
- **VALIDATION_REPORT.md** showing tests passed

---

## Progress Tracker

| Chunk | Status | File |
|-------|--------|------|
| 1 | ✅ Complete | CHUNK_1_FIXED.xlsx |
| 2 | ⏳ Pending | CHUNK_2_FIXED.xlsx |
| 3 | ⏳ Pending | CHUNK_3_FIXED.xlsx |
| 4 | ⏳ Pending | CHUNK_4_FIXED.xlsx |
| 5 | ⏳ Pending | CHUNK_5_FIXED.xlsx |
| 6 | ⏳ Pending | CHUNK_6_FIXED.xlsx |
| 7 | ⏳ Pending | CHUNK_7_FIXED.xlsx |

---

## Notes

- Save frequently after each chunk
- Test thoroughly before moving to next chunk
- Document any unexpected issues
- If a chunk fails, fix it before proceeding
