import mongoose from 'mongoose';
const role = ['user', 'admin']
const avatarDefault = 'https://www.clinicaariasdent.com/_next/static/media/man.05d37c2e.svg'

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: role, default: 'user'},
  avatar: { type: String, default: avatarDefault },
  bio: { type: String},
  isActive: {type: Boolean, default: true}
  // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  // friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friends' }],
},
  {
  timestamps: true,
});


const User = mongoose.model('User', userSchema);

export default User