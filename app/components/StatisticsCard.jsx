"use client";

export default function StatisticsCard({ title, value, icon: Icon, trend, className = "" }) {
  return (
    <div className={`p-6 rounded-lg shadow-md bg-zinc-800 ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-zinc-400">{title}</h3>
          <p className="mt-2 text-2xl font-semibold text-zinc-100">{value}</p>
        </div>
        {Icon && (
          <div className="p-2 rounded-full bg-zinc-700/50">
            <Icon className="w-6 h-6 text-zinc-100" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={`font-medium ${trend.type === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
            {trend.value}
          </span>
          <span className="ml-2 text-zinc-400">vs. last month</span>
        </div>
      )}
    </div>
  );
}
