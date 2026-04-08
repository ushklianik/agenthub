import agents from "@/data/agents.json";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  return agents.map((agent) => ({ id: agent.id }));
}

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = agents.find((a) => a.id === id);
  if (!agent) notFound();

  const stars = Math.round(agent.rating);
  const related = agents.filter((a) => a.category === agent.category && a.id !== agent.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/agents" className="hover:text-white transition-colors">Agents</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-300">{agent.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="flex items-start gap-5">
            <div
              className="h-20 w-20 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
              style={{ backgroundColor: agent.color + "22", border: `2px solid ${agent.color}44` }}
            >
              <span style={{ color: agent.color }}>{agent.avatar}</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-white">{agent.name}</h1>
                <span className="rounded-full px-3 py-1 text-xs font-medium bg-white/10 text-slate-300">
                  {agent.category}
                </span>
              </div>
              <p className="text-slate-400 text-lg mb-3">{agent.tagline}</p>
              <div className="flex items-center gap-3">
                <div className="flex text-amber-400">{"★".repeat(stars)}{"☆".repeat(5 - stars)}</div>
                <span className="text-slate-400 text-sm">
                  {agent.rating} ({agent.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">About this agent</h2>
            <p className="text-slate-400 leading-relaxed">{agent.description}</p>
          </div>

          {/* Capabilities */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Capabilities</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {agent.capabilities.map((cap) => (
                <li key={cap} className="flex items-center gap-2 text-slate-300">
                  <span className="text-violet-400">✓</span>
                  {cap}
                </li>
              ))}
            </ul>
          </div>

          {/* Reviews placeholder — hookpoint for future WebSocket anti-pattern */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Reviews</h2>
            <div className="space-y-4">
              {[
                { author: "Sarah M.", text: "Transformed our workflow completely. Worth every penny.", rating: 5 },
                { author: "James K.", text: "Incredibly accurate. Our team adopted it within a week.", rating: 5 },
                { author: "Priya L.", text: "Good results, took some tuning to get right for our use case.", rating: 4 },
              ].map((review) => (
                <div key={review.author} className="border-t border-white/10 pt-4 first:border-0 first:pt-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-white text-sm">{review.author}</span>
                    <span className="text-amber-400 text-xs">{"★".repeat(review.rating)}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-3xl font-bold text-white mb-1">
              ${agent.price}<span className="text-lg font-normal text-slate-500">/mo</span>
            </div>
            <p className="text-slate-500 text-sm mb-6">Billed monthly. Cancel anytime.</p>

            <button
              className="w-full rounded-xl py-3 font-semibold text-white transition-colors mb-3"
              style={{ backgroundColor: agent.color }}
            >
              Deploy Agent
            </button>
            <button className="w-full rounded-xl border border-white/10 py-3 text-slate-300 hover:bg-white/10 transition-colors">
              Try Free Demo
            </button>

            <div className="mt-6 space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-2"><span className="text-violet-400">✓</span> 14-day free trial</div>
              <div className="flex items-center gap-2"><span className="text-violet-400">✓</span> No credit card required</div>
              <div className="flex items-center gap-2"><span className="text-violet-400">✓</span> Cancel anytime</div>
              <div className="flex items-center gap-2"><span className="text-violet-400">✓</span> 99.9% uptime SLA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Related agents */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-white mb-6">More in {agent.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((rel) => {
              const relStars = Math.round(rel.rating);
              return (
                <Link
                  key={rel.id}
                  href={`/agents/${rel.id}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-violet-500/50 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="h-10 w-10 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: rel.color + "22", color: rel.color }}
                    >
                      {rel.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">{rel.name}</div>
                      <div className="text-amber-400 text-xs">{"★".repeat(relStars)}</div>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-2">{rel.tagline}</p>
                  <p className="text-white font-semibold text-sm mt-3">${rel.price}/mo</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
