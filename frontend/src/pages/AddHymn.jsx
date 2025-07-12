import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

// --- Sub-components ---

const HymnHeader = () => (
  <div className="text-center mb-8">
    <div className="flex justify-center mb-4">
      <img src={logo} alt="Deacons School Logo" className="h-12 w-auto" />
    </div>
    <h1 className="text-3xl font-bold text-neutral-900 mb-2">Add New Hymn</h1>
    <p className="text-neutral-600">
      Upload audio file and add lyrics in multiple languages
    </p>
  </div>
);

const HymnBasicInformationForm = ({ formData, handleInputChange }) => (
  <div>
    <h2 className="text-xl font-semibold text-neutral-900 mb-6">
      Basic Information
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Hymn Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Enter hymn title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Category *
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Select category</option>
          <option value="Praise">Praise</option>
          <option value="Special Occasions">Special Occasions</option>
          <option value="Biblical">Biblical</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Duration (Auto-detected)
        </label>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          readOnly
          className="w-full px-4 py-2 border border-neutral-300 rounded-md bg-neutral-50 text-neutral-600"
          placeholder="Will be detected from audio file"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Audio File *
        </label>
        <input
          type="file"
          name="audioFile"
          onChange={handleInputChange}
          accept="audio/*"
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <p className="text-xs text-neutral-500 mt-1">
          Supported formats: MP3, WAV, M4A
        </p>
      </div>
    </div>
  </div>
);

const HymnDescriptionForm = ({ formData, handleInputChange }) => (
  <div>
    <label className="block text-sm font-medium text-neutral-700 mb-2">
      Description
    </label>
    <textarea
      name="description"
      value={formData.description}
      onChange={handleInputChange}
      rows={3}
      className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      placeholder="Enter hymn description"
    />
  </div>
);

const HymnLyricsForm = ({ formData, handleInputChange }) => (
  <div>
    <h2 className="text-xl font-semibold text-neutral-900 mb-6">Lyrics</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Arabic Lyrics
        </label>
        <textarea
          name="arabicLyrics"
          value={formData.arabicLyrics}
          onChange={handleInputChange}
          rows={8}
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Enter Arabic lyrics"
          dir="rtl"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Coptic Lyrics
        </label>
        <textarea
          name="copticLyrics"
          value={formData.copticLyrics}
          onChange={handleInputChange}
          rows={8}
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Enter Coptic lyrics"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Arabic Coptic Lyrics
        </label>
        <textarea
          name="arabicCopticLyrics"
          value={formData.arabicCopticLyrics}
          onChange={handleInputChange}
          rows={8}
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Enter Arabic Coptic mixed lyrics"
          dir="rtl"
        />
      </div>
    </div>
  </div>
);

const HymnFormActions = ({ isSubmitting }) => (
  <div className="flex justify-between items-center pt-6 border-t border-neutral-200">
    <Link
      to="/hymns"
      className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors duration-200"
    >
      Cancel
    </Link>
    <button
      type="submit"
      disabled={isSubmitting}
      className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-8 py-2 rounded-md font-medium transition-colors duration-200 inline-flex items-center"
    >
      {isSubmitting ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Adding Hymn...
        </>
      ) : (
        "Add Hymn"
      )}
    </button>
  </div>
);

const BackToHymnsLink = () => (
  <div className="mt-8 text-center">
    <Link
      to="/hymns"
      className="text-neutral-600 hover:text-neutral-800 transition-colors duration-200 inline-flex items-center"
    >
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Back to Hymns Collection
    </Link>
  </div>
);

// --- Main AddHymn Component ---

const AddHymn = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    audioFile: null,
    arabicLyrics: "",
    copticLyrics: "",
    arabicCopticLyrics: "",
    duration: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      // Handle audio file upload and extract duration
      const file = files[0];
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);

      audio.addEventListener("loadedmetadata", () => {
        const durationInSeconds = Math.round(audio.duration);
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        const formattedDuration = `${minutes}:${seconds
          .toString()
          .padStart(2, "0")}`;

        setFormData((prev) => ({
          ...prev,
          audioFile: file,
          duration: formattedDuration,
        }));
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Simulate API call - replace with your actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        audioFile: null,
        arabicLyrics: "",
        copticLyrics: "",
        arabicCopticLyrics: "",
        duration: "",
      });

      alert("Hymn added successfully!");
      navigate("/hymns");
    } catch (err) {
      console.error("Error adding hymn:", err);
      alert("Failed to add hymn. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <HymnHeader />

        <div className="bg-white rounded-lg shadow-lg p-8 border border-neutral-200">
          <form onSubmit={handleSubmit} className="space-y-8">
            <HymnBasicInformationForm
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <HymnDescriptionForm
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <HymnLyricsForm
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <HymnFormActions isSubmitting={isSubmitting} />
          </form>
        </div>

        <BackToHymnsLink />
      </div>
    </div>
  );
};

export default AddHymn;
