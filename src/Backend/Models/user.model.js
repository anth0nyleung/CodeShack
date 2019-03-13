const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {type: String, required: true},
    email : { type: String, required: true},
    courses : [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
    history : [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    favCompanies : [{type: mongoose.Schema.Types.ObjectId, ref: 'Company'}]
});

module.exports = mongoose.model("User", UserSchema);
