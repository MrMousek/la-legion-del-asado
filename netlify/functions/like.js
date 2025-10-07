// netlify/functions/like.js
import fs from 'fs';
import path from 'path';

const filePath = path.join('/tmp', 'likes.json'); // /tmp es la carpeta escribible en serverless

export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { slug } = JSON.parse(event.body || '{}');
    if (!slug) {
        return { statusCode: 400, body: 'Missing slug' };
    }

    let data = {};
    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    data[slug] = (data[slug] || 0) + 1;

    fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: data[slug] }),
    };
}
