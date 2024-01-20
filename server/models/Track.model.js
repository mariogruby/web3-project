const { Schema, model } = require("mongoose")

const trackSchema = new Schema(
    {
        tName: {
            type: String, 
            required: true,
        },
        tDescription: {
            type: String,
            required: true,
        },
        tPrice: {
            type: Number,
            required: true,
        }, 
        tCategory: {
            type: ObjectId,
            ref: 'categories',
        },
        tImages: {
            type: Array,
            required: true,
        },
        tRatingsReviews: [
            {
                review: String,
                user: {type: ObjectId, ref: users},
                rating: String,
                createdAt: {
                    type: Date,
                    default: Date.now(),
                },
            },
        ],
        tStatus: {
            type: String,
            required: true,
        },
        tUrl: {
            type: String,
            unique: true,
        },
        tBpm: {
            type: Number,
        },
},
{ timestamps: true }
);

const TrackModel = model("tracks", trackSchema);

module.exports = TrackModel;
