"use client";

import { CardItem } from "./CardItem";

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

interface CardGridProps {
  cards: CreditCard[];
  quotas: CardQuota;
  inputValues: { [cardId: string]: string };
  onCostChange: (cardId: string, value: string) => void;
  onResetQuota: (cardId: string) => void;
}

export function CardGrid({
  cards,
  quotas,
  inputValues,
  onCostChange,
  onResetQuota,
}: CardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <CardItem
          key={card.id}
          card={card}
          inputValue={inputValues[card.id] || ""}
          quota={quotas[card.id]}
          onCostChange={(value) => onCostChange(card.id, value)}
          onResetQuota={() => onResetQuota(card.id)}
        />
      ))}
    </div>
  );
}
