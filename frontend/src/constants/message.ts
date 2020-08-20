type KeyName = {
  [name: string]: string | KeyName;
};

type CategoryType = {
  [name: string]: {
    name: string;
    subCategory: {
      [key: string]: { [name: string]: string };
    };
  };
};

export const KEY_NAME: CategoryType = {
  bread: {
    name: "빵 시리얼 잼",
    subCategory: {
      bread: { name: "빵" },
      cereal: { name: "시리얼" },
      riceCake: { name: "떡" },
      jam: { name: "잼 스프레드" },
    },
  },
  egg: {
    name: "정육 수산 계란",
    subCategory: {
      cow: { name: "소 돼지고기" },
      chicken: { name: "닭 오리 계란" },
      fish: { name: "수산 건어물 김" },
      tofu: { name: "두부 콩나물" },
      rice: { name: "쌀" },
    },
  },
  "hot-dog": {
    name: "분식 야식",
    subCategory: {
      chicken: { name: "치킨 피자" },
      tteokbokki: { name: "떡볶이" },
      dumpling: { name: "만두 튀김 전" },
      giblets: { name: "곱창 족발" },
    },
  },
  icecream: { name: "아이스크림", subCategory: {} },
  "meal-kit": {
    name: "밀키트",
    subCategory: {
      soup: { name: "국 탕 찌개" },
      cook: { name: "요리 반찬" },
    },
  },
  milk: { name: "우유 유제품", subCategory: {} },
  salad: { name: "과일 샐러드", subCategory: {} },
  snacks: { name: "과자 초콜릿", subCategory: {} },
  soap: { name: "헤어 바디 세안", subCategory: {} },
  "three-lines": { name: "더보기", subCategory: {} },
};

export const MESSAGE = {
  LOGIN_INDUCE: "로그인 후 주문이 가능합니다. \n 로그인 후 주문하시겠습니까?",
};
