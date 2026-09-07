import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { PriceHistoryPoint } from '../features/coins/types';
import './PriceChart.css';

export default function PriceChart({ data }: { data: PriceHistoryPoint[] }) {
  return (
    <div className="price-chart">
      <p className="price-chart__title">Pichle 7 Din</p>

      {/* ResponsiveContainer chart ko parent ki width ke hisaab se resize karta hai */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#8a97a8" />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#8a97a8"
            domain={['auto', 'auto']}
          />
          <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#2d6cb5"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
