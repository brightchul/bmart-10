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
  bakery: {
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
  ADD_CART:
    "장바구니에 상품을 담았습니다. \n 장바구니 페이지로 이동하시겠습니까?",
};

type CategoryTitleName = { name: string; title: string };

export const CATEGORY_TITLE_NAMES: Array<CategoryTitleName> = [
  { name: "과일·견과·쌀", title: "fruit" },
  { name: "면·양념·오일", title: "noodle" },
  { name: "반려동물", title: "animal" },
  { name: "베이비·키즈", title: "baby" },
  { name: "베이커리·치즈·델리", title: "bakery" },
  { name: "뷰티·바디케어", title: "beauty" },
  { name: "샐러드·간편식", title: "salad" },
  { name: "수산·해산·건어물", title: "seafood" },
  { name: "정육·계란", title: "meat" },
  { name: "채소", title: "vegetable" },

  { name: "가전제품", title: "electrical" },
  { name: "건강식품", title: "healthfood" },
  { name: "생활용품·리빙", title: "living" },
  { name: "국·반찬·메인요리", title: "soup" },
  { name: "음료·우유·떡·간식", title: "drink" },
  { name: "주방용품", title: "kitchen" },
];
