
import Link from "next/link";
import {
  Headphones,
  Zap,
  Moon,
  Sun,
  CloudRain,
  Coffee,
  ArrowUpRight,
} from "lucide-react";

const moods = [
  {
    name: "Focus",
    description: "Find your flow",
    color: "#35476B",
    icon: Headphones,
  },
  {
    name: "Energy",
    description: "Turn it up",
    color: "#814B37",
    icon: Zap,
  },
  {
    name: "Chill",
    description: "Take it easy",
    color: "#58446E",
    icon: Moon,
  },
  {
    name: "Feel Good",
    description: "Lift your mood",
    color: "#52633D",
    icon: Sun,
  },
  {
    name: "Rainy Days",
    description: "Slow moments",
    color: "#3C5365",
    icon: CloudRain,
  },
  {
    name: "Morning",
    description: "Start fresh",
    color: "#795D43",
    icon: Coffee,
  },
];

export default function MoodSection() {
  return (
    <section id="moods" className="scroll-mt-28 space-y-6">

      <div>
        <p className="mb-2 text-xs font-semibold tracking-widest text-primary">
          MADE FOR YOUR MOMENT
        </p>

        <h2 className="font-display text-3xl font-bold">
          Find your mood.
        </h2>

        <p className="mt-2 text-sm text-muted">
          How are you feeling today?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {moods.map((mood) => {
          const Icon = mood.icon;

          return (
            <Link
              key={mood.name}
              href={`/?mood=${encodeURIComponent(mood.name)}#discoveries`}
              style={{ backgroundColor: mood.color }}
              className="group relative flex min-h-40 flex-col justify-between overflow-hidden rounded-2xl p-5 text-left transition duration-300 hover:-translate-y-1 hover:brightness-110"
            >
              <div className="flex items-center justify-between">
                <Icon size={29} strokeWidth={1.5} />

                <ArrowUpRight
                  size={18}
                  className="opacity-60 transition group-hover:opacity-100"
                />
              </div>

              <div>
                <h3 className="font-display text-lg font-bold">
                  {mood.name}
                </h3>

                <p className="mt-1 text-xs text-white/75">
                  {mood.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
