const mongoose  = require('mongoose');
const plm  = require('passport-local-mongoose');

//usermane: prakashv124421
//password: myQg3sisrpw6Grkv

mongoose.connect('mongodb://127.0.0.1:27017/college')
  .then(() => console.log('Connected! to DB'));

const schema = mongoose.Schema;

const userSchema = new schema({
	email : String
});


userSchema.plugin(plm);

module.exports = mongoose.model('users', userSchema);