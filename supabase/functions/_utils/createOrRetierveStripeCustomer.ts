import { stripe } from "./stripe.ts";
import { supabaseAdmin } from "./supabase.ts";

export const createOrRetierveStripeCustomer = async (authHeader: string) => {
  const jwt = authHeader.replace("Bearer ", "");
  const {
    data: { user },
  } = await supabaseAdmin.auth.getUser(jwt);
  if (!user) throw new Error("No user found for JWT!");

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("first_name,last_name,stripe_customer_id")
    .eq("id", user?.id).single();

  if (error) throw error;

  if (!data) {
    throw "User profile not found!";
  }

  if (!data.stripe_customer_id) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: `${data.first_name} ${data.last_name}`,
      metadata: { user_id: user.id },
    });
    await supabaseAdmin.from("profiles").update({
      stripe_customer_id: customer.id,
    }).eq("id", user.id).throwOnError();
    return customer.id;
  } else {
    return data.stripe_customer_id;
  }
};
