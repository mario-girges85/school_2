import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Page from "../components/layout/Page";
import Container from "../components/layout/Container";
import ContentCard from "../components/cards/ContentCard";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

// Mock data
const mockTeachers = [
  { id: 1, name: "Sarah Adel" },
  { id: 2, name: "George Samir" },
  { id: 3, name: "Mina Nabil" },
  { id: 4, name: "Mariam Fady" },
  { id: 5, name: "Peter Samy" },
  { id: 6, name: "Sandra Nader" },
];

const mockStudents = [
  { id: 1, name: "Mariam Fady", email: "mariam@email.com" },
  { id: 2, name: "Peter Samy", email: "peter@email.com" },
  { id: 3, name: "Sandra Nader", email: "sandra@email.com" },
  { id: 4, name: "Mark Adel", email: "mark@email.com" },
  { id: 5, name: "Nourhan George", email: "nourhan@email.com" },
];

const mockClasses = [
  {
    id: 1,
    name: "Grade 1",
    description: "First grade class for young students.",
    subjects: {
      طقس: { teacherId: 1, time: "09:00" },
      قبطي: { teacherId: 2, time: "10:30" },
      الحان: { teacherId: 3, time: "12:00" },
    },
    students: [1, 2, 3],
  },
  {
    id: 2,
    name: "Grade 2",
    description: "Second grade class with a focus on reading.",
    subjects: {
      طقس: { teacherId: 4, time: "09:00" },
      قبطي: { teacherId: 5, time: "10:30" },
      الحان: { teacherId: 6, time: "12:00" },
    },
    students: [4, 5],
  },
  {
    id: 3,
    name: "Grade 3",
    description: "Third grade class for advanced learners.",
    subjects: {
      طقس: { teacherId: 1, time: "09:00" },
      قبطي: { teacherId: 2, time: "10:30" },
      الحان: { teacherId: 3, time: "12:00" },
    },
    students: [],
  },
];

