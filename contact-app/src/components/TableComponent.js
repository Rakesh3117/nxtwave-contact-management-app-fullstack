import React, { useState } from "react";
import TableRowComponent from "./TableRowComponent";
import NoContacts from "./NoContacts";

const columns = [
  { id: "firstName", label: "First Name", minWidth: 100 },
  { id: "lastName", label: "Last Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "mobileNumber", label: "Mobile Number", minWidth: 150 },
  { id: "company", label: "Company", minWidth: 150 },
  { id: "jobTitle", label: "Job Title", minWidth: 50 },
  { id: "actions", label: "Actions", minWidth: 150 },
];

const TableComponent = ({
  contactsList,
  handleEdit,
  handleDelete,
  onAddNew,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalPages = Math.ceil(contactsList?.length / rowsPerPage);

  // If there are no contacts, show the NoContacts component
  if (!contactsList || contactsList?.length === 0) {
    return <NoContacts onAddClick={onAddNew} />;
  }

  return (
    <div className="w-full overflow-hidden mt-8 flex flex-col items-center">
      {/* Grid of Contact Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {contactsList
          ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          ?.map((contact) => (
            <TableRowComponent
              key={contact._id}
              contact={contact}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between w-full px-4 py-3 mt-4">
        <div className="flex items-center">
          <select
            className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
          >
            {[8, 12, 16, 20].map((value) => (
              <option key={value} value={value}>
                {value} per page
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            className={`px-3 py-1 rounded-md ${
              page === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= totalPages - 1}
            className={`px-3 py-1 rounded-md ${
              page >= totalPages - 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
