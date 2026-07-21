import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !(session.user as { id?: string }).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const client = await clientPromise;
    const db = client.db();
    
    // Fetch user with additional fields
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(userId) },
      { 
        projection: { 
          _id: 1, 
          email: 1, 
          name: 1, 
          image: 1, 
          number: 1, 
          gender: 1,
          passwordHash: 1 // Include to check if password exists
        } 
      }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        image: user.image,
        number: user.number || "",
        gender: user.gender || "",
        hasPassword: !!user.passwordHash // Check if user has a password set
      }
    });

  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !(session.user as { id?: string }).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const { number, gender } = await request.json();

    // Basic validation
    if (number && !/^\+?[\d\s-()]+$/.test(number)) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
    }

    if (gender && !["male", "female", "other", ""].includes(gender)) {
      return NextResponse.json({ error: "Invalid gender value" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    
    // Update user profile
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          number: number || "",
          gender: gender || "",
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return updated user data
    const updatedUser = await db.collection("users").findOne(
      { _id: new ObjectId(userId) },
      { 
        projection: { 
          _id: 1, 
          email: 1, 
          name: 1, 
          image: 1, 
          number: 1, 
          gender: 1 
        } 
      }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Profile updated successfully",
      user: {
        id: updatedUser!._id.toString(),
        email: updatedUser!.email,
        name: updatedUser!.name,
        image: updatedUser!.image,
        number: updatedUser!.number || "",
        gender: updatedUser!.gender || ""
      }
    });

  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
