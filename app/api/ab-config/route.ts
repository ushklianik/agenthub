import { NextResponse } from 'next/server';

// Simulates a slow remote A/B testing config server (CDN cache miss, cold start, etc.)
// Real-world: Optimizely datafile fetch, Adobe Target, VWO config endpoint
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return NextResponse.json({
    sdkVersion: '4.2.1',
    experiments: {
      hero_banner: {
        id: 'exp_7f3a2b',
        variant: 'control',
        weight: 1.0,
        showHero: true,
      },
      pricing_cta: {
        id: 'exp_9c1d4e',
        variant: 'control',
        weight: 1.0,
      },
    },
    featureFlags: {
      new_checkout: false,
      agent_recommendations: true,
    },
  });
}
