const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const bookSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 255
  },
  author: String,
  tags: [String],
    // type: Array,
    // validate: {
    //   isAsync: true,
    //   validator: function(val, callback) {
    //     setTimeout(() => {
    //       const result = val && val.length > 0;
    //       callback(result);
    //     }, 5000)
    //   },
    //   message: 'Tags must be an array and it must have at least one tag.'
    // },
  // },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 150,
    get: v => Math.round(v),
    set: v => Math.round(v)
    
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowercase: true,
    trim: true
  }
});
const Book = mongoose.model('Book', bookSchema);
async function createBook() {
  const book = new Book({
    name: 'Test round 2',
    author: 'O\'tkir Hoshimov',
     tags: ['Roman', 'Ajoyib'],
    isPublished: false,
    price: 15.7,
    category: 'web'
  });
  try{
    const result = await book.save();
    console.log(result);
  }
  catch(err){
    console.error(err);
  }

}
async function getBooks() {
  const books = await Book.find({ price: { $gt: 10, $lt: 20 } })
  .limit(2)
  .sort({ name: 1, })
  .select({ name: 1, tags: 1 });
  console.log(books);
}

async function updateBook1(id) {
  const book = await Book.findById(id);
  if (!book) {
    return;
  } else {
    book.name = 'O\'than kunalar 2'
  }
  const updatedBook = await book.save();
  console.log(updatedBook);
}

async function updateBook2(id) {
  const result = await Book.update({ _id: id }, {
    $set: {
      name: 'O\'than kunalar 4',
      isPublished: false,
    }
  });

  console.log(result);
}

async function deleteBook(id) {
  const result = await Book.deleteOne({ _id: id });
  console.log(result);
}
createBook();
// deleteBook('62cabaae17d353ba93faeb62');
