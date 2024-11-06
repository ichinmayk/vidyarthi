// src/components/Table.js
import React, { useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

export default function Table({ headers, data }) {
  const [sortConfig, setSortConfig] = useState({ key: headers[0], direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />;
    }
    return <FiChevronDown className="opacity-50" />;
  };

  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      onClick={() => handleSort(header.key)}
                      className="px-6 py-4 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span>{header.label}</span>
                        <span>{renderSortIcon(header.key)}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b dark:border-neutral-500">
                    {headers.map((header, cellIndex) => (
                      <td key={cellIndex} className="whitespace-nowrap px-6 py-4">
                        {row[header.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
