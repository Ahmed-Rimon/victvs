import React, { useState, useEffect } from "react";
import ShowFilter from "./components/ShowFilter";
import SelectedExam from "./components/SelectedExam";
import FilteredCard from "./components/FilteredCard";
import ExamForm from "./components/ExamForm";

const ExamApp = () => {
  const [exams, setExams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCandidateName, setFilterCandidateName] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newCard, setNewCard] = useState({
    Title: "",
    Description: "",
    CandidateName: "",
    Date: "",
    LocationName: "",
    Latitude: "",
    Longitude: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // local PHP server
    //           "http://localhost/vic-php-api/api/exam/exams.php",

    //           API server
    //           "https://victvs-exam.futsalify.com/api/exam/exams.php",
    try {
      const response = await fetch(
        "https://victvs-exam.futsalify.com/api/exam/exams.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            authCode: "your_secure_auth_victvs",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setExams(data.Exams);
      setCategories([
        "All",
        ...new Set(data.Exams.map((exam) => exam.LocationName)),
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showMapData = (exam) => {
    setSelectedExam(exam);
    setTimeout(() => {
      initializeMap(exam.Latitude, exam.Longitude);
    }, 100);
  };
  const applyFilters = () => {
    filteredExams;
  };
  const initializeMap = (lat, lng) => {
    const myLatlng = new google.maps.LatLng(lat, lng);
    const myOptions = {
      zoom: 8,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newCard.Title) newErrors.Title = "Title is required.";
    if (!newCard.Description)
      newErrors.Description = "Description is required.";
    if (!newCard.CandidateName)
      newErrors.CandidateName = "Candidate Name is required.";
    if (!newCard.Date) newErrors.Date = "Date is required.";
    if (!newCard.LocationName)
      newErrors.LocationName = "Location Name is required.";
    if (!newCard.Latitude || isNaN(newCard.Latitude))
      newErrors.Latitude = "Valid Latitude is required.";
    if (!newCard.Longitude || isNaN(newCard.Longitude))
      newErrors.Longitude = "Valid Longitude is required.";

    if (Object.keys(newErrors).length === 0) {
      handleSaveCard();
    } else {
      setErrors(newErrors);
    }
  };

  const handleSaveCard = () => {
    if (isEdit) {
      const updatedExams = exams.map((exam) =>
        exam.id === newCard.id ? { ...newCard } : exam
      );
      setExams(updatedExams);
    } else {
      const newExam = { id: exams.length + 1, ...newCard };
      setExams([...exams, newExam]);
    }
    resetForm();
  };

  const openModal = (mode, id = null) => {
    setIsEdit(mode === "edit");
    if (mode === "edit") {
      const exam = exams.find((exam) => exam.id === id);
      exam.Date = formatDate(exam.Date, true);
      setNewCard({ ...exam });
    } else {
      resetForm();
    }
    setShowAddModal(true);
  };
  const formatDate = (date, forInput = false) => {
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
  };
  const deleteCard = (id) => {
    setExams(exams.filter((exam) => exam.id !== id));
  };

  const resetForm = () => {
    setNewCard({
      Title: "",
      Description: "",
      CandidateName: "",
      Date: "",
      LocationName: "",
      Latitude: "",
      Longitude: "",
    });
    setIsEdit(false);
    setShowAddModal(false);
    setErrors({});
  };

  const filteredExams = exams
    .filter((exam) =>
      searchQuery
        ? exam.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exam.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exam.CandidateName.toLowerCase().includes(
            searchQuery.toLowerCase()
          ) ||
          exam.LocationName.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .filter((exam) =>
      selectedCategory !== "All" ? exam.LocationName === selectedCategory : true
    )
    .filter((exam) =>
      filterCandidateName
        ? exam.CandidateName.toLowerCase().includes(
            filterCandidateName.toLowerCase()
          )
        : true
    )
    .filter(
      (exam) =>
        (!filterStartDate ||
          new Date(exam.Date) >= new Date(filterStartDate)) &&
        (!filterEndDate || new Date(exam.Date) <= new Date(filterEndDate))
    );

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">API Exam Data</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
          onClick={() => openModal("add")}
        >
          Add Card
        </button>

        {showAddModal && (
          <ExamForm
            newCard={newCard}
            setNewCard={setNewCard}
            errors={errors}
            validateForm={validateForm}
            resetForm={resetForm}
            setShowAddModal={setShowAddModal}
            isEdit={isEdit}
          />
        )}

        <div className="flex justify-center mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded mx-1 ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="mb-4 p-2 border rounded w-full"
        />

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Toggle Filters
        </button>

        {showFilters && (
          <ShowFilter
            filterCandidateName={filterCandidateName}
            setFilterCandidateName={setFilterCandidateName}
            filterStartDate={filterStartDate}
            setFilterStartDate={setFilterStartDate}
            filterEndDate={filterEndDate}
            setFilterEndDate={setFilterEndDate}
          />
        )}

        {selectedExam && (
          <SelectedExam
            selectedExam={selectedExam}
            setSelectedExam={setSelectedExam}
          />
        )}

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="loader"></div>
          </div>
        )}

        <FilteredCard
          filteredExams={filteredExams}
          showMapData={showMapData}
          openModal={openModal}
          deleteCard={deleteCard}
        />
      </div>
    </>
  );
};

export default ExamApp;
