Next-page-router 온보딩입니다.

주어진 과제를 순차적으로 진행해주시고 결과물을 본인 브랜치에 PR생성하여 올려주세요.

## pnpm 설치

```bash
npm i -g pnpm
```

## tokit 설치

```bash
npm i -g @toktokhan-dev/tokit
```

## Download Template

#### tokit 실행하기

```
tokit
```

#### tokit 응답은 고정

대화형 프롬포트의 응답을 아래와 같이 해주세요.

```
What is your project named?  next-page-init
```

```
What is your template?  next-page-init
```

```
What version do you want to use? · v0.0.3
```

```
What is your package manager?  pnpm
```

```
Would you like to create a remote repository on GitHub?  No
```

## Run Server & Client

```
chmod 755 T240701/start.sh && T240701/start.sh
```

or

#### server

```
cd servers/http-mock-server && pnpm i && pnpm run start:dev
```

#### client

```
cd next-page-init && pnpm i && pnpm run dev
```
