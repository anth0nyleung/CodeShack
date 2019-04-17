const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
    topicName: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
});

TopicSchema.methods.addQuestion = function(question, callback) {
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

module.exports = mongoose.model("Topic", TopicSchema);
