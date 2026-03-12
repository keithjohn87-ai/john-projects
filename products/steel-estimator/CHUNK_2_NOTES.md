# Chunk 2 Fix Notes - Triple Markup Removal

## Date: March 10, 2026

## Issue Summary
The Steel Estimator was applying markup **three times**, resulting in ~73% effective markup instead of the intended ~33%:

1. **Line item level in Fabrication** (15% in column N)
2. **Line item level in Erection** (12% in column M)
3. **Again in Summary Overhead & Profit section** (15% overhead + 12% profit + 5% contingency + 1% bond)

## Changes Made

### 1. Fabrication Sheet (2-Fabrication)
- **Column N (Markup %)** - Set N2:N76 from `15%` to `0%`
- **Rows affected:** 74 line items
- **Impact:** Raw material costs now pass through without markup at line item level

### 2. Erection Sheet (3-Erection)
- **Column M (Markup %)** - Set M2:M31 from `12%` to `0%`
- **Rows affected:** 30 line items
- **Impact:** Raw labor/equipment costs now pass through without markup at line item level

### 3. Summary Sheet (4-Summary)
- **C5 (Fabrication markup)** - Changed from `15%` to `0%`
- **C11 (Labor markup)** - Changed from `12%` to `0%`
- **C12 (Equipment markup)** - Changed from `12%` to `0%`
- **Impact:** Summary now receives raw costs from fabrication and erection sheets

## Result

### Before Fix (Triple Markup)
```
Line Item → +15% → Subtotal → +15% → Summary → +33% (O&P) = ~73% total markup
```

### After Fix (Single Markup)
```
Line Item → 0% → Subtotal → 0% → Summary → +33% (O&P) = ~33% total markup
```

## Markup Location
Markup is now applied **ONLY** in the Overhead & Profit section (rows 18-22):
- Overhead: 15%
- Profit: 12%
- Contingency: 5%
- Bond: 1%
- **Total O&P: 33%**

## Verification
- [x] Fabrication column N shows 0% for all line items
- [x] Erection column M shows 0% for all line items
- [x] Summary cells C5, C11, C12 show 0%
- [x] Overhead & Profit section unchanged (rows 18-22)
- [x] Raw totals flow correctly to Summary

## Files
- **Input:** CHUNK_1_FIXED.xlsx
- **Output:** CHUNK_2_FIXED.xlsx
- **Documentation:** CHUNK_2_NOTES.md (this file)
