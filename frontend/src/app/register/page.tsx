'use client'; // このページがクライアントで動作することを明示します

import { useState } from 'react'; // ユーザー入力などを記憶するためのHook
import { useRouter } from 'next/navigation'; // ← 追加：ページ遷移に使う

export default function RegisterPage() {
  const router = useRouter(); // ← 追加

  // 入力された名前・メール・パスワードを記憶するための「状態」
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // サーバーからのエラーメッセージを表示するための状態
  const [error, setError] = useState<string | null>(null);

  // 登録ボタンがクリックされたときの処理
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // ページの自動リロードを防ぐ

    try {
// 1) 先に CSRF クッキーを取得（204で正常）
await fetch('http://localhost:8000/sanctum/csrf-cookie', {
  credentials: 'include',
});

// 2) Cookie から XSRF-TOKEN を取り出して、ヘッダーに付与
function getCookie(username: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${username}=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift()!;
  return '';
}

const xsrf = decodeURIComponent(getCookie('XSRF-TOKEN') || '');

      const res = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',           // 追加済みOK
          'X-Requested-With': 'XMLHttpRequest',   // 追加済みOK（保険）
          'X-XSRF-TOKEN': xsrf,
        },
        body: JSON.stringify({
          username,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
        credentials: 'include', // Laravel FortifyのCookieを扱うために必要
      });

      console.log('status:', res.status);

      if (!res.ok) {
        // 失敗時だけJSONを読む（成功時は読まないでOK）
        const data = await res.json().catch(() => ({}));
        setError(data.message || '登録に失敗しました');
        return;
      }

      // ✅ 登録成功 → プロフィール設定へ遷移
      router.push('/mypage/profile');

    } catch (err) {
      setError('通信エラーが発生しました');
    }
  };

  // 実際のフォーム部分のHTML（JSX）
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">会員登録</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="名前"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="パスワード（確認）"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          登録
        </button>
      </form>
    </div>
  );
}
