export async function handler(event, context) {
  const { order } = event.queryStringParameters;
  if (!order) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing order number" }),
    };
  }

  try {
    // Example payload for SMEPay or any UPI API
    const payload = {
      order_id: order,
      amount: 299, // dynamically set later if needed
      currency: "INR",
      description: `Payment for order #${order}`,
    };

    const response = await fetch("https://YOUR_ENDPOINT/create-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer YOUR_API_KEY`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        url: result.payment_url || "https://fallback-url.com",
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}
