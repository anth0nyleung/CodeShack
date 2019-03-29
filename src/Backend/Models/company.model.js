const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    companyName :  {type: String, required: true},
    questions : [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}]
});

module.exports = mongoose.model('Company', CompanySchema);