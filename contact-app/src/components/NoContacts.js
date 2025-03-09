import React from "react";

const NoContacts = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Illustration */}
      <div className="w-64 h-64 mb-8">
        <svg
          className="w-full h-full text-gray-400 dark:text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
          />
          <circle cx="9" cy="7" r="4" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"
          />
        </svg>
      </div>

      {/* Text Content */}
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        No Contacts Found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
        Your contact list is empty. Start building your network by adding your
        first contact.
      </p>

      {/* Add Contact Button */}
      <button
        onClick={onAddClick}
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Your First Contact
      </button>
    </div>
  );
};

export default NoContacts;
