import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = [
  { name: 'learn-hub', url: 'https://karandeepyt786-max.github.io/Learn-Hub-Responsive/' },
  { name: 'geeks', url: 'https://karandeepyt786-max.github.io/Geeks_Responsive/' },
  { name: 'furniture', url: 'https://karandeepyt786-max.github.io/Furniture/' },
  { name: 'numitech', url: 'https://karandeepyt786-max.github.io/Numitech-Solution-2-Responsive/' },
  { name: 'e-commerce', url: 'https://e-commerce-ten-pi-22.vercel.app/' }
];

const dir = path.join(__dirname, 'public', 'screenshots');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  for (const item of urls) {
    console.log(`Capturing ${item.name}...`);
    try {
      await page.goto(item.url, { waitUntil: 'networkidle0', timeout: 30000 });
      await page.screenshot({ path: path.join(dir, `${item.name}.jpg`), type: 'jpeg', quality: 80 });
      console.log(`Saved ${item.name}.jpg`);
    } catch (err) {
      console.error(`Failed to capture ${item.name}:`, err);
    }
  }
  
  await browser.close();
  console.log("Done");
})();
