import { Item } from "@/types/item";
import PurchaseForm from "@/components/PurchaseForm";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";

const apiBaseUrl = process.env.API_BASE_URL_SERVER || "http://localhost:8000";

async function getItem(item_id: string): Promise<Item> {
  const res = await fetch(`${apiBaseUrl}/api/items/${item_id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.data;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default async function PurchasePage({ params }: { params: { item_id: string } }) {
  const item = await getItem(params.item_id);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Elements stripe={stripePromise}>
        <PurchaseForm item={item} />
      </Elements>
    </div>
  );
}