'use client';

import { useEffect, useState } from 'react';
import { Hotel } from './lib/types';
import StatCard from './components/StatCard';
import Charts from './components/Charts';
import HotelTable from './components/HotelTable';
import HotelMap from './components/HotelMap';
import { Building2, Star, Phone, Mail, TrendingUp, MapPin } from 'lucide-react';

export default function Home() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'table' | 'map'>('table');

  useEffect(() => {
    fetch('/hotels.json')
      .then(res => res.json())
      .then(data => {
        setHotels(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading hotels:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading hotel data...</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalHotels = hotels.length;
  const avgRating = hotels.reduce((acc, h) => acc + (h.google_rating || 0), 0) / hotels.filter(h => h.google_rating).length;
  const hotelsWithPhone = hotels.filter(h => h.primary_phone).length;
  const hotelsWithEmail = hotels.filter(h => h.primary_email).length;
  const totalReviews = hotels.reduce((acc, h) => acc + (h.user_ratings_total || 0), 0);
  const premiumHotels = hotels.filter(h => h.star_segment && (h.star_segment.includes('5') || h.star_segment.includes('7'))).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Building2 className="w-8 h-8 text-blue-600" />
                Hyderabad Hotels Dashboard
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Comprehensive view of {totalHotels} hotel leads in Hyderabad
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">Nov 14, 2025</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Hotels"
            value={totalHotels}
            icon={Building2}
            description="Hotel leads collected"
          />
          <StatCard
            title="Average Rating"
            value={avgRating.toFixed(2)}
            icon={Star}
            description="Based on Google reviews"
          />
          <StatCard
            title="Contact Coverage"
            value={`${Math.round((hotelsWithPhone / totalHotels) * 100)}%`}
            icon={Phone}
            description={`${hotelsWithPhone} hotels with phone`}
          />
          <StatCard
            title="Email Coverage"
            value={`${Math.round((hotelsWithEmail / totalHotels) * 100)}%`}
            icon={Mail}
            description={`${hotelsWithEmail} hotels with email`}
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard
            title="Total Reviews"
            value={totalReviews.toLocaleString()}
            icon={TrendingUp}
            description="Combined user reviews"
          />
          <StatCard
            title="Premium Hotels"
            value={premiumHotels}
            icon={MapPin}
            description="5-star and 7-star properties"
          />
        </div>

        {/* Charts */}
        <Charts hotels={hotels} />

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('table')}
                className={`${
                  activeTab === 'table'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
              >
                Hotels Table
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`${
                  activeTab === 'map'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
              >
                Map View
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'table' ? (
          <HotelTable hotels={hotels} />
        ) : (
          <HotelMap hotels={hotels} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Hyderabad Hotels Dashboard • Built with Next.js & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
