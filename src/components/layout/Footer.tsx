import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    key: "product",
    links: ["features", "security", "pricing", "changelog"],
  },
  {
    key: "company",
    links: ["about", "careers", "contact", "blog"],
  },
  {
    key: "resources",
    links: ["docs", "status"],
  },
  {
    key: "legal",
    links: ["privacy", "terms"],
  },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-foreground/[0.06] bg-background">
      <div className="container-screen py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">
              {t("tagline")}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-4 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.key}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                  {t(col.key)}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {t(`links.${link}`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-foreground/[0.06] pt-6 text-sm text-subtle md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Toshi Labs · {t("rights")}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.18em]">
            v0.1 · waitlist
          </p>
        </div>
      </div>
    </footer>
  );
}
