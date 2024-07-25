const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true      //required
    },
    email: {
        type: String,
        required: true        //required
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dukdruhiu/image/upload/v1721291445/dummy_pgtabu.pngs"
    },
    password: {
        type: String,
        required: true         //required
    },
    verified: {
        type: Boolean,
        default: false
    },
    code: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    mobile: {
        type: Number,
        required: true     //required
    }
}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)