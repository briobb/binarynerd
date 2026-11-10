# タツミ研磨株式会社 コーポレートサイト

HTML/CSS/JavaScript の1ページサイト。依存ライブラリ・ビルド不要。

## ローカル確認

このディレクトリで `python3 -m http.server 8080` を実行し http://localhost:8080 を開きます。

## 編集

- 本文・会社情報：index.html
- 配色・レイアウト：style.css
- メニュー・FAQ属性・入力確認：main.js
- 未確定情報・差し替え画像：site-config.js
- 写真は assets/ に置き、site-config.js のパスを指定。例：assets/hero.webp、mirror-polishing.webp、hairline-finishing.webp、buff-polishing.webp、access-step-01.webp ～ 03.webp。
- 仮素材はCSSによる金属の抽象表現です。実際の設備・製品の写真ではありません。
- 道案内の説明は assets.access[].description に設定。3枚と説明が確定したら index.html の「準備中」文も更新してください。

## 未確定・公開前の確認事項

- 代表者正式氏名（現在「本多」）、郵便番号
- 創業・設立年、営業時間、休業日（掲載する場合）
- 本番ドメイン・サーバー環境
- メール送信先と送信サービス
- 実際の作業・加工写真、道案内写真3枚と説明文
- Googleマップの正確な目的地
- 正式な個人情報保護方針

## お問い合わせの状態

入力確認のみ実装。送信・アップロード・保存は行いません。未送信であることを画面に表示します。
必須・メール形式・添付の種類/拡張子/5MB上限・同意を検証。クライアント検証は安全性を保証しません。

送信機能導入時はサーバー側に検証、レート制限・スパム対策、添付の実体形式検査・安全性検査、容量制限、保存先の非公開化を実装してください。秘密鍵はサーバーの環境変数で管理します。送信中ロック、成功/失敗通知は実際のサーバー応答に接続し、送信準備中の表示・プライバシー文を更新してください。現段階で架空の送信APIは設けていません。

## SEO

title・description・OGP・LocalBusiness構造化データを実装済み。未確認情報は登録していません。
本番URLは推測せず未設定。確定後、`python3 scripts/configure-seo.py https://確定したドメイン/` を実行して canonical・og:url・robots.txt・sitemap.xml を生成します。OG画像は実写真提供後に追加してください。

## 公開

静的ホスティングに index.html、style.css、main.js、site-config.js、assets/、robots.txt、sitemap.xml を配置します。本番公開・メール送信設定は未実施です。
