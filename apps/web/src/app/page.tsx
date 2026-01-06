"use client";

import { useState, useMemo, useEffect } from "react";
import { SearchBar } from "../components/SearchBar";
import { CardGrid } from "../components/CardGrid";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { EmptyState } from "../components/EmptyState";
import { PageHeader } from "../components/PageHeader";
import { calculateQuota } from "../utilities/quotaCalculator";

interface CreditCard {
  title: string;
  image: string;
  issuer: string;
  dueDate: string;
  upperLimit: number;
  rate: number;
  href: string;
  id: string;
}

interface CardQuota {
  [cardId: string]: {
    cost: string;
    quota: number;
  };
}

export default function Home() {
  const [searchFilter, setSearchFilter] = useState("");
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [quotas, setQuotas] = useState<CardQuota>({});
  const [inputValues, setInputValues] = useState<{ [cardId: string]: string }>({});

  // Load cards from public JSON files
  useEffect(() => {
    async function loadCards() {
      try {
        // Get list of card directories from manifest
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
        const response = await fetch(`${basePath}/cards-manifest.json`);
        const manifest = await response.json();

        // Load each card's JSON
        const cardsData: CreditCard[] = [];
        for (const cardId of manifest.cardIds) {
          const cardResponse = await fetch(`${basePath}/cards/${cardId}.json`);
          const cardData = await cardResponse.json();
          cardsData.push({
            ...cardData,
            id: cardId,
          });
        }

        // Sort cards by title
        cardsData.sort((a, b) => a.title.localeCompare(b.title));
        setCards(cardsData);
      } catch (error) {
        console.error("Failed to load cards:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCards();
  }, []);

  // Load quotas from local storage
  useEffect(() => {
    const savedQuotas = localStorage.getItem("cardQuotas");
    if (savedQuotas) {
      try {
        setQuotas(JSON.parse(savedQuotas));
      } catch (error) {
        console.error("Failed to load quotas from local storage:", error);
      }
    }
  }, []);

  // Handle cost input change
  const handleCostChange = (cardId: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [cardId]: value,
    }));

    const card = cards.find((c) => c.id === cardId);
    if (card && value.trim()) {
      const quota = calculateQuota(value, card.upperLimit);
      if (quota !== null) {
        const newQuotas = {
          ...quotas,
          [cardId]: {
            cost: value,
            quota: quota,
          },
        };
        setQuotas(newQuotas);
        localStorage.setItem("cardQuotas", JSON.stringify(newQuotas));
      }
    }
  };

  // Reset quota for a card
  const resetQuota = (cardId: string) => {
    setInputValues((prev) => ({
      ...prev,
      [cardId]: "",
    }));

    const newQuotas = { ...quotas };
    delete newQuotas[cardId];
    setQuotas(newQuotas);
    localStorage.setItem("cardQuotas", JSON.stringify(newQuotas));
  };

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
        <PageHeader />
        <SearchBar value={searchFilter} onChange={setSearchFilter} />

        {loading && <LoadingSpinner />}

        {!loading && (
          <>
            <div className="mb-4 text-sm text-slate-400">
              Showing {filteredCards.length} of {cards.length} cards
            </div>
            {filteredCards.length > 0 ? (
              <CardGrid
                cards={filteredCards}
                quotas={quotas}
                inputValues={inputValues}
                onCostChange={handleCostChange}
                onResetQuota={resetQuota}
              />
            ) : (
              <EmptyState />
            )}
          </>
        )}
      </div>
    </div>
  );
}
