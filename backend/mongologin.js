const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  passwords: [String]
});

const User = mongoose.model('User', userSchema);

const getPasswords = async (name) => {
  const user = await User.findOne({ name });

  if (user) {
    return user.passwords;
  } else {
    console.log('No user found with that name.');
    return [];
  }
};



