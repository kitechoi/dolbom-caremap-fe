'use client';

import React, { useState } from 'react';
import { SearchFilters, AgeGroup } from '@/types';

interface ParentSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

export const ParentSearch: React.FC<ParentSearchProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({});
  
  const ageGroups = [
    { value: AgeGroup.TODDLER, label: '유아 (1-3세)' },
    { value: AgeGroup.PRESCHOOL, label: '유치원 (3-5세)' },
    { value: AgeGroup.ELEMENTARY, label: '초등 (6-12세)' },
  ];

  const handleAgeGroupToggle = (ageGroup: AgeGroup) => {
    const current = filters.ageGroup || [];
    const updated = current.includes(ageGroup)
      ? current.filter(a => a !== ageGroup)
      : [...current, ageGroup];
    
    setFilters({ ...filters, ageGroup: updated });
  };

  const handleApply = () => {
    onSearch(filters);
  };

  return (
    <div className="bg-white rounded-lg p-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">돌봄 가능 연령</h3>
        <div className="flex flex-wrap gap-2">
          {ageGroups.map((group) => (
            <button
              key={group.value}
              onClick={() => handleAgeGroupToggle(group.value)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                filters.ageGroup?.includes(group.value)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            시급 범위
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="최소"
              className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
              onChange={(e) => setFilters({
                ...filters,
                hourlyRate: {
                  ...filters.hourlyRate,
                  min: Number(e.target.value) || 0,
                  max: filters.hourlyRate?.max || 50000
                }
              })}
            />
            <span className="text-gray-500">~</span>
            <input
              type="number"
              placeholder="최대"
              className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
              onChange={(e) => setFilters({
                ...filters,
                hourlyRate: {
                  min: filters.hourlyRate?.min || 0,
                  max: Number(e.target.value) || 50000
                }
              })}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            최소 평점
          </label>
          <select 
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
            onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
          >
            <option value="">전체</option>
            <option value="4.5">★ 4.5 이상</option>
            <option value="4.0">★ 4.0 이상</option>
            <option value="3.5">★ 3.5 이상</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="rounded"
            onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
          />
          <span>인증된 선생님만</span>
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setFilters({})}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          초기화
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          적용하기
        </button>
      </div>
    </div>
  );
};