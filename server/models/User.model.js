const { Schema, model } = require("mongoose")

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required."],
        },
        name: {
            type: String,
            required: [true, "Name is required."],
        },
        userRole: {
            type: Number,
            required: true,
        },
        phoneNumber: {
            type: Number,
        },
        userImage: {
            type: String,
            default: "user.png",
        },
        verified: {
            type: String,
            default: false,
        },
        cart: [
            {
                trackId: {
                    type: String, // Cambia a String si el ID es una cadena
                    // type: Schema.Types.ObjectId, // Usar ObjectId si es un ObjectId
                },
                trackName: {
                    type: String,
                    // required: true,
                },
                trackPrice: {
                    type: Number,
                    //required: true,
                },
            }
        ],
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);

module.exports = User;