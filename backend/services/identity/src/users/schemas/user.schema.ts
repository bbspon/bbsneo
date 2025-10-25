import { Schema, Document } from "mongoose";

export interface User extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  passwordHash: string;
  role: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  // [PROFILE-TAGGED] Newly added fields
  subscriptionPlan?: "Free" | "Basic" | "Premium" | "Elite";
  subscriptionStartDate?: Date;
  nextRenewalDate?: Date;
  profiles?: ChildProfile[];
  preferences?: UserPreferences;
  // [PROFILE-TAGGED] End new fields
}

// [PROFILE-TAGGED] Supporting interfaces
export interface ChildProfile {
  name: string;
  avatar?: string;
  isChild?: boolean;
  pin?: string;
  language?: string;
}

export interface UserPreferences {
  streamingQuality?: "Auto" | "HD" | "4K" | "SD";
  language?: string;
  autoplay?: boolean;
  notifications?: boolean;
  subtitles?: "Off" | "English" | "Hindi" | "Spanish" | string;
  dataSaver?: boolean;
  downloadQuality?: "Standard" | "High" | "HD";
  devices?: { id: string; name: string; lastActive: string }[];
}
// [PROFILE-TAGGED] End supporting interfaces

// Existing schema definition preserved
export const UserSchema = new Schema<User>(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "User" },
    isVerified: { type: Boolean, default: false },

    // [PROFILE-TAGGED] Appended schema fields
    subscriptionPlan: {
      type: String,
      enum: ["Free", "Basic", "Premium", "Elite"],
      default: "Free",
    },
    subscriptionStartDate: { type: Date },
    nextRenewalDate: { type: Date },

    profiles: {
      type: [
        {
          name: { type: String, required: true, trim: true },
          avatar: { type: String },
          isChild: { type: Boolean, default: false },
          pin: { type: String },
          language: { type: String },
        },
      ],
      default: [],
    },

    preferences: {
      streamingQuality: {
        type: String,
        enum: ["Auto", "HD", "4K", "SD"],
        default: "Auto",
      },
      language: { type: String, default: "English" },
      autoplay: { type: Boolean, default: true },
      notifications: { type: Boolean, default: true },
      subtitles: { type: String, default: "Off" },
      dataSaver: { type: Boolean, default: false },
      downloadQuality: {
        type: String,
        enum: ["Standard", "High", "HD"],
        default: "Standard",
      },
      devices: [
        {
          id: { type: String },
          name: { type: String },
          lastActive: { type: String },
        },
      ],
    },
    // [PROFILE-TAGGED] End appended schema fields
  },
  { timestamps: true, collection: "users" }
);
