const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String
});

const adminSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String
});

const courseSchema = new Schema({
    title: String,
    description: String, // fixed typo here
    price: Number,
    adminId: ObjectId
});

const boughtSchema = new Schema({
    courseId: ObjectId,
    userId: ObjectId
});

// fixed 'Model' to 'model'
const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('course', courseSchema);
const boughtModel = mongoose.model('bought', boughtSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    boughtModel
};

