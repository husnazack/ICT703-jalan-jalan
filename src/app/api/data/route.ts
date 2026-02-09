import { list } from '@vercel/blob';

export async function GET() {
  try {
    // List all blobs under the data-travel-group-5/ prefix
    const { blobs } = await list({ prefix: 'data-travel-group-5/' });

    if (blobs.length === 0) {
      return new Response(JSON.stringify({ error: 'No travel data found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Sort by uploadedAt descending to get the latest file
    const sorted = blobs.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    const latestBlob = sorted[0];

    // Fetch the actual JSON content from the blob URL
    const response = await fetch(latestBlob.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch blob content: ${response.status}`);
    }

    const jsonData = await response.json();

    return new Response(JSON.stringify(jsonData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error loading data from blob storage:', error);
    return new Response(
      JSON.stringify({ error: 'Error loading data' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
