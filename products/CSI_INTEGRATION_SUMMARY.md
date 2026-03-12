# CSI MasterFormat Integration - ContractorPro Spreadsheets

## Overview
All ContractorPro spreadsheets have been updated with CSI MasterFormat codes to enable:
- **Standardized cost classification** across all construction trades
- **GC View**: Shows all divisions with summary by division
- **Subcontractor View**: Filtered to specific trade (e.g., only Division 05 for steel)

## Files Updated

### 1. Job Costing Spreadsheet (Job_Costing_Spreadsheet_CSI.csv)
**Location:** `/products/templates/` and all package directories

**Changes Made:**
- Added `View Mode` column with dropdown: GC View (All Divisions) / Subcontractor View (Division XX)
- Added `CSI Division` column (e.g., 05 for Metals)
- Added `CSI Code` column (full code like 05 10 00)
- Added `Division Name` column (e.g., "Metals")
- **COST TRACKING section**: Now organized by CSI Division with all 16 major divisions:
  - 01 - General Requirements
  - 02 - Existing Conditions
  - 04 - Masonry
  - 05 - Metals
  - 06 - Wood, Plastics, and Composites
  - 07 - Thermal and Moisture Protection
  - 08 - Openings
  - 09 - Finishes
  - 10 - Specialties
  - 21 - Fire Suppression
  - 22 - Plumbing
  - 23 - HVAC
  - 26 - Electrical
  - 31 - Earthwork
  - 32 - Exterior Improvements
- **DIVISION SUMMARY (GC VIEW)**: Roll-up totals for each division

### 2. Project Tracker (Project_Tracker_CSI.csv)
**Location:** `/products/templates/` and all package directories

**Changes Made:**
- Added `View Mode` column for GC/Subcontractor filtering
- Added `CSI Division`, `CSI Code`, and `Division Name` columns
- **PROJECT DASHBOARD BY CSI DIVISION**: Shows metrics per division:
  - Active Projects
  - Completed (This Month)
  - Total Contract Value
  - Total Budget
  - Total Actual Cost
  - Overall Margin
  - Margin %
- **VIEW MODE LEGEND**: Complete list of all 16 division filters
- **CSI MasterFormat Quick Reference**: Division numbers and names

### 3. Subcontractor Tracker Pro (Subcontractor_Tracker_Pro_CSI.csv)
**Location:** `/products/templates/` and all package directories

**Changes Made:**
- Added `CSI Division`, `CSI Code` columns for trade classification
- **SUBCONTRACTOR ANALYTICS BY CSI DIVISION**: Vendor counts per division
- **TOP PERFORMERS BY DIVISION**: Performance ratings organized by CSI division
- **CSI MASTERFORMAT DIVISION REFERENCE**: Complete division listing with descriptions
- Subcontractors can be filtered by their primary CSI Division

### 4. Subcontractor Tracker (Subcontractor_Tracker_CSI.csv)
**Location:** `/products/templates/` and all package directories

**Changes Made:**
- Added `CSI Division` and `CSI Code` columns
- **SUBCONTRACTOR SUMMARY BY CSI DIVISION**: Counts per division
- **CSI MASTERFORMAT DIVISION REFERENCE**: Quick reference guide

### 5. Change Order Log (Change_Order_Log_CSI.csv)
**Location:** `/products/templates/` and all package directories

**Changes Made:**
- Added `CSI Division`, `CSI Code`, `Division Name` columns
- Added `View Mode` column for filtering
- **CHANGE ORDER SUMMARY BY CSI DIVISION**: Impact tracking per division:
  - Total Change Orders
  - Total Approved
  - Total Pending
  - Total Rejected
  - Net Impact to Contract
- **VIEW MODE LEGEND**: Filter options for GC and Subcontractors

### 6. AP Tracker (AP_Tracker_CSI.csv)
**Location:** `/products/templates/` and all package directories

**Changes Made:**
- Added `CSI Division`, `CSI Code`, `Division Name` columns
- **ACCOUNTS PAYABLE SUMMARY BY CSI DIVISION**: Payables organized by trade
- **CASH FLOW FORECAST BY DIVISION**: Weekly cash flow per division
- Track vendor bills by CSI classification for trade-specific cash flow analysis

### 7. AR Tracker (AR_Tracker_CSI.csv)
**Location:** `/products/templates/` and all package directories

**Changes Made:**
- Added `CSI Division`, `CSI Code`, `Division Name` columns
- **ACCOUNTS RECEIVABLE SUMMARY BY CSI DIVISION**: Revenue by trade
- **AGING REPORT BY CSI DIVISION**: Collections aging per division
- Track customer invoices by CSI classification

### 8. COI Tracker (COI_Tracker_CSI.csv)
**Location:** `/products/templates/` and all package directories

