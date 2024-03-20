const mongoose = require("mongoose");
const validator = require("validator");

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
    variant: {
      type: String,
    },

    location: {
      type: mongoose.Schema.ObjectId,
      ref: "Location",
    },

    batchNumber: {
      type: String,
    },
    vendor: {
      type: mongoose.Schema.ObjectId,
      ref: "Vendor",
    },
    totalQuantity: {
      type: Number,
    },
    remainingQuantity: {
      type: Number,
    },
    unit: {
      type: String,
    },
    pricePerUnit: {
      type: Number,
    },

    minQuantity: {
      type: Number,
      default: 1,
    },
    isOnPromo: {
      type: String,
      default: "no",
      enum: ["no", "yes"],
    },
    promoPrice: {
      type: Number,
    },
    totalCost: {
      type: Number,
    },
    sku: {
      type: String,
    },
    barcode: {
      type: String,
    },
    previousDayPricePerUnit: {
      type: Number,
    },
    currentPricePerUnit: {
      type: Number,
    },
    costPerUnit: {
      type: Number,
    },
    priceSensitivity: {
      type: String,
      enum: ["normal", "volatile"],
    },
    deliveryCost: {
      type: Number,
    },
    source: {
      type: mongoose.Schema.ObjectId,
      ref: "Location",
    },

    hasSizeVariant: { type: Boolean, default: false, enum: [false, true] },
    hasColourVariant: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    hasMaterialVariant: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    hasStyleVariant: { type: Boolean, default: false, enum: [false, true] },

    size: {
      type: String,
    },
    color: {
      type: String,
    },
    material: {
      type: String,
    },
    style: {
      type: String,
    },
    weightInKg: {
      type: Number,
    },
    imageCover: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    displayOnStore: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    dateOnBoarded: {
      type: Date,
    },
    dateOfFirstItemSold: {
      type: Date,
      default: Date.now,
    },
    dateOfLastItemSold: {
      type: Date,
      default: Date.now,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    createdBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
inventorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "location",
  });

  next();
});

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory;
