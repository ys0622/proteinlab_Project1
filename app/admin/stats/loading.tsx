export default function StatsLoading() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <div className="h-7 w-20 rounded bg-[#ece9e2]" />
        <div className="mt-2 h-4 w-64 rounded bg-[#f3f1ec]" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-4"
          >
            <div className="h-4 w-24 rounded bg-[#f0ede6]" />
            <div className="mt-3 h-9 w-28 rounded bg-[#ece9e2]" />
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_1fr]">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <div className="h-5 w-36 rounded bg-[#ece9e2]" />
          <div className="mt-2 h-4 w-20 rounded bg-[#f3f1ec]" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-8 rounded bg-[#f8f6f1]" />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <div className="h-5 w-28 rounded bg-[#ece9e2]" />
          <div className="mt-2 h-4 w-28 rounded bg-[#f3f1ec]" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-8 rounded bg-[#f8f6f1]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
