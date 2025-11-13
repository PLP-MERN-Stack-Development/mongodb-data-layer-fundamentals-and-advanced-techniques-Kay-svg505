// queries.js - MongoDB Queries for PLP Bookstore
// -----------------------------------------------
// This script performs various CRUD operations, advanced queries,
// aggregations, and indexing on the `books` collection created by `insert_books.js`.

// 1️⃣ Switch to the correct database
use("plp_bookstore");

// ===============================================================
// 🧱 BASIC CRUD OPERATIONS
// ===============================================================

// Insert a new book
db.books.insertOne({
  title: "The Invisible Man",
  author: "H. G. Wells",
  genre: "Science Fiction",
  published_year: 1897,
  price: 9.75,
  in_stock: true,
  pages: 192,
  publisher: "C. Arthur Pearson"
});

// Find all books
db.books.find().pretty();

// Find books by a specific author
db.books.find({ author: "George Orwell" }).pretty();

// Update a book’s stock status
db.books.updateOne(
  { title: "Brave New World" },
  { $set: { in_stock: true } }
);

// Delete a book by title
db.books.deleteOne({ title: "Moby Dick" });

// ===============================================================
// 🔍 ADVANCED QUERIES (FILTERING & SORTING)
// ===============================================================

// Find books published after 1950
db.books.find({ published_year: { $gt: 1950 } }).pretty();

// Find all Fiction books under $12
db.books.find({
  genre: "Fiction",
  price: { $lt: 12 }
}).pretty();

// Find all in-stock books sorted by published_year (newest first)
db.books.find({ in_stock: true }).sort({ published_year: -1 }).pretty();

// Find books with page count between 200 and 400
db.books.find({
  pages: { $gte: 200, $lte: 400 }
}).pretty();

// ===============================================================
// 📊 AGGREGATION PIPELINES
// ===============================================================

// Group books by genre and count how many in each
db.books.aggregate([
  { $group: { _id: "$genre", total_books: { $sum: 1 } } },
  { $sort: { total_books: -1 } }
]);

// Calculate the average price of books per genre
db.books.aggregate([
  { $group: { _id: "$genre", average_price: { $avg: "$price" } } },
  { $sort: { average_price: -1 } }
]);

// Find the top 3 most expensive books
db.books.aggregate([
  { $sort: { price: -1 } },
  { $limit: 3 },
  { $project: { title: 1, author: 1, price: 1, _id: 0 } }
]);

// ===============================================================
// ⚡ INDEXING FOR PERFORMANCE
// ===============================================================

// Create an index on author for faster search
db.books.createIndex({ author: 1 });

// Create a compound index on genre and price
db.books.createIndex({ genre: 1, price: -1 });

// Check all created indexes
db.books.getIndexes();

// ===============================================================
// ✅ END OF FILE
// ===============================================================
