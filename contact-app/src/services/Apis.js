import axios from "axios";

const BASE_URL = "http://localhost:5000";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ContactAPI = {
  // Get all contacts
  getAllContacts: async () => {
    try {
      const response = await api.get("/contacts");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new contact
  createContact: async (contactData) => {
    try {
      const response = await api.post("/contacts", contactData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update existing contact
  updateContact: async (id, contactData) => {
    try {
      const response = await api.put(`/contacts/${id}`, contactData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete contact
  deleteContact: async (id) => {
    try {
      const response = await api.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ContactAPI;
