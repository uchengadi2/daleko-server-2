const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [false, "Every product must have a name"],
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    fullDescription: {
      type: String,
      trim: true,
    },

    // refNumber: {
    //   type: String,
    // },
    imageCover: {
      type: String,
      required: [false, "Please provide the image cover"],
    },

    images: [
      {
        type: String,
      },
    ],

    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
      },
    ],

    currency: {
      type: mongoose.Schema.ObjectId,
      ref: "Currency",
    },

    minimumQuantity: {
      type: Number,
    },
    unit: {
      type: String,
      default: "kg",
      enum: ["kg", "g", "ibs", "tonnes"],
    },

    keyword1: {
      type: String,
    },
    keyword2: {
      type: String,
    },
    keyword3: {
      type: String,
    },
    pricePerUnit: {
      type: Number,
    },
    priceLabel: {
      type: String,
    },
    weightPerUnit: {
      type: Number,
    },
    unit: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      //select: false,
    },
    createdBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],

    isFeaturedProduct: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },

    configuration: {
      type: String,
    },
    displayOnStore: {
      type: String,
      default: "yes",
      enum: ["yes", "no"],
    },
    stockStatus: {
      type: String,
      default: "in-stock",
      enum: ["in-stock", "out-of-stock"],
    },

    countryOfOrigin: {
      type: String,
    },
    features: {
      type: String,
    },
    benefits: {
      type: String,
    },

    yearManufactured: {
      type: String,
    },
    brand: {
      type: String,
    },

    source: {
      type: String,
    },
    salesPreference: {
      type: String,
      default: "retail",
      enum: ["retail", "wholesale", "derica", "paint"],
    },

    allowSubscription: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },

    slug: {
      type: String,
    },
    marketPricingCondition: {
      type: String,
    },

    pricingMechanism: {
      type: String,
      default: "pricing",
      enum: ["pricing", "request-quote", "bidding"],
    },

    isVatable: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },

    minimumDaysToEffectiveReview: {
      type: Number,
      default: 0,
    },
    hasVariant: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },

    sku: {
      type: String,
    },
    barcode: {
      type: String,
    },
    deliverability: {
      type: String,
    },
    pickupInfo: {
      type: String,
    },

    allowPriceFreezing: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    allowFreezedPriceLowBound: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    freezedPriceLowBound: {
      type: Number,
      default: 0,
    },
    chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound: {
      type: Number,
      default: 0,
    },
    chargesPerWeekOnFreezedPriceServiceWithPriceLowBound: {
      type: Number,
      default: 0,
    },
    freezedPriceMaximumDurationInWeeks: {
      type: Number,
      default: 0,
    },
    minimumFreezableQuantity: {
      type: Number,
    },
    datePriceWasSet: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
  });

  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
