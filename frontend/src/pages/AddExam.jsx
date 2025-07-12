import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

// --- Sub-components ---

const ExamHeader = () => (
  <div className="text-center mb-8">
    <div className="flex justify-center mb-4">
      <img
        src={logo}
        alt="Saint Demiana Deacos School Logo"
        className="h-12 w-auto"
      />
    </div>
    <h1 className="text-3xl font-bold text-neutral-900 mb-2">
      Create New Exam
    </h1>
    <p className="text-neutral-600">
      Build comprehensive exams with multiple question types
    </p>
  </div>
);

const ExamInformationForm = ({ examData, handleExamDataChange, errors }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200">
    <h2 className="text-xl font-semibold text-neutral-900 mb-4">
      Exam Information
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Exam Title
        </label>
        <input
          type="text"
          name="title"
          value={examData.title}
          onChange={handleExamDataChange}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
            errors.title ? "border-red-500" : "border-neutral-300"
          }`}
          placeholder="Enter exam title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Duration (minutes)
        </label>
        <input
          type="number"
          name="duration"
          value={examData.duration}
          onChange={handleExamDataChange}
          min="1"
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
            errors.duration ? "border-red-500" : "border-neutral-300"
          }`}
        />
        {errors.duration && (
          <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={examData.description}
          onChange={handleExamDataChange}
          rows="3"
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
            errors.description ? "border-red-500" : "border-neutral-300"
          }`}
          placeholder="Enter exam description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>
    </div>
  </div>
);

const AddQuestionForm = ({
  currentQuestion,
  questionTypes,
  handleQuestionChange,
  handleOptionChange,
  handleCorrectAnswerChange,
  addQuestion,
  errors,
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200">
    <h2 className="text-xl font-semibold text-neutral-900 mb-4">
      Add Question
    </h2>

    <div className="space-y-6">
      {/* Question Type */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Question Type
        </label>
        <select
          name="type"
          value={currentQuestion.type}
          onChange={handleQuestionChange}
          className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
        >
          {questionTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Question Text */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Question
        </label>
        <textarea
          name="question"
          value={currentQuestion.question}
          onChange={handleQuestionChange}
          rows="3"
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
            errors.question ? "border-red-500" : "border-neutral-300"
          }`}
          placeholder="Enter your question"
        />
        {errors.question && (
          <p className="mt-1 text-sm text-red-600">{errors.question}</p>
        )}
      </div>

      {/* Options for Multiple Choice */}
      {currentQuestion.type === "multiple-choice" && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Options
          </label>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className={`flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                    errors.options ? "border-red-500" : "border-neutral-300"
                  }`}
                  placeholder={`Option ${index + 1}`}
                />
                <input
                  type="radio"
                  name="correctAnswer"
                  value={option}
                  checked={currentQuestion.correctAnswer === option}
                  onChange={handleCorrectAnswerChange}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-600">Correct</span>
              </div>
            ))}
          </div>
          {errors.options && (
            <p className="mt-1 text-sm text-red-600">{errors.options}</p>
          )}
          {errors.correctAnswer && (
            <p className="mt-1 text-sm text-red-600">{errors.correctAnswer}</p>
          )}
        </div>
      )}

      {/* True/False Options */}
      {currentQuestion.type === "true-false" && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Correct Answer
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="correctAnswer"
                value="true"
                checked={currentQuestion.correctAnswer === "true"}
                onChange={handleCorrectAnswerChange}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-neutral-700">True</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="correctAnswer"
                value="false"
                checked={currentQuestion.correctAnswer === "false"}
                onChange={handleCorrectAnswerChange}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-neutral-700">False</span>
            </label>
          </div>
          {errors.correctAnswer && (
            <p className="mt-1 text-sm text-red-600">{errors.correctAnswer}</p>
          )}
        </div>
      )}

      {/* Model Answer for Written */}
      {currentQuestion.type === "written" && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Model Answer
          </label>
          <textarea
            name="correctAnswer"
            value={currentQuestion.correctAnswer}
            onChange={handleQuestionChange}
            rows="4"
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
              errors.correctAnswer ? "border-red-500" : "border-neutral-300"
            }`}
            placeholder="Enter the model answer"
          />
          {errors.correctAnswer && (
            <p className="mt-1 text-sm text-red-600">{errors.correctAnswer}</p>
          )}
        </div>
      )}

      {/* Marks */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Marks
        </label>
        <input
          type="number"
          name="marks"
          value={currentQuestion.marks}
          onChange={handleQuestionChange}
          min="1"
          className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
        />
      </div>

      {/* Add Question Button */}
      <button
        type="button"
        onClick={addQuestion}
        className="w-full bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
      >
        Add Question
      </button>
    </div>
  </div>
);

const QuestionsList = ({
  questions,
  calculateTotalMarks,
  removeQuestion,
  errors,
}) => (
  <>
    {questions.length > 0 && (
      <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">
            Questions ({questions.length})
          </h2>
          <div className="text-sm text-neutral-600">
            Total Marks: {calculateTotalMarks()}
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((question) => (
            <div
              key={question.id}
              className="border border-neutral-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded">
                    {question.type}
                  </span>
                  <span className="text-sm text-neutral-600">
                    {question.marks} mark{question.marks > 1 ? "s" : ""}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeQuestion(question.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
              <p className="text-neutral-900 mb-2">{question.question}</p>
              {question.type === "multiple-choice" && (
                <div className="text-sm text-neutral-600">
                  <p>Options: {question.options.join(", ")}</p>
                  <p>Correct: {question.correctAnswer}</p>
                </div>
              )}
              {question.type === "true-false" && (
                <p className="text-sm text-neutral-600">
                  Correct Answer: {question.correctAnswer}
                </p>
              )}
              {question.type === "written" && (
                <p className="text-sm text-neutral-600">
                  Model Answer: {question.correctAnswer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
    {errors.questions && (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-sm text-red-600">{errors.questions}</p>
      </div>
    )}
  </>
);

// --- Main AddExam Component ---

const AddExam = () => {
  const navigate = useNavigate();
  const [examData, setExamData] = useState({
    title: "",
    description: "",
    duration: 60, // minutes
    totalMarks: 0,
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    type: "multiple-choice",
    options: ["", "", "", ""],
    correctAnswer: "",
    marks: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const questionTypes = [
    { value: "multiple-choice", label: "Multiple Choice" },
    { value: "true-false", label: "True/False" },
    { value: "written", label: "Written Answer" },
  ];

  const handleExamDataChange = (e) => {
    const { name, value } = e.target;
    setExamData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.map((option, i) => (i === index ? value : option)),
    }));
  };

  const handleCorrectAnswerChange = (e) => {
    const { value } = e.target;
    setCurrentQuestion((prev) => ({
      ...prev,
      correctAnswer: value,
    }));
  };

  const addQuestion = () => {
    // Validate current question
    if (!currentQuestion.question.trim()) {
      setErrors({ question: "Question text is required" });
      return;
    }

    if (currentQuestion.type === "multiple-choice") {
      if (currentQuestion.options.some((opt) => !opt.trim())) {
        setErrors({ options: "All options must be filled" });
        return;
      }
      if (!currentQuestion.correctAnswer) {
        setErrors({ correctAnswer: "Please select the correct answer" });
        return;
      }
    }

    if (currentQuestion.type === "true-false") {
      if (!currentQuestion.correctAnswer) {
        setErrors({ correctAnswer: "Please select the correct answer" });
        return;
      }
    }

    if (currentQuestion.type === "written") {
      if (!currentQuestion.correctAnswer.trim()) {
        setErrors({ correctAnswer: "Model answer is required" });
        return;
      }
    }

    // Add question to the list
    const newQuestion = {
      ...currentQuestion,
      id: Date.now(),
    };

    setQuestions((prev) => [...prev, newQuestion]);

    // Reset current question
    setCurrentQuestion({
      question: "",
      type: "multiple-choice",
      options: ["", "", "", ""],
      correctAnswer: "",
      marks: 1,
    });

    setErrors({});
  };

  const removeQuestion = (questionId) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!examData.title.trim()) {
      newErrors.title = "Exam title is required";
    }

    if (!examData.description.trim()) {
      newErrors.description = "Exam description is required";
    }

    if (questions.length === 0) {
      newErrors.questions = "At least one question is required";
    }

    if (examData.duration < 1) {
      newErrors.duration = "Duration must be at least 1 minute";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const examPayload = {
        title: examData.title.trim(),
        description: examData.description.trim(),
        duration: parseInt(examData.duration),
        totalMarks: questions.reduce((sum, q) => sum + q.marks, 0),
        questions: questions.map((q) => ({
          question: q.question,
          type: q.type,
          options: q.type === "multiple-choice" ? q.options : [],
          correctAnswer: q.correctAnswer,
          marks: q.marks,
        })),
      };

      // API call - replace with your actual API endpoint
      const response = await fetch("/api/exams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examPayload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Exam created successfully:", data);
        // Redirect to exams list or dashboard
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Exam creation failed:", errorData);
        setErrors({
          submit:
            errorData.message || "Failed to create exam. Please try again.",
        });
      }
    } catch (error) {
      console.error("Exam creation error:", error);
      setErrors({
        submit: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalMarks = () => {
    return questions.reduce((sum, question) => sum + question.marks, 0);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ExamHeader />

        <form onSubmit={handleSubmit} className="space-y-8">
          <ExamInformationForm
            examData={examData}
            handleExamDataChange={handleExamDataChange}
            errors={errors}
          />

          <AddQuestionForm
            currentQuestion={currentQuestion}
            questionTypes={questionTypes}
            handleQuestionChange={handleQuestionChange}
            handleOptionChange={handleOptionChange}
            handleCorrectAnswerChange={handleCorrectAnswerChange}
            addQuestion={addQuestion}
            errors={errors}
          />

          <QuestionsList
            questions={questions}
            calculateTotalMarks={calculateTotalMarks}
            removeQuestion={removeQuestion}
            errors={errors}
          />

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-neutral-600 hover:text-neutral-800 transition-colors duration-200"
            >
              ← Back to Home
            </Link>
            <button
              type="submit"
              disabled={isLoading || questions.length === 0}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Exam..." : "Create Exam"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExam;
