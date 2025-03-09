const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// const Contacts = require("./Models/Contacts");
const Contacts = [
  {
    id: 1,
    firstName: "Rakesh",
    lastName: "Annavarapu",
    email: "abc@gmail.com",
    mobileNumber: "1234567890",
    company: "NxtWave",
    jobTitle: "Software Developer",
  },
  {
    id: 1,
    firstName: "Nani",
    lastName: "Nanoi",
    email: "abc@gmail.com",
    mobileNumber: "987654567",
    company: "NxtWave",
    jobTitle: "Full Stack Developer",
  },
  {
    id: 1,
    firstName: "Nxt wave",
    lastName: "NxtWave",
    email: "abc@gmail.com",
    mobileNumber: "1234567890",
    company: "NxtWave",
    jobTitle: "-----",
  },
];
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// mongoose
//   .connect(
//     "mongodb+srv://rakeshrakesh6516:nxtwavecontactmanagementapp@contacts.x7yht.mongodb.net/?retryWrites=true&w=majority&appName=contacts"
//   )
//   .then(() => {
//     console.log("Mongoose is Connected");
//   });

app.post("/contacts", async (req, res) => {
  try {
    const { firstName, lastName, email, mobileNumber, company, jobTitle } =
      req.body;

    const alreadyExist = Contacts.find(
      (contact) => contact.mobileNumber === mobileNumber
    );
    if (alreadyExist) {
      return res.status(400).send("Already Exist");
    }

    // const newContact = new Contacts({
    //   firstName,
    //   lastName,
    //   email,
    //   mobileNumber,
    //   company,
    //   jobTitle,
    // });

    // await newContact.save();
    Contacts.push({
      id: Date.now(),
      firstName,
      lastName,
      email,
      mobileNumber,
      company,
      jobTitle,
    });
    res.status(201).json({ message: "Contact created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/contacts", async (req, res) => {
  try {
    const allContacts = Contacts;
    if (allContacts.length <= 0) {
      return res.status(200).json({ message: "No Contacts Available" });
    }
    return res.status(200).json({ contacts: allContacts });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedContact = Contacts.find(
      (contact) => (contact.id === id) & { ...updatedContact }
    );

    if (!updatedContact) {
      return res.status(400).json({ message: "Updated Not SuccessFull" });
    }
    return res
      .status(200)
      .json({ message: "Updated Successfully", updatedContact });
  } catch (err) {
    return res.status(500).json({ message: "Internal server Error" });
  }
});

app.delete("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = Contacts.filter((contact) => contact.id === id);
    if (!deletedContact) {
      return res.status(400).json({
        message: "Unable to delete the Conatct please Try again later",
      });
    }
    return res.status(200).json({
      message: `${deletedContact.name} conatct is Deleted Successfully`,
      contactDetails: deletedContact,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
