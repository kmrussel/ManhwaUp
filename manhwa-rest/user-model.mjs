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
    password: {type: String}
});

const User = mongoose.model("User", userSchema)

// create user
const createUser = async(username, email, password) => {
    const user = new User ({username: username, email: email, password: password})
    return user.save()
};

// find user by email 
const findUser = async (email) =>{
    const query = User.findOne({'email': email})
    return query.exec();
}

export {createUser, findUser}