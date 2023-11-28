import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    needPassWordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['student', 'faculty', 'admin'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

//pre save middleware/hook ; will work on create() save ())
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // ei this a current process document ke refer kory
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
//post save middleware/hook
userSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});

// model create
export const User = model<TUser>('User', userSchema);
