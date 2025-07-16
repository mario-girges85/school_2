import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { COLORS } from "../constants/colors";
import exams from "../exams/examsData";

// Example questions for demonstration
const sampleQuestions = [
  {
    id: 1,
    type: "truefalse",
    question: "The earth is flat.",
    correctAnswer: false,
  },
  {
    id: 2,
    type: "mcq",
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "London", "Madrid"],
    correctAnswer: 1,
  },
  {
    id: 3,
    type: "written",
    question: "Explain the process of photosynthesis.",
    correctAnswer: "Photosynthesis is the process by which green plants...",
  },
];

const TakeExam = () => {
  const { examId } = useParams();
  const location = useLocation();
  const correctionMode =
    new URLSearchParams(location.search).get("correction") === "1";
  const exam = exams.find((e) => e.id === Number(examId));
  // For demonstration, prefill answers with a wrong answer for the first question in correction mode
  const [answers, setAnswers] = useState(() => {
    if (correctionMode) {
      return {
        1: true, // Wrong answer for Q1 (correct is false)
        2: 1, // Correct answer for Q2
        3: "Incorrect written answer.", // Wrong answer for Q3
      };
    }
    return {};
  });
  const questions = sampleQuestions; // Replace with exam.questions if available

  const handleChange = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally submit answers here
    alert("Exam submitted! (not implemented)");
  };

  if (!exam) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">Exam not found.</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">{exam.title}</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((q, idx) => (
            <div key={q.id} className="mb-4">
              <div className="mb-2 font-medium text-neutral-800">
                {idx + 1}. {q.question}
              </div>
              {q.type === "truefalse" && (
                <div className="flex gap-4">
                  {[true, false].map((val, i) => {
                    const isCorrect = correctionMode && val === q.correctAnswer;
                    const isWrong =
                      correctionMode &&
                      answers[q.id] === val &&
                      val !== q.correctAnswer;
                    return (
                      <label
                        key={val.toString()}
                        className={`px-4 py-2 rounded-md border cursor-pointer ${
                          isCorrect
                            ? "bg-green-100 border-green-400 text-green-800"
                            : isWrong
                            ? "bg-red-100 border-red-400 text-red-800"
                            : "bg-neutral-50 border-neutral-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q${q.id}`}
                          value={val}
                          checked={answers[q.id] === val}
                          onChange={() => handleChange(q.id, val)}
                          disabled={correctionMode}
                          className="mr-2"
                        />
                        {val ? "True" : "False"}
                      </label>
                    );
                  })}
                </div>
              )}
              {q.type === "mcq" && (
                <div className="flex flex-col gap-2">
                  {q.options.map((opt, i) => {
                    const isCorrect = correctionMode && i === q.correctAnswer;
                    const isWrong =
                      correctionMode &&
                      answers[q.id] === i &&
                      i !== q.correctAnswer;
                    return (
                      <label
                        key={opt}
                        className={`px-4 py-2 rounded-md border cursor-pointer ${
                          isCorrect
                            ? "bg-green-100 border-green-400 text-green-800"
                            : isWrong
                            ? "bg-red-100 border-red-400 text-red-800"
                            : "bg-neutral-50 border-neutral-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q${q.id}`}
                          value={i}
                          checked={answers[q.id] === i}
                          onChange={() => handleChange(q.id, i)}
                          disabled={correctionMode}
                          className="mr-2"
                        />
                        {opt}
                      </label>
                    );
                  })}
                </div>
              )}
              {q.type === "written" && (
                <div>
                  <textarea
                    className="w-full border border-neutral-300 rounded-md p-2 min-h-[80px]"
                    value={answers[q.id] || ""}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    disabled={correctionMode}
                  />
                  {correctionMode && (
                    <div className="mt-2 text-sm">
                      <span className="font-semibold text-green-700">
                        Correct Answer:
                      </span>
                      <div className="bg-green-50 border border-green-200 rounded-md p-2 mt-1 text-green-900 whitespace-pre-line">
                        {q.correctAnswer}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {!correctionMode && (
            <Button type="submit" fullWidth variant="primary">
              Submit Exam
            </Button>
          )}
        </form>
      </Card>
    </div>
  );
};

export default TakeExam;
