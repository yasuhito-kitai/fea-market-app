'use client';

import { useState, useEffect } from "react";
import { Item } from "../types/item";
import { ItemCard } from "./ItemCard";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type Props = {
  initialItems: Item[];
};

export default function ItemsList(props: Props ) {
  const initialItems = props.initialItems;
  const [items, setItems] = useState<Item[]>(initialItems);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchUser() {
    try {
        const res = await fetch(`${apiBaseUrl}/api/user`, {
            credentials: 'include',
            headers: { Accept: "application/json" },
        });
        if (res.ok) {
        const user = await res.json();
        setCurrentUserId(user.id); // ← ここで state 更新
        }
    } catch (e) {
      console.error(e);
    }
  }
  fetchUser();
  }, []);

  const visibleItems = currentUserId
  ? items.filter(item => item.user_id !== currentUserId)
  : items;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {visibleItems.length === 0
        ? (<p>商品がありません</p>)
        : visibleItems.map((item) => <ItemCard key={item.id} item={item} />)
      }
    </div>
  );
}