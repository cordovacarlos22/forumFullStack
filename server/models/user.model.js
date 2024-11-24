import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  firstName: { type: 'string', required: true },
  lastName: { type: 'string', required: true },
  email: { type: 'string', required: true, unique: true },
  password: { type: 'string', required: true },
  // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  // friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friends' }],
},
  {
  timestamps: true,
});


const User = mongoose.model('User', userSchema);

export default User