"use client";

import { useState } from "react";
import { useParams,useRouter } from "next/navigation";

export default function PurchaseAddressPage() {
    const [zipcode, setZipcode] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [building, setBuilding] = useState<string>("");
    const params = useParams();
    const itemId = Array.isArray(params.item_id)
        ? params.item_id[0]   // 配列なら最初の要素を取る
        : params.item_id ?? ""; // 文字列ならそのまま / 未定義なら空文字
    const router = useRouter()
    
    function handleSave() {
        const data = {
        zipcode: zipcode,
        address: address,
        building: building,
        };

        localStorage.setItem("shippingDraft:" + itemId, JSON.stringify(data));
        alert("保存しました");
        router.push(`/purchase/${itemId}`);
    }
    return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">住所の変更</h1>
        <div className="space-y-4">
            <div>
                <label className="block mb-1">郵便番号</label>
                <input
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                type="text"
                className="w-full border p-2 rounded"
                />
            </div>

            <div>
                <label className="block mb-1">住所</label>
                <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className="w-full border p-2 rounded"
                />
            </div>

            <div>
                <label className="block mb-1">建物名</label>
                <input
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                type="text"
                className="w-full border p-2 rounded"
                />
            </div>

            <button
            onClick={handleSave} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60 mt-6"
            >
            更新する
            </button>
        </div>
    </main>
    );
}