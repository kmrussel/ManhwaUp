import mongoose from 'mongoose';
import 'dotenv/config';


mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

// manhwa schema
const manhwaSchema = mongoose.Schema({
    title: { type: String },
    image: { type: String }, 
    authors: [String],
    date: { type: Number },
    manhwaStatus: { type: String },
    genres: [String],
    description: { type: String },
});

// compile model from schema
const Manhwa = mongoose.model("Manhwa", manhwaSchema);


// create a manhwa 
const createManhwa = async( title, image, authors, date, manhwaStatus, genres, description) => {
    const manhwa = new Manhwa({ title: title, image: image, authors: authors, date: date, manhwaStatus: manhwaStatus, genres: genres, description: description});
    return manhwa.save();
};

// find manhwa by genre
const findManhwaByGenre = async (filter) => {
    const query = Manhwa.find({ genres: filter  }).limit(5);
    return query.exec();
};

// find manhwa by filter 
const findManhwas = async (filter) => {
    const query = Manhwa.find(filter);
    return query.exec();
};

// find distinct genres
const findGenres = async () => {
    const query = Manhwa.distinct("genres");
    return query.exec(); 
};

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export { createManhwa, findManhwas, findGenres, findManhwaByGenre }