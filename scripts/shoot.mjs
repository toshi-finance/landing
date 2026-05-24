import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = "/tmp/toshi-screenshots";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

async function viewportShoot({ url, file, viewport, theme }) {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: theme }]);
  if (viewport) await page.setViewport(viewport);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 3500));
  await page.screenshot({ path: `${OUT}/${file}`, fullPage: false });
  await page.close();
  console.log("ok:", file);
}

async function sectionShoot({ url, file, viewport, theme, anchor }) {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: theme }]);
  if (viewport) await page.setViewport(viewport);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2500));
  // Scroll to anchor with smooth-ish behavior to trigger ScrollTrigger naturally
  await page.evaluate(async (anchor) => {
    const el = document.querySelector(anchor);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 40;
    await new Promise((resolve) => {
      const dest = top;
      const step = 60;
      const tick = () => {
        const cur = window.scrollY;
        if (cur < dest - step) {
          window.scrollBy(0, step);
          requestAnimationFrame(tick);
        } else {
          window.scrollTo(0, dest);
          resolve();
        }
      };
      tick();
    });
  }, anchor);
  await new Promise((r) => setTimeout(r, 1800));
  await page.screenshot({ path: `${OUT}/${file}`, fullPage: false });
  await page.close();
  console.log("ok:", file);
}

const desktopLight = { url: "http://localhost:3000/es", viewport: { width: 1440, height: 900 }, theme: "light" };
const desktopDark = { url: "http://localhost:3000/es", viewport: { width: 1440, height: 900 }, theme: "dark" };
const mobileLight = { url: "http://localhost:3000/es", viewport: { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 }, theme: "light" };

await viewportShoot({ ...desktopLight, file: "01-hero-light.png" });
await viewportShoot({ ...desktopDark, file: "02-hero-dark.png" });
await sectionShoot({ ...desktopLight, file: "03-problem.png", anchor: "[id='product']" });
await sectionShoot({ ...desktopLight, file: "04-solution.png", anchor: "#how-it-works" });
await sectionShoot({ ...desktopLight, file: "05-how-it-works.png", anchor: "#product" });
await sectionShoot({ ...desktopLight, file: "06-product.png", anchor: "#for-whom" });
await sectionShoot({ ...desktopLight, file: "07-for-whom.png", anchor: "#security" });
await sectionShoot({ ...desktopDark, file: "08-security-dark.png", anchor: "#cta" });
await sectionShoot({ ...desktopLight, file: "09-cta.png", anchor: "footer" });

await viewportShoot({ ...mobileLight, file: "10-mobile-hero.png" });
await sectionShoot({ ...mobileLight, file: "11-mobile-product.png", anchor: "#product" });
await sectionShoot({ ...mobileLight, file: "12-mobile-cta.png", anchor: "#cta" });

await viewportShoot({ url: "http://localhost:3000/en", file: "13-en-hero.png", viewport: { width: 1440, height: 900 }, theme: "light" });

await browser.close();
