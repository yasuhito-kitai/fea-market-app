'use client'

import { useRouter, useSearchParams } from "next/navigation"

export default function PurchaseCompletePage() {
    const searchParams = useSearchParams();
    const itemId = searchParams.get('item_id');
    const amount = searchParams.get('amount');

    console.log("GETパラメータから受け取ったitem_idは、" + itemId);
    console.log("GETパラメータから受け取ったamountは、" + amount);

    return (
        <div>購入完了ページ（仮）</div>
    );
}