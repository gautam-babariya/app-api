const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  imageFilename: {
    type: String,
    required: true,
  },
  subimg1: {
    type: String,
    required: true,
  },
  subimg2: {
    type: String,
    required: true,
  },
  subimg3: {
    type: String,
    required: true,
  },
  subimg4: {
    type: String,
    required: true,
  },
  productname: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// const Product = mongoose.model('Product', productSchema);
module.exports = mongoose.model('Product', productSchema);

// module.exports = Product;
