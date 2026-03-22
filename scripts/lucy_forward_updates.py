#!/usr/bin/env python3
import requests, time, json, pathlib, subprocess
TOKEN_PATH = pathlib.Path('secrets/savannah_bot_token.txt')
STATE_FILE = pathlib.Path('data/lucy_updates_state.json')
FORWARD_TARGET='8455750177'
FORWARD_CHANNEL='telegram'
POLL_INTERVAL=30

def load_token():
    return TOKEN_PATH.read_text().strip()

def load_state():
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {"last_update_id": 0}

def save_state(state):
    STATE_FILE.write_text(json.dumps(state))

def forward(message):
    text = message.get('text', '')
    sender = message['from']['first_name']
    note = f"[Lucy] {sender}: {text}"
    subprocess.run(['openclaw','message','send','--channel',FORWARD_CHANNEL,'--target',FORWARD_TARGET,'--message',note],check=True)

def main():
    token = load_token()
    state = load_state()
    last_id = state.get('last_update_id', 0)
    while True:
        resp = requests.get(f'https://api.telegram.org/bot{token}/getUpdates', params={'offset': last_id+1})
        resp.raise_for_status()
        data = resp.json()
        for update in data.get('result', []):
            last_id = update['update_id']
            if 'message' in update:
                forward(update['message'])
        save_state({'last_update_id': last_id})
        time.sleep(POLL_INTERVAL)

if __name__ == '__main__':
    main()
