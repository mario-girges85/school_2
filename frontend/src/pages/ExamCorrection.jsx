import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Page from "../components/layout/Page";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";

// Mock correction data
const mockCorrections = {
  Math: {
    student: "Mariam Fady",
    subject: "Math",
    score: 95,
    details: "Excellent work! Only one minor mistake in question 4.",
    questions: [
      {
        text: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: 1,
        chosen: 1,
      },
      {
        text: "What is 10 / 2?",
        answers: ["2", "5", "10", "20"],
        correct: 1,
        chosen: 1,
      },
      {
        text: "What is 7 x 3?",
        answers: ["21", "24", "18", "20"],
        correct: 0,
        chosen: 0,
      },
      {
        text: "What is the square root of 16?",
        answers: ["2", "4", "8", "16"],
        correct: 1,
        chosen: 2, // wrong
      },
      {
        text: "What is 9 - 3?",
        answers: ["3", "6", "9", "12"],
        correct: 1,
        chosen: 1,
      },
    ],
  },
  Science: {
    student: "Mariam Fady",
    subject: "Science",
    score: 88,
    details: "Good understanding, but review the experiment section.",
    questions: [
      {
        text: "What is H2O?",
        answers: ["Oxygen", "Hydrogen", "Water", "Carbon Dioxide"],
        correct: 2,
        chosen: 2,
      },
      {
        text: "What planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 1,
        chosen: 0, // wrong
      },
    ],
  },
};

// --- Sub-components ---

const CorrectionSummary = ({ student, subject, score, details }) => (
  <div className="mb-6">
    <div className="text-lg font-semibold mb-1">Student: {student}</div>
    <div className="text-neutral-700 mb-1">Subject: {subject}</div>
    <div className="text-neutral-700 mb-1">
      Score: <span className="font-bold">{score}</span>
    </div>
    <div className="text-neutral-500 mb-4">{details}</div>
  </div>
);

const QuestionCorrection = ({ question, index }) => {
  const { text, answers, correct, chosen } = question;
  return (
    <div className="mb-4">
      <div className="font-semibold mb-2">
        Q{index + 1}: {text}
      </div>
      <ul className="space-y-2">
        {answers.map((ans, i) => {
          let style = "px-4 py-2 rounded border";
          if (i === correct && i === chosen) {
            style +=
              " bg-green-100 border-green-500 text-green-800 font-semibold";
          } else if (i === correct) {
            style +=
              " bg-green-100 border-green-500 text-green-800 font-semibold";
          } else if (i === chosen && chosen !== correct) {
            style += " bg-red-100 border-red-500 text-red-800 font-semibold";
          } else {
            style += " border-neutral-200";
          }
          return (
            <li key={i} className={style}>
              {ans}
              {i === correct && (
                <span className="ml-2 text-green-600">(Correct)</span>
              )}
              {i === chosen && i !== correct && (
                <span className="ml-2 text-red-600">(Your answer)</span>
              )}
              {i === chosen && i === correct && (
                <span className="ml-2 text-green-600">(Your answer)</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// --- Main ExamCorrection Component ---

const ExamCorrection = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const correction = mockCorrections[subject];

  if (!correction) {
    return (
      <Page title="Correction Not Found">
        <Container>
          <div className="text-center py-12 text-neutral-500">
            No correction data for this subject.
          </div>
          <div className="flex justify-center mt-6">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </Container>
      </Page>
    );
  }

  return (
    <Page title={`Correction: ${correction.subject}`}>
      <Container maxWidth="md">
        <CorrectionSummary
          student={correction.student}
          subject={correction.subject}
          score={correction.score}
          details={correction.details}
        />
        <div className="space-y-8">
          {correction.questions.map((q, idx) => (
            <QuestionCorrection key={idx} question={q} index={idx} />
          ))}
        </div>
        <div className="flex justify-end mt-8">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </Container>
    </Page>
  );
};

export default ExamCorrection;
