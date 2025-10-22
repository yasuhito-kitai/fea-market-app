'use client'

import { useSearchParams } from "next/navigation"
import Link from "next/link";

export default function PurchaseCompletePage() {
    const searchParams = useSearchParams();
    const itemId = searchParams.get('item_id');
    const name = decodeURIComponent(searchParams.get('name') ?? '');
    const amountStr = searchParams.get('amount');
    const amountNum = amountStr ? Number(amountStr) : null;
    const amountJa = amountNum !== null ? new Intl.NumberFormat('ja-JP').format(amountNum) : '-';

    return (
        <main className="flex-1 flex items-center justify-center ">
      <div className="p-8 w-full max-w-md text-center">
            <h1 className="text-2xl font-bold text-green-600 mb-4">購入が完了しました</h1>
                <h2 className="text-lg font-semibold mb-6 text-gray-700">注文情報</h2>
                <div className="text-left space-y-3 mb-8 px-22">
            <p className="text-sm text-gray-600">商品ID：<span className="font-semibold text-gray-800">{itemId}</span></p>
            <p className="text-sm text-gray-600">商品名：<span className="font-semibold text-gray-800">{name}</span></p>
                    <p className="text-sm text-gray-600">金額：<span className="font-semibold text-gray-800">¥{amountJa}</span></p>
                    <div className="flex justify-center">
                        <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">トップへ戻る</Link>
                        </div>
                </div>
            </div>
            </main>
    );
}