# EXCEL CONVERSION GUIDE
## CSV to Excel Workbook

Your estimating spreadsheet is provided in CSV format for maximum compatibility. Follow these steps to convert it to a full Excel workbook with formatting and formulas.

---

## OPTION 1: MICROSOFT EXCEL (Recommended)

### Step 1: Import the CSV
1. Open Microsoft Excel
2. Go to **Data** → **From Text/CSV**
3. Select `alabama-steel-estimator.csv`
4. Click **Import**
5. In the preview window, ensure:
   - File Origin: **65001: Unicode (UTF-8)**
   - Delimiter: **Comma**
   - Data Type Detection: **Based on first 200 rows**
6. Click **Load**

### Step 2: Create Separate Sheets
The CSV contains multiple sections. Create a workbook with these sheets:

**Sheet 1: Project_Info**
- Copy rows 1-10 (PROJECT INFO section)
- Format as table

**Sheet 2: Materials**
- Copy rows 13-25 (MATERIALS section)
- Add formulas:
  - Extension = Quantity × Unit Cost
  - Total with Adders = Extension + (Extension × Waste%) + (Extension × Freight%) + (Extension × Tax%)

**Sheet 3: Labor_Rates**
- Copy rows 28-32 (LABOR RATES section)
- Add formula: Total Rate = Base Wage × (1 + Burden%)

**Sheet 4: Labor_Estimate**
- Copy rows 35-43 (LABOR ESTIMATE section)
- Add formula: Cost = Hours × Rate

**Sheet 5: Equipment**
- Copy rows 46-53 (EQUIPMENT section)
- Add formula: Cost = Days × Rate

**Sheet 6: Subcontractors**
- Copy rows 56-61 (SUBCONTRACTORS section)

**Sheet 7: Cost_Summary**
- Copy rows 64-76 (COST SUMMARY section)
- Add SUM formulas for totals
- Add formula: Profit = Cost Before Profit × Profit%

**Sheet 8: Proposal_Calc**
- Link key totals from other sheets
- Auto-populate proposal template

### Step 3: Add Formatting
- Header row: Bold, shaded background
- Currency columns: Accounting format ($#,##0.00)
- Percentage columns: Percentage format (0.00%)
- Add borders to tables
- Freeze top row for scrolling

### Step 4: Save
**File → Save As → Excel Workbook (.xlsx)**

---

## OPTION 2: GOOGLE SHEETS (Free Alternative)

### Step 1: Import
1. Go to https://sheets.google.com
2. Create new spreadsheet
3. **File** → **Import**
4. Upload `alabama-steel-estimator.csv`
5. Import action: **Replace spreadsheet**
6. Separator type: **Comma**
7. Click **Import data**

### Step 2: Organize into Sheets
Right-click sheet tab → **Duplicate** to create multiple sheets
Copy/paste relevant sections to each sheet

### Step 3: Add Formulas
Same formulas as Excel (Google Sheets uses identical syntax)

---

## FORMULA REFERENCE

### Basic Formulas
```excel
=SUM(A1:A10)                    # Add range
=A1*B1                          # Multiply
=A1*(1+B1)                      # Add percentage
=SUM(A1:A10)*0.15               # Sum then multiply
```

### Key Formulas for This Spreadsheet

**Material Extension:**
```excel
=C2*D2  # Quantity × Unit Cost
```

**Total with Adders:**
```excel
=E2+(E2*F2)+(E2*G2)+(E2*H2)  # Extension + Waste + Freight + Tax
```

**Labor Cost:**
```excel
=C2*D2  # Hours × Rate
```

**Profit Calculation:**
```excel
=F77*0.15  # Cost Before Profit × 15%
```

---

## TROUBLESHOOTING

### Issue: Numbers formatted as text
**Fix:** Select column → Data → Text to Columns → Finish

### Issue: Currency showing as numbers
**Fix:** Select cells → Format → Number → Currency

### Issue: CSV opens in wrong program
**Fix:** Right-click CSV → Open With → Excel (or Google Chrome for Sheets)

### Issue: Formulas not calculating
**Fix:** File → Options → Formulas → Calculation Options → Automatic

---

## RECOMMENDED EXCEL FEATURES TO ADD

Once converted, consider adding:

### Data Validation
- Dropdown lists for crew roles
- Date pickers for project dates
- Number limits (no negative quantities)

### Conditional Formatting
- Red if profit margin < 10%
- Yellow if labor hours exceed estimate
- Green if on target

### Named Ranges
- `Material_Total` = sum of materials
- `Labor_Total` = sum of labor
- `Grand_Total` = final bid amount

### Print Area
- Set print area for clean proposal output

---

## SAMPLE WORKBOOK STRUCTURE

```
Alabama-Steel-Estimator.xlsx
│
├── Project_Info (input fields)
├── Materials (auto-calculated costs)
├── Labor_Rates (company-specific rates)
├── Labor_Estimate (hours by task)
├── Equipment (rental costs)
├── Subcontractors (other costs)
├── Cost_Summary (totals and profit)
└── Proposal_Calc (linked to proposal template)
```

---

## NEED HELP?

**Excel Questions:**  
Microsoft Support: https://support.microsoft.com/excel

**Google Sheets Questions:**  
Google Support: https://support.google.com/docs

**TradeElegance Support:**  
support@tradeelegance.com

---

*This guide ensures you can use the CSV data in any spreadsheet program. Full Excel workbook with pre-built formulas available in the complete TradeElegance package.*