const { Schema, models, model } = require("mongoose");

const OrderSchema = new Schema({
    userEmail: String,
    phone: String,
    address: String,
    postalCode: String,
    city: String,
    state: String,
    country: String,
    cartProducts: Object,
    paid: {type: Boolean, default: false}
}, {timestamps: true});

export const Order = models?.Order || model('Order', OrderSchema);