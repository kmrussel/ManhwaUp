import mongoose from 'mongoose';
import 'dotenv/config';


mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

// user schema
const userSchema = mongoose.Schema({
    username: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    refreshToken: [String]
});

const User = mongoose.model("User", userSchema);

// create user
const createUser = async(username, email, password) => {
    const user = new User ({username: username, email: email, password: password});
    return user.save();
};

// find user by filter
const findUser = async (filter) =>{
    const query = User.find(filter);
    return query.exec();
};

// set refresh token 
const setRefresh = async(id, token) => {
    const query =  User.updateOne({_id: id}, {$set: {refreshToken: token}});
    return query.exec();
};

export {createUser, findUser, setRefresh}