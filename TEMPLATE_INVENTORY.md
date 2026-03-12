# TEMPLATE INVENTORY

**Generated:** March 10, 2026  
**Purpose:** Complete inventory of all templates with AIA compliance status and gap analysis

---

## 📁 Template Locations

```
/templates/
├── documents/          # HTML contract documents
├── spreadsheets/       # CSV/Excel calculators and trackers
└── [root]/            # Legacy/misc templates
```

---

## 📄 DOCUMENT TEMPLATES (/templates/documents/)

### AIA-Compliant Templates (5)

| Template File | AIA Document | Description | Status |
|---------------|--------------|-------------|--------|
| `construction-contract-aia.html` | A101-2017 | Standard Owner-Contractor Agreement | ✅ Complete |
| `conditional-waiver-progress.html` | G901-2022 | Conditional Waiver on Progress Payment | ✅ Complete |
| `unconditional-waiver-progress.html` | G902-2022 | Unconditional Waiver on Progress Payment | ✅ Complete |
| `conditional-waiver-final.html` | G903-2022 | Conditional Waiver on Final Payment | ✅ Complete |
| `unconditional-waiver-final.html` | G904-2022 | Unconditional Waiver on Final Payment | ✅ Complete |

**AIA Reference:** See `research/AIA_OFFICIAL_REFERENCE.md` for official document details

### Generic Templates (4)

| Template File | Type | Description | Status |
|---------------|------|-------------|--------|
| `construction-contract.html` | Contract | Generic construction contract (non-AIA) | ✅ Complete |
| `mechanics-lien.html` | Lien | Mechanics lien claim form | ✅ Complete |
| `preliminary-notice.html` | Notice | Preliminary notice of right to lien | ✅ Complete |
| `release-of-lien.html` | Release | Lien release/satisfaction form | ✅ Complete |

### Documentation

| File | Description |
|------|-------------|
| `AIA_TEMPLATES_README.md` | Guide for AIA template usage and legal disclaimers |

---

## 📊 SPREADSHEET TEMPLATES (/templates/spreadsheets/)

| Template File | Purpose | Status |
|---------------|---------|--------|
| `accounts-receivable-tracker.csv` | Track A/R aging and payments | ✅ Complete |
| `job-costing-calculator.csv` | Calculate job costs and margins | ✅ Complete |
| `change-order-log.csv` | Track change orders and approvals | ✅ Complete |

---

## 📋 LEGACY TEMPLATES (/templates/ root)

| Template File | Type | Notes |
|---------------|------|-------|
| `Mechanics_Lien_Form.html` | Lien | Duplicate of documents/mechanics-lien.html |
| `Release_of_Lien.html` | Release | Duplicate of documents/release-of-lien.html |
| `Construction_Contract.txt` | Contract | Text version, may be outdated |
| `Preliminary_Notice_Template.html` | Notice | Duplicate of documents/preliminary-notice.html |

**Recommendation:** Consolidate duplicates into `/templates/documents/` and remove legacy files.

---

## 🔍 GAP ANALYSIS

### Missing AIA Templates (High Priority)

| AIA Document | Description | Priority |
|--------------|-------------|----------|
| G702-1992 | Application and Certificate for Payment | 🔴 High |
| G703-1992 | Continuation Sheet (Schedule of Values) | 🔴 High |
| A201-2017 | General Conditions of the Contract for Construction | 🟡 Medium |
| G706-1994 | Contractor's Affidavit of Payment of Debts | 🟡 Medium |
| G706A-1994 | Contractor's Affidavit of Release of Liens | 🟡 Medium |
| G707-1994 | Consent of Surety to Final Payment | 🟢 Low |

### Missing Generic Templates (Medium Priority)

| Template Type | Use Case | Priority |
|---------------|----------|----------|
| Subcontractor Agreement | Subcontractor relationships | 🔴 High |
| Change Order Form | Formal change order documentation | 🔴 High |
| Purchase Order Template | Material/equipment procurement | 🟡 Medium |
| Daily Report Form | Field daily reports | 🟡 Medium |
| Request for Information (RFI) | Formal RFI documentation | 🟡 Medium |
| Submittal Transmittal | Material submittals tracking | 🟡 Medium |
| Punch List Template | Project closeout punch list | 🟢 Low |
| Certificate of Substantial Completion | G704 equivalent | 🟢 Low |
| Certificate of Final Completion | Final completion documentation | 🟢 Low |

### Missing Spreadsheet Templates (Low Priority)

| Template Type | Purpose |
|---------------|---------|
| Schedule of Values | AIA G703 equivalent |
| Payment Application Calculator | G702 calculation helper |
| Project Budget Tracker | Overall project budget vs actual |
| Labor Burden Calculator | Calculate true labor costs |
| Equipment Rate Calculator | Equipment cost calculations |
| Material Takeoff Template | Organized material lists |

---

## 📈 SUMMARY

| Category | Count | Complete | Gaps |
|----------|-------|----------|------|
| AIA-Compliant Documents | 5 | 5 | 6+ |
| Generic Documents | 4 | 4 | 9+ |
| Spreadsheets | 3 | 3 | 6+ |
| **TOTAL** | **12** | **12** | **21+** |

---

## 🎯 RECOMMENDED PRIORITIES

### Phase 1: Payment Workflow (Critical)
1. G702 Application for Payment
2. G703 Continuation Sheet (Schedule of Values)
3. Change Order Form

### Phase 2: Contract Documentation
4. Subcontractor Agreement
5. A201 General Conditions (simplified)
6. Purchase Order Template

### Phase 3: Project Management
7. Daily Report Form
8. RFI Template
9. Submittal Transmittal

### Phase 4: Closeout
10. Punch List Template
11. Certificate of Completion
12. G706 Affidavit of Payment

---

## 📝 NOTES

- **AIA Compliance:** Current AIA templates are based on official AIA document structures but are simplified HTML forms. For official use, purchase actual AIA documents from aiacontracts.com.
- **State-Specific Requirements:** Many states have statutory lien waiver forms. Consider adding state-specific variants (California, Texas, Florida, etc.).
- **Legal Disclaimer:** All templates include standard "consult an attorney" disclaimers. See `AIA_TEMPLATES_README.md`.

---

*Last Updated: March 10, 2026 by documentation-updater subagent*
