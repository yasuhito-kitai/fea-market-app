import { Item } from "../types/item";
import ItemsList  from "../components/ItemsList";

const apiBaseUrl = process.env.API_BASE_URL_SERVER;

async function getItems(): Promise<Item[]> {
  const res = await fetch(`${apiBaseUrl}/api/items`, {
    cache: "no-store", // 毎回最新のデータを取りにいく設定
    credentials: 'include',
    headers: { Accept: 'application/json' }
  });
  const data = await res.json();
  return data.data;
}

export default async function Page() {
  const items = await getItems();
  return <ItemsList initialItems={items} />;

}
