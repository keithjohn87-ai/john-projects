# Chunk 1 Fix Notes - Cell Reference Corrections

**Date:** March 10, 2026
**File:** CHUNK_1_FIXED.xlsx
**Source:** Leo_Adjusted_Steel_Estimator_v2.xlsx

---

## Issues Fixed

### 1. Summary Sheet B5 - Wrong Cell Reference (CRITICAL)

**Problem:**
- Cell B5 (Structural Steel Materials) referenced `'2-Fabrication'!O77`
- Cell O77 in the Fabrication sheet is **empty/None**
- This caused broken calculations

**Solution:**
- Changed reference from `'2-Fabrication'!O77` to `'2-Fabrication'!O78`
- Cell O78 contains the actual total formula: `=SUM(O2:O76)`

**Before:**
```
B5: ='2-Fabrication'!O77  (points to empty cell)
```

**After:**
```
B5: ='2-Fabrication'!O78  (points to actual total)
```

---

### 2. Summary Sheet B11 - Wrong Cell Reference (CRITICAL)

**Problem:**
- Cell B11 (Erection Labor) referenced `'3-Erection'!N32`
- Cell N32 in the Erection sheet is **empty/None**
- This caused broken calculations

**Solution:**
- Changed reference from `'3-Erection'!N32` to `'3-Erection'!N33`
- Cell N33 contains the actual total formula: `=SUM(N2:N31)`

**Before:**
```
B11: ='3-Erection'!N32  (points to empty cell)
```

**After:**
```
B11: ='3-Erection'!N33  (points to actual total)
```

---

### 3. Summary Sheet B8 - Fabrication Subtotal (ANALYZED)

**Current State:**
- Cell B8 (Fabrication Subtotal) has formula `=B5`
- This is actually **correct** for the current structure

**Why it's correct:**
- B5 = Structural Steel Materials (calculated value)
- B6 = "Included" (text - Freight/Shipping)
- B7 = "Included" (text - Subcontractors)
- B8 = Fabrication Subtotal

Since B6 and B7 contain text ("Included") rather than numeric values, B8 = B5 is the appropriate formula. When B6 and B7 are updated to actual calculated values in future chunks, this formula should be updated to `=SUM(B5:B7)`.

**Recommendation for future chunks:**
When Freight/Shipping and Subcontractors are given actual calculated values (not "Included" text), update B8 to:
```
B8: =SUM(B5:B7)
```

---

## Verification Results

### Formula Check
- ✅ B5 now references `'2-Fabrication'!O78` (correct total cell)
- ✅ B11 now references `'3-Erection'!N33` (correct total cell)
- ✅ B8 maintains `=B5` (correct for current structure)
- ✅ No #REF! errors found
- ✅ No #VALUE! errors found
- ✅ No #DIV/0! errors found

### Target Cells Verified
- ✅ Fabrication O78 contains: `=SUM(O2:O76)`
- ✅ Erection N33 contains: `=SUM(N2:N31)`

---

## Files Created

1. **CHUNK_1_FIXED.xlsx** - Excel file with corrected cell references
2. **CHUNK_1_NOTES.md** - This documentation file

---

## Next Steps (Chunk 2)

The next chunk should address:
1. **Remove triple markup** - Markup is currently applied at:
   - Line item level (Fabrication N2:N76 has 15%, Erection M2:M31 has 12%)
   - Summary sheet applies markup again in O&P section
   - This results in double/triple markup
   
   **Fix:** Set markup percentages to 0% in line items, keep only in O&P section

---

## Notes

- The cell reference errors were causing the Summary sheet to pull from empty cells
- This fix ensures the Summary sheet correctly references the totals from Fabrication and Erection sheets
- The formulas are now syntactically correct and reference existing cells
- Actual calculated values will appear when the file is opened in Excel
