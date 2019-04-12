const Topic = require("../Models/topic.model");
const Question = require("../Models/question.model");

module.exports = {
    createTopic: (req, res) => {
        var topic = new Topic(req.body);

        topic.save(function(err, topic) {
            if (err) {
                res.status(500);
                res.send();
            } else {
                res.send(topic);
            }
        });
    },
    updateTopic: (req, res) => {
        Topic.findById(req.params.id, (err, topic) => {
            if (err) {
                res.status(500);
                res.send();
            } else if (!topic) {
                res.status(500);
                res.send();
            } else {
                Object.assign(topic, req.body).save((err, topic) => {
                    if (err) {
                        res.status(500);
                        res.send();
                    } else {
                        res.send(topic);
                    }
                });
            }
        });
    },
    getTopics: (req, res) => {
        Topic.find({}).exec((err, topics) => {
            if (err) {
                res.status(500);
                res.send();
            } else {
                res.send(topics);
            }
        });
    },
    getTopic: (req, res) => {
        Topic.findById(req.params.id)
            .populate("questions")
            .exec((err, topic) => {
                if (err) {
                    res.status(500);
                    res.send();
                } else if (!topic) {
                    res.status(500);
                    res.send();
                } else {
                    res.send(topic);
                }
            });
    },
    addQuestion: (req, res) => {
        Topic.findById(req.params.id, (err, topic) => {
            if (err) {
                res.status(500);
                res.send();
            } else if (!topic) {
                res.status(500);
                res.send();
            } else {
                Question.findById(req.body.question_id, (err, question) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else if (!question) {
                        res.status(500);
                        res.send(err);
                    } else {
                        topic.addQuestion(
                            req.body.question_id,
                            (err, topic) => {
                                if (err) {
                                    res.status(500);
                                    res.send(err);
                                } else {
                                    res.send(topic);
                                }
                            }
                        );
                    }
                });
            }
        });
    }
};
