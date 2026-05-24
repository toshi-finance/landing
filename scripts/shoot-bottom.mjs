import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

async function shootBottom(file, theme, viewport, anchor) {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: theme }]);
  await page.setViewport(viewport);
  await page.goto("http://localhost:3000/es", { waitUntil: "domcontentloaded", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2500));
  await page.evaluate((anchor) => {
    const el = document.querySelector(anchor);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "instant" });
  }, anchor);
  await new Promise((r) => setTimeout(r, 2500));
  await page.screenshot({ path: `/tmp/toshi-screenshots/${file}` });
  await page.close();
  console.log(file);
}

await shootBottom("cta-light.png", "light", { width: 1440, height: 900 }, "#cta");
await shootBottom("cta-dark.png", "dark", { width: 1440, height: 900 }, "#cta");
await shootBottom("security-light.png", "light", { width: 1440, height: 900 }, "#security");
await shootBottom("statement.png", "light", { width: 1440, height: 900 }, "section:nth-child(7)");
await shootBottom("benefits.png", "light", { width: 1440, height: 900 }, "h2:has(+ ul)");

await browser.close();
