import React from "react";
import { useNavigate } from "react-router-dom";
import Page from "../components/layout/Page";
import Container from "../components/layout/Container";
import ContentCard from "../components/cards/ContentCard";
import Button from "../components/ui/Button";

const mockClasses = [
  {
    id: 1,
    name: "Grade 1",
    description: "First grade class for young students.",
    image: "",
    studentsCount: 25,
    teacher: "Sarah Adel",
  },
  {
    id: 2,
    name: "Grade 2",
    description: "Second grade class with a focus on reading.",
    image: "",
    studentsCount: 22,
    teacher: "George Samir",
  },
  {
    id: 3,
    name: "Grade 3",
    description: "Third grade class for advanced learners.",
    image: "",
    studentsCount: 28,
    teacher: "Mina Nabil",
  },
];

const Classes = () => {
  const navigate = useNavigate();
  return (
    <Page title="Classes" subtitle="Browse all classes in the school">
      <Container maxWidth="4xl">
        <div className="flex justify-end mb-6">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate("/classes/create")}
          >
            + Create New Class
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClasses.map((cls) => (
            <div
              key={cls.id}
              onClick={() => navigate(`/classes/${cls.id}`)}
              className="cursor-pointer h-full"
            >
              <ContentCard
                title={cls.name}
                subtitle={`Teacher: ${cls.teacher}`}
                className="h-full"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={cls.image || "/default-class.png"}
                    alt={cls.name}
                    className="h-20 w-20 rounded-lg object-cover mb-4 border border-neutral-200 bg-neutral-100"
                  />
                  <p className="text-neutral-700 mb-2 text-center">
                    {cls.description}
                  </p>
                  <div className="text-sm text-neutral-500">
                    Students: {cls.studentsCount}
                  </div>
                </div>
              </ContentCard>
            </div>
          ))}
        </div>
      </Container>
    </Page>
  );
};

export default Classes;
