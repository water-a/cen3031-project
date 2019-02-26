const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let exampleSchema = new Schema({
    example: String,
    hello: String,
    hello2: String,
    hello3: String
});

let Example = mongoose.model('Example', exampleSchema);

module.exports = Example;