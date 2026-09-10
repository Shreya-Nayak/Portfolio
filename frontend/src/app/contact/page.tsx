import { Container } from "@/components/layout/container";
import { PageFrame } from "@/components/layout/page-frame";
import { ContactSection } from "@/components/sections/contact-section";

export default function ContactPage() {
  return (
    <PageFrame>
      <div className="border-b border-border/60 py-16 sm:py-24">
        <Container>
          <p className="text-tech text-primary">Contact / 04</p>
          <h1 className="mt-5 max-w-4xl text-h1">
            A grounded way to explore the work.
          </h1>
        </Container>
      </div>
      <ContactSection />
    </PageFrame>
  );
}
