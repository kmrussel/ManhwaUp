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
    email: {type: String},
    password: {type: String},
    refreshToken: {type: String}
});

const User = mongoose.model("User", userSchema)

// create user
const createUser = async(username, email, password, refreshToken) => {
    const user = new User ({username: username, email: email, password: password, refreshToken: refreshToken})
    return user.save()
};

// find user by email 
const findUser = async (email) =>{
    const query = await User.findOne({'email': email})
    return query.exec();
}

// update token
const updateToken = async (_id, username, email, password, refreshToken) => {
    const user = await User.replaceOne({_id:_id}, {username: username, email: email, password: password, refreshToken: refreshToken})
    return user.save()
}

export {createUser, findUser, updateToken}