const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: `);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

connectDB();

const Contacts = require("./Models/Contacts");

app.post("/contacts", async (req, res) => {
  try {
    const { firstName, lastName, email, mobileNumber, company, jobTitle } =
      req.body;

    const alreadyExist = await Contacts.findOne({ mobileNumber });
    if (alreadyExist) {
      return res.status(400).send("Already Exist");
    }

    const newContact = new Contacts({
      firstName,
      lastName,
      email,
      mobileNumber,
      company,
      jobTitle,
    });

    await newContact.save();

    res.status(201).json({ message: "Contact created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/contacts", async (req, res) => {
  try {
    const allContacts = await Contacts.find();
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

    const updatedContact = await Contacts.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

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
    const deletedContact = await Contacts.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(400).json({
        message: "Unable to delete the Conatct please Try again later",
      });
    }
    return res.status(200).json({
      message: `${deletedContact.firstName} ${deletedContact.lastName} conatct is Deleted Successfully`,
      contactDetails: deletedContact,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
