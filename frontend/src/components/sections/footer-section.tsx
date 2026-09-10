import { Container } from "@/components/layout/container";
import { profile } from "@/lib/data";

export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 py-8">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-foreground">{profile.name}</p>
            <p className="text-tech">{profile.label}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>© {year}</span>
            <span className="text-tech">Systems / cloud / AI</span>
            <span>NIT Goa → Accenture</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
