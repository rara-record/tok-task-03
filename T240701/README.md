Next-page-router 온보딩입니다.

주어진 과제를 순차적으로 진행해주시고 결과물을 본인 브랜치에 PR생성하여 올려주세요.

## 과제

- [전체 과제](https://www.notion.so/toktokhan/90cc3a62e1564e2b9143d4162d7b5d1a?pvs=4) : T-240701 그룹을 확인해 주세요

### T-240701

- [ID.1: 컨벤션 확인하기](https://www.notion.so/toktokhan/2798a3592f3e4b18befcafd893839134?pvs=4)
- [ID.3: Tokit 사용해서 Next Page Router 프로젝트 시작해보기](https://www.notion.so/toktokhan/Tokit-Next-Page-Router-push-ce538c3331c94286b47ddc6905b45345?pvs=4)
- [ID.23: 온보딩 레포지토리 클론하기](https://www.notion.so/toktokhan/ecc9b69d07834ec595e7f3a58b946fcb?pvs=4)
- [ID.6: @toktokhan-dev/cli-plugin-commit 사용해서 commit 해보기](https://www.notion.so/toktokhan/toktokhan-dev-cli-plugin-commit-commit-f754a326817d4dbfae38683b46dec685?pvs=4)
- [ID.12: @toktokhan-dev/cli 의 defineCommand 함수를 사용하여 주어진 스크립트로 로컬플러그인 만들어보기](https://www.notion.so/toktokhan/toktokhan-dev-cli-defineCommand-2d882329736f4077804dd27910b605ed?pvs=4)
- [ID.25: 피그마 시안 확인하기](https://www.notion.so/toktokhan/d8c9bbfe264348f58d36abda476e21e5?pvs=4)
- [ID.4: Toktoken 사용해서 피그마에서 theme 불러와 보기](https://www.notion.so/toktokhan/Toktoken-theme-e6a66f593b1f45129f3388a3dfa31f09?pvs=4)
- [ID.5: @toktokhan-dev/cli-plugin-gen-theme-chakra 사용해서 Toktoken 으로 불러온 json 파일 기반, chakra 테마 파일 생성해보기](https://www.notion.so/toktokhan/Toktoken-theme-e6a66f593b1f45129f3388a3dfa31f09?pvs=4)
- [ID.19: UI 퍼블리싱하기](https://www.notion.so/toktokhan/UI-c702a97517644f2da44675617bf0624a?pvs=4)
- [ID.11 @toktokhan-dev/cli-plugin-gen-api-react-query 사용해서 swagger 기반 api 파일 생성해보기](https://www.notion.so/toktokhan/toktokhan-dev-cli-plugin-gen-api-react-query-swagger-api-02a1ac1a693048e2b0b85e4e174e650a?pvs=4)
- [ID.26 InfinityContent 또는 InfinityList 사용하여 무한 스크롤 구현해보기](https://www.notion.so/toktokhan/InfinityContent-InfinityList-65478cbaca0d4f7f855da02c88a55463?pvs=4)
- [ID.20 @toktokhan-dev/react-web/socials 사용해서 소셜로그인 구현해보기](https://www.notion.so/toktokhan/toktokhan-dev-react-web-socials-5b73567e26174e1a8d71855d6d665ca7?pvs=4)
- [ID.21 토큰 만료시 리프레시 구현해보기](https://www.notion.so/toktokhan/26286cc898be4dcf9e02e0e126e0cada?pvs=4)

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
What version do you want to use? · v0.0.5
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
