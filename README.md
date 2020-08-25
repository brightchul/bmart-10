# B-mart 10조 저장소 입니다 🖐

> 이슬기, 박철훈, 조찬기 비마트 서비스

[![title](https://img.shields.io/badge/DEVELOPER-이슬기-blue)](https://github.com/sss5793)
[![title](https://img.shields.io/badge/DEVELOPER-박철훈-blue)](https://github.com/brightchul)
[![title](https://img.shields.io/badge/DEVELOPER-조찬기-blue)](https://github.com/changicho)

![typescript](https://img.shields.io/badge/-TypeScript-007ACC?&logo=TypeScript&logoColor=white)
![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?&logo=ESLint&logoColor=white)
![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?&logo=Prettier&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?&logo=react&logoColor=white)
![Babel](https://img.shields.io/badge/-Babel-eece4f?&logo=Babel&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?&logo=Node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-191919?&logo=Node.js&logoColor=white)
![Mysql](https://img.shields.io/badge/-MySQL-4479A1?&logo=MySQL&logoColor=white)
![EC2](https://img.shields.io/badge/-EC2-232F3E?&logo=Amazon-AWS&logoColor=white)
![GitHub](https://img.shields.io/badge/-Github-181717?&logo=Github&logoColor=white)
![Slack](https://img.shields.io/badge/-Slack-4A154B?&logo=Slack&logoColor=white)
![GoogleDocs](https://img.shields.io/badge/-google%20docs-blue)

![main](https://user-images.githubusercontent.com/38618187/90328852-ca698900-dfda-11ea-9eb6-94463bb9770f.gif)

B마트보다 조금 더 나은 마트! B+ 마트 입니다.

## [B+마트로 이동하기 🚴🏻‍♀️🚴🏻🚴🏻‍♂️](http://3.35.51.138/)

## 📌 프로젝트 소개

저희 프로젝트를 소개합니다.

[위키 주소](https://github.com/woowa-techcamp-2020/bmart-10/wiki)

### 👨‍👨‍👧 팀원 소개

|                                                      이슬기                                                       |                                                   박철훈                                                    |                                                   조찬기                                                    |
| :---------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: |
| ![이슬기](https://avatars0.githubusercontent.com/u/36844660?s=460&u=47f744af941d6de450edbbe5f57b4e145b080298&v=4) |                   ![박철훈](https://avatars0.githubusercontent.com/u/57323359?s=460&v=4)                    |                   ![조찬기](https://avatars1.githubusercontent.com/u/38618187?s=460&v=4)                    |
|    [이슬기 소개서](https://github.com/woowa-techcamp-2020/bmart-10/wiki/introduce-%EC%9D%B4%EC%8A%AC%EA%B8%B0)    | [박철훈 소개서](https://github.com/woowa-techcamp-2020/bmart-10/wiki/introduce-%EB%B0%95%EC%B2%A0%ED%9B%88) | [조찬기 소개서](https://github.com/woowa-techcamp-2020/bmart-10/wiki/introduce-%EC%A1%B0%EC%B0%AC%EA%B8%B0) |

소개서를 클릭해서, 팀원 소개를 확인하세요~

### ⚙ 기술 스택

![기술 스택](https://user-images.githubusercontent.com/38618187/90329062-6778f180-dfdc-11ea-9754-6e2b40d81d04.png)

저희 프로젝트는 Typescript를 사용합니다.

### 💪 다양한 도전들

저희 프로젝트에는 다양한 시도들을 해봤는데요, 다음 글들을 읽어주세요

- [backlog를 이용한 프로젝트 관리](https://docs.google.com/spreadsheets/d/1gyMJOVOPhGRMWUTwD1kpeA1Ba2uewj1YoHgOcpYOZX8/edit?pli=1#gid=0)
- [git hooks를 이용한 커밋 메시지 자동 검사](https://github.com/woowa-techcamp-2020/bmart-10/wiki/Automatic-check-of-commit-message)

## 🌈 데이터베이스 schema 구조

![schema](https://user-images.githubusercontent.com/38618187/90085423-e6f39000-dd52-11ea-9377-24ef36e97964.png)

[wiki 링크](https://github.com/woowa-techcamp-2020/bmart-10/wiki/%5B%F0%9F%93%97-DB%5D-ERD)

## 👨‍💻 실행 방법

frontend에서 사용하는 script 명령들은 다음과 같습니다.

```bash
yarn start # 개발 서버 실행
```

```bash
yarn build # 배포용 파일 빌드
```

```bash
yarn test # 테스트 실행
```

backend에서 사용하는 script 명령들은 다음과 같습니다.

```bash
yarn start # 서버 실행
```

```bash
yarn start:dev # 개발용 서버 실행
```

## 🕋 프로젝트 구조

### 🗂 폴더 구조

프로젝트의 root는 다음과 같이 구성되어 있습니다.

```bash
├── backend   # 백엔드 관련 코드
└── frontend  # 프로트엔드 관련 코드
```

#### frontend

프론트엔드의 폴더 구조는 다음과 같습니다.

```bash
├── config    # webpack, babel 등 설정 파일
├── public    # build에 사용할 html등 정적 파일
│   └── asset
├── scripts   # 명령에 사용되는 scripts 파일들
└── src
    ├── components  # 컴포넌트
    ├── constants   # 사용하는 상수
    ├── pages       # 페이지 컴포넌트 (routing을 위한)
    └── stylesheets # 공용 스타일 속성
```

#### backend

```bash
└── src
    ├── constants   # 사용하는 상수
    ├── daos        # Data Access Object
    ├── routes      # 라우터
    ├── types       # 타입 정의
    └── util        # 유틸성 함수들
```

## ⚙️ dotenv

프로젝트에서 사용하는 외부에 공개되지 않아야 하는 정보는 dotenv를 통해 관리합니다.

### frontend 설정 파일 .env

```sh
# API Server
REACT_APP_API_HOST=
```

### backend 설정 파일 .env

```sh
NODE_ENV=

# Server
PORT=
HOST=

# Passport
JWT_SECRET=

# Database Server
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

# Test Database Server
TEST_DB_HOST=
TEST_DB_PORT=
TEST_DB_USER=
TEST_DB_PASSWORD=
TEST_DB_NAME=
```

## 🥴 Support

프로젝트가 마음에 드신다면 Star⭐️를 눌러주세요!
