const { Schema, model } = require("mongoose");

const categoriesSchema = new Schema(
    {
        cName: {
            type: String, 
            required: true,
        },
        cDescription: {
            type: String, 
            required: true,
        },
        cImage: {
            type: String,
        },
        cStatus: {
            type: String,
            required: true, 
        },
    },
    { timestamps: true }
    );

    const CategoriesModel = model("categories", categoriesSchema );
    
    module.exports = CategoriesModel;
