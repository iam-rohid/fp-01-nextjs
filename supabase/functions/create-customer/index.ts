import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createOrRetierveStripeCustomer } from "../_utils/createOrRetierveStripeCustomer.ts";
import { corsHeaders } from "../_utils/corsHeaders.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    throw "Unauthorized";
  }

  try {
    const customer = await createOrRetierveStripeCustomer(authHeader);
    return new Response(JSON.stringify({ customer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify(e), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
