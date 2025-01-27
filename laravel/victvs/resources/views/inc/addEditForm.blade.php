<div x-show="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
        <h2 class="text-xl font-bold mb-4" x-text="modalTitle"></h2>
        <form @submit.prevent="saveCard">
            <input type="hidden" x-model="form.id" />
            <div class="mb-4">
                <label class="block text-gray-700">Title</label>
                <input type="text" x-model="form.Title" class="border rounded w-full py-2 px-3" required />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Description</label>
                <input type="text" x-model="form.Description" class="border rounded w-full py-2 px-3"
                    required />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Candidate Name</label>
                <input type="text" x-model="form.CandidateName" class="border rounded w-full py-2 px-3"
                    required />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Date</label>
                <input type="datetime-local" x-model="form.Date" class="border rounded w-full py-2 px-3"
                    required />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Location Name</label>
                <select x-model="form.LocationName" class="border rounded w-full py-2 px-3" required>
                    <template x-for="location in locations" :key="location">
                        <option x-text="location" :value="location"></option>
                    </template>
                </select>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Longitude</label>
                <input type="text" x-model="form.Longitude" class="border rounded w-full py-2 px-3"
                    required />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Latitude</label>
                <input type="text" x-model="form.Latitude" class="border rounded w-full py-2 px-3"
                    required />
            </div>
            <div class="flex justify-between">
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
                    Save
                </button>
                <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded" @click="closeModal">
                    Cancel
                </button>
            </div>
        </form>
    </div>
</div>
