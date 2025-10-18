'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const API_BASE =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_BASE_URL!
    : "http://localhost:8000";

function getXsrfTokenFromCookie(): string | null {
  const m = document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/);
  return m ? decodeURIComponent(m[1]) : null;
}

type HeaderProps = { logoOnly?: boolean };

export default function Header({ logoOnly = false }: HeaderProps) {
  const router = useRouter();
  const [q, setQ] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (query) router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  const onLogout = async () => {
    try {
      // 1) 最新の CSRF クッキー
      await fetch(`${API_BASE}/sanctum/csrf-cookie`, { credentials: 'include' });

      // 2) ヘッダーに XSRF を載せる
      const xsrf = getXsrfTokenFromCookie();
      if (!xsrf) {
        alert('CSRF トークンの取得に失敗しました');
        return;
      }

      // 3) Fortify の /logout に POST
      const res = await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': xsrf,
        },
      });

      const ct = res.headers.get('content-type') ?? '';
      const text = await res.text();
      const data = ct.includes('application/json') && text ? JSON.parse(text) : null;

      if (!res.ok) {
        console.error('logout error:', res.status, text);
        alert(data?.message ?? 'ログアウトに失敗しました');
        return;
      }

      router.replace('/login'); // 戻るで保護ページに戻らないように
    } catch (e) {
      console.error(e);
      alert('ネットワークエラーが発生しました');
    }
  };

  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur h-[65px]">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 h-full">
        <Link href="/" className="shrink-0 font-bold text-xl tracking-wide">CompanyLogo</Link>

        {!logoOnly && (
          <form onSubmit={onSubmit} className="mx-auto w-full max-w-xl">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="商品名やキーワードで検索"
              className="w-full rounded-xl border px-4 py-2 outline-none ring-0 focus:border-gray-400"
              aria-label="商品検索"
            />
          </form>
        )}

        {!logoOnly && (
          <nav className="ml-auto flex items-center gap-2">
            <button onClick={onLogout} className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
              ログアウト
            </button>
            <Link href="/mypage" className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">マイページ</Link>
            <Link href="/sell" className="rounded-xl bg-black px-3 py-2 text-sm text-white hover:opacity-90">出品する</Link>
          </nav>
        )}
      </div>
    </header>
  );
}