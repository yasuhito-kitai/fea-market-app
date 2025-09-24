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
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">住所の変更</h1>
                        <p>{itemId}</p>
            <div>
                <label className="block mb-1">郵便番号</label>
                <p>{`${zipcode}`}</p>
                <input value={zipcode} onChange={(e) => setZipcode(e.target.value)}
                    type="text"
                />
            </div>
            <div>
                <label className="block mb-1">住所</label>
                <p>{`${address}`}</p>
                <input value={address} onChange={(e) => setAddress(e.target.value)}
                    type="text"
                />
            </div>
            <div>
                <label className="block mb-1">建物名</label>
                <p>{`${building}`}</p>
                <input value={building} onChange={(e) => setBuilding(e.target.value)}
                    type="text"
                />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60" onClick={handleSave}>更新する</button>
        </div>
    );
}