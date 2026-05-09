import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (err) {
      console.warn('Unable to create data directory (expected on serverless):', err.message);
    }
  }
  
  try {
    await fs.access(ORDERS_FILE);
  } catch {
    try {
      await fs.writeFile(ORDERS_FILE, JSON.stringify([]));
    } catch (err) {
      console.warn('Unable to create orders file (expected on serverless):', err.message);
    }
  }
}

export async function saveOrder(orderData) {
  try {
    await ensureDataDir();
    const content = await fs.readFile(ORDERS_FILE, 'utf-8');
    const orders = JSON.parse(content);
    
    orders.push({
      ...orderData,
      timestamp: new Date().toISOString()
    });
    
    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
    console.log('Order saved to local storage.');
  } catch (err) {
    console.error('Failed to save order to local storage (Serverless/Read-only):', err.message);
    // We don't throw here so the webhook can still finish and send email
  }
  return orderData;
}
