// netlify/functions/getLikes.js
import fs from 'fs';
import path from 'path';

const filePath = path.join('/tmp', 'likes.json');

export async function handler(event) {
    const slug = event.queryStringParameters.slug;
    if (!slug) {
        return { statusCode: 400, body: 'Missing slug' };
    }

    if (!fs.existsSync(filePath)) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ likes: 0 }),
        };
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const likes = data[slug] || 0;

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes }),
    };
}
