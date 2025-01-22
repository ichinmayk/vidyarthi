import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker-overwrites.css"

export default function FeeManagement() {
  const [selectedTab, setSelectedTab] = useState("Fee Management");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [paymentUpdates, setPaymentUpdates] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Dummy branches
  const branches = [
    "All",
    "Mysore-1",
    "Mysore-2",
    "Bangalore-1",
    "Bangalore-2",
  ];

  // Dummy student details
  const students = [
    {
      id: 1001,
      name: "Adarsh",
      rollNo: 21,
      phone: 767736312,
      School: "Nirmala",
      standard: "7th",
      Branch: "Mysore-1",
      courses: [
        { label: "Abacus", key: "course1", status: "active" },
        { label: "Mathematics", key: "course2", status: "inactive" },
      ],
      fees: [
        {
          courseKey: "course1",
          fee: "10,000",
          paid: "5,000",
          balance: "5,000",
          nextDueDate: "12-Sep-2025",
        },
        {
          courseKey: "course2",
          fee: "8,000",
          paid: "4,000",
          balance: "4,000",
          nextDueDate: "10-Dec-2025",
        },
      ],
    },
    {
      id: 1002,
      name: "Ravi",
      rollNo: 22,
      phone: 767736313,
      School: "Nirmala",
      standard: "8th",
      Branch: "Mysore-2",
      courses: [
        { label: "Science", key: "course3", status: "active" },
        { label: "English", key: "course4", status: "inactive" },
      ],
      fees: [
        {
          courseKey: "course3",
          fee: "12,000",
          paid: "6,000",
          balance: "6,000",
          nextDueDate: "15-Dec-2025",
        },
        {
          courseKey: "course4",
          fee: "9,000",
          paid: "4,500",
          balance: "4,500",
          nextDueDate: "20-Dec-2025",
        },
      ],
    },
  ];

  // Debounce function for search
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Filter students based on branch and search query
  const filterStudents = () => {
    let filtered = students.filter(
      (student) =>
        (selectedBranch === "All" || student.Branch === selectedBranch) &&
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  // Debounced filter function
  const debouncedFilterStudents = debounce(filterStudents, 300);

  useEffect(() => {
    debouncedFilterStudents();
  }, [selectedBranch, searchQuery]);

  // Toggle accordion for courses
  const toggleAccordion = (courseKey) => {
    setExpandedCourse((prevKey) => (prevKey === courseKey ? null : courseKey));
  };

  // Add a payment update field for a course
  const addPaymentUpdate = (courseKey) => {
    setPaymentUpdates((prevUpdates) => ({
      ...prevUpdates,
      [courseKey]: [
        ...(prevUpdates[courseKey] || []),
        { amount: "", dueDate: "" },
      ],
    }));
  };

  // Remove a payment update field
  const removePaymentUpdate = (courseKey, index) => {
    setPaymentUpdates((prevUpdates) => ({
      ...prevUpdates,
      [courseKey]: prevUpdates[courseKey].filter((_, i) => i !== index),
    }));
  };

  // Update payment field
  const updatePaymentField = (courseKey, index, field, value) => {
    setPaymentUpdates((prevUpdates) => ({
      ...prevUpdates,
      [courseKey]: prevUpdates[courseKey].map((update, i) =>
        i === index ? { ...update, [field]: value } : update
      ),
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-row bg-white p-4">
        {/* Column for Fee Management Dropdown and Student List */}
        <div className="w-1/4 flex flex-col space-y-4">
          {/* Branch Dropdown */}
          <div>
            <label
              htmlFor="branch-select"
              className="block text-gray-700 font-medium mb-2"
            >
              Select Branch
            </label>
            <select
              id="branch-select"
              className="w-full p-2 border rounded-lg"
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setSelectedStudent(null); // Reset selected student when branch changes
              }}
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          {/* Student List */}
          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Student List
            </h2>
            <input
              type="text"
              placeholder="Search by name"
              className="p-2 border rounded-lg w-full mb-4"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className={`mb-4 p-4 border rounded-lg shadow cursor-pointer ${
                  selectedStudent?.id === student.id ? "bg-indigo-100" : ""
                }`}
                onClick={() => setSelectedStudent(student)}
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 flex items-center justify-center bg-gray-400 rounded-full text-white font-bold text-sm">
                    {student.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-600">
                      Roll No: {student.rollNo}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Student Details */}
        <div className="flex-1 ml-4">
          <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
            {selectedStudent ? selectedStudent.name : "Details"}
          </h2>
          {selectedStudent ? (
            <div className="p-6 border rounded-lg shadow">
              <div className="flex flex-wrap justify-between gap-4 mb-4">
                {Object.entries(selectedStudent)
                  .filter(([key]) => key !== "courses" && key !== "fees") // Exclude courses and fees
                  .map(([key, value]) => (
                    <div key={key} className="text-gray-700">
                      <span className="font-bold capitalize">{key}:</span>{" "}
                      {value}
                    </div>
                  ))}
              </div>
              <h3 className="text-lg font-bold text-gray-700 mt-4 mb-2">
                Courses
              </h3>
              {selectedStudent.courses.map((course) => (
                <div key={course.key} className="mb-4">
                  <div
                    className={`p-4 border rounded-lg shadow cursor-pointer flex justify-between items-center ${
                      expandedCourse === course.key
                        ? "bg-indigo-100"
                        : "bg-gray-100"
                    }`}
                    onClick={() => toggleAccordion(course.key)}
                  >
                    <p className="text-gray-700">
                      <span className="font-bold">Course:</span> {course.label}{" "}
                      ({course.status})
                    </p>
                    {expandedCourse === course.key ? (
                      <FiChevronUp className="text-gray-600" />
                    ) : (
                      <FiChevronDown className="text-gray-600" />
                    )}
                  </div>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      expandedCourse === course.key
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                    style={{
                      overflowY:
                        expandedCourse === course.key ? "auto" : "hidden",
                    }}
                  >
                    {expandedCourse === course.key && (
                      <div className="p-4 border rounded-lg shadow mt-2 bg-white">
                        <p className="text-gray-700">
                          <span className="font-bold">Fee:</span>{" "}
                          {
                            selectedStudent.fees.find(
                              (fee) => fee.courseKey === course.key
                            ).fee
                          }
                        </p>
                        <p className="text-gray-700">
                          <span className="font-bold">Paid:</span>{" "}
                          {
                            selectedStudent.fees.find(
                              (fee) => fee.courseKey === course.key
                            ).paid
                          }
                        </p>
                        <p className="text-gray-700">
                          <span className="font-bold">Balance:</span>{" "}
                          {
                            selectedStudent.fees.find(
                              (fee) => fee.courseKey === course.key
                            ).balance
                          }
                        </p>
                        <p className="text-gray-700">
                          <span className="font-bold">Next Due Date:</span>{" "}
                          {
                            selectedStudent.fees.find(
                              (fee) => fee.courseKey === course.key
                            ).nextDueDate
                          }
                        </p>
                        {/* Update Payment Section */}
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-base font-semibold text-gray-700 mb-2">
                              Update Payment
                            </h3>
                            <button
                              className="text-white bg-indigo-600 px-2 py-1 rounded-lg text-xs"
                              onClick={() => addPaymentUpdate(course.key)}
                            >
                              + Add
                            </button>
                          </div>
                          {(paymentUpdates[course.key] || []).map(
                            (update, index) => (
                              <div className="mb-4 p-3 border rounded-lg shadow flex flex-col space-y-2">
                                <label className="block text-sm text-gray-700 mb-1">
                                  Enter Amount
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter Amount"
                                  className="p-2 border rounded-lg text-sm"
                                  value={update.amount}
                                  onChange={(e) =>
                                    updatePaymentField(
                                      course.key,
                                      index,
                                      "amount",
                                      e.target.value
                                    )
                                  }
                                />
                                <div className="relative w-full">
                                  <label className="block text-sm text-gray-700 mb-1">
                                    Enter Due Date
                                  </label>
                                  <div className="relative w-full">
                                    <ReactDatePicker
                                      selected={
                                        update.dueDate
                                          ? new Date(update.dueDate)
                                          : null
                                      }
                                      onChange={(date) =>
                                        updatePaymentField(
                                          course.key,
                                          index,
                                          "dueDate",
                                          date
                                            ? date.toISOString().split("T")[0]
                                            : ""
                                        )
                                      }
                                      dateFormat="dd-MMM-yyyy"
                                      placeholderText="Enter Due Date (12-Sep-2025)"
                                      className="p-2 border rounded-lg text-sm w-full"
                                      calendarClassName="react-datepicker"
                                      isClearable
                                    />
                                    <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                                  </div>
                                </div>

                                <button
                                  className="text-red-600 text-xs self-end"
                                  onClick={() =>
                                    removePaymentUpdate(course.key, index)
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            )
                          )}

                          {/* Selectable Tabs Section */}
                          <div className="border-t pt-4 mt-4">
                            <h3 className="text-base font-semibold text-gray-700 mb-2">
                              Select Recurring Duration
                            </h3>
                            <div className="flex space-x-4">
                              {["1 Month", "3 Month", "6 Month"].map(
                                (label) => (
                                  <button
                                    key={label}
                                    onClick={() =>
                                      setPaymentUpdates({
                                        ...paymentUpdates,
                                        selectedPlan: label,
                                      })
                                    }
                                    className={`px-3 py-1 border rounded-lg text-sm ${
                                      paymentUpdates.selectedPlan === label
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-100 text-gray-700"
                                    }`}
                                  >
                                    {label}
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              Select a student to see more details here.
            </p>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </div>
  );
}
