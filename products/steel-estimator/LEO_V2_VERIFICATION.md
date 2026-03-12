# Leo Flynn V2 Steel Estimator Verification Report

**Date:** March 10, 2026  
**File Reviewed:** Leo_Adjusted_Steel_Estimator_v2.xlsx  
**Reference:** EXPERT_FEEDBACK_LEO.md

---

## CRITICAL CHECKS

### 1. Triple Markup Issue ❌ NOT FIXED

**Leo's Requirement:** Markup should ONLY be in Overhead & Profit section (not in Fabrication, not in Erection)

**Current State:**
- **Fabrication Sheet:** Column N has 15% markup applied to every line item (N2:N76)
  - Formula: `O2: M2*(1+N2)` - markup applied at line item level
  - Total with markup in O78: `SUM(O2:O76)` = $605.89
- **Erection Sheet:** Column M has 12% markup applied to every line item (M2:M31)
  - Formula: `N2: L2*(1+M2)` - markup applied at line item level
  - Total with markup in N33: `SUM(N2:N31)` = $17,671.36
- **Summary Sheet:** References the already-marked-up totals and applies markup AGAIN
  - B5 references `'2-Fabrication'!O77` (already includes 15% markup)
  - D5 applies `(1+C5)` which is another 15% = **DOUBLE MARKUP on Fabrication**
  - B11 references `'3-Erection'!N32` (already includes 12% markup)
  - D11 applies `(1+C11)` which is another 12% = **DOUBLE MARKUP on Erection**
  - Then Overhead & Profit adds 15%+12%+5%+1% = **TRIPLE MARKUP**

**Status:** ❌ **MISSING** - Leo said he fixed this but markup is still applied at every level

---

### 2. Material Pricing by Weight ❌ NOT FIXED

**Leo's Requirement:** Material pricing should be by weight ($/lb), not by length ($/LF)

**Current State:**
- Column E (Unit) still shows "LF" (linear feet) for beams
- Column H (Material $/Unit) shows pricing like:
  - W36x300: $4.25/LF (should be ~$0.48/lb × 300 lb/ft = $144/ft)
  - W36x230: $3.85/LF (should be ~$0.48/lb × 230 lb/ft = $110/ft)
- Leo's example: W36x300 at $0.48/lb = $144/ft (not $4.25)
- The pricing is still by length at unrealistically low rates

**Status:** ❌ **MISSING** - Still priced by length ($/LF) not by weight ($/lb)

---

### 3. Cell References ❌ NOT FIXED

**Leo's Requirement:** Summary sheet should reference correct cells

**Current State:**
- B5 references `'2-Fabrication'!O77` - **CELL DOESN'T EXIST**
  - Fabrication totals are in row 78 (O78), not row 77
  - This reference is broken/wrong
- B11 references `'3-Erection'!N32` - **CELL DOESN'T EXIST**
  - Erection totals are in row 33 (N33), not row 32
  - This reference is broken/wrong

**Status:** ❌ **MISSING** - Cell references point to non-existent rows

---

### 4. Crew Size in Hours Calculation ❌ NOT FIXED

**Leo's Requirement:** Hours calculation must factor in crew size

**Current State:**
- Erection sheet has "Crew" column (F) and "Hrs/Unit" column (G)
- "Total Hrs" column (H) formula: `H2: E2*G2` (Qty × Hrs/Unit)
- **Crew size is NOT included in the calculation!**
- Correct formula should be: `Qty × Crew × Hrs/Unit`
- Example row 2: E2=1, F2=4, G2=8 → H2 shows 8 hours but should be 32 hours (1×4×8)

**Status:** ❌ **MISSING** - Crew size column exists but is not used in hours calculation

---

## SHEET-BY-SHEET VERIFICATION

### Sheet 1: Project Setup

| Item | Status | Notes |
|------|--------|-------|
| Title formatting (merge A1:E1) | ⚠️ PARTIAL | Title exists but not merged across columns |
| Column width adjustment | ❌ MISSING | Not adjusted |
| Project info spacing | ❌ MISSING | Address space not expanded |
| Building Type dropdown | ✅ IMPLEMENTED | J10:J15 has dropdown values (Commercial, Industrial, etc.) |
| Structure Type dropdown | ✅ IMPLEMENTED | K10:K14 has dropdown values (Moment Frame, Braced Frame, etc.) |
| Column layout (Weight/SF left, MPH right) | ❌ MISSING | Layout unchanged |
| Base/Total Rate accounting format | ⚠️ PARTIAL | Formatted but showing floating point errors (75.399999999999991) |
| Field Oversite → "Field Oversight" | ✅ IMPLEMENTED | E21 shows "Field Oversight" |
| Crew Lead capitalization | ✅ IMPLEMENTED | E22 shows "Crew Lead" |
| Burden sum formula | ❌ MISSING | D20 shows calculated value 79.75 but no formula visible |

