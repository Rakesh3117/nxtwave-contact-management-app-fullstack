import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import TableComponent from "./TableComponent";
import NewContact from "./NewContact";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import { useToast } from "./Toast";
import EditDetailsPopUp from "./EditDetailsPopUp";

export default function ContactsPage() {
  const [loading, setLoading] = useState(false);
  const [contactsList, setContactsList] = useState([]);
  const [searchContacts, setSearchContacts] = useState([]);
  const [openNewContact, setOpenNewContact] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const toastContainerRef = useRef(null);
  const { ToastWrapper, success, error } = useToast();
  const [editContact, setEditContact] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://nxtwave-contact-management-app-fullstack.onrender.com/contacts"
      );
      setContactsList(res?.data?.contacts);
      setSearchContacts(res?.data?.contacts);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      error("Failed to fetch contacts");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleOpenNewContact = () => setOpenNewContact(true);
  const handleCloseNewContact = () => setOpenNewContact(false);

  const handleSaveNewContact = async (newContact) => {
    try {
      const res = await axios.post(
        "https://nxtwave-contact-management-app-fullstack.onrender.com/contacts",
        {
          ...newContact,
        }
      );
      console.log(res.data);
      fetchContacts();
      success("Contact added successfully!");
      handleCloseNewContact();
    } catch (err) {
      setLoading(false);
      handleCloseNewContact();
      error(err?.response?.data || "Failed to add contact");
      console.log(err);
    }
  };

  const handleEditClick = (contact) => {
    setEditContact(contact);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setEditContact(null);
  };

  const handleEdit = async (id, details) => {
    try {
      const res = await axios.put(
        `https://nxtwave-contact-management-app-fullstack.onrender.com/contacts/${id}`,
        {
          ...details,
        }
      );
      if (res.status === 200) {
        success("Contact edited successfully");
        fetchContacts();
        handleCloseEdit();
      }
    } catch (err) {
      handleCloseEdit();
      error("Failed to edit contact");
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://nxtwave-contact-management-app-fullstack.onrender.com/contacts/${id}`
      );
      if (res.status === 200) {
        success("Contact deleted successfully");
        fetchContacts();
      }
    } catch (err) {
      error("Failed to delete contact");
      console.log(err);
    }
  };

  const handleSearchContacts = (searchInput) => {
    const updatedContacts = contactsList.filter((contact) => {
      return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });

    setSearchContacts(updatedContacts);
  };

  const handleSortChange = (event) => {
    const criterion = event.target.value;
    setSortBy(criterion);

    const sortedContacts = [...searchContacts].sort((a, b) => {
      if (criterion === "name") {
        return a.firstName.localeCompare(b.firstName);
      } else if (criterion === "mobileNumber") {
        return a.mobileNumber.localeCompare(b.mobileNumber);
      }
      return 0;
    });

    setSearchContacts(sortedContacts);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <ToastWrapper />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <button
            onClick={handleOpenNewContact}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            New Contact
          </button>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full sm:w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="mobileNumber">Mobile Number</option>
            </select>
            <div className="w-full sm:w-auto">
              <SearchBar onSearch={handleSearchContacts} />
            </div>
          </div>
        </div>

        <NewContact
          open={openNewContact}
          handleClose={handleCloseNewContact}
          handleSave={handleSaveNewContact}
        />
        <TableComponent
          contactsList={searchContacts}
          handleEdit={handleEditClick}
          handleDelete={handleDelete}
          onAddNew={handleOpenNewContact}
        />
        <EditDetailsPopUp
          open={isEditOpen}
          handleClose={handleCloseEdit}
          contact={editContact}
          handleSave={handleEdit}
        />
      </div>
    </div>
  );
}