**Changes Made:**
- Added `CSI Division`, `CSI Code`, `Division Name` columns
- **COI SUMMARY BY CSI DIVISION**: Insurance tracking per trade:
  - Total Subcontractors
  - COI Current
  - COI Expiring (30 days)
  - COI Expired
- **EXPIRATION ALERTS BY DIVISION**: Division-specific compliance tracking

### 9. Steel Estimator (Steel_Estimator_CSI_MasterFormat.xlsx)
**Location:** `/products/steel-estimator/` and all package directories

**Changes Made:**
- **Sheet 1 - Project Setup**: 
  - CSI MasterFormat Classification header
  - Division: 05 - Metals
  - CSI Code: 05 10 00 - Structural Metal Framing
  - View Mode selection
  - CSI DIVISION 05 - METALS SUMMARY for GC view
  
- **Sheet 2 - Fabrication**:
  - CSI Division 05: Metals header
  - Added `CSI Code` column to all line items
  - Sample items with specific CSI codes:
    - 05 10 13.19 - Structural Beams
    - 05 10 13.23 - Structural Columns
    - 05 20 00 - Metal Joists
    - 05 30 00 - Metal Decking
    - 05 40 00 - Cold-Formed Metal Framing
    - 05 50 00 - Metal Fabrications
    - 05 70 00 - Ornamental Metal

- **Sheet 3 - Erection**:
  - CSI Division 05: Metals header
  - Added `CSI Code` column to all line items
  - Erection activities classified by CSI code

- **Sheet 4 - Summary**:
  - CSI MasterFormat Classification
  - View Mode selection
  - COST SUMMARY BY CSI CODE
  - CSI MASTERFORMAT REFERENCE - DIVISION 05

## CSI MasterFormat Divisions Implemented

| Division | Name | Included In |
|----------|------|-------------|
| 01 | General Requirements | All templates |
| 02 | Existing Conditions | All templates |
| 04 | Masonry | All templates |
| 05 | Metals | All templates + Steel Estimator |
| 06 | Wood, Plastics, and Composites | All templates |
| 07 | Thermal and Moisture Protection | All templates |
| 08 | Openings | All templates |
| 09 | Finishes | All templates |
| 10 | Specialties | All templates |
| 21 | Fire Suppression | All templates |
| 22 | Plumbing | All templates |
| 23 | HVAC | All templates |
| 26 | Electrical | All templates |
| 31 | Earthwork | All templates |
| 32 | Exterior Improvements | All templates |

## View Modes

### GC View (All Divisions)
- Shows all CSI divisions
- Summary by division
- Full project overview
- Cross-division analytics

### Subcontractor View (Division XX)
- Filtered to specific trade
- Shows only relevant CSI codes
- Trade-specific cost tracking
- Division-only summaries

Available Subcontractor Views:
- Subcontractor View (Division 01) - General Requirements
- Subcontractor View (Division 02) - Existing Conditions
- Subcontractor View (Division 04) - Masonry
- Subcontractor View (Division 05) - Metals
- Subcontractor View (Division 06) - Wood/Plastics/Composites
- Subcontractor View (Division 07) - Thermal/Moisture Protection
- Subcontractor View (Division 08) - Openings
- Subcontractor View (Division 09) - Finishes
- Subcontractor View (Division 10) - Specialties
- Subcontractor View (Division 21) - Fire Suppression
- Subcontractor View (Division 22) - Plumbing
- Subcontractor View (Division 23) - HVAC
- Subcontractor View (Division 26) - Electrical
- Subcontractor View (Division 31) - Earthwork
- Subcontractor View (Division 32) - Exterior Improvements

## Package Distribution

All CSI-integrated files have been copied to:
- `/products/templates/` (original templates)
- `/products/packages/professional/` (Professional package)
- `/products/packages/business/` (Business package)
- `/products/packages/complete/` (Complete package)

## Usage Instructions

### For General Contractors:
1. Select "GC View (All Divisions)" in the View Mode column
2. View summary dashboards showing all divisions
3. Track costs, change orders, and subcontractors across all trades
4. Use division summaries for high-level reporting

### For Subcontractors:
1. Select your specific division in the View Mode column (e.g., "Subcontractor View (Division 05)")
2. View only your trade-specific items
3. Track costs and change orders for your scope only
4. Filter reports to show only your division

## Benefits

1. **Standardization**: All spreadsheets follow CSI MasterFormat industry standard
2. **Clarity**: Clear division of work by trade
3. **Reporting**: Easy generation of division-specific reports
4. **Integration**: Consistent classification across all ContractorPro tools
5. **Flexibility**: Toggle between GC and Subcontractor views
6. **Compliance**: Aligns with construction industry specifications

## Reference Document

For complete CSI MasterFormat codes, see:
`/research/CSI_MASTERFORMAT_REFERENCE.md`
