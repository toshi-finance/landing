import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

async function shoot(file, theme, viewport, url) {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: theme }]);
  await page.setViewport(viewport);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2500));
  // Slow autoscroll to trigger ScrollTrigger animations naturally
  await page.evaluate(async () => {
    const total = document.body.scrollHeight;
    const steps = 40;
    const delta = total / steps;
    for (let i = 0; i < steps; i++) {
      window.scrollBy(0, delta);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 600));
  });
  await page.screenshot({ path: `/tmp/toshi-screenshots/${file}`, fullPage: true });
  await page.close();
  console.log(file);
}

await shoot("FULL-light.png", "light", { width: 1440, height: 900 }, "http://localhost:3000/es");
await shoot("FULL-dark.png", "dark", { width: 1440, height: 900 }, "http://localhost:3000/es");
await shoot("FULL-mobile.png", "light", { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 }, "http://localhost:3000/es");

await browser.close();
