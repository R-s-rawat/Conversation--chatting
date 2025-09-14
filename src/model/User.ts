import mongoose, { Schema, Document } from "mongoose";

//
// 1. TypeScript Interfaces (PascalCase)
//
export interface IMessage extends Document {
  content: string;
  createdAt: Date;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: IMessage[];
}

//
// 2. Mongoose Schemas (camelCase keys for DB fields)
//
const MessageSchema: Schema<IMessage> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: [true, "Username?"], trim: true, unique: true },
  email: { type: String, required: [true, "Email?"], unique: true, match: [/.+\@.+\..+/, "Bad Email"] },
  password: { type: String, required: [true, "Password?"] },
  verifyCode: { type: String, required: [true, "Verify Code?"] },
  verifyCodeExpiry: { type: Date, required: [true, "Verify Code Expiry Is Required"] },
  isVerified: { type: Boolean, default: false},
  isAcceptingMessage: { type: Boolean, default: true },
  messages: [MessageSchema], // embedded subdocuments
});

//
// 3. Models (PascalCase singular)
//
// export const UserModel = mongoose.model<IUser>("User", UserSchema);
const UserModel = (mongoose.models.User as mongoose.Model<IUser>) || (mongoose.model<IUser>("User", UserSchema))

export default UserModel;