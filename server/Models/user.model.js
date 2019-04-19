const mongoose = require("mongoose");
const Course = require("./course.model");
const remove = require("lodash/remove");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firebase_id: { type: String, required: true, unique: true, select: false },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    year: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    favCompanies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
    role: { type: String, enum: ["admin", "user"], default: "user" }
});

UserSchema.pre("save", function(next) {
    if (this.isModified("role")) {
        return next(new Error("Trying to modify restricted data"));
    }
    return next();
});

UserSchema.methods.addHistory = function(question_id, callback) {
    if (question_id === undefined) {
        console.log("Undefined question_id");
        return callback({ message: "Question ID undefined" });
    }
    var index = this.history.findIndex(el => {
        return el == question_id;
    });

    if (index !== -1) {
        this.history.splice(index, 1);
        this.history.unshift(question_id);
    } else {
        this.history.unshift(question_id);
    }
    this.save(function(err, user) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, user);
        }
    });
};

module.exports = mongoose.model("User", UserSchema);
