# Node.js の軽量イメージを使用
FROM node:20-bullseye

# 作業ディレクトリを /app に設定
WORKDIR /app

# 依存関係ファイルをコピー
COPY package*.json ./

# パッケージインストール
RUN npm install

# アプリのソースコードをすべてコピー
COPY . .

# Next.js の開発サーバーを起動（Turbopack 無効）
CMD ["npm", "run", "dev"]
