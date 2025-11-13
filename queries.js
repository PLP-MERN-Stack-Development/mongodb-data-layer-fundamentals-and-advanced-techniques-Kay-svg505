// queries.js
// MongoDB Queries for PLP Bookstore Project
// Author: Joy Mwongera

/*
============================================================
📘 Task 2: Basic CRUD Operations
============================================================
*/

// 1️⃣ Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// 2️⃣ Find books published after a certain year (e.g., 1950)
db.books.find({ published_year: { $gt: 1950 } });

// 3️⃣ Find books by a specific author
db.books.find({ author: "George Orwell" });

// 4️⃣ Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 13.99 } }
);

// 5️⃣ Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" });

/*
============================================================
📗 Task 3: Advanced Queries
============================================================
*/

// 6️⃣ Find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 7️⃣ Use projection to return only title, author, and price fields
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// 8️⃣ Sort books by price in ascending order
db.books.find().sort({ price: 1 });

// 9️⃣ Sort books by price in descending order
db.books.find().sort({ price: -1 });

// 🔟 Implement pagination (limit & skip) — 5 books per page
// Page 1
db.books.find().limit(5);
// Page 2
db.books.find().skip(5).limit(5);

/*
============================================================
📙 Task 4: Aggregation Pipeline
============================================================
*/

// 11️⃣ Calculate the average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      average_price: { $avg: "$price" },
      total_books: { $sum: 1 }
    }
  },
  { $sort: { average_price: -1 } }
]);

// 12️⃣ Find the author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      total_books: { $sum: 1 }
    }
  },
  { $sort: { total_books: -1 } },
  { $limit: 1 }
]);

// 13️⃣ Group books by publication decade and count them
db.books.aggregate([
  {
    $addFields: {
      decade: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

/*
============================================================
📘 Task 5: Indexing
============================================================
*/

// 14️⃣ Create an index on the title field for faster searches
db.books.createIndex({ title: 1 });

// 15️⃣ Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// 16️⃣ Use explain() to show performance improvement with indexing
db.books.find({ title: "The Hobbit" }).explain("executionStats");

/*
============================================================
✅ End of queries.js
============================================================
*/

