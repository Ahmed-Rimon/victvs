import React from 'react';

function ExamForm({
    newCard, 
    setNewCard, 
    errors, 
    validateForm, 
    setShowAddModal, 
    isEdit
}:any) {   
    return (
        <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {isEdit ? "Edit Card" : "Add Card"}
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validateForm();
                    }}
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="title"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={newCard.Title}
                        onChange={(e) =>
                          setNewCard({ ...newCard, Title: e.target.value })
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {errors.Title && (
                        <p className="text-red-500 text-xs italic">
                          {errors.Title}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="Description"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        id="Description"
                        value={newCard.Description}
                        onChange={(e) =>
                          setNewCard({
                            ...newCard,
                            Description: e.target.value,
                          })
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {errors.Description && (
                        <p className="text-red-500 text-xs italic">
                          {errors.Description}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="CandidateName"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Candidate Name
                      </label>
                      <input
                        type="text"
                        id="CandidateName"
                        value={newCard.CandidateName}
                        onChange={(e) =>
                          setNewCard({
                            ...newCard,
                            CandidateName: e.target.value,
                          })
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {errors.CandidateName && (
                        <p className="text-red-500 text-xs italic">
                          {errors.CandidateName}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="locationName"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Location Name
                      </label>
                      <select
                        id="locationName"
                        value={newCard.LocationName}
                        onChange={(e) =>
                          setNewCard((prev) => ({
                            ...prev,
                            LocationName: e.target.value,
                          }))
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">Select Location</option>
                        <option value="London">London</option>
                        <option value="Sydney">Sydney</option>
                        <option value="Berlin">Berlin</option>
                        <option value="New York">New York</option>
                      </select>
                      {errors.LocationName && (
                        <p className="text-red-500 text-xs italic">
                          {errors.LocationName}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="Date"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Date
                      </label>
                      <input
                        type="datetime-local"
                        id="Date"
                        value={newCard.Date}
                        onChange={(e) =>
                          setNewCard({ ...newCard, Date: e.target.value })
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {errors.Date && (
                        <p className="text-red-500 text-xs italic">
                          {errors.Date}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="Latitude"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Latitude
                      </label>
                      <input
                        type="text"
                        id="Latitude"
                        value={newCard.Latitude}
                        onChange={(e) =>
                          setNewCard({ ...newCard, Latitude: e.target.value })
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {errors.Latitude && (
                        <p className="text-red-500 text-xs italic">
                          {errors.Latitude}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="Longitude"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Longitude
                      </label>
                      <input
                        type="text"
                        id="Longitude"
                        value={newCard.Longitude}
                        onChange={(e) =>
                          setNewCard({ ...newCard, Longitude: e.target.value })
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {errors.Longitude && (
                        <p className="text-red-500 text-xs italic">
                          {errors.Longitude}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        {isEdit ? "Update" : "Add"}
                      </button>
                      <button
                        type="button"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => setShowAddModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
    );
}

export default ExamForm;