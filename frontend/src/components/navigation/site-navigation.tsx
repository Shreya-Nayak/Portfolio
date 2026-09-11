"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/lib/data";
import { LinkButton } from "@/components/ui/link-button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const sections = useMemo(
    () => ["hero", "about", "experience", "projects", "skills", "contact"],
    [],
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.4, 0.65],
      },
    );

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (isMenuOpen && !dialog.open) {
      dialog.showModal();
      const firstFocusable = dialog.querySelector<HTMLElement>(
        "a, button, [tabindex]:not([tabindex='-1'])",
      );
      firstFocusable?.focus();
    }

    if (!isMenuOpen && dialog.open) {
      dialog.close();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const handleClose = () => {
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition duration-300 ${
        isScrolled
          ? "border-b border-border/70 bg-background/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.16)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-(--container-width) items-center justify-between px-(--page-padding) py-4">
        <Link
          href="/"
          className="focus-ring inline-flex items-center gap-3 rounded-full px-2 py-1 transition hover:opacity-90"
          aria-label={`${profile.name} home`}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/5 text-tech text-primary">
            {profile.name.split(" ").map((part) => part[0]).join("")}
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-medium text-foreground">
              {profile.name}
            </span>
            <span className="block text-tech">Portfolio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || activeId === item.href.slice(1);

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`focus-ring rounded-full px-3 py-2 text-sm transition duration-200 ${
                  isActive
                    ? "bg-white/6 text-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <LinkButton
            href="/contact#assistant"
            variant="outline"
            size="sm"
            className="ml-3 border-primary/20 text-primary hover:border-primary/40"
          >
            Talk to the portfolio
          </LinkButton>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/5 text-foreground lg:hidden"
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <span className="flex h-4 w-5 flex-col justify-between">
            <span className="h-px w-full bg-current" />
            <span className="h-px w-full bg-current" />
            <span className="h-px w-full bg-current" />
          </span>
        </button>

        <dialog
          ref={dialogRef}
          id="mobile-navigation"
          className="w-[min(92vw,26rem)] rounded-3xl border border-border bg-[rgba(6,11,22,0.96)] p-0 text-foreground shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
          aria-label="Mobile navigation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsMenuOpen(false);
            }
          }}
        >
          <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
            <div>
              <p className="text-tech text-primary">Navigation</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Navigate the story or open the portfolio assistant.
              </p>
            </div>
            <button
              type="button"
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/5 text-foreground"
              aria-label="Close navigation menu"
              onClick={() => setIsMenuOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="px-5 py-5">
            <div className="grid gap-2">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || activeId === item.href.slice(1);

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`focus-ring flex items-center justify-between rounded-2xl border px-4 py-3 transition duration-200 ${
                      isActive
                        ? "border-primary/35 bg-primary/10 text-primary"
                        : "border-border bg-white/4 text-foreground hover:border-primary/25 hover:bg-white/6"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className="text-tech">
                      {item.label.toLowerCase()}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="mt-5 grid gap-3">
              <LinkButton
                href="/contact#assistant"
                variant="outline"
                className="justify-between px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Talk to the portfolio</span>
                <span aria-hidden="true">↗</span>
              </LinkButton>
              <LinkButton
                href="/contact"
                variant="secondary"
                className="justify-between px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Contact</span>
                <span aria-hidden="true">↗</span>
              </LinkButton>
            </div>
          </div>
        </dialog>
      </div>
    </header>
  );
}
