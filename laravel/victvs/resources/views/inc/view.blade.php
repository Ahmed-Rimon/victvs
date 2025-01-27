<div x-show="selectedExam" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
        <h2 class="text-2xl font-bold mb-4" x-text="selectedExam.Title"></h2>

        <p><strong>Description:</strong> <span x-text="selectedExam.Description"></span></p>
        <p><strong>Candidate Name:</strong> <span x-text="selectedExam.CandidateName"></span></p>
        <p><strong>Date:</strong> <span x-text="selectedExam.Date"></span></p>
        <p><strong>Location Name:</strong> <span x-text="selectedExam.LocationName"></span></p>
        <div id="map_canvas" class="my-4" style="width: 100%; height: 300px;"></div>
        <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded" @click="selectedExam = null">
            Close
        </button>
    </div>
</div>
