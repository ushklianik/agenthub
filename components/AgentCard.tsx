import Link from "next/link";

interface Agent {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  avatar: string;
  color: string;
}

export default function AgentCard({ agent }: { agent: Agent }) {
  const stars = Math.round(agent.rating);

  return (
    <Link
      href={`/agents/${agent.id}`}
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-violet-500/50 hover:bg-white/8 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: agent.color + "33", border: `1px solid ${agent.color}66` }}
        >
          <span style={{ color: agent.color }}>{agent.avatar}</span>
        </div>
        <span className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-white/10 text-slate-300">
          {agent.category}
        </span>
      </div>

      <h3 className="font-semibold text-white mb-1 group-hover:text-violet-300 transition-colors">
        {agent.name}
      </h3>
      <p className="text-sm text-slate-400 mb-4 flex-1 line-clamp-2">{agent.tagline}</p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5">
          <div className="flex text-amber-400 text-xs">
            {"★".repeat(stars)}{"☆".repeat(5 - stars)}
          </div>
          <span className="text-xs text-slate-500">({agent.reviewCount.toLocaleString()})</span>
        </div>
        <span className="text-sm font-semibold text-white">
          ${agent.price}<span className="text-slate-500 font-normal">/mo</span>
        </span>
      </div>
    </Link>
  );
}
