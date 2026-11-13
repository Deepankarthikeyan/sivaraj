import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';

const filePath = process.argv[2];
if (!filePath) {
    console.error('Usage: node WebsiteAPI/uploadWelcomeImage.mjs <image-path> [api-base-url]');
    process.exit(1);
}
try {
    const form = new FormData();
    form.append('image', new Blob([await readFile(filePath)]), basename(filePath));
    const base = (process.argv[3] || 'http://localhost:46641').replace(/\/$/, '');
    const response = await fetch(`${base}/api/website/page-images/welcome-way/fabric-rolls`, {
        method: 'POST', body: form, signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error(`Upload failed (${response.status}): ${await response.text()}`);
    const result = await response.json();
    const stored = await fetch(`${base}${result.url}`);
    if (!stored.ok) throw new Error(`Image verification failed (${stored.status})`);
    const original = await readFile(filePath);
    if (!original.equals(Buffer.from(await stored.arrayBuffer()))) throw new Error('Stored image does not match the uploaded file');
    console.log('Saved and verified fabric-rolls in dbo.WebsitePageImages. No image file was copied into the project.');
} catch (error) {
    console.error(error.message);
    process.exitCode = 1;
}
