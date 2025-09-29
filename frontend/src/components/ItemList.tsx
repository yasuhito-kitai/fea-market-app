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

  return (
    <div>
      {/* ここで items を map して ItemCard を並べる */}
    </div>
  );
}