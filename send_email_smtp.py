import smtplib
import ssl
from email.message import EmailMessage
from email.utils import make_msgid
import os

FROM = "CharlesCreatorAI@gmail.com"
TO = "thomas.losito@elecnor.es"
SUBJECT = "CSV import for Cable Pulling (Phase sheets) — TomLosito bundle attached"
BODY = open('/tmp/tomlosito_email.txt','r').read()
ATTACH_PATH = '/root/.openclaw/workspace/TomLosito_bundle.zip'

# App password from TOOLS.md
PASSWORD = 'reqt gvkx smlp igwi'

msg = EmailMessage()
msg['Subject'] = SUBJECT
msg['From'] = FROM
msg['To'] = TO
msg.set_content(BODY)

# attach zip
with open(ATTACH_PATH,'rb') as f:
    data = f.read()
    maintype = 'application'
    subtype = 'zip'
    msg.add_attachment(data, maintype=maintype, subtype=subtype, filename=os.path.basename(ATTACH_PATH))

context = ssl.create_default_context()
with smtplib.SMTP('smtp.gmail.com', 587) as server:
    server.ehlo()
    server.starttls(context=context)
    server.ehlo()
    server.login(FROM, PASSWORD)
    server.send_message(msg)

print('Email sent')
