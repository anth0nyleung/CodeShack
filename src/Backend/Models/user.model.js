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

UserSchema.pre("save", function(next) {
    this.update({ "history.10": { $exists: true } }, { $pop: { history: 1 } });
});

module.exports = mongoose.model("User", UserSchema);
