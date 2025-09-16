import { Item } from "@/types/item";
import Image from "next/image";
import Link from "next/link";

const apiBaseUrl = process.env.API_BASE_URL_SERVER;

async function getItem(item_id: string): Promise<Item> {
  const res = await fetch(`${apiBaseUrl}/api/items/${item_id}`, {
  cache:"no-store",
  });
  if (!res.ok) {
  throw new Error(`HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.data;

}

export default async function ItemDetailPage({ params }: { params: { item_id: string } }) {
  const item = await getItem(params.item_id);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Image src={item.image} alt={item.name} width={480} height={480} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{item.name}</h1>
          <p className="text-xl">¥{new Intl.NumberFormat("ja-JP").format(item.price)}(税込)</p>
          <Link href={`/purchase/${item.id}`} className="mt-6 inline-block rounded-lg bg-red-500 px-4 py-2 text-white font-semibold hover:opacity-90">
            <div>購入手続きへ</div>
          </Link>
          <p className="text-lg font-semibold">商品説明</p>
          <p className="text-xs whitespace-pre-wrap">{item.description}</p>
          <p className="text-lg font-semibold">商品の情報</p>
          <p className="text-sm font-semibold">カテゴリー</p>
          <p className="text-sm font-semibold">商品の状態</p>
          <p className="text-lg text-gray-500 font-semibold">コメント(コメント数を表示)</p>
          </div>
      </div>
    </div>
  );
}
