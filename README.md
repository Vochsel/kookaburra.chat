# Kookaburra.chat
Your own local friend

This is a very quick wrapper on ollama to serve a local LLM AI friend to an iOS shortcut.

## Steps (NodeJS)

 * Install [ollama](https://ollama.com/)
 * Run ollama `ollama run llama3.1:8b` (If you use a different model, just change in `index.ts`)
 * Install deps `npm i`
 * Start server `npm start`
 * Install the shortcut on your phone (Either download from this repo or [click here](https://www.icloud.com/shortcuts/6eb3089ced854f33b850ab1389cf173d))
    * Provide the IP address of your computer
    * Give your friend a name!

## Steps (Python)

 * Install [ollama](https://ollama.com/)
 * Run ollama `ollama run llama3.1:8b` (If you use a different model, just change in `server.py`)
 * Install python deps `pip install -r requirements.txt`
 * Start server `python server.py`
 * Install the shortcut on your phone (Either download from this repo or [click here](https://www.icloud.com/shortcuts/6eb3089ced854f33b850ab1389cf173d))
    * Provide the IP address of your computer
    * Give your friend a name!

## Optional

 * Customise `identity.txt` to change things about your friend.
 * Use ngrok to expose your friend and talk on the go