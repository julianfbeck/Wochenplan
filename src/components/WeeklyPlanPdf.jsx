// src/components/WeeklyPlanPDF.jsx
import React from "react";
import {
  pdf,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register fonts with UTF-8 support
Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "/Grundschrift.ttf",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Open Sans",
    fontSize: 12,
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  dateRange: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  studentName: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    borderBottom: 1,
    paddingBottom: 5,
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  subjectCol: {
    width: "15%",
  },
  taskCol: {
    width: "45%",
  },
  bookCol: {
    width: "15%",
  },
  checkCol: {
    width: "8%",
  },
  announcements: {
    marginTop: 20,
  },
  announcement: {
    marginBottom: 5,
    fontSize: 11,
  },
  signature: {
    marginTop: 30,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginTop: 20,
    width: "100%",
  },
  turtleIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 40,
    height: 40,
  },
  starIcon: {
    position: "absolute",
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  homeIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
});

export const WeeklyPlanPDF = ({
  students,
  announcements,
  weekStart,
  weekEnd,
}) => {
  const TableHeader = () => (
    <View style={[styles.tableRow, styles.tableHeader]}>
      <View style={[styles.tableCol, styles.subjectCol]}>
        <Text style={styles.tableCell}>Fach</Text>
      </View>
      <View style={[styles.tableCol, styles.taskCol]}>
        <Text style={styles.tableCell}>Aufgabe</Text>
      </View>
      <View style={[styles.tableCol, styles.bookCol]}>
        <Text style={styles.tableCell}>Heft</Text>
      </View>
      <View style={[styles.tableCol, styles.checkCol]}>
        <Text style={styles.tableCell}>S</Text>
      </View>
      <View style={[styles.tableCol, styles.checkCol]}>
        <Text style={styles.tableCell}>L</Text>
      </View>
      <View style={[styles.tableCol, styles.checkCol]}>
        <Text style={styles.tableCell}>E</Text>
      </View>
    </View>
  );

  const TaskRow = ({ subject, task, book }) => (
    <View style={styles.tableRow}>
      <View style={[styles.tableCol, styles.subjectCol]}>
        <Text style={styles.tableCell}>
          {subject === "german" ? "Deutsch" : "Mathe"}
        </Text>
      </View>
      <View style={[styles.tableCol, styles.taskCol]}>
        <Text style={styles.tableCell}>{task}</Text>
      </View>
      <View style={[styles.tableCol, styles.bookCol]}>
        <Text style={styles.tableCell}>{book}</Text>
      </View>
      <View style={[styles.tableCol, styles.checkCol]}>
        <Text style={styles.tableCell}></Text>
      </View>
      <View style={[styles.tableCol, styles.checkCol]}>
        <Text style={styles.tableCell}></Text>
      </View>
      <View style={[styles.tableCol, styles.checkCol]}>
        <Text style={styles.tableCell}></Text>
      </View>
    </View>
  );

  const generatePDF = async () => {
    const doc = (
      <Document>
        {students.map((student, studentIndex) => (
          <Page key={studentIndex} size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.title}>Wochenplan</Text>
              <Text style={styles.dateRange}>
                für die Woche vom {weekStart} bis {weekEnd}
              </Text>
              {student.name && (
                <Text style={styles.studentName}>{student.name}</Text>
              )}
            </View>

            {/* Mandatory Tasks */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pflichtaufgaben:</Text>
              <View style={styles.table}>
                <TableHeader />
                {Object.entries(student.mandatory).map(([subject, tasks]) =>
                  tasks.map((task, index) => (
                    <TaskRow
                      key={`${subject}-${index}`}
                      subject={subject}
                      task={task.task}
                      book={task.book}
                    />
                  ))
                )}
              </View>
            </View>

            {/* Additional Tasks */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Zusatzaufgaben:</Text>
              <View style={styles.table}>
                <TableHeader />
                {Object.entries(student.additional).map(([subject, tasks]) =>
                  tasks.map((task, index) => (
                    <TaskRow
                      key={`additional-${subject}-${index}`}
                      subject={subject}
                      task={task.task}
                      book={task.book}
                    />
                  ))
                )}
              </View>
            </View>

            {/* Homework */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Zuhause üben:</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol, styles.subjectCol]}>
                    <Text style={styles.tableCell}>Fach</Text>
                  </View>
                  <View style={[styles.tableCol, { width: "70%" }]}>
                    <Text style={styles.tableCell}>Aufgabe</Text>
                  </View>
                  <View style={[styles.tableCol, styles.checkCol]}>
                    <Text style={styles.tableCell}>S</Text>
                  </View>
                  <View style={[styles.tableCol, styles.checkCol]}>
                    <Text style={styles.tableCell}>E</Text>
                  </View>
                </View>
                {Object.entries(student.homework).map(([subject, tasks]) =>
                  tasks.map((task, index) => (
                    <View
                      key={`homework-${subject}-${index}`}
                      style={styles.tableRow}
                    >
                      <View style={[styles.tableCol, styles.subjectCol]}>
                        <Text style={styles.tableCell}>
                          {subject === "german" ? "Deutsch" : "Mathe"}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: "70%" }]}>
                        <Text style={styles.tableCell}>
                          {task.task}
                          {task.details && "\n" + task.details}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, styles.checkCol]}>
                        <Text style={styles.tableCell}></Text>
                      </View>
                      <View style={[styles.tableCol, styles.checkCol]}>
                        <Text style={styles.tableCell}></Text>
                      </View>
                    </View>
                  ))
                )}
              </View>
            </View>

            {/* Announcements */}
            <View style={styles.announcements}>
              <Text style={styles.sectionTitle}>Ankündigungen:</Text>
              {announcements.map((announcement, index) => (
                <Text key={index} style={styles.announcement}>
                  Am {announcement.day}, den {announcement.date}{" "}
                  {announcement.text}
                </Text>
              ))}
            </View>

            {/* Signature */}
            <View style={styles.signature}>
              <Text style={styles.sectionTitle}>Unterschrift Eltern:</Text>
              <View style={styles.signatureLine} />
            </View>
          </Page>
        ))}
      </Document>
    );

    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <button
      onClick={generatePDF}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      PDF generieren
    </button>
  );
};
