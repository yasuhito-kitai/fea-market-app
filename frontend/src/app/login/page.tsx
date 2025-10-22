'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // ① まずCSRFトークンをもらう
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
      method: 'GET',
      credentials: 'include', // ← クッキー受け取り必須
    });
      // ② クッキーからXSRF-TOKENを取得
    function getCookie(name: string) {
      const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
      return match ? decodeURIComponent(match[1]) : null;
    }
      const xsrf = getCookie('XSRF-TOKEN');

      // ③ そのトークンを使ってログイン
      const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',           // ← 302回避＆JSON要求
          'X-XSRF-TOKEN': xsrf ?? '',
        },
        credentials: 'include', // ← Cookieベースの認証に必須
        body: JSON.stringify({ email, password }),
      });

      // 念のためログ
      // console.log('status:', res.status);

      // Fortifyは稀にJSON以外を返すこともあるので保険でパースを分岐
      let data: any = null;
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        data = await res.json();
      } else {
        // JSON以外なら空オブジェクトに
        data = {};
      }

      if (!res.ok) {
        // Fortifyの失敗メッセージ対応
        const msg =
          data?.message ||
          data?.errors?.email?.[0] ||
          data?.errors?.password?.[0] ||
          'ログインに失敗しました';
        setError(msg);
        return;
      }

      // 成功判定：
      // 1) two_factor === false（現在の既定JSON）
      // 2) 後でCustomLoginResponseを入れたら message でも判定できる
      if (data?.two_factor === false || data?.message) {
        // ここでユーザー情報取得へ進めてもOK（/api/user など）
        router.push('/'); // 成功後の遷移先（必要に応じて変更）
        return;
      }

      // 想定外フォーマットでも成功は成功として遷移
      router.push('/');
    } catch (err) {
      setError('通信エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md min-w-[320px] mx-auto mt-10 p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">ログイン</h1>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">メールアドレス</label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? '送信中…' : 'ログイン'}
        </button>
      </form>
    </div>
  );
}
