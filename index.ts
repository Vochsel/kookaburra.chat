import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import ollama from 'ollama';  // Assuming there's a suitable npm package or client for ollama

const PORT = 5124;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

interface Message {
    role: string;
    content: string;
}

function buildSystemPrompt(): Message {
    let identity = "You are the world's best friend";
    try {
        identity = fs.readFileSync('identity.txt', 'utf8');
    } catch (err) {
        // Handle error if needed
    }

    const date = new Date().toISOString();

    return {
        role: "system",
        content: `This is your identity: ${identity}. You respond via text messages. Use emojis. The date is ${date}`
    };
}

function saveMessageHistory(messageHistory: Message[]): void {
    fs.writeFileSync('history.json', JSON.stringify(messageHistory.slice(1)));
}

function loadMessageHistory(): Message[] {
    let messageHistory: Message[] = [];
    try {
        messageHistory = JSON.parse(fs.readFileSync('history.json', 'utf8'));

        if (messageHistory.length === 0) {
            throw new Error("Message history is empty");
        }
    } catch (err) {
        // Handle error if needed
    }

    return [buildSystemPrompt()].concat(messageHistory);
}

async function runAi(messages: Message[]): Promise<Message> {

    const response = await ollama.chat({
        model: 'llama3.1:8b',
        messages: messages,

    });
    return response.message as Message;
}

app.post('/message', async (req: Request, res: Response) => {
    const message = req.body.message as string;

    const history = loadMessageHistory();

    const response = await runAi([...history, { role: 'user', content: message }]);

    history.push({ role: 'user', content: message });
    history.push(response);

    saveMessageHistory(history);

    console.log(response);

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(response.content);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
