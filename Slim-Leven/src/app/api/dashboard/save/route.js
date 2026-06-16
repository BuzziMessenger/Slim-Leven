import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../../lib/db';

// Connect to MongoDB
async function connectToDb() {
  await connectToDatabase();
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

export async function POST(request) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Connect to database
    await connectToDb();

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
    // Get the session
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Connect to database
    await connectToDb();

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