
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AudioWaveform,
  Search,
  Menu,
  X,
  Compass,
  Library,
} from "lucide-react";

const navigation = [
  { name: "Discover", href: "/" },
  { name: "Explore", href: "/#moods" },
  { name: "Collection", href: "/#discoveries" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">

        {/* Muse Logo */}
        <Link href="/" className="flex items-center gap-2">
          <AudioWaveform size={32} className="text-primary" />

          <span className="font-display text-3xl font-bold tracking-tight">
            muse.
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Navigation */}
        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/#discoveries"
            aria-label="Discover music"
            className="rounded-full p-2 text-muted transition hover:bg-surface hover:text-primary"
          >
            <Search size={21} />
          </Link>

          <Link
            href="/#moods"
            aria-label="Explore moods"
            className="rounded-full p-2 text-muted transition hover:bg-surface hover:text-primary"
          >
            <Compass size={21} />
          </Link>

          <Link
            href="/#discoveries"
            className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary"
          >
            <Library size={17} />
            Browse
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-lg p-2 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="space-y-2 border-t border-border bg-surface px-6 py-5 md:hidden"
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-muted transition hover:bg-surface-hover hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
