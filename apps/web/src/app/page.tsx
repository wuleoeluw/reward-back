"use client";

import { useState, useMemo, useEffect } from "react";

interface CreditCard {
  title: string;
  image: string;
  bank: string;
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
      (card) =>
        card.title.toLowerCase().includes(lowerFilter) ||
        card.bank.toLowerCase().includes(lowerFilter)
    );
  }, [cards, searchFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Reward Credit Cards</h1>
          <p className="text-slate-300 text-sm sm:text-base">Browse and manage your reward credit cards</p>
        </div>

        {/* Search Filter */}
        <div className="mb-8">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by card name or bank..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && (
          <>
            <div className="text-slate-400 mb-4 text-sm">
              Showing {filteredCards.length} of {cards.length} cards
            </div>
            {filteredCards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 transition-transform"
                  >
                    {/* Card Image */}
                    <div className="h-40 sm:h-48 bg-slate-700 overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">
                        {card.title}
                      </h3>
                      <p className="text-slate-300 text-sm mb-4 font-semibold">{card.bank}</p>

                      {/* Card Details */}
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400">Expires:</span>
                          <span className="text-slate-200 font-medium">{card.dueDate}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400">Upper Limit:</span>
                          <span className="text-blue-400 font-bold">${card.upperLimit.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-slate-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-slate-400 text-lg">No cards found matching your search</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
