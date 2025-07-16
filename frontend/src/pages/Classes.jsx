import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { Button, Card, EmptyState } from "../components/ui";
import Page from "../components/layout/Page";
import Container from "../components/layout/Container";

const mockClasses = [
  {
    id: 1,
    name: "Grade 1",
    description: "First grade class for young students.",
    image:
      "https://png.pngtree.com/png-vector/20210409/ourmid/pngtree-classroom-teaching-icon-png-image_3143858.jpg",
    studentsCount: 25,
    teacher: "Sarah Adel",
  },
  {
    id: 2,
    name: "Grade 2",
    description: "Second grade class with a focus on reading.",
    image:
      "https://png.pngtree.com/png-vector/20210409/ourmid/pngtree-classroom-teaching-icon-png-image_3143858.jpg",
    studentsCount: 22,
    teacher: "George Samir",
  },
  {
    id: 3,
    name: "Grade 3",
    description: "Third grade class for advanced learners.",
    image:
      "https://static.vecteezy.com/system/resources/previews/044/615/515/non_2x/classroom-icon-editable-stroke-linear-style-sign-for-use-web-design-logo-symbol-illustration-vector.jpg",
    studentsCount: 28,
    teacher: "Mina Nabil",
  },
];

// --- Sub-components ---

const ClassesHeader = ({ onCreateClick }) => (
  <div className="flex justify-end mb-6">
    <Button variant="primary" size="md" onClick={onCreateClick}>
      + Create New Class
    </Button>
  </div>
);

const ClassCard = ({ cls, onClick }) => (
  <Card
    className="cursor-pointer h-full hover:shadow-lg transition-shadow duration-200"
    onClick={onClick}
  >
    <div className="flex flex-col items-center text-center">
      <img
        src={cls.image || "/default-class.png"}
        alt={cls.name}
        className="h-20 w-20 rounded-lg object-cover mb-4 border border-neutral-200 bg-neutral-100"
      />
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">
        {cls.name}
      </h3>
      <p className="text-neutral-700 mb-3 text-sm">{cls.description}</p>
      <div className="text-sm text-neutral-500 mb-2">
        Teacher: {cls.teacher}
      </div>
      <div className="text-sm text-neutral-500">
        Students: {cls.studentsCount}
      </div>
    </div>
  </Card>
);

const EmptyClassesState = ({ onCreateClick }) => (
  <EmptyState
    title="No Classes Found"
    description="Get started by creating your first class."
    icon={
      <svg
        className="h-12 w-12 text-neutral-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    }
    action={
      <Button variant="primary" onClick={onCreateClick}>
        Create First Class
      </Button>
    }
  />
);

// --- Main Classes Component ---

const Classes = () => {
  const navigate = useNavigate();

  const handleCreateClassClick = () => {
    navigate(ROUTES.CREATE_CLASS);
  };

  const handleClassCardClick = (classId) => {
    navigate(`${ROUTES.CLASSES}/${classId}`);
  };

  return (
    <Page title="Classes" subtitle="Browse all classes in the school">
      <Container maxWidth="4xl">
        <ClassesHeader onCreateClick={handleCreateClassClick} />

        {mockClasses.length === 0 ? (
          <EmptyClassesState onCreateClick={handleCreateClassClick} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockClasses.map((cls) => (
              <ClassCard
                key={cls.id}
                cls={cls}
                onClick={() => handleClassCardClick(cls.id)}
              />
            ))}
          </div>
        )}
      </Container>
    </Page>
  );
};

export default Classes;
