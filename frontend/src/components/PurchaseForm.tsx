'use client';

import { PurchaseAddressResponse } from "../types/purchase";
import { useMemo, useState,useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';


const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type Item = {
  id: number | string;
  name: string;
  price: number;
  image: string;
  description?: string | null;
};

type Props = {
  item: Item;
};

export default function PurchaseForm({ item}: Props) {
  // 支払い方法はクレカ／コンビニのみ
  const [payment, setPayment] = useState<string>('クレジットカード');
  const [loading, setLoading] = useState(false);
  const [zipcode, setZipcode] = useState<string | null>(null);
  const [addressLine, setAddressLine] = useState<string | null>(null);

  const priceText = useMemo(
    () => `¥${new Intl.NumberFormat('ja-JP').format(item.price)}`,
    [item.price]
  );

  useEffect(() => {
    async function fetchAddress() {
      try{
      const res = await fetch(`${apiBaseUrl}/api/purchase/address/${item.id}`, {
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

        const data: PurchaseAddressResponse = await res.json();
    // state 更新
      setZipcode(data.zipcode);
      setAddressLine(data.address_line);
    } catch (e) {
      console.error(e);
    }
  }
  fetchAddress();
  },[item.id]);



  const handlePurchase = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // 動作確認の仮処理
      alert(
        `購入（仮）\n` +
        `商品ID: ${item.id}\n` +
        `支払い方法: ${payment}\n` +
        `郵便番号: ${zipcode ? `〒${zipcode}` : '(未設定)'}\n` +
        `住所: ${addressLine ? addressLine : '(未設定)'}`
      );

    } catch (e) {
      console.error(e);
      alert('購入処理でエラーが発生しました（仮）');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 左カラム：商品情報（画像・名前・金額）＋ 入力（支払い方法・配送先） */}
      <div>
        <div className="flex flex-row gap-4">
          <Image src={item.image} alt={item.name} width={240} height={240} />
          <div>
            <h1 className="text-2xl font-bold">{item.name}</h1>
            <p className="text-xl">{priceText}</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold mt-6">支払い方法</h2>
        <select
          className="border rounded-sm px-2 py-1 mt-1"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        >
          <option>クレジットカード</option>
          <option>コンビニ払い</option>
        </select>

        <div className="flex flex-row justify-between items-center mt-6">
          <p className="text-sm font-semibold">配送先</p>
          <Link href="/mypage/profile" className="text-blue-700 underline">
            変更する
          </Link>
        </div>
        <p className="text-sm font-semibold mt-1">
          {zipcode ? `〒${zipcode} `: '（郵便番号未設定。マイページで登録してください）' }
        </p>
        <p className="text-sm font-semibold mt-1">
          {addressLine ? addressLine : '（住所未設定。マイページで登録してください）' }
        </p>
      </div>

      {/* 右カラム：確認（table）＋購入ボタン */}
      <div>
        <table className="w-full border table-fixed">
          <tbody>
            <tr className="border-b">
              <td className="p-5 text-center whitespace-nowrap  w-1/3">商品代金</td>
              <td className="p-5 text-center w-2/3">{priceText}</td>
            </tr>
            <tr>
              <td className="p-5 text-center whitespace-nowrap  w-1/3">支払い方法</td>
              <td className="p-5 text-center w-2/3">{payment}</td>
            </tr>
          </tbody>
        </table>

        <button
          onClick={handlePurchase}
          disabled={loading}
          className="mt-6 inline-block rounded-lg bg-red-500 px-4 py-2 text-white font-semibold hover:opacity-90 disabled:opacity-60"
        >
          {loading ? '処理中…' : '購入する（仮）'}
        </button>
      </div>
    </div>
  );
}