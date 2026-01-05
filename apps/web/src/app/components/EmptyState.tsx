export function EmptyState() {
  return (
    <div className="py-12 text-center">
      <svg
        className="mx-auto mb-4 h-12 w-12 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-lg text-slate-400">No cards found matching your search</p>
    </div>
  );
}
