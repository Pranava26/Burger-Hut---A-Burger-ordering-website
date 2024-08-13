const { Schema, models, model, default: mongoose } = require("mongoose");

const MenuItemSchema = new Schema({
    // image: {type: String},
    name: {type: String},
    description: {type: String},
    category: {type: mongoose.Types.ObjectId},
    basePrice: {type: Number},
}, {timestamps: true});

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema)