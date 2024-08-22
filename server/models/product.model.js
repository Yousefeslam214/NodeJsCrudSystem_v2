const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter product Name"]
    }
    ,
    quantity: {
      type: Number,
      required: true,
      default: 0
    }
    , price: {
      type: Number,
      required: true,
      default: 0
    },
  }, {
  timestamps: true
}
)

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product;
