import smtplib, ssl
from email.message import EmailMessage
import os

FROM = 'CharlesCreatorAI@gmail.com'
TO = ['keith.john87@gmail.com','savannahcosper@gmail.com']
SUBJECT = 'Budget spreadsheet — mobile-friendly workbook attached'
BODY = '''Hi —

Attached is the auto-populating Budget workbook (single-sheet, mobile-ready). Enter amounts/frequencies and income; monthly/weekly equivalents and summary auto-calc. Save and use on iPhone or desktop. Tell me if you want any tweaks.

Thanks,
Charles (on behalf of John)
'''
ATTACH_PATH = '/root/.openclaw/workspace/Budget.xlsx'
PASSWORD = 'reqt gvkx smlp igwi'

msg = EmailMessage()
msg['Subject'] = SUBJECT
msg['From'] = FROM
msg['To'] = ', '.join(TO)
msg.set_content(BODY)

with open(ATTACH_PATH,'rb') as f:
    data = f.read()
    msg.add_attachment(data, maintype='application', subtype='vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename=os.path.basename(ATTACH_PATH))

context = ssl.create_default_context()
with smtplib.SMTP('smtp.gmail.com', 587) as server:
    server.ehlo()
    server.starttls(context=context)
    server.ehlo()
    server.login(FROM, PASSWORD)
    server.send_message(msg)

print('Email sent to', TO)
