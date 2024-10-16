Next-page-router 온보딩입니다.

주어진 과제를 순차적으로 진행해주시고 결과물을 본인 브랜치에 PR생성하여 올려주세요.

## 과제

- [전체 과제](https://www.notion.so/toktokhan/NEW-208fa39e3457459da590599993e42313?pvs=4) : T-240701 태크 그룹을 확인해 주세요

### T-240701

- [ID.1: 컨벤션 확인하기](https://www.notion.so/toktokhan/83ed7f8dd5864550966e58f28e7f7880?pvs=4)
- [ID.3: Tokit 사용해서 Next Page Router 프로젝트 시작해보기](https://www.notion.so/toktokhan/Tokit-Next-Page-Router-push-dd86c3dc19e54cc0bb1be7c055e0d23b?pvs=4)
- [ID.23: 온보딩 레포지토리 클론하기](https://www.notion.so/toktokhan/e67ff54852ea420fb2b9ad3d3ce97c9e?pvs=4)
- [ID.6: @toktokhan-dev/cli-plugin-commit 사용해서 commit 해보기](https://www.notion.so/toktokhan/toktokhan-dev-cli-plugin-commit-commit-8259d5ad7e764d85a32be8a9ef32a143?pvs=4)
- [ID.12: @toktokhan-dev/cli 의 defineCommand 함수를 사용하여 주어진 스크립트로 로컬플러그인 만들어보기](https://www.notion.so/toktokhan/toktokhan-dev-cli-defineCommand-ec12a2ecc70c47a6b6d981b4620e7dad?pvs=4)
- [ID.25: 피그마 시안 확인하기](https://www.notion.so/toktokhan/cbdc1ba959874a439b345aae989ec6fe?pvs=4)
- [ID.4: Toktoken 사용해서 피그마에서 theme 불러와 보기](https://www.notion.so/toktokhan/Toktoken-theme-6fa869b970814933b6acda9a95035bd5?pvs=4)
- [ID.5: @toktokhan-dev/cli-plugin-gen-theme-chakra 사용해서 Toktoken 으로 불러온 json 파일 기반, chakra 테마 파일 생성해보기](https://www.notion.so/toktokhan/toktokhan-dev-cli-plugin-gen-theme-chakra-Toktoken-json-chakra-5bdd135f4c1245f3a403724bddca534d?pvs=4)
- [ID.19: UI 퍼블리싱하기](https://www.notion.so/toktokhan/UI-40a83c1ba89d43b8a8e789830ac0225d?pvs=4)
- [ID.11 @toktokhan-dev/cli-plugin-gen-api-react-query 사용해서 swagger 기반 api 파일 생성해보기](https://www.notion.so/toktokhan/toktokhan-dev-cli-plugin-gen-api-react-query-swagger-api-5393684a75fb4325ab2058cd2da7439a?pvs=4)
- [ID.26 InfinityContent 또는 InfinityList 사용하여 무한 스크롤 구현해보기](https://www.notion.so/toktokhan/InfinityContent-InfinityList-2f52403b98c441f6b25b7db1c5caf69f?pvs=4)
- [ID.20 @toktokhan-dev/react-web/socials 사용해서 소셜로그인 구현해보기](https://www.notion.so/toktokhan/toktokhan-dev-react-web-socials-82439661bbc245c2a83fed5387e3e8ca?pvs=4)
- [ID.21 토큰 만료시 리프레시 구현해보기](https://www.notion.so/toktokhan/a501bfdac0f14c24b082e1d6ad1c8e48?pvs=4)

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

<b>next-page-init 폴더는 루트경로에 생성되어야 합니다. tokit을 루트경로에서 실행해주세요.</b>

```
Onboarding-fe
├── next-page-init
├── server
├── T240701
└── README.md
```

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
