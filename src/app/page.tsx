
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/music/Hero";
import MoodSection from "@/components/music/MoodSection";
import MusicCard from "@/components/music/MusicCard";
import { collections } from "@/data/discover";
import TrackList from "@/components/music/TrackList";

interface HomeProps {
  searchParams: Promise<{
    mood?: string | string[];
  }>;
}

export default async function Home({
  searchParams,
}: HomeProps) {
  const params = await searchParams;

  const selectedMood =
    typeof params.mood === "string" ? params.mood : undefined;

  const filteredCollections = selectedMood
    ? collections.filter(
        (collection) => collection.mood === selectedMood
      )
    : collections;

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-[1440px] space-y-16 px-6 pb-20 pt-10 lg:px-12">

        {/* Featured Music */}
        <Hero />

        {/* Mood Discovery */}
        <MoodSection />

        {/* Mood Discovery */}
        <MoodSection />

        {/* Music Track List */}
         <TrackList />

        {/* Music Collections */}
        <section
          id="discoveries"
          className="scroll-mt-28 space-y-6"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-widest text-primary">
                SOMETHING NEW TO HEAR
              </p>

              <h2 className="font-display text-3xl font-bold">
                {selectedMood
                  ? `${selectedMood} collections`
                  : "Fresh discoveries."}
              </h2>

              <p className="mt-2 text-sm text-muted">
                Explore collections inspired by different sounds.
              </p>
            </div>

            {selectedMood && (
              <Link
                href="/#discoveries"
                className="text-sm font-medium text-primary hover:underline"
              >
                Show all collections
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
            {filteredCollections.map((collection) => (
              <MusicCard
                key={collection.id}
                collection={collection}
              />
            ))}
          </div>

          {filteredCollections.length === 0 && (
            <p className="text-muted">
              No collections found for this mood.
            </p>
          )}
        </section>

        {/* Footer */}
        <footer className="flex flex-col gap-3 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <span className="font-display text-2xl font-bold text-foreground">
            muse.
          </span>

          <p>Find your frequency.</p>

          <p>© 2026 Muse</p>
        </footer>
      </main>
    </>
  );
}
