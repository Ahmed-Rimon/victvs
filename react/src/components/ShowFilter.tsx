import React from 'react';

function ShowFilter({applyFilters,setFilterEndDate,filterEndDate, setFilterStartDate,filterStartDate,filterCandidateName,setFilterCandidateName}:any) {
    return (
        <div className="mb-4 p-4 border rounded bg-white">
            <label className="block mb-2">
              <span className="text-gray-700">Filter by Candidate Name:</span>
              <input
                type="text"
                value={filterCandidateName}
                onChange={(e) => setFilterCandidateName(e.target.value)}
                placeholder="Candidate Name"
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Filter by Date Range:</span>
              <input
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
              <input
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
            <button
              onClick={applyFilters}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Apply Filters
            </button>
          </div>
    );
}

export default ShowFilter;