'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PurchaseForm from '@/components/PurchaseForm';
import type { Item } from '@/types/item';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

type Props = {
  item: Item;
};

export default function PurchaseClient(props: Props) {
    const item = props.item;
    return (
        <Elements stripe={stripePromise}>
            <PurchaseForm item={item} />
        </Elements>
    );
}