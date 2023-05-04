import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.3.0?target=deno";

serve(async (request) => {
  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"), {
      apiVersion: "2022-11-15",
      httpClient: Stripe.createFetchHttpClient(),
    });
    const cryptoProvider = Stripe.createSubtleCryptoProvider();

    const signature = request.headers.get("stripe-signature");
    const payload = await request.text();

    const event = await stripe.webhooks.constructEventAsync(
      payload,
      signature,
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
