const mongoose = require("mongoose");
const validator = require("validator");

const transactionSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
    },

    currency: {
      type: mongoose.Schema.ObjectId,
      ref: "Currency",
    },

    totalDeliveryCost: {
      type: Number,
    },
    totalProductCost: {
      type: Number,
    },

    transactionDate: {
      type: Date,
      default: Date.now,
    },
    orderedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    paymentStatus: {
      type: String,
      default: "not-processed",
      enum: [
        "not-processed",
        "collect-payment-on-delivery",
        "paid",
        "to-be-confirmed",
      ],
    },
    paymentMethod: {
      type: String,
      default: "card",
      enum: ["card", "payOnDelivery"],
    },
    status: {
      type: String,
      default: "unprocessed",
      enum: [
        "unprocessed",
        "ready-for-delivery",
        "rejected",
        "assigned-for-delivery",
        "returned",
        "fullfilled",
      ],
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
    customerName: {
      type: String,
    },
    customerPhoneNumber: {
      type: String,
    },
    customerEmailAddress: {
      type: String,
    },
    customerEmailAddress: {
      type: String,
    },
    recipientName: {
      type: String,
    },

    recipientPhoneNumber: {
      type: String,
    },
    recipientEmailAddress: {
      type: String,
    },
    recipientAddress: {
      type: String,
    },
    nearestBusstop: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    recipientCountry: {
      type: mongoose.Schema.ObjectId,
      ref: "Country",
    },
    recipientState: {
      type: mongoose.Schema.ObjectId,
      ref: "State",
    },
    recipientCity: {
      type: mongoose.Schema.ObjectId,
      ref: "City",
    },

    vatRate: {
      type: Number,
    },
    vat: {
      type: Number,
    },
    totalWeight: {
      type: Number,
    },
    payOnDeliveryMaxWeightInKg: {
      type: Number,
    },
    implementVatCollection: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    salesTax: {
      type: Number,
    },
    revenue: {
      type: Number,
    },
    origin: {
      type: mongoose.Schema.ObjectId,
      ref: "State",
    },
    allowOriginSalesTax: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    implementSalesTaxCollection: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    deliveryStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "on-transit", "delivered", "returned"],
    },
    deliveryMode: {
      type: String,
      default: "standard",
      enum: ["standard", "priority", "sameday", "pickup"],
    },
    daysToDelivery: {
      type: String,
    },
    recipientCountryName: {
      type: String,
    },
    recipientStateName: {
      type: String,
    },
    recipientCityName: {
      type: String,
    },
    shopType: {
      type: String,
      default: "online",
      enum: ["online", "pos", "affiliate"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
transactionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "currency",
  });
  this.populate({
    path: "orderedBy",
  });
  this.populate({
    path: "recipientCountry",
  });
  this.populate({
    path: "recipientState",
  });
  this.populate({
    path: "recipientCity",
  });
  this.populate({
    path: "origin",
  });

  next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
