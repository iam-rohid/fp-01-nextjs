import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { cryptoProvider, stripe } from "../_utils/stripe.ts";

serve(async (request) => {
  try {
    const signature = request.headers.get("stripe-signature");
    const payload = await request.text();

    const event = await stripe.webhooks.constructEventAsync(
      payload,
      signature!,
      Deno.env.get("STRIPE_WEBHOOKS_SECRET"),
      undefined,
      cryptoProvider,
    );

    console.log("EVENT TYPE: ", event.type);

    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("PEYMENT INTENT SUCCEEDED");
        break;
      case "customer.created":
        console.log("CUSTOMER CREATED");
        break;
      default:
        console.log("Unhandled event type ", event.type);
    }

    return new Response("SUCCESS", { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }
});
