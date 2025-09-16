'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function getCookie(username: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${username}=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift()!;
  return '';
}

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUserName] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [building, setBuilding] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  // ★ 認証チェック（未ログインなら /login へ）
  useEffect(() => {
    (async () => {
      try {
        await fetch('http://localhost:8000/sanctum/csrf-cookie', {
          credentials: 'include',
        });

        const res = await fetch('http://localhost:8000/api/user', {
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        });

        if (res.status === 401) {
          router.replace('/login?from=/mypage/profile');
          return;
        }

        if (res.ok) {
          const user = await res.json();
          setUserName(user.username ?? '');
          setZipcode(user.zipcode ?? '');
          setAddress(user.address ?? '');
          setBuilding(user.building ?? '');
        }
      } catch {
        router.replace('/login?from=/mypage/profile');
      }
    })();
  }, [router]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
    // ★ 1) 先に CSRF クッキーを取得（204で正常）
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
      credentials: 'include',
    });

    // ★ 2) Cookie から XSRF-TOKEN を取り出す
    const xsrf = decodeURIComponent(getCookie('XSRF-TOKEN') || '');

    const res = await fetch('http://localhost:8000/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': xsrf, // ★ 3) これが無いと 419 になります
      },
      credentials: 'include',
      body: JSON.stringify({ username, zipcode, address, building }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError((data && data.message) || 'プロフィールの保存に失敗しました');
      return;
    }

    alert('プロフィールを保存しました');
    router.push('/');
  } catch {
    setError('通信エラーが発生しました');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">プロフィール設定</h1>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form onSubmit={handleSaveProfile} className="space-y-4">
        <div>
          <label className="block mb-1">ユーザー名</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full border p-2 rounded"
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label className="block mb-1">郵便番号</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="\d{3}-?\d{4}"
            placeholder="例：123-4567"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            className="w-full border p-2 rounded"
            autoComplete="postal-code"
          />
        </div>
        <div>
          <label className="block mb-1">住所</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-2 rounded"
            autoComplete="street-address"
          />
        </div>
        <div>
          <label className="block mb-1">建物名</label>
          <input
            type="text"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            className="w-full border p-2 rounded"
            autoComplete="address-line2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? '保存中…' : '保存する'}
        </button>
      </form>
    </div>
  );
}
