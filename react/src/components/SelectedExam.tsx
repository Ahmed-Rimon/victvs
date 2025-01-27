import React from 'react';

function SelectedExam({selectedExam, setSelectedExam}:any) {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
              <h2 className="text-2xl font-bold mb-4">{selectedExam.Title}</h2>
              <p>
                <strong>Description:</strong> {selectedExam.Description}
              </p>
              <p>
                <strong>Candidate Name:</strong> {selectedExam.CandidateName}
              </p>
              <p>
                <strong>Date:</strong> {selectedExam.Date}
              </p>
              <p>
                <strong>Location Name:</strong>
                <span className="font-bold">{selectedExam.LocationName}</span>
              </p>
              <div
                id="map_canvas"
                className="my-4"
                style={{ width: "100%", height: "300px" }}
              ></div>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setSelectedExam(null)}
              >
                Close
              </button>
            </div>
          </div>
    );
}

export default SelectedExam;