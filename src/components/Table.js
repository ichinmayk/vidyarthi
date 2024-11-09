// src/components/Table.js
import React, { useState } from 'react';

export default function Table({ headers, data, enableAction }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', ascending: true });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // State to keep track of which button is clicked for each row
  const [clickedButtons, setClickedButtons] = useState({});
  // State to keep track of selected actions for each row with `actionColumnLabel` as key
  const [selectedActions, setSelectedActions] = useState([]);

  // Calculate total pages based on rowsPerPage
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Handle search and sorting
  const filteredData = data
    .filter(row =>
      headers.some(header =>
        String(row[header.key])
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortConfig.key) {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.ascending ? -1 : 1;
        if (aValue > bValue) return sortConfig.ascending ? 1 : -1;
      }
      return 0;
    });

  // Paginate the data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle sorting by column
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      ascending: prevConfig.key === key ? !prevConfig.ascending : true
    }));
  };

  // Function to render sorting indicator
  const getSortIndicator = (key) => {
    const isActive = sortConfig.key === key;
    return (
      <span className="ml-2 text-sm">
        <span className={isActive && sortConfig.ascending ? 'text-black' : 'text-gray-400'}>
          ▲
        </span>
        <span className={isActive && !sortConfig.ascending ? 'text-black' : 'text-gray-400'}>
          ▼
        </span>
      </span>
    );
  };

  // Handle action button click and store selected action for the row
  const handleButtonClick = (rowIndex, buttonValue, rowData) => {
    // Toggle clicked button for each row
    setClickedButtons(prevState => ({
      ...prevState,
      [rowIndex]: buttonValue
    }));

    // Update selectedActions with current row data and selected action based on actionColumnLabel
    setSelectedActions(prevActions => {
      const newActions = [...prevActions];
      const existingIndex = newActions.findIndex(action => action.rowIndex === rowIndex);
      const actionData = {
        rowIndex,
        rowData: {
          ...rowData,
          [enableAction.actionColumnLabel]: buttonValue // Use actionColumnLabel as the key
        }
      };
      if (existingIndex !== -1) {
        // Update existing entry
        newActions[existingIndex] = actionData;
      } else {
        // Add new entry
        newActions.push(actionData);
      }
      return newActions;
    });
  };

  // Handle submit button click
  const handleSubmit = () => {
    alert(JSON.stringify(selectedActions, null, 2));
  };

  // Handle pagination controls
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full pb-16"> {/* Add bottom padding for scroll */}
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:w-2/5 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              {enableAction?.enableAction && (
                <th className="px-6 py-3 border-b text-left text-gray-600 font-bold">
                  {enableAction.actionColumnLabel}
                </th>
              )}
              {headers.map(header => (
                <th
                  key={header.key}
                  className="px-6 py-3 border-b text-left text-gray-600 font-bold cursor-pointer"
                  onClick={() => handleSort(header.key)}
                >
                  <div className="flex items-center">
                    {header.label}
                    {getSortIndicator(header.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {enableAction?.enableAction && (
                  <td className="px-6 py-4 border-b text-gray-700 flex space-x-2">
                    {enableAction.button1Property && (
                      <button
                        onClick={() => handleButtonClick(index, enableAction.button1Property.value, row)}
                        className={`px-4 py-2 text-white font-semibold rounded ${
                          clickedButtons[index] === enableAction.button1Property.value ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                      >
                        {enableAction.button1Property.label}
                      </button>
                    )}
                    {enableAction.button2Property && (
                      <button
                        onClick={() => handleButtonClick(index, enableAction.button2Property.value, row)}
                        className={`px-4 py-2 text-white font-semibold rounded ${
                          clickedButtons[index] === enableAction.button2Property.value ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                      >
                        {enableAction.button2Property.label}
                      </button>
                    )}
                  </td>
                )}
                {headers.map(header => (
                  <td
                    key={header.key}
                    className="px-6 py-4 border-b text-gray-700"
                  >
                    {row[header.key] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 items-center space-x-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Submit Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
