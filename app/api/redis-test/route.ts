import { NextResponse } from "next/server";
import { getRedisKey, setRedisKey } from "@/lib/redis";

export async function GET() {
  try {
    // Try to write to Redis
    const testKey = "test-key";
    const testValue = "test-value-" + new Date().toISOString();
    
    // Set the value
    await setRedisKey(testKey, testValue);
    
    // Read it back
    const readValue = await getRedisKey(testKey);
    
    return NextResponse.json({
      success: true,
      message: "Redis connection successful",
      wrote: testValue,
      read: readValue,
      matches: testValue === readValue
    });
  } catch (error) {
    console.error("Redis test failed:", error);
    return NextResponse.json({
      success: false,
      error: "Redis test failed",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 