---

### Sheet 2: Fabrication

| Item | Status | Notes |
|------|--------|-------|
| Material pricing by weight | ❌ MISSING | Still priced by LF, not $/lb |
| Category organization with subtotals | ❌ MISSING | No subtotals per category |
| Plate pricing by SF weight | ❌ MISSING | Plates (F-031 to F-036) priced by EA, not SF weight |
| Decking pricing by square (100 SF) | ❌ MISSING | Deck priced by SF, not by square |
| Joist category added | ❌ MISSING | No joist category found |
| Detailing included | ❌ MISSING | No detailing line items |
| Freight by mile | ❌ MISSING | Freight is flat rate per load (F-067 to F-070), not by mile |
| Engineering calculations | ❌ MISSING | No engineering calculations for misc/connections |

---

### Sheet 3: Erection

| Item | Status | Notes |
|------|--------|-------|
| Hours include crew size | ❌ MISSING | Formula is Qty × Hrs/Unit, missing Crew factor |
| Proper formatting | ⚠️ PARTIAL | Some formatting but Total Hrs showing 0 for many rows |
| Rate, equipment, subtotal format | ❌ MISSING | Labor Cost (J) showing 0 for most rows due to 0 hours |

**Erection Hours Analysis:**
- Row 2: H2 = 8 (should be 1×4×8 = 32)
- Row 3: H3 = 0 (Qty not entered)
- Row 4: H4 = 12 (should be 1×2×12 = 24)
- Most rows show H = 0 because the formula `E*G` produces 0 when Qty (E) is empty

---

### Sheet 4: Summary

| Item | Status | Notes |
|------|--------|-------|
| Correct cell references | ❌ MISSING | References O77 and N32 which don't exist (should be O78 and N33) |
| Single markup application | ❌ MISSING | Markup applied at Fabrication, Erection, AND O&P levels |
| Fabrication subtotal formula | ❌ MISSING | B8 = B5 (hard reference), not a sum formula |
| Bond default 0% | ❌ MISSING | Bond shown at 1% (B21: B15*0.01) |
| Retainage default 0% | ❌ MISSING | Retainage shown at 10% (B35) |
| Adjust for Project Setup changes | ❌ MISSING | Still references old cell structure |

---

## SUMMARY

### Critical Issues (Must Fix)

1. **❌ Triple Markup** - Markup applied 3 times (line item + category + O&P)
2. **❌ Material Pricing** - Still by length, not by weight
3. **❌ Cell References** - Point to non-existent cells
4. **❌ Crew Size** - Not factored into hours calculation

### Implementation Status

| Category | Implemented | Partial | Missing |
|----------|-------------|---------|---------|
| Project Setup | 4 | 2 | 5 |
| Fabrication | 0 | 0 | 7 |
| Erection | 0 | 1 | 2 |
| Summary | 0 | 0 | 6 |

### Overall Assessment

**❌ CANNOT USE AS BASELINE**

Leo's adjusted file has **NOT** implemented the critical fixes he specified:

1. The **triple markup** issue is still present - in fact, it's worse because the Summary sheet references already-marked-up values and applies markup again
2. **Material pricing** is still by linear foot at unrealistically low rates ($4.25/LF for W36x300 when it should be ~$144/LF at $0.48/lb)
3. **Cell references are broken** - pointing to rows that don't exist
4. **Crew size** column exists but isn't used in the hours calculation formula

**Recommendation:** Do NOT use Leo's file as the baseline. The original file would be easier to fix since Leo's version introduced new problems (broken cell references, incorrect formulas) while not fixing the original issues.

---

## SPECIFIC FIXES NEEDED

If proceeding with Leo's file:

1. **Fix Markup:**
   - Remove markup % from Fabrication line items (set N2:N76 to 0%)
   - Remove markup % from Erection line items (set M2:M31 to 0%)
   - Keep markup ONLY in Summary sheet O&P section

2. **Fix Material Pricing:**
   - Change Unit from LF to LB for beams/columns
   - Update prices to $/lb (e.g., $0.48/lb for standard beams)
   - Add Qty column for linear feet
   - Formula: Material Cost = Qty (LF) × Weight (lb/LF) × Price ($/lb)

3. **Fix Cell References:**
   - B5: Change `'2-Fabrication'!O77` to `'2-Fabrication'!O78`
   - B11: Change `'3-Erection'!N32` to `'3-Erection'!N33`

4. **Fix Hours Calculation:**
   - H2 formula: Change `E2*G2` to `E2*F2*G2` (Qty × Crew × Hrs/Unit)
   - Copy to all rows

5. **Fix Bond/Retainage Defaults:**
   - Set Bond to 0% (change B21 formula from `B15*0.01` to `0` or make user-input)
   - Set Retainage to 0% (change B35 from "10%" to "0%" or user-input)
