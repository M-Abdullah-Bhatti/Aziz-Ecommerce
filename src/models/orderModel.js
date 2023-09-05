import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  customer: {
    type: "string",
    required: true,
    maxLength: 60,
  },
  userId: {
    type: "string",
    required: true,
  },
  address: {
    type: "string",
    required: true,
    maxLength: 200,
  },
  total: {
    type: Number,
    required: true,
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  status: {
    type: Number,
    default: 0,
    max: 3,
  },
  method: {
    type: Number,
    required: true,
  },

  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.orders3 || mongoose.model("orders3", orderSchema);
export default Order;
