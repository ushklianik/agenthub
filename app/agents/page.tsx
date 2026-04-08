import agents from "@/data/agents.json";
import AgentCard from "@/components/AgentCard";

const CATEGORIES = ["All", "Analytics", "Development", "Content", "Support", "Sales", "Finance", "HR", "Operations", "Legal"];

export default async function AgentsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params?.category || "All";
  const query = params?.q?.toLowerCase() || "";

  const filtered = agents.filter((agent) => {
    const matchesCategory = selectedCategory === "All" || agent.category === selectedCategory;
    const matchesQuery =
      !query ||
      agent.name.toLowerCase().includes(query) ||
      agent.tagline.toLowerCase().includes(query) ||
      agent.category.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Browse AI Agents</h1>
        <p className="text-slate-400">
          {filtered.length} agent{filtered.length !== 1 ? "s" : ""} available
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Search */}
      <form className="mb-8">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search agents..."
          className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
        />
      </form>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={cat === "All" ? "/agents" : `/agents?category=${cat}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-violet-600 text-white"
                : "border border-white/10 bg-white/5 text-slate-400 hover:text-white"
            }`}
          >
            {cat}
          </a>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-500">
          <p className="text-lg">No agents found.</p>
          <a href="/agents" className="mt-4 inline-block text-violet-400 hover:text-violet-300">
            Clear filters →
          </a>
        </div>
      )}
    </div>
  );
}
