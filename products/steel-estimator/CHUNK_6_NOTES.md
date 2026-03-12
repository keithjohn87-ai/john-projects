# Chunk 6: Currency Formatting Notes

## Date: March 10, 2026

## Changes Made

Applied accounting format (`"$"#,##0.00`) to all currency cells across all sheets:

### 1-Project Setup Sheet
- **B20:D27** - Labor rate cells (Base Rate, Burden %, Total Rate)

### 2-Fabrication Sheet
- **H2:H78** - Material $/Unit column
- **I2:I78** - Material Cost column
- **K2:K78** - Labor Rate column
- **L2:L78** - Labor Cost column
- **M2:M78** - Subtotal column
- **O2:O78** - Total with markup column

### 3-Erection Sheet
- **I2:I33** - Rate column
- **J2:J33** - Labor Cost column
- **K2:K33** - Equipment column
- **L2:L33** - Subtotal column
- **N2:N33** - Total column

### 4-Summary Sheet
- **B4:B39** - Subtotal column
- **D4:D39** - Total column
- **B28** - Price per Ton (metric)
- **B30** - Price per SF (metric)

## Purpose

This formatting:
- Displays all monetary values with the $ symbol
- Uses comma separators for thousands
- Shows 2 decimal places for cents
- Fixes floating point display issues (e.g., 75.399999999999991 becomes $75.40)

## Verification

- ✅ All currency cells formatted consistently
- ✅ Format string: `"$"#,##0.00`
- ✅ No floating point display errors
- ✅ All formulas continue to work correctly

## Output File
- CHUNK_6_FIXED.xlsx