// Subjects & Teachers Component
const SubjectsSection = ({ subjects, setSubjects, mockTeachers }) => {
  const handleChangeSubjectTeacher = (subjectName, teacherId) => {
    setSubjects((prev) => ({
      ...prev,
      [subjectName]: {
        ...prev[subjectName],
        teacherId: parseInt(teacherId, 10),
      },
    }));
  };

  const handleChangeSubjectTime = (subjectName, time) => {
    setSubjects((prev) => ({
      ...prev,
      [subjectName]: {
        ...prev[subjectName],
        time,
      },
    }));
  };

  return (
    <ContentCard title="Subjects & Teachers" className="mb-6">
      <div className="space-y-4">
        {Object.entries(subjects).map(([subjectName, subjectData]) => (
          <div
            key={subjectName}
            className="border rounded-lg p-4 bg-neutral-50"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-primary-600">
                {subjectName}
              </h3>
              <div className="text-sm text-neutral-500">
                Time: {subjectData.time}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Teacher
                </label>
                <Select
                  value={subjectData.teacherId}
                  onChange={(e) =>
                    handleChangeSubjectTeacher(subjectName, e.target.value)
                  }
                  options={mockTeachers.map((t) => ({
                    value: t.id,
                    label: t.name,
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={subjectData.time}
                  onChange={(e) =>
                    handleChangeSubjectTime(subjectName, e.target.value)
                  }
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </ContentCard>
  );
};

// Students Component
const StudentsSection = ({
  studentsInClass,
  studentsNotInClass,
  handleAddStudent,
  handleRemoveStudent,
  navigate,
  classId,
}) => {
  return (
    <ContentCard title="Students">
      <div className="mb-4">
        <Select
          value=""
          onChange={handleAddStudent}
          options={studentsNotInClass.map((s) => ({
            value: s.id,
            label: s.name,
          }))}
          placeholder="Add student..."
        />
      </div>
      <div className="overflow-x-auto">
        <ul className="divide-y divide-neutral-200">
          {studentsInClass.length === 0 && (
            <li className="py-4 text-neutral-500">
              No students in this class.
            </li>
          )}
          {studentsInClass.map((student) => (
            <li
              key={student.id}
              className="flex items-center justify-between py-3"
            >
              <div>
                <div
                  className="font-medium hover:underline cursor-pointer"
                  onClick={() => navigate(`/users/${student.id}`)}
                >
                  {student.name}
                </div>
                <div className="text-sm text-neutral-500">{student.email}</div>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveStudent(student.id)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="primary"
          onClick={() => navigate(`/classes/${classId}/attendance`)}
        >
          View Attendance
        </Button>
      </div>
    </ContentCard>
  );
};

// Attendance Component
const AttendanceSection = ({
  studentsInClass,
  attendanceDate,
  setAttendanceDate,
  attendanceForDate,
  handleAttendanceCheckbox,
  handleSaveAttendance,
  navigate,
}) => {
  return (
    <ContentCard title="Attendance" className="mt-8">
      <div className="flex items-center gap-4 mb-4">
        <label className="font-medium">Date:</label>
        <input
          type="date"
          value={attendanceDate}
          onChange={(e) => setAttendanceDate(e.target.value)}
          className="border rounded px-2 py-1"
          max={format(new Date(), "yyyy-MM-dd")}
        />
      </div>
      <div className="overflow-x-auto">
        <ul className="divide-y divide-neutral-200">
          {studentsInClass.length === 0 && (
            <li className="py-4 text-neutral-500">
              No students in this class.
            </li>
          )}
          {studentsInClass.map((student) => (
            <li
              key={student.id}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!!attendanceForDate[student.id]}
                  onChange={() => handleAttendanceCheckbox(student.id)}
                />
                <div
                  className="font-medium hover:underline cursor-pointer"
                  onClick={() => navigate(`/users/${student.id}`)}
                >
                  {student.name}
                </div>
                <div className="text-sm text-neutral-500">{student.email}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="primary" onClick={handleSaveAttendance}>
          Save Attendance
        </Button>
      </div>
    </ContentCard>
  );
};

// Announcements Component
const AnnouncementsSection = ({
  announcements,
  announcementTitle,
  setAnnouncementTitle,
  announcementMessage,
  setAnnouncementMessage,
  handleAddAnnouncement,
}) => {
  return (
    <ContentCard title="Announcements" className="mt-8">
      <form onSubmit={handleAddAnnouncement} className="mb-6 space-y-3">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={announcementTitle}
            onChange={(e) => setAnnouncementTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-2"
            required
          />
          <textarea
            placeholder="Message"
            value={announcementMessage}
            onChange={(e) => setAnnouncementMessage(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button variant="primary" type="submit">
            Post Announcement
          </Button>
        </div>
      </form>
      <div className="overflow-x-auto">
        <ul className="divide-y divide-neutral-200">
          {announcements.length === 0 && (
            <li className="py-4 text-neutral-500">No announcements yet.</li>
          )}
          {announcements.map((a) => (
            <li key={a.id} className="py-4">
              <div className="font-semibold text-lg mb-1">{a.title}</div>
              <div className="text-neutral-700 mb-1">{a.message}</div>
              <div className="text-xs text-neutral-500">
                Posted by {a.postedBy} on {a.date}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ContentCard>
  );
};

// Main ClassDetails Component
const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classId = parseInt(id, 10);
  const classData = mockClasses.find((c) => c.id === classId);

  // Local state for subjects and students
  const [subjects, setSubjects] = useState({ ...classData.subjects });
  const [studentIds, setStudentIds] = useState([...classData.students]);

  // Attendance state
  const [attendance, setAttendance] = useState({}); // { 'YYYY-MM-DD': { studentId: true/false } }
  const [attendanceDate, setAttendanceDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  // Announcements state (mock)
  const [announcements, setAnnouncements] = useState([
    // Example announcement
    // { id: '1', classId: classId, title: 'Welcome', message: 'Welcome to the class!', date: '2024-06-01', postedBy: 'Sarah Adel' }
  ]);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementMessage, setAnnouncementMessage] = useState("");

  const studentsInClass = mockStudents.filter((s) => studentIds.includes(s.id));
  const studentsNotInClass = mockStudents.filter(
    (s) => !studentIds.includes(s.id)
  );

  // Attendance for the selected date
  const attendanceForDate = attendance[attendanceDate] || {};

  const handleAttendanceCheckbox = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [attendanceDate]: {
        ...prev[attendanceDate],
        [studentId]: !prev[attendanceDate]?.[studentId],
      },
    }));
  };

  const handleSaveAttendance = () => {
    alert("Attendance saved!");
  };

  // Add student
  const handleAddStudent = (e) => {
    const studentId = parseInt(e.target.value, 10);
    if (!studentIds.includes(studentId)) {
      setStudentIds([...studentIds, studentId]);
    }
  };

  // Remove student
  const handleRemoveStudent = (studentId) => {
    setStudentIds(studentIds.filter((id) => id !== studentId));
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementMessage.trim()) return;
    setAnnouncements((prev) => [
      {
        id: uuidv4(),
        classId: classId,
        title: announcementTitle,
        message: announcementMessage,
        date: format(new Date(), "yyyy-MM-dd"),
        postedBy: "Sarah Adel", // mock teacher name
      },
      ...prev,
    ]);
    setAnnouncementTitle("");
    setAnnouncementMessage("");
  };

  return (
    <Page title={classData.name} subtitle={classData.description}>
      <Container maxWidth="2xl">
        <SubjectsSection
          subjects={subjects}
          setSubjects={setSubjects}
          mockTeachers={mockTeachers}
        />

        <StudentsSection
          studentsInClass={studentsInClass}
          studentsNotInClass={studentsNotInClass}
          handleAddStudent={handleAddStudent}
          handleRemoveStudent={handleRemoveStudent}
          navigate={navigate}
          classId={classId}
        />

        <AttendanceSection
          studentsInClass={studentsInClass}
          attendanceDate={attendanceDate}
          setAttendanceDate={setAttendanceDate}
          attendanceForDate={attendanceForDate}
          handleAttendanceCheckbox={handleAttendanceCheckbox}
          handleSaveAttendance={handleSaveAttendance}
          navigate={navigate}
        />

        <AnnouncementsSection
          announcements={announcements}
          announcementTitle={announcementTitle}
          setAnnouncementTitle={setAnnouncementTitle}
          announcementMessage={announcementMessage}
          setAnnouncementMessage={setAnnouncementMessage}
          handleAddAnnouncement={handleAddAnnouncement}
        />

        <div className="mt-8 flex justify-end">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back to Classes
          </Button>
        </div>
      </Container>
    </Page>
  );
};

export default ClassDetails;
