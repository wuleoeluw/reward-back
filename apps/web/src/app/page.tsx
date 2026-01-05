"use client";

import { useState, useMemo, useEffect } from "react";

interface CreditCard {
  title: string;
  image: string;
  issuer: string;
  dueDate: string;
  upperLimit: number;
  id: string;
}

export default function Home() {
  const [searchFilter, setSearchFilter] = useState("");
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cards from frontmatter
  useEffect(() => {
    async function loadCards() {
      try {
        const response = await fetch("/api/cards");
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Failed to load cards:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCards();
  }, []);

  // Filter cards based on search input
  const filteredCards = useMemo(() => {
    const lowerFilter = searchFilter.toLowerCase();
    return cards.filter(
      (card) => card.title.toLowerCase().includes(lowerFilter) || card.issuer.toLowerCase().includes(lowerFilter),
    );
  }, [cards, searchFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">Reward Credit Cards</h1>
          <p className="text-sm text-slate-300 sm:text-base">Browse and manage your reward credit cards</p>
        </div>

        {/* Search Filter */}
        <div className="mb-8">
          <div className="relative">
            <svg
              className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by card name or bank..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pr-4 pl-10 text-white placeholder-slate-400 transition focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && (
          <>
            <div className="mb-4 text-sm text-slate-400">
              Showing {filteredCards.length} of {cards.length} cards
            </div>
            {filteredCards.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCards.map((card) => (
                  <div
                    key={card.id}
                    className="transform overflow-hidden rounded-xl bg-slate-800 shadow-lg transition-shadow transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    {/* Card Image */}
                    <div className="h-40 overflow-hidden bg-slate-700 sm:h-48">
                      <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5">
                      <h3 className="mb-4 line-clamp-2 text-lg font-bold text-white sm:text-xl">{card.title}</h3>

                      {/* Card Details */}
                      <div className="mb-4 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Issuer:</span>
                          <span className="font-medium text-slate-200">{card.issuer}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Expires:</span>
                          <span className="font-medium text-slate-200">{card.dueDate}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Upper Limit:</span>
                          <span className="font-bold text-blue-400">${card.upperLimit.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
