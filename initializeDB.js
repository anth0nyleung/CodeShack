var mongoose = require("mongoose");
var Question = require("./src/Backend/Models/question.model");
var Course = require("./src/Backend/Models/course.model");

mongoose.connect("mongodb://localhost:27017/CodeShackDev", {
    useNewUrlParser: true
});

Question.deleteMany({}, err => {
    Course.deleteMany({}, err => {
        new Course({
            courseName: "Programming I",
            courseNumber: "CS 200"
        }).save(() => {
            new Course({
                courseName: "Programming II",
                courseNumber: "CS 300"
            }).save((err, cs300) => {
                new Question({
                    name: "Test",
                    content: "Test",
                    solution: "Test"
                }).save((err, question) => {
                    cs300.addQuestion(question._id, (err, question) => {
                        new Course({
                            courseName: "Programming II",
                            courseNumber: "CS 400"
                        }).save((err, cs400) => {
                            new Course({
                                courseName: "Introduction to Algorithms",
                                courseNumber: "CS 577"
                            }).save((err, cs577) => {
                                new Question({
                                    name: "Two Sum",
                                    content:
                                        "Given an array of integers, return indices of the two numbers such that they add up to a specific target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
                                    solution:
                                        "Approach 2: Two-pass Hash Table To improve our run time complexity, we need a more efficient way to check if the complement exists in the array. If the complement exists, we need to look up its index. What is the best way to maintain a mapping of each element in the array to its index? A hash table. We reduce the look up time from O(n)O(n) to O(1)O(1) by trading space for speed. A hash table is built exactly for this purpose, it supports fast look up in near constant time. I say near because if a collision occurred, a look up could degenerate to O(n)O(n) time. But look up in hash table should be amortized O(1)O(1) time as long as the hash function was chosen carefully. A simple implementation uses two iterations. In the first iteration, we add each element's value and its index to the table. Then, in the second iteration we check if each element's complement (target - nums[i]target−nums[i]) exists in the table. Beware that the complement must not be nums[i]nums[i] itself!"
                                }).save((err, question) => {
                                    cs577.addQuestion(
                                        question._id,
                                        (err, question) => {
                                            cs400.addQuestion(
                                                question._id,
                                                (err, question) => {new Course({
                                                    courseName: "Software Engineering",
                                                    courseNumber: "CS 506"
                                                }).save(() => {
                                                    mongoose.disconnect()
                                                });}
                                            );
                                        }
                                    );
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
