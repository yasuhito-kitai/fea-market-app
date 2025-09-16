import { Item } from "../types/item";
import { ItemCard } from "../components/ItemCard"

const apiBaseUrl = process.env.API_BASE_URL_SERVER;

async function getItems(): Promise<Item[]> {
  const res = await fetch(`${apiBaseUrl}/api/items`, {
  cache: "no-store", // 毎回最新のデータを取りにいく設定
  });
  const data = await res.json();
  return data.data;
}

export default async function Page() {
  const items = await getItems();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.length === 0
        ? (<p>商品がありません</p>)
        : items.map((item) => <ItemCard key={item.id} item={item} />)
      }
    </div>
  );
}
