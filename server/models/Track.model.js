const { Schema, model } = require("mongoose")

const trackSchema = new Schema(
    {
        tName: {
            type: String,
            required: true,
        },
        tTime: {
            type: String,
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
            type: String,
            required: true,
        },
        tRatingsReviews: [
            {
                review: String,
                user: { type: ObjectId, ref: users },
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
        tAuthor: {
            type: ObjectId,
            ref: 'User',
        },
        tUrl: {
            type: String,
            unique: true,
        },
        tCover: {
            type: String,
            default:
                'https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6',
            required: true
        },
        tBpm: {
            type: Number,
        },
    },
    { timestamps: true }
);

const TrackModel = model("tracks", trackSchema);

module.exports = TrackModel;
