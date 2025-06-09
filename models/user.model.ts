import mongoose, { Schema, Document, Model, models } from "mongoose";

export interface IUser extends Document {
  username: string;
  phone: number;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  models.User || mongoose.model<IUser>("User", userSchema);
