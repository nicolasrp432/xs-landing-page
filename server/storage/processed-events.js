import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../data');
const EVENTS_FILE = path.join(DATA_DIR, 'processed-events.json');

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
    } catch {
      // Expected on Vercel
    }
  }
  
  try {
    await fs.access(EVENTS_FILE);
  } catch {
    try {
      await fs.writeFile(EVENTS_FILE, JSON.stringify([]));
    } catch {
      // Expected on Vercel
    }
  }
}

export async function isEventProcessed(eventId) {
  try {
    await ensureDataDir();
    const content = await fs.readFile(EVENTS_FILE, 'utf-8');
    const events = JSON.parse(content);
    return events.includes(eventId);
  } catch {
    return false; // Default to false if we can't read
  }
}

export async function markEventProcessed(eventId) {
  try {
    await ensureDataDir();
    const content = await fs.readFile(EVENTS_FILE, 'utf-8');
    const events = JSON.parse(content);
    
    if (!events.includes(eventId)) {
      events.push(eventId);
      await fs.writeFile(EVENTS_FILE, JSON.stringify(events, null, 2));
    }
  } catch {
    // Expected on Vercel - event won't be marked as processed locally
  }
}
