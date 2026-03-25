import smtplib, ssl
from email.message import EmailMessage

FROM = 'CharlesCreatorAI@gmail.com'
TO = 'thomas.losito@elecnor.es'
SUBJECT = 'Quick check — TomLosito bundle received?'
BODY = '''Hi Tom — checking in: did you get the TomLosito Cable Pulling bundle I sent earlier? If you've had a chance to test a Phase sheet import into GoFormz, did it work or should I adjust the CSV/mapping? Quick 1-line reply is fine.

Thanks,
Charles (on behalf of John)
'''
ATTACH = None
PASSWORD = 'reqt gvkx smlp igwi'

msg = EmailMessage()
msg['Subject'] = SUBJECT
msg['From'] = FROM
msg['To'] = TO
msg.set_content(BODY)

context = ssl.create_default_context()
with smtplib.SMTP('smtp.gmail.com', 587) as server:
    server.ehlo()
    server.starttls(context=context)
    server.ehlo()
    server.login(FROM, PASSWORD)
    server.send_message(msg)

print('Follow-up sent to', TO)
