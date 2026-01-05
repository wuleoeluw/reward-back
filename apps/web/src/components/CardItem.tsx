"use client";

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

interface CardItemProps {
  card: CreditCard;
  inputValue: string;
  quota: { cost: string; quota: number } | undefined;
  onCostChange: (value: string) => void;
  onResetQuota: () => void;
}

export function CardItem({ card, inputValue, quota, onCostChange, onResetQuota }: CardItemProps) {
  return (
    <div className="transform overflow-hidden rounded-xl bg-slate-800 shadow-lg transition-shadow transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
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
            <span className="text-slate-400">Rate:</span>
            <span className="font-medium text-slate-200">{card.rate}%</span>
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

        {/* Cost Input */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-slate-300">Calculate Quota</label>
          <input
            type="text"
            placeholder="e.g., 100 or 10+20+30"
            value={inputValue || quota?.cost || ""}
            onChange={(e) => onCostChange(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 transition focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Quota Display */}
        {quota && (
          <div className="mb-4 rounded-lg bg-slate-700 p-3">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-400">Cost:</span>
              <span className="font-medium text-slate-200">
                $
                {parseFloat(quota.cost.replace(/[+\-*/()]/g, (match) => (match === "+" ? "+" : match))).toFixed(2) ||
                  quota.cost}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Remaining Quota:</span>
              <span className={`font-bold ${quota.quota < 0 ? "text-red-400" : "text-green-400"}`}>
                ${quota.quota.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <a
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Learn More
          </a>
          {quota && (
            <button
              onClick={onResetQuota}
              className="w-full rounded-lg bg-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-600 focus:ring-2 focus:ring-slate-500 focus:outline-none"
            >
              Reset Quota
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
