TomLosito - Cable Pulling Import Bundle

Files in this ZIP:
- TomLosito.xlsx   (Master workbook with Instructions, Phase A, Phase B, Phase C)
- TomLosito_README.txt (this file)
- TOMLOSITO_EMAIL.txt (one-line email text for the foreman/admin)

Quick use guide
1) Unzip the bundle and open TomLosito.xlsx in Excel (or LibreOffice).
2) For each Phase sheet you want to import into GoFormz:
   a) Click the Phase tab (e.g., Phase A)
   b) File -> Save As -> choose CSV UTF-8 (*.csv)
   c) Upload that CSV to GoFormz (app.goformz.com) Admin -> Developer -> Import CSV (or Admin -> Import Data)
   d) Map the CSV columns to the form fields. Recommended mapping:
      - Cable Footage -> Cable Footage
      - Intervals -> Intervals
      - Tension (ft-lbs) -> Tension
      - Time -> Time
   e) Run a small test import (5 rows) first. Verify Submissions -> open a few to confirm fields.
   f) If OK, run the full import.

Notes:
- If you have photos, include public URLs in a PhotoURL column (not included in this template). If photos are local, the GoFormz admin can upload them via GoFormz files and link to form records.
- Keep header row intact. Do not include multiple header rows or merged cells.
- Dates/time are formatted as yyyy-mm-dd hh:mm:ss. If the import UI asks to map date formats, choose ISO.

Support:
If mapping fails or you want an automated import script, reply to the sender and I will produce a Python script or walk through the import.
