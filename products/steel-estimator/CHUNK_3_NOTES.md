# Chunk 3: Material Pricing Fix - Documentation

## Summary
Changed material pricing in the Fabrication sheet from **$/LF (per linear foot)** to **$/lb (per pound)** to match industry standards.

## Problem
The original pricing was unrealistically low because it was priced by linear foot instead of by weight:
- W36x300 at $4.25/LF = WRONG (should be ~$144/ft)
- W36x230 at $3.85/LF = WRONG (should be ~$110/ft)

## Solution
Implemented weight-based pricing using the formula:
```
Material Cost = Qty (LF) × Weight (lb/LF) × Price ($/lb)
```

## Changes Made

### Sheet: 2-Fabrication (sheet2.xml)

#### Rows Modified: 2-30 (Structural Beams and HSS Columns)

| Column | Header | Change | Details |
|--------|--------|--------|---------|
| E | Unit | LF → LB | Changed unit from linear feet to pounds |
| H | Material $/Unit | Varies → $0.48 | Standard steel price per pound |
| I | Material Cost | Formula updated | Now calculates F × G × H |

#### Specific Changes:

**Structural Beams (Rows 2-21):**
- W36x300 through W6x25
- All units changed from "LF" to "LB"
- All prices changed to $0.48/lb
- Formulas changed from `F*H` to `F*G*H`

**HSS Columns (Rows 22-30):**
- HSS 12x12x5/8 through HSS 4x4x1/4
- All units changed from "LF" to "LB"
- All prices changed to $0.48/lb
- Formulas changed from `F*H` to `F*G*H`

**Items NOT Modified (correctly left as-is):**
- Connection Plates (EA - each)
- Gusset Plates (LB - already by weight)
- Angles (LF - priced per foot, not by beam weight)
- Channels (LF - priced per foot)
- Steel Deck (SF - square feet)
- Fasteners (EA - each)
- Welding materials (LB - already by weight)
- Surface prep (SF - square feet)
- Shipping (LOAD)
- Subcontractor items (TON, SF, JOB)

## Verification

### Leo's Examples:

**W36x300:**
- Weight: 300 lb/ft
- Price: $0.48/lb
- Cost per foot: 300 × $0.48 = **$144/ft** ✓

**W36x230:**
- Weight: 230 lb/ft
- Price: $0.48/lb
- Cost per foot: 230 × $0.48 = **$110.40/ft** (~$110/ft) ✓

### Formula Verification:

Example calculation for 10 LF of W36x300:
```
Material Cost = 10 LF × 300 lb/LF × $0.48/lb
              = 3,000 lb × $0.48/lb
              = $1,440
```

## Files Modified

1. **CHUNK_3_FIXED.xlsx** - Updated Excel file with weight-based pricing
2. **CHUNK_3_NOTES.md** - This documentation file

## Technical Details

The fix was applied by modifying `xl/worksheets/sheet2.xml`:
- Changed cell values in column E from "LF" to "LB"
- Changed cell values in column H to "0.48"
- Changed formulas in column I from `F{row}*H{row}` to `F{row}*G{row}*H{row}`

## Total Modifications: 87
- 29 rows × 3 changes each (Unit, Price, Formula) = 87 modifications

## Industry Standard Reference

Steel is typically priced by weight ($/lb) in the construction industry because:
1. Raw steel is purchased by weight from mills
2. Fabrication costs correlate with material weight
3. Shipping costs are based on weight
4. It provides consistent pricing across different beam sizes

Standard structural steel pricing: $0.45 - $0.55/lb (varies by market conditions)
This fix uses: $0.48/lb
