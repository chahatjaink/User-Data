const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        require: true,
        unique: true
    }
})

userSchema.plugin(AutoIncrement, { inc_field: 'id' });
module.exports = mongoose.model('UserData', userSchema);