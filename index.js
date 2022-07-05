const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
const Book = mongoose.model('Book', bookSchema);
async function createBook() {
  const book = new Book({
    name: 'The Book of Trees test',
    author: 'Ursula K. LeGuin',
    tags: ['Fantasy', 'Classics', 'Science'],
    isPublished: true,
  });
  const result = await book.save();
  console.log(result);
}
async function getBooks() {
  const books = await Book.find({ price: { $gt: 10, $lt: 20 } })
  .limit(2)
  .sort({ name: 1, })
  .select({ name: 1, tags: 1 });
  console.log(books);
}
getBooks();
