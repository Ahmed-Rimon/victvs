<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Exam Data Management</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <style>
        .card-enter-active,
        .card-leave-active {
            transition: transform 0.5s, opacity 0.5s;
        }

        .card-enter-from,
        .card-leave-to {
            transform: translateY(30px);
            opacity: 0;
        }
    </style>
</head>

<body class="bg-gray-100" x-data="examApp()" x-init="init()">
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold text-center mb-8">Exam Data Management</h1>

        <!-- Categories -->
        <div class="flex justify-center mb-4">
            <button class="px-4 py-2 rounded mx-1 bg-gray-200 hover:bg-gray-300"
                :class="{ 'bg-blue-400 text-white': selectedCategory === '' }" @click="filterByCategory('')">
                All
            </button>
            <template x-for="category in categories" :key="category">
                <button class="px-4 py-2 rounded mx-1 bg-gray-200 hover:bg-gray-300"
                    :class="{ 'bg-blue-400 text-white': selectedCategory === category }"
                    @click="filterByCategory(category)">
                    <span x-text="category"></span>
                </button>
            </template>
        </div>

        <!-- Search -->
        <div class="mb-4 flex">
            <button @click="showFilters = !showFilters" class="mb-4 bg-blue-500 text-white px-4 py-2 rounded  w-40">
                Toggle Filters
            </button>

            <input type="text" placeholder="Search..." class="w-full border p-2 rounded" x-model="searchQuery"
                @input="filterExams" />


        </div>

        <!-- Filters -->
        <div x-show="showFilters" class="mb-4 p-4 border rounded bg-white">
            <label class="block mb-2">
                <span class="text-gray-700">Filter by Candidate Name:</span>
                <input type="text" x-model="filterCandidateName" placeholder="Candidate Name"
                    class="mt-1 p-2 border rounded w-full" />
            </label>
            <label class="block mb-2">
                <span class="text-gray-700">Filter by Date Range:</span>
                <input type="date" x-model="filterStartDate" class="mt-1 p-2 border rounded w-full" />
                <input type="date" x-model="filterEndDate" class="mt-1 p-2 border rounded w-full" />
            </label>
            <button @click="applyFilters" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Apply Filters
            </button>
        </div>

        <!-- Add New Card Button -->
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
            @click="openModal('add')">
            Add Card
        </button>

        <!-- Add/Edit Modal -->
        @include('inc.addEditForm')

        <!-- Card List -->
       @include('inc.card')

        <!-- Map Modal -->
        @include('inc.view')

    </div>

    <script>
        function examApp() {
            return {
                categories: @json($categories),
                exams: @json($exams),
                locations: ['London', 'Sydney', 'Berlin', 'New York'],
                filteredExams: [],
                searchQuery: '',
                selectedCategory: '',
                showFilters: false,
                filterCandidateName: '',
                filterStartDate: '',
                filterEndDate: '',
                isModalOpen: false,
                modalTitle: '',
                form: {
                    id: null,
                    Title: '',
                    Description: '',
                    CandidateName: '',
                    Date: '',
                    LocationName: 'London',
                    Longitude: '',
                    Latitude: '',
                },
                selectedExam: null,

                init() {
                    this.filteredExams = [...this.exams];
                },

                openModal(mode, exam = null) {
                    this.selectedExam = null;
                    this.isModalOpen = true;
                    if (mode === 'edit') {
                        this.modalTitle = 'Edit Card';
                        this.form = {
                            ...exam
                        };
                        this.form.Date = this.formatDate(this.form.Date, true);
                    } else {
                        this.modalTitle = 'Add Card';
                        this.form = {
                            id: null,
                            Title: '',
                            Description: '',
                            CandidateName: '',
                            Date: '',
                            LocationName: 'London',
                            Longitude: '',
                            Latitude: '',
                        };
                    }
                },

                closeModal() {
                    this.isModalOpen = false;
                },
                formatDate(date, forInput = false) {
            const parsedDate = new Date(date);
            if (isNaN(parsedDate)) {
              // Try to parse the date manually if the Date object fails
              const parts = date.split(/[-T:\/\s:]/);
              if (parts.length >= 5) {
                const day = parts[0].padStart(2, "0");
                const month = parts[1].padStart(2, "0");
                const year = parts[2];
                const hour = parts[3].padStart(2, "0");
                const minute = parts[4].padStart(2, "0");
                return forInput
                  ? `${year}-${month}-${day}T${hour}:${minute}`
                  : `${day}/${month}/${year} ${hour}:${minute}`;
              }
              return "Invalid Date";
            }

            const day = String(parsedDate.getDate()).padStart(2, "0");
            const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
            const year = parsedDate.getFullYear();
            const hour = String(parsedDate.getHours()).padStart(2, "0");
            const minute = String(parsedDate.getMinutes()).padStart(2, "0");

            return forInput
              ? `${year}-${month}-${day}T${hour}:${minute}`
              : `${day}/${month}/${year} ${hour}:${minute}`;
          },

                saveCard() {
                    if (this.form.id) {
                        const index = this.exams.findIndex((e) => e.id === this.form.id);
                        this.exams.splice(index, 1, {
                            ...this.form
                        });
                    } else {
                        this.form.id = Date.now();
                        this.exams.push({
                            ...this.form
                        });
                    }
                    this.closeModal();
                    this.filterExams();
                },

                deleteCard(id) {
                    this.exams = this.exams.filter((exam) => exam.id !== id);
                    this.filterExams();
                },

                filterByCategory(category) {
                    this.selectedCategory = category;

                    this.filterExams();
                },

                filterExams() {
                    let filtered = this.exams;
                    if (this.searchQuery) {
                        filtered = filtered.filter(
                            (exam) =>
                            exam.Title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            exam.Description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            exam.CandidateName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            exam.LocationName.toLowerCase().includes(this.searchQuery.toLowerCase())
                        );
                    }

                    if (this.selectedCategory !== "") {
                        filtered = filtered.filter(
                            (exam) => exam.LocationName === this.selectedCategory
                        );
                    } else {
                        filtered = filtered.filter(
                            (exam) => exam.LocationName
                        );
                    }

                    if (this.filterCandidateName) {
                        filtered = filtered.filter(
                            (exam) =>
                            exam.CandidateName.toLowerCase().includes(this.filterCandidateName.toLowerCase())
                        );
                    }

                    if (this.filterStartDate) {
                        filtered = filtered.filter(
                            (exam) => new Date(exam.Date) >= new Date(this.filterStartDate)
                        );
                    }

                    if (this.filterEndDate) {
                        filtered = filtered.filter(
                            (exam) => new Date(exam.Date) <= new Date(this.filterEndDate)
                        );
                    }


                    this.filteredExams = filtered.sort((a, b) => new Date(a.Date) - new Date(b.Date));

                },

                validateForm() {
                    this.errors = {};
                    if (!this.newCard.Title) {
                        this.errors.Title = "Title is required.";
                    }

                    if (!this.newCard.Description) {
                        this.errors.Description = "Description is required.";
                    }

                    if (!this.newCard.CandidateName) {
                        this.errors.CandidateName = "Candidate Name is required.";
                    }

                    if (!this.newCard.Date) {
                        this.errors.Date = "Date is required.";
                    }

                    if (!this.newCard.LocationName) {
                        this.errors.LocationName = "Location Name is required.";
                    }

                    if (!this.newCard.Latitude || isNaN(this.newCard.Latitude)) {
                        this.errors.Latitude = "Valid Latitude is required.";
                    }
                    if (!this.newCard.Longitude || isNaN(this.newCard.Longitude)) {
                        this.errors.Longitude = "Valid Longitude is required.";
                    }
                    if (Object.keys(this.errors).length === 0) {
                        this.isEdit ? this.updateCard() : this.addCard();
                    }
                },
                applyFilters() {
                    this.filterExams();
                },

                showMap(exam) {
                    const mapCanvas = document.getElementById('map_canvas');
                    const location = {
                        lat: parseFloat(exam.Latitude),
                        lng: parseFloat(exam.Longitude)
                    };
                    const map = new google.maps.Map(mapCanvas, {
                        zoom: 10,
                        center: location,
                    });
                    new google.maps.Marker({
                        position: location,
                        map: map
                    });
                },
                initializeMap(lat, lng) {
                    const myLatlng = new google.maps.LatLng(lat, lng);
                    const myOptions = {
                        zoom: 8,
                        center: myLatlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                    };
                    const map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
                },
                getSelectedExam(exam) {
                    this.selectedExam = exam;
                    setTimeout(() => {
                        this.initializeMap(exam.Latitude, exam.Longitude);
                    }, 100);
                },

            };
        }
    </script>
</body>

</html>
