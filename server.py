from fastapi import FastAPI, Form
from typing import Annotated
import uvicorn
import json

PORT = 5124

app = FastAPI()

def build_system_prompt():
    identity = "You are the worlds best friend"
    try:
        with open("identity.txt", 'r') as file:
            identity = file.read()
    except:
        pass

    from datetime import datetime
    
    date = str(datetime.now())

    return {
        "role": "system", 
        "content": f"""This is your identity: {identity}. You respond via text messages. use emojis. The date is {date}"""
    }

def save_message_history(message_history):
    with open('history.json', 'w') as file:
        return json.dump(message_history[1:], file)

def load_message_history():
    message_history = []
    try:
        with open('history.json', 'r') as file:
            message_history = json.load(file)

            if len(message_history) == 0:
                raise Exception("Message history is empty")
    except:
        pass

    return [build_system_prompt()] + message_history


def run_ai(messages:str):
    if "provider" == "openai":

        from openai import OpenAI
        client = OpenAI()
        return client.chat.completions.create(
            model="gpt-4o",
            messages=messages
        )
    
    import ollama
    return ollama.chat(model='llama3.1:8b', messages=messages)['message']

@app.post("/message")
def send_message(message: Annotated[str, Form()]):
    if 

    history = load_message_history()

    response = run_ai(history + [
        {"role": "user", "content": message}
    ])

    history.append({"role": "user", "content": message})
    history.append(response)

    save_message_history(history)

    print(response)

    return response['content']


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)
    