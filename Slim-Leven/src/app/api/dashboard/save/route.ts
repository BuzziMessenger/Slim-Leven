import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../../lib/db';

// Connect to MongoDB
async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
  return mongoose.connection;
}

// Define User Settings Schema
const userSettingsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  smartHomeDevices: {
    type: [
      {
        id: Number,
        name: String,
        type: String,
        status: Boolean,
        brightness: Number,
      },
    ],
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserSettings = mongoose.models.UserSettings || mongoose.model('UserSettings', userSettingsSchema);

export async function POST(request: Request) {
  try {
    // Get the user ID from Clerk
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await connectToDatabase();

    const { smartHomeDevices } = await request.json();

    // Save or update user settings
    const settings = await UserSettings.findOneAndUpdate(
      { userId },
      {
        userId,
        smartHomeDevices,
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get the user ID from Clerk
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await connectToDatabase();

    // Find user settings
    const settings = await UserSettings.findOne({ userId });

    if (!settings) {
      return NextResponse.json({
        success: true,
        data: { smartHomeDevices: [] },
      });
    }

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}