# Steel Estimator Spreadsheet - Changes Made

**Date:** March 9, 2026  
**Source File:** `Leo_Adjusted_Steel_Estimator.xlsx`  
**Output File:** `Enterprise_Steel_Estimator_FIXED.xlsx`

---

## CRITICAL FIXES

### 1. Fixed Triple Markup Issue (Summary Sheet)

**Problem:** Markup was being applied at multiple levels:
- 15% markup on each Fabrication line item
- 12% markup on each Erection line item  
- 33% markup in Overhead & Profit section

**Solution:**
- ✅ Removed 15% markup from all Fabrication line items (column N cleared)
- ✅ Removed 12% markup from all Erection line items (column M cleared)
- ✅ Kept markup ONLY in Overhead & Profit section (33% total)
- ✅ Flow: Raw Costs → O&P Markup → Final Price (single markup application)

**Formulas Updated:**
- Fabrication Total column (O): Changed from `=M{row}*(1+N{row})` to `=M{row}`
- Erection Total column (N): Changed from `=L{row}*(1+M{row})` to `=L{row}`

---

### 2. Fixed Material Pricing (Fabrication Sheet)

**Problem:** Material pricing was based on $/LF (per linear foot) instead of $/lb (per pound)

**Solution:**
- ✅ Changed pricing formula from $/LF to **$0.48/lb**
- ✅ Updated all material line items:
  - **W36x300 beam example:** 300 lb × $0.48 = **$144/lb** (was $4.25/LF)
  - All beams, columns, and miscellaneous items updated
- ✅ Changed unit designation from "LF" to "LB" for applicable items

**Items Updated:**
- Structural Beams (W36 through W6): 20 line items
- HSS Columns: 9 line items
- Connection Plates: 6 line items
- Miscellaneous (Angles, Channels, Flat Bar): 5 line items

---

### 3. Fixed Cell References (Summary Sheet)

**Problem:** Cell references needed verification and markup removal

**Solution:**
- ✅ **B5** (Structural Steel Materials): References `'2-Fabrication'!O77` (Fabrication total)
- ✅ **B11** (Erection Labor): References `'3-Erection'!N32` (Erection total)
- ✅ **C5, C11, C12:** Cleared markup percentages
- ✅ **D5, D11, D12:** Updated to `=B5`, `=B11`, `=B12` (no markup)
- ✅ Verified all `=SUM()` formulas pull from correct cells

---

### 4. Fixed Crew Size in Hours Calculation (Erection Sheet)

**Problem:** Total Hours formula was missing Crew Size multiplier

**Before:** `Total Hours = Qty × Hrs/Unit`  
**After:** `Total Hours = Qty × Crew Size × Hrs/Unit`

**Solution:**
- ✅ Updated column H (Total Hrs) formula from `=E{row}*G{row}` to `=E{row}*F{row}*G{row}`
- ✅ This significantly affects labor cost calculations
- ✅ All 30 erection line items updated

**Example Impact:**
- Site Mobilization: Qty=1, Crew=4, Hrs/Unit=8
- Before: 1 × 8 = 8 hours
- After: 1 × 4 × 8 = **32 hours**

---

## SECONDARY FIXES

### 5. Added Missing Categories (Fabrication Sheet)

**Joist Category (3 new line items):**
- F-021: K Series Joists - $7.20/lb (15 lb/ft × $0.48)
- F-022: LH Series Joists - $12.00/lb (25 lb/ft × $0.48)
- F-023: Joist Girders - $21.60/lb (45 lb/ft × $0.48)

**Detailing Line Item:**
- F-076: Shop Drawings/Detailing - $75/ton

**Engineering Calculations:**
- F-077: Engineering Calculations with PE Stamp - $2,500/job

---

### 6. Fixed Freight Calculation (Fabrication Sheet)

**Problem:** Freight was flat rate per load

**Solution:**
- ✅ Added **Miles** column (column P)
- ✅ Added **Rate/Mile** column (column Q) - default $2.50/mile
- ✅ Added **Freight Cost** column (column R) - formula: `=Miles×Rate/Mile`
- ✅ Updated Material Cost to reference Freight Cost column

**Freight Categories:**
- Freight - Local
- Freight - Regional
- Freight - Long Distance
- Oversize/Permit Loads

---

### 7. Fixed Pricing Units (Fabrication Sheet)

**Plates:**
- ✅ Changed from "EA" (each) to "SF" (square foot)
- Pricing still based on weight ($/lb)

**Steel Decking:**
- ✅ Changed from "SF" (square foot) to "SQ" (per 100 SF)
- ✅ Prices adjusted accordingly (×100)
- Categories: B Roof Deck, N Floor Deck, Cellular Deck

---

## VERIFICATION

### Formula Validation
All formulas have been verified:
- ✅ No #REF! errors
- ✅ No #VALUE! errors
- ✅ All cell references resolve correctly

### Test Data Example
For a project with:
- 10 tons of steel
- 500 miles freight
- 3-person crew

The calculations now properly account for:
1. Material costs at $0.48/lb
2. Labor hours with crew size multiplier
3. Freight at $2.50/mile
4. Single 33% markup in O&P section

---

## SUMMARY OF CHANGES

| Fix | Description | Status |
|-----|-------------|--------|
| 1 | Triple markup removed | ✅ Complete |
| 2 | Material pricing $/LF → $/lb | ✅ Complete |
| 3 | Cell references verified | ✅ Complete |
| 4 | Crew size in hours calculation | ✅ Complete |
| 5 | Added Joist, Detailing, Engineering | ✅ Complete |
| 6 | Per-mile freight calculation | ✅ Complete |
| 7 | Plate and Decking units fixed | ✅ Complete |

---

**Total Line Items Modified:** 75+  
**New Line Items Added:** 5  
**Formulas Updated:** 100+

**File Ready for Use:** `Enterprise_Steel_Estimator_FIXED.xlsx`
