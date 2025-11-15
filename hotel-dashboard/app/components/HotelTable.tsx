'use client';

import { useState, useMemo } from 'react';
import { Hotel } from '../lib/types';
import { Search, Star, Phone, Mail, Globe, MapPin, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface HotelTableProps {
  hotels: Hotel[];
}

type SortField = 'hotel_name' | 'google_rating' | 'user_ratings_total' | 'star_segment';
type SortDirection = 'asc' | 'desc';

export default function HotelTable({ hotels }: HotelTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [starFilter, setStarFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('google_rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const starSegments = useMemo(() => {
    const segments = new Set(hotels.map(h => h.star_segment).filter((s): s is string => Boolean(s)));
    return ['all', ...Array.from(segments).sort()];
  }, [hotels]);

  const filteredAndSortedHotels = useMemo(() => {
    let filtered = hotels.filter(hotel => {
      const matchesSearch = hotel.hotel_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.full_address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStar = starFilter === 'all' || hotel.star_segment === starFilter;
      return matchesSearch && matchesStar;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return filtered;
  }, [hotels, searchTerm, starFilter, sortField, sortDirection]);

  const paginatedHotels = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedHotels.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedHotels, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedHotels.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Filters */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search hotels by name or address..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <select
            value={starFilter}
            onChange={(e) => {
              setStarFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {starSegments.map(segment => (
              <option key={segment} value={segment}>
                {segment === 'all' ? 'All Star Segments' : segment}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {paginatedHotels.length} of {filteredAndSortedHotels.length} hotels
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th
                onClick={() => handleSort('hotel_name')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  Hotel Name <SortIcon field="hotel_name" />
                </div>
              </th>
              <th
                onClick={() => handleSort('star_segment')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  Segment <SortIcon field="star_segment" />
                </div>
              </th>
              <th
                onClick={() => handleSort('google_rating')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  Rating <SortIcon field="google_rating" />
                </div>
              </th>
              <th
                onClick={() => handleSort('user_ratings_total')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  Reviews <SortIcon field="user_ratings_total" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Contact
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedHotels.map((hotel) => (
              <tr key={hotel.google_place_id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {hotel.hotel_name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {hotel.full_address}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {hotel.star_segment || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {hotel.google_rating?.toFixed(1) || 'N/A'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {hotel.user_ratings_total?.toLocaleString() || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    {hotel.primary_phone && (
                      <a href={`tel:${hotel.primary_phone}`} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        <Phone className="w-4 h-4" />
                        {hotel.primary_phone}
                      </a>
                    )}
                    {hotel.primary_email && (
                      <a href={`mailto:${hotel.primary_email}`} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        <Mail className="w-4 h-4" />
                        {hotel.primary_email.split(',')[0]}
                      </a>
                    )}
                    {hotel.website && (
                      <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        <Globe className="w-4 h-4" />
                        Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
