import React, { useState } from "react";
import EditFormPopover from "./EditDetailsPopUp";

const TableRowComponent = ({ contact, handleEdit, handleDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = (updatedData) => {
    handleEdit(updatedData);
    handleCloseDialog();
  };

  // Generate initials for the profile avatar
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Profile Section */}
        <div className="p-6 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 dark:from-gray-700 dark:to-gray-800">
          <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl font-bold">
            {getInitials(contact?.firstName, contact?.lastName)}
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-4">
            {contact?.firstName} {contact?.lastName}
          </h3>

          <div className="space-y-2">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-600 dark:text-gray-300 break-all">
                {contact?.email}
              </span>
            </div>

            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">
                {contact?.mobileNumber}
              </span>
            </div>

            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">
                {contact?.company}
              </span>
            </div>

            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">
                {contact?.jobTitle}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600 flex justify-between">
          <button
            onClick={() => handleEdit(contact)}
            className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 hover:border-blue-800 dark:hover:border-blue-300 rounded-md transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(contact._id)}
            className="px-4 py-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 border border-red-600 dark:border-red-400 hover:border-red-800 dark:hover:border-red-300 rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <EditFormPopover
        open={openDialog}
        handleClose={handleCloseDialog}
        row={contact}
        handleSave={handleSave}
      />
    </>
  );
};

export default TableRowComponent;
