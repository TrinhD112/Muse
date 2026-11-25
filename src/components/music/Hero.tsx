
import Link from "next/link";
import { ArrowUpRight, AudioWaveform } from "lucide-react";

export default function Hero() {
  return (
    <section className="space-y-7">

      {/* Introduction */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-primary">
          YOUR DAILY DISCOVERY
        </p>

        <h1 className="max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Music for every
          <span className="text-primary"> version of you.</span>
        </h1>

        <p className="mt-4 max-w-xl text-muted">
          Discover new sounds, explore different moods, and find
          music that feels like you.
        </p>
      </div>

      {/* Featured Collection */}
      <div className="relative isolate min-h-[380px] overflow-hidden rounded-[32px] bg-[#302344]">

        {/* Decorative Background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_40%,#9466c7_0%,#49335f_35%,#21192f_75%)]"
        />

        <div
          aria-hidden="true"
          className="absolute -right-24 top-1/2 -z-10 h-[400px] w-[400px] -translate-y-1/2 rounded-full border border-white/20 md:right-10"
        />

        <div
          aria-hidden="true"
          className="absolute -right-12 top-1/2 -z-10 h-[300px] w-[300px] -translate-y-1/2 rounded-full border border-white/20 md:right-[90px]"
        />

        <AudioWaveform
          aria-hidden="true"
          className="absolute right-10 top-1/2 -z-10 hidden -translate-y-1/2 text-white/15 md:block"
          size={230}
          strokeWidth={0.6}
        />

        {/* Featured Text */}
        <div className="flex min-h-[380px] max-w-xl flex-col justify-center p-8 sm:p-12">

          <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-accent">
            MUSE ORIGINAL / 001
          </p>

          <h2 className="font-display text-6xl font-bold tracking-tighter sm:text-7xl lg:text-8xl">
            After
            <br />
            Hours.
          </h2>

          <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/70">
            A collection inspired by late nights, quiet moments,
            and the feeling of slowing down.
          </p>

          <Link
            href="/#discoveries"
            className="mt-8 flex w-fit items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-background transition hover:scale-105"
          >
            Explore discoveries
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </section>
  );
}
