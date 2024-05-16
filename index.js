const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/Book");

const app = express();
const port = 3005;

app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello Node API");
});

app.get("/blog", (req, res) => {
  res.send("Hello Blog my name is ravindra babu");
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).send();
  }
});

app.post('/books', async (req, res) => {
  const book = new Book(req.body);
  try {
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json(book);
    }
    res.send(book);
  } catch (error) {
    res.status(500).send();
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) {
      return res.status(404).json({messsage:`cannot find any book with ${req.params.runValidators}`});
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE
app.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({messsage:`cannot find any book with ${req.params.runValidators}`});
    }
    res.send(book);
  } catch (error) {
    res.status(500).send();
  }
});

mongoose
  .connect(
    "mongodb+srv://ravindrababugollavilli123:ravi123@ravindraapi.inthpcj.mongodb.net/bookstore?retryWrites=true&w=majority&appName=RavindraAPI")
  .then(() => {
    console.log("connected to MongoDB");

    app.listen(port, () => {
      console.log(`Node API is running on port ${port}`);
    });
    
  })
  .catch((error) => {
    console.log(error);
  });