const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firebase_id: { type: String, required: true, unique: true, select: false },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    year: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    favCompanies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
});

UserSchema.methods.addHistory = function(question_id, callback) {
    var index = this.history.findIndex(el => {
        return el.equals(question_id);
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
