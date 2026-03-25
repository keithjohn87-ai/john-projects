import smtplib, ssl
from email.message import EmailMessage
import os
FROM = 'CharlesCreatorAI@gmail.com'
TO = 'Keith.john87@gmail.com'
SUBJECT = 'Fwd: CSV import for Cable Pulling (Phase sheets) — TomLosito bundle attached'
BODY = open('/tmp/tomlosito_email.txt','r').read()
ATTACH_PATH = '/root/.openclaw/workspace/TomLosito_bundle.zip'
PASSWORD = 'reqt gvkx smlp igwi'

msg = EmailMessage()
msg['Subject'] = SUBJECT
msg['From'] = FROM
msg['To'] = TO
msg.set_content(BODY)
with open(ATTACH_PATH,'rb') as f:
    data = f.read()
    msg.add_attachment(data, maintype='application', subtype='zip', filename=os.path.basename(ATTACH_PATH))

context = ssl.create_default_context()
with smtplib.SMTP('smtp.gmail.com', 587) as server:
    server.ehlo()
    server.starttls(context=context)
    server.ehlo()
    server.login(FROM, PASSWORD)
    server.send_message(msg)
print('Sent to', TO)
