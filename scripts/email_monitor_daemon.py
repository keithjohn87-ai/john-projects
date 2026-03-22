#!/usr/bin/env python3
import imaplib, email, pathlib, json, time, datetime, subprocess
EMAIL='CharlesCreatorAI@gmail.com'
APP_PASSWORD='reqt gvkx smlp igwi'
STATE_FILE=pathlib.Path('data/email_monitor_state.json')
EVENT_LOG=pathlib.Path('logs/email-monitor-events.log')
CHECK_INTERVAL=300
ALERT_TARGET='8455750177'
ALERT_CHANNEL='telegram'

def load_state():
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {}

def save_state(state):
    STATE_FILE.write_text(json.dumps(state))

def send_alert(subject, sender_addr):
    message = f"[Email Monitor] New email from {sender_addr}: {subject}"
    subprocess.run(['openclaw','message','send','--channel',ALERT_CHANNEL,'--target',ALERT_TARGET,'--message',message],check=True)

def fetch_uids(mail):
    status, data = mail.uid('search', None, 'ALL')
    if status != 'OK' or not data or not data[0]:
        return []
    return [int(x) for x in data[0].split()]

def log_event(text):
    EVENT_LOG.parent.mkdir(parents=True, exist_ok=True)
    with EVENT_LOG.open('a') as f:
        f.write(f"{datetime.datetime.utcnow().isoformat()}Z {text}\n")

def main():
    state=load_state()
    last_uid=state.get('last_uid', 0)
    bootstrap = last_uid == 0
    while True:
        try:
            mail=imaplib.IMAP4_SSL('imap.gmail.com')
            mail.login(EMAIL, APP_PASSWORD)
            mail.select('INBOX')
            uids=fetch_uids(mail)
            if bootstrap and uids:
                last_uid=max(uids)
                state['last_uid']=last_uid
                state['bootstrapped_at']=datetime.datetime.utcnow().isoformat()+'Z'
                save_state(state)
                bootstrap=False
            new_uids=[uid for uid in uids if uid>last_uid]
            for uid in new_uids:
                status, data = mail.uid('fetch', str(uid), '(RFC822.HEADER)')
                if status!='OK' or not data or data[0] is None:
                    continue
                msg=email.message_from_bytes(data[0][1])
                subject=email.header.make_header(email.header.decode_header(msg['Subject'] or ''))
                sender=msg['From']
                log_event(f"New email UID {uid} from {sender}: {subject}")
                send_alert(subject, sender)
                last_uid=max(last_uid, uid)
                state['last_uid']=last_uid
                state['last_event']=datetime.datetime.utcnow().isoformat()+'Z'
                save_state(state)
            mail.logout()
        except Exception as exc:
            log_event(f"Monitor error: {exc}")
            state['last_error']=f"{datetime.datetime.utcnow().isoformat()}Z: {exc}"
            save_state(state)
        time.sleep(CHECK_INTERVAL)

def bootstrap_state():
    state=load_state()
    if 'started_at' not in state:
        state['started_at']=datetime.datetime.utcnow().isoformat()+'Z'
        save_state(state)

if __name__=='__main__':
    bootstrap_state()
    main()
