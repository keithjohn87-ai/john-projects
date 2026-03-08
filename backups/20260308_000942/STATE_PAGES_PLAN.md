# State Pages Generation Master Plan

## Goal
Generate all 51 state pages (50 states + DC) with:
1. Correct structure and navigation
2. Real content from states.json
3. Working document download links
4. Consistent URL structure: /state/[CODE]/index.html

## State Distribution

### Agent 1: States A-G (8 states)
AL, AK, AZ, AR, CA, CO, CT, DE, FL, GA

### Agent 2: States H-M (11 states)  
HI, ID, IL, IN, IA, KS, KY, LA, ME, MD, MA, MI, MN, MS, MO, MT

### Agent 3: States N-R (10 states)
NE, NV, NH, NJ, NM, NY, NC, ND, OH, OK, OR, PA, RI

### Agent 4: States S-W (11 states)
SC, SD, TN, TX, UT, VT, VA, WA, WV, WI, WY, DC

### Agent 5: Fix navigation and links
- Update index.html state selector
- Fix document download links across all pages
- Verify all paths work

## Template Structure
Each page needs:
- Navigation bar with correct relative paths
- State name and intro
- Licensing section (board name, URL, requirements)
- Lien law section (preliminary notice, deadlines, foreclosure)
- Tax information section
- Document templates section (with REAL download links)
- Contact information section
- Footer

## Document Links
Link to actual files in /products/packages/contractorpro-v5-complete-bundle.zip contents:
- preliminary-notice.pdf/docx
- mechanics-lien.pdf/docx
- release-of-lien.pdf/docx
- construction-contract.pdf/docx

## Output
All files go to: /root/.openclaw/workspace/state/[CODE]/index.html
