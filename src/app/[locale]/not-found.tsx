import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-subtle">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Esta página no existe.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Quizá la dirección cambió o nunca existió. Vuelve a Toshi y empieza
          desde el principio.
        </p>
        <div className="mt-7 flex justify-center">
          <Link href="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
