# フリマアプリ開発環境（Laravel + Next.js + MySQL + Docker）

このリポジトリは、Laravel（バックエンド）・Next.js（フロントエンド）・MySQL・phpMyAdmin を Docker で構築した、フリマアプリの開発環境です。

---

## 🚀 開発環境のセットアップ手順

以下の手順に従って開発環境を立ち上げてください。

### ① リポジトリを clone

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### ② Laravel の `.env` ファイルを作成

```bash
cp backend/.env.example backend/.env
```

---

### ③ Docker イメージをビルドして起動

```bash
docker-compose build --no-cache
docker-compose up -d
```

---

### ④ Laravel のアプリケーションキーを生成

```bash
docker-compose exec backend php artisan key:generate
```

---

### ⑤ Laravel のマイグレーション（必要に応じて）

```bash
docker-compose exec backend php artisan migrate
```

---

## 🌐 各サービスのURL

| サービス名     | アクセスURL           |
|----------------|-----------------------|
| Laravel        | http://localhost:8000 |
| Next.js        | http://localhost:3000 |
| phpMyAdmin     | http://localhost:8080 |

### 🔐 phpMyAdmin ログイン情報

- サーバー名：`mysql`
- ユーザー名：`laravel_user`
- パスワード：`laravel_pass`

---

## 📁 ディレクトリ構成（概要）

```
.
├── backend/               # Laravel アプリ（PHP）
│   ├── .env.example       # Laravel用の.env雛形
│   └── ...                # その他Laravelのコード
├── frontend/              # Next.js アプリ（TypeScript）
│   └── ...                # フロントエンドのコード
├── docker-compose.yml     # Docker全体構成
└── README.md              # このファイル
```

---

## ⚙️ 開発ツールの前提条件

- [Docker Desktop](https://www.docker.com/) がインストールされていること
- Git が使えること

---

## 📌 注意事項

- `.env` や `vendor/`、`node_modules/` は Git 管理されていません。必要に応じて以下を実行してください：

```bash
# Laravel（backend）用依存をインストールしたい場合（初回や vendor 削除後）
docker-compose exec backend composer install

# Next.js（frontend）用依存をインストールしたい場合
docker-compose exec frontend npm install
```

---

## 📞 サポート・トラブルシューティング

- Laravelで500エラーが出た場合：
  - `.env` が存在するか？
  - `php artisan key:generate` を実行済みか？
  - `storage/` と `bootstrap/cache` に書き込み権限があるか？

- LaravelとMySQLが接続できない場合：
  - `.env` の `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` と
  - `docker-compose.yml` の設定が一致しているか？

- phpMyAdminが起動しない・エラーが出る場合：
  - `platform: linux/amd64` を `phpmyadmin` サービスに追加しているか？

---

## 📝 ライセンス

このリポジトリは学習およびポートフォリオ用途での使用を想定しています。
