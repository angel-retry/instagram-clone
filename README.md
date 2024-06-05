# Instagram-clone
此網站為使用react、firebase、chakra UI、zustand製作出的IG社交平台的網站。

## 專案連結
[https://clone-instagram-by-enju.vercel.app/](https://clone-instagram-by-enju.vercel.app/)

## Features - 產品功能
### 註冊/登入/登出
- 使用者可以透過註冊帳號或使用 Google 帳號快速登入。
- 未登入使用者無法使用網站的主要功能，必須先登入才能使用。
- 登入後，用戶可以輕鬆登出帳戶。
### 發送貼文
- 使用者可以新增貼文，可發送照片以及文字內容。
- 使用者可以刪除貼文。
### 用戶互動
- 使用者可以在首頁看到推出建議的使用者，並且可以追蹤。
- 使用者可以互相追隨彼此。
- 使用者可以按讚貼文以及留言。
### 搜尋功能
- 使用者可以使用搜尋功能。
- 使用者可以看到搜尋結果符合相關字的其他使用者，並可以直接追隨或點進使用者個人資料。
### 通知功能
- 使用者可以接收其他使用者對自己貼文的互動通知(按讚、留言)。
### 個人頁面
- 使用者可以看到自己的追蹤者、追隨者以及貼文數量。
- 使用者可以看到自己過去所建立的貼文。
- 使用者可以修改自己的個人頁面資料。
- 使用者可以看到自己按讚過的貼文。

## Screen Photo - 專案畫面
- 登入畫面
  ![image](https://github.com/angel-retry/instagram-clone/assets/71422058/58557522-3659-450c-a5d6-50ead402c6a3)
- 首頁畫面
  ![image](https://github.com/angel-retry/instagram-clone/assets/71422058/02434fe9-7559-4811-ada6-78ad979667de)
- 個人頁面
  ![image](https://github.com/angel-retry/instagram-clone/assets/71422058/db79e414-d972-4f43-bd3a-2f8de49069d1)

## Installing - 專案安裝流程
1. 請git clone我的專案。
```
git clone https://github.com/angel-retry/instagram-clone.git
```
2. git clone專案後，cd此專案名稱，進入此專案資料夾。
```
cd instagram-clone
```
3. 新增.env檔，請參考.env.example裡面內容，請至firebase建立專案將下面內容補齊。
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```
4. 接下來安裝npm套件。
```
npm install
```
5. 載完套件後就可以啟動專案。
```
npm run dev
```
6. 接下來會在terminal看到以下內容，代表伺服器建立成功。
```
> instagram_clone@0.0.0 dev
> vite

  VITE v5.2.11  ready in 4386 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

```
7.點選[http://localhost:5173/](http://localhost:5173/) 開始使用此網站，可使用以下帳號登入。
```
email: user1@example.com
password: 123456
```
## Development tool - 開發工具
- `@chakra-ui/icons`: ^2.1.1
- `@chakra-ui/react`: ^2.8.2
- `@emotion/react`: ^11.11.4
- `@emotion/styled`: ^11.11.5
- `@hookform/resolvers`: ^3.5.0
- `firebase`: ^10.12.2
- `framer-motion`: ^11.2.6
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `react-firebase-hooks`: ^5.1.1
- `react-hook-form`: ^7.51.5
- `react-icons`: ^5.2.1
- `react-router-dom`: ^6.23.1
- `yup`: ^1.4.0
- `zustand`: ^4.5.2

