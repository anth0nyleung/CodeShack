const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    companyName: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
});

CompanySchema.methods.addQuestion = function(question, callback) {
    var index = this.questions.findIndex(el => {
        return el.equals(question);
    });
    if (index !== -1) {
        return callback(null, null);
    } else {
        this.questions.push(question);
        this.save(function(err, course) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, course);
            }
        });
    }
};

module.exports = mongoose.model("Company", CompanySchema);
