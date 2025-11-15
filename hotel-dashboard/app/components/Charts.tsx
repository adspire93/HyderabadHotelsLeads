'use client';

import { Hotel } from '../lib/types';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartsProps {
  hotels: Hotel[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

export default function Charts({ hotels }: ChartsProps) {
  // Rating distribution
  const ratingData = [
    { range: '4.5-5.0', count: hotels.filter(h => h.google_rating && h.google_rating >= 4.5).length },
    { range: '4.0-4.5', count: hotels.filter(h => h.google_rating && h.google_rating >= 4.0 && h.google_rating < 4.5).length },
    { range: '3.5-4.0', count: hotels.filter(h => h.google_rating && h.google_rating >= 3.5 && h.google_rating < 4.0).length },
    { range: '3.0-3.5', count: hotels.filter(h => h.google_rating && h.google_rating >= 3.0 && h.google_rating < 3.5).length },
    { range: '<3.0', count: hotels.filter(h => h.google_rating && h.google_rating < 3.0).length },
  ];

  // Star segment distribution
  const starSegmentCounts = hotels.reduce((acc, hotel) => {
    const segment = hotel.star_segment || 'Unknown';
    acc[segment] = (acc[segment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const starSegmentData = Object.entries(starSegmentCounts).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Rating Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Rating Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ratingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" name="Hotels" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Star Segment Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Star Segment Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={starSegmentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {starSegmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
