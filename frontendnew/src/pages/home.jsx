import React, { useState, useEffect } from "react";
import api from "../api";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    year: ""
  });

  const fetchBooks = async () => {
    const res = await api.get("/books");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/books/add", form);
    setForm({ title: "", author: "", year: "" });
    fetchBooks();
  };

  const handleDelete = async (id) => {
    await api.delete(`/books/${id}`);
    fetchBooks();
  };

  return (
    <div className="page">
      <h1>Book Management System</h1>
      <p>Add and manage your books easily.</p>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Enter book title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="author"
          placeholder="Enter author name"
          value={form.author}
          onChange={handleChange}
        />
        <input
          name="year"
          placeholder="Enter year"
          value={form.year}
          onChange={handleChange}
        />
        <button type="submit">Add Book</button>
      </form>

      <h2>All Books</h2>

      {books.map((book) => (
        <div className="book-card" key={book._id}>
          <div className="book-info">
            <b>{book.title}</b> <br />
            {book.author} ({book.year})
          </div>
          <button className="delete-btn" onClick={() => handleDelete(book._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}