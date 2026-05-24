import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

async function shoot(file, theme, viewport, url = "http://localhost:3000/es") {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: theme }]);
  await page.setViewport(viewport);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 3500));
  await page.screenshot({ path: `/tmp/toshi-screenshots/${file}` });
  await page.close();
  console.log(file);
}

await shoot("hero-v2-light.png", "light", { width: 1440, height: 900 });
await shoot("hero-v2-dark.png", "dark", { width: 1440, height: 900 });
await shoot("hero-v2-mobile.png", "light", { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
await shoot("hero-v2-en.png", "light", { width: 1440, height: 900 }, "http://localhost:3000/en");
await shoot("hero-v2-statement.png", "light", { width: 1440, height: 900 });

await browser.close();
