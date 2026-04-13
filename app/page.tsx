import agents from "@/data/agents.json";
import AgentCard from "@/components/AgentCard";

const FEATURED_IDS = ["1", "2", "3", "4", "5", "6"];
const featuredAgents = agents.filter((a) => FEATURED_IDS.includes(a.id));

const CATEGORIES = ["Analytics", "Development", "Content", "Support", "Sales", "Finance", "HR", "Operations", "Legal"];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-7xl w-full px-6 py-12 flex flex-col lg:flex-row gap-10 items-center">
        {/* Left: hero image — contained with rounded corners */}
        <div className="lg:w-3/5 rounded-2xl overflow-hidden shadow-2xl shadow-violet-900/30 flex-shrink-0">
          <img
            id="hero-banner"
            data-src="/images/hero.png"
            alt="Find Your Perfect AI Agent"
            width={1440}
            height={600}
            style={{ display: "none" }}
            loading="lazy"
            className="w-full h-auto object-cover"
            suppressHydrationWarning
          />
        </div>

        {/* Right: text content */}
        <div className="lg:w-2/5 flex flex-col justify-center py-8">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            2,000+ AI Agents Available
          </div>
          <h1 className="text-5xl font-bold text-white mb-5 leading-tight">
            Find Your{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Perfect
            </span>
            <br />AI Agent
          </h1>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            The marketplace for intelligent automation. Discover, compare, and deploy
            AI agents that transform how you work.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/agents"
              className="rounded-full bg-violet-600 px-6 py-3 text-white font-medium hover:bg-violet-500 transition-colors"
            >
              Browse Agents
            </a>
            <a
              href="#"
              className="rounded-full border border-white/20 px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors"
            >
              List Your Agent
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-y border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 grid grid-cols-3 gap-6 text-center">
          {[
            { value: "2,000+", label: "AI Agents" },
            { value: "50K+", label: "Active Users" },
            { value: "4.8★", label: "Avg. Rating" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-xl font-semibold text-white mb-6">Browse by Category</h2>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <a
              key={cat}
              href={`/agents?category=${cat}`}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:border-violet-500/50 hover:text-white transition-colors"
            >
              {cat}
            </a>
          ))}
        </div>
      </section>

      {/* Featured agents */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Featured Agents</h2>
          <a href="/agents" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>
    </>
  );
}

