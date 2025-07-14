import { NextResponse } from 'next/server';

export async function GET() {
  const deploymentInfo = {
    status: 'success',
    timestamp: new Date().toISOString(),
    commit: 'd322cfc',
    features: [
      'Instagram-like Stories Feed',
      'User Authentication System',
      'Dashboard & Onboarding',
      'Gift Star Ratings',
      'Enhanced UI Components',
      'Story Viewer with Auto-progression'
    ],
    message: 'Mr Gift - Latest deployment successful with all features!',
    nodeVersion: process.version,
    nextVersion: '15.3.5'
  };

  return NextResponse.json(deploymentInfo, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}
