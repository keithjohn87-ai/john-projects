#!/usr/bin/env python3
import pathlib, sys, requests
TOKEN_PATH = pathlib.Path('secrets/savannah_bot_token.txt')
CHAT_ID = '8791771674'
if len(sys.argv) < 2:
    print('Usage: send_savannah_bot_message.py "message"')
    sys.exit(1)
if not TOKEN_PATH.exists():
    print('Token file missing:', TOKEN_PATH)
    sys.exit(1)
TOKEN = TOKEN_PATH.read_text().strip()
text = sys.argv[1]
resp = requests.post(
    f'https://api.telegram.org/bot{TOKEN}/sendMessage',
    data={'chat_id': CHAT_ID, 'text': text}
)
resp.raise_for_status()
print(resp.json())
