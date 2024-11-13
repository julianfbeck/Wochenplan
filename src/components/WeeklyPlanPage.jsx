// src/components/WeeklyPlanPage.jsx
import React, { useState } from "react";
import { WeeklyPlanPDF } from "./WeeklyPlanPdf";

const defaultStudent = {
  name: "",
  mandatory: {
    german: [
      { task: "Niko-AH S. 54 + 55", book: "3" },
      { task: "Lies dich fit", book: "3" },
      { task: "Lernwörter Nr. 1", book: "2" },
    ],
    math: [
      { task: "Jojo-ÜH S. 6 + 7", book: "Jojo" },
      { task: "Jojo-ÜH S. 15", book: "Jojo" },
      { task: "Jojo- AH S. 6 + 7", book: "Jojo" },
    ],
  },
  additional: {
    german: [
      { task: "Niko-AH S. 56 + 57", book: "1" },
      { task: "Lies dich fit", book: "1" },
    ],
    math: [{ task: "Zuerst 5", book: "1" }],
  },
  homework: {
    german: [
      {
        task: "Lernwörter Nr. 1 schreiben üben:",
        details: "Lama, Nase, Esel, lesen, malen, Insel",
      },
    ],
  },
};

const defaultAnnouncements = [
  {
    date: "14.11.24",
    day: "Donnerstag",
    text: "werden wir ein Buchstabendiktat schreiben.",
  },
  {
    date: "19.11.24",
    day: "Dienstag",
    text: "werde ich die Lernwörter abfragen.",
  },
  {
    date: "15.11.24",
    day: "Freitag",
    text: "findet unser Bücherflohmarkt statt. Wir freuen uns, wenn Sie Kinderbücher spenden, die sie nicht mehr brauchen!",
  },
];

export const WeeklyPlanPage = () => {
  const [weekStart, setWeekStart] = useState("11.11.24");
  const [weekEnd, setWeekEnd] = useState("15.11.24");
  const [students, setStudents] = useState([defaultStudent]);
  const [announcements, setAnnouncements] = useState(defaultAnnouncements);

  const addStudent = () => {
    setStudents([...students, { ...defaultStudent, name: "" }]);
  };

  const updateStudent = (index, field, value) => {
    const updatedStudents = [...students];
    if (field.includes(".")) {
      const [section, subfield] = field.split(".");
      updatedStudents[index][section] = {
        ...updatedStudents[index][section],
        [subfield]: value,
      };
    } else {
      updatedStudents[index][field] = value;
    }
    setStudents(updatedStudents);
  };

  const addTask = (studentIndex, section, subject) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex][section][subject].push({
      task: "",
      book: "",
    });
    setStudents(updatedStudents);
  };

  const updateTask = (
    studentIndex,
    section,
    subject,
    taskIndex,
    field,
    value
  ) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex][section][subject][taskIndex][field] = value;
    setStudents(updatedStudents);
  };

  const addAnnouncement = () => {
    setAnnouncements([...announcements, { date: "", day: "", text: "" }]);
  };

  const updateAnnouncement = (index, field, value) => {
    const updatedAnnouncements = [...announcements];
    updatedAnnouncements[index][field] = value;
    setAnnouncements(updatedAnnouncements);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Wochenplan Generator</h1>

      {/* Week Date Range */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Wochendatum</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Von
            </label>
            <input
              type="text"
              value={weekStart}
              onChange={(e) => setWeekStart(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bis
            </label>
            <input
              type="text"
              value={weekEnd}
              onChange={(e) => setWeekEnd(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Students Section */}
      <div className="mb-8">
        {students.map((student, studentIndex) => (
          <div
            key={studentIndex}
            className="mb-8 bg-white p-6 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold mb-4">
              Schüler {studentIndex + 1}
            </h2>

            {/* Student Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={student.name}
                onChange={(e) =>
                  updateStudent(studentIndex, "name", e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>

            {/* Mandatory Tasks */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Pflichtaufgaben</h3>
              {["german", "math"].map((subject) => (
                <div key={subject} className="mb-4">
                  <h4 className="text-md font-medium mb-2">
                    {subject === "german" ? "Deutsch" : "Mathe"}
                  </h4>
                  {student.mandatory[subject].map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className="grid grid-cols-2 gap-2 mb-2"
                    >
                      <input
                        type="text"
                        value={task.task}
                        onChange={(e) =>
                          updateTask(
                            studentIndex,
                            "mandatory",
                            subject,
                            taskIndex,
                            "task",
                            e.target.value
                          )
                        }
                        placeholder="Aufgabe"
                        className="rounded-md border-gray-300 shadow-sm"
                      />
                      <input
                        type="text"
                        value={task.book}
                        onChange={(e) =>
                          updateTask(
                            studentIndex,
                            "mandatory",
                            subject,
                            taskIndex,
                            "book",
                            e.target.value
                          )
                        }
                        placeholder="Buch"
                        className="rounded-md border-gray-300 shadow-sm"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => addTask(studentIndex, "mandatory", subject)}
                    className="mt-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Aufgabe hinzufügen
                  </button>
                </div>
              ))}
            </div>

            {/* Additional Tasks - Similar structure as Mandatory Tasks */}
            {/* ... */}

            {/* Homework - Similar structure */}
            {/* ... */}
          </div>
        ))}
        <button
          onClick={addStudent}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Schüler hinzufügen
        </button>
      </div>

      {/* Announcements Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Ankündigungen</h2>
        {announcements.map((announcement, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              value={announcement.date}
              onChange={(e) =>
                updateAnnouncement(index, "date", e.target.value)
              }
              placeholder="Datum"
              className="rounded-md border-gray-300 shadow-sm"
            />
            <input
              type="text"
              value={announcement.day}
              onChange={(e) => updateAnnouncement(index, "day", e.target.value)}
              placeholder="Tag"
              className="rounded-md border-gray-300 shadow-sm"
            />
            <input
              type="text"
              value={announcement.text}
              onChange={(e) =>
                updateAnnouncement(index, "text", e.target.value)
              }
              placeholder="Text"
              className="rounded-md border-gray-300 shadow-sm"
            />
          </div>
        ))}
        <button
          onClick={addAnnouncement}
          className="mt-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
        >
          + Ankündigung hinzufügen
        </button>
      </div>

      {/* PDF Generation */}
      <div className="text-center">
        <WeeklyPlanPDF
          students={students}
          announcements={announcements}
          weekStart={weekStart}
          weekEnd={weekEnd}
        />
      </div>
    </div>
  );
};
