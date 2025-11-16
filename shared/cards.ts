export interface TarotCard {
  id: number;
  name: string;
  keywords: string[];
  image: string;
}

export const MAJOR_ARCANA: TarotCard[] = [
  { id: 0, name: "The Cat", keywords: ["고양이 자체", "자연스러운", "자유로운", "순진한", "소화기계"], image: "@assets/generated_images/The_Cat_tarot_card_5842b39d.png" },
  { id: 1, name: "Cat Magic", keywords: ["시작", "창조적인", "변덕스러운", "독립적인"], image: "@assets/generated_images/Magic_Cat_tarot_card_60c4812d.png" },
  { id: 2, name: "The Priestess", keywords: ["차분한", "위엄있는", "고도의 지능", "날카로운 통증", "비뇨기계"], image: "@assets/generated_images/The_Priestess_tarot_card_e61e48df.png" },
  { id: 3, name: "The Empress", keywords: ["모성애", "사랑이 많은", "풍부한", "비만", "임신", "출산"], image: "@assets/generated_images/The_Empress_tarot_card_ee0ea80d.png" },
  { id: 4, name: "The Emperor", keywords: ["지배적인", "완고한", "고혈압", "심장병"], image: "@assets/generated_images/The_Emperor_tarot_card_bdbc0457.png" },
  { id: 5, name: "The Priest", keywords: ["소유욕", "공 장난감"], image: "@assets/generated_images/The_Priest_tarot_card_ef6dc44c.png" },
  { id: 6, name: "The Lovers", keywords: ["내 파트너", "애착", "분리불안", "생식기"], image: "@assets/generated_images/The_Lovers_tarot_card_c3392b58.png" },
  { id: 7, name: "The Chariot", keywords: ["에너지", "열정", "면역계 질환"], image: "@assets/generated_images/The_Chariot_tarot_card_0f645f51.png" },
  { id: 8, name: "Strength", keywords: ["견디는", "기다리는"], image: "@assets/generated_images/Strength_tarot_card_87e145f8.png" },
  { id: 9, name: "The Hermit", keywords: ["내향적인", "혼자를 선호", "느긋한"], image: "@assets/generated_images/The_Hermit_tarot_card_608f439f.png" },
  { id: 10, name: "The Wheel", keywords: ["수용적인", "큰 변화", "구르는 장난감", "캣휠", "공", "관절"], image: "@assets/generated_images/The_Wheel_tarot_card_87c2c04d.png" },
  { id: 11, name: "Consequences", keywords: ["불편한", "속박된", "불가피한 결과"], image: "@assets/generated_images/Consequences_tarot_card_ad5b6fd0.png" },
  { id: 12, name: "The Floating Cat", keywords: ["지연", "정체", "속박으로부터의 자유", "다른 관점", "뒹굴뒹굴"], image: "@assets/generated_images/The_Floating_Cat_tarot_card_d01b3c1c.png" },
  { id: 13, name: "Death", keywords: ["죽음", "부활", "불치병", "대수술"], image: "@assets/generated_images/Death_tarot_card_6e9e947c.png" },
  { id: 14, name: "Grace", keywords: ["조화", "적응", "스트레스", "신경계"], image: "@assets/generated_images/Grace_tarot_card_eb5c0185.png" },
  { id: 15, name: "Demon Cat", keywords: ["공격적인", "학대", "매우 나쁜", "암", "중독"], image: "@assets/generated_images/Demon_Cat_tarot_card_7fe700fb.png" },
  { id: 16, name: "The Tower", keywords: ["큰 놀람", "공포", "사고", "외상", "골절", "이별"], image: "@assets/generated_images/The_Tower_tarot_card_26cca850.png" },
  { id: 17, name: "Stars", keywords: ["부러움", "좋은 컨디션", "희망", "욕구", "갈망"], image: "@assets/generated_images/Stars_tarot_card_085a27c1.png" },
  { id: 18, name: "Moon", keywords: ["경계하는", "장난기있는", "무의식", "직관", "불안", "정신질환"], image: "@assets/generated_images/Moon_tarot_card_4ae90128.png" },
  { id: 19, name: "Sun", keywords: ["만족스러운", "행복한", "매우 좋은"], image: "@assets/generated_images/Sun_tarot_card_d9767513.png" },
  { id: 20, name: "Good Kitty", keywords: ["수호천사", "보호", "판단", "결정", "혼내지 마"], image: "@assets/generated_images/Good_Kitty_tarot_card_c61e7c0e.png" },
  { id: 21, name: "The World", keywords: ["성취", "만족", "완성", "순환"], image: "@assets/generated_images/The_World_tarot_card_9a1f7cf7.png" },
];

export const MINOR_ARCANA: TarotCard[] = [
  { id: 22, name: "Ace of Fire", keywords: ["열정적인", "너무 좋은"], image: "@assets/generated_images/fire/Ace_of_Fire.png" },
  { id: 23, name: "Two of Fire", keywords: ["걱정하는", "밖에 나가고 싶은", "밖 탐험"], image: "@assets/generated_images/fire/Two_of_Fire.png" },
  { id: 24, name: "Three of Fire", keywords: ["어둠 속 한줄기 빛", "구원", "갈망"], image: "@assets/generated_images/fire/Three_of_Fire.png" },
  { id: 25, name: "Four of Fire", keywords: ["원하는", "함께 놀고 싶은", "빛나는 장난감", "레이저형"], image: "@assets/generated_images/fire/Four_of_Fire.png" },
  { id: 26, name: "Five of Fire", keywords: ["툭툭치기", "야옹거리기", "작은 싸움", "경쟁", "연습"], image: "@assets/generated_images/fire/Five_of_Fire.png" },
  { id: 27, name: "Six of Fire", keywords: ["욕심많은", "보스 고양이", "이기적인"], image: "@assets/generated_images/fire/Six_of_Fire.png" },
  { id: 28, name: "Seven of Fire", keywords: ["쉬익거리기", "거부하는", "싫어", "오지마"], image: "@assets/generated_images/fire/Seven_of_Fire.png" },
  { id: 29, name: "Eight of Fire", keywords: ["울어대는", "기운넘치는"], image: "@assets/generated_images/fire/Eight_of_Fire.png" },
  { id: 30, name: "Nine of Fire", keywords: ["집중하는", "도움이 필요한"], image: "@assets/generated_images/fire/Nine_of_Fire.png" },
  { id: 31, name: "Ten of Fire", keywords: ["혼란스러운", "통제 불능", "도망치는", "과한"], image: "@assets/generated_images/fire/Ten_of_Fire.png" },
  { id: 32, name: "Fire Kitten", keywords: ["무모한", "호기심많은", "용감한"], image: "@assets/generated_images/fire/Fire_Kitten.png" },
  { id: 33, name: "Fire Tom", keywords: ["대담한", "용감한", "도전"], image: "@assets/generated_images/fire/Fire_Tom.png" },
  { id: 34, name: "Fire Queen", keywords: ["집중하는", "기분좋은", "나 예뻐", "화려한 장난감", "자랑스러운"], image: "@assets/generated_images/fire/Fire_Queen.png" },
  { id: 35, name: "Fire King", keywords: ["주인공", "주목받는", "통제하는", "자신만만", "자랑스러운", "카리스마", "인내심 적은"], image: "@assets/generated_images/fire/Fire_King.png" },

  { id: 36, name: "Ace of Sea", keywords: ["열린 마음", "긍정적인"], image: "@assets/generated_images/sea/Ace_of_Sea.png" },
  { id: 37, name: "Two of Sea", keywords: ["유대감", "신뢰", "교류", "애정"], image: "@assets/generated_images/sea/Two_of_Sea.png" },
  { id: 38, name: "Three of Sea", keywords: ["매우 관대한", "편안한 관계"], image: "@assets/generated_images/sea/Three_of_Sea.png" },
  { id: 39, name: "Four of Sea", keywords: ["지루함", "무료함", "소외"], image: "@assets/generated_images/sea/Four_of_Sea.png" },
  { id: 40, name: "Five of Sea", keywords: ["불편함", "수치심", "실패", "실망"], image: "@assets/generated_images/sea/Five_of_Sea.png" },
  { id: 41, name: "Six of Sea", keywords: ["신이나는", "탐험하고 싶은", "형제자매와 놀던 어린시절 추억"], image: "@assets/generated_images/sea/Six_of_Sea.png" },
  { id: 42, name: "Seven of Sea", keywords: ["이룰 수 없는 소원", "갈망", "곰팡이", "습기"], image: "@assets/generated_images/sea/Seven_of_Sea.png" },
  { id: 43, name: "Eight of Sea", keywords: ["낯선 곳", "임시보호", "보호소", "여행", "집 그리움"], image: "@assets/generated_images/sea/Eight_of_Sea.png" },
  { id: 44, name: "Nine of Sea", keywords: ["행복한 꿈"], image: "@assets/generated_images/sea/Nine_of_Sea.png" },
  { id: 45, name: "Ten of Sea", keywords: ["가족", "소속감", "다묘가정"], image: "@assets/generated_images/sea/Ten_of_Sea.png" },
  { id: 46, name: "Sea Kitten", keywords: ["당황", "놀람", "감정적 격동"], image: "@assets/generated_images/sea/Sea_Kitten.png" },
  { id: 47, name: "Sea Tom", keywords: ["편안함", "여유로운", "느긋한", "열린 마음"], image: "@assets/generated_images/sea/Sea_Tom.png" },
  { id: 48, name: "Sea Queen", keywords: ["동정심많은", "사려깊은", "헌신적인", "친절한"], image: "@assets/generated_images/sea/Sea_Queen.png" },
  { id: 49, name: "Sea King", keywords: ["온화한", "평화추구", "관대한"], image: "@assets/generated_images/sea/Sea_King.png" },

  { id: 50, name: "Ace of Sky", keywords: ["인지", "신중한", "조심스러운 긍정", "해보겠지만 쉽지않을것", "결심"], image: "@assets/generated_images/sky/Ace_of_Sky.png" },
  { id: 51, name: "Two of Sky", keywords: ["불확실한", "의심스러운"], image: "@assets/generated_images/sky/Two_of_Sky.png" },
  { id: 52, name: "Three of Sky", keywords: ["말썽부리는", "사고치는", "작은 실수로 대형사고"], image: "@assets/generated_images/sky/Three_of_Sky.png" },
  { id: 53, name: "Four of Sky", keywords: ["쉬고있는", "진정하는", "혼자 쉬는"], image: "@assets/generated_images/sky/Four_of_Sky.png" },
  { id: 54, name: "Five of Sky", keywords: ["거부당한", "받아들여지지 않은"], image: "@assets/generated_images/sky/Five_of_Sky.png" },
  { id: 55, name: "Six of Sky", keywords: ["시도했지만 다쳐서 포기", "질렸어", "물러나는"], image: "@assets/generated_images/sky/Six_of_Sky.png" },
  { id: 56, name: "Seven of Sky", keywords: ["주변에 민감한", "짜증나는", "겁쟁이처럼 빼앗기는"], image: "@assets/generated_images/sky/Seven_of_Sky.png" },
  { id: 57, name: "Eight of Sky", keywords: ["패닉", "공포", "딜레마", "겁먹고 발버둥", "진정해"], image: "@assets/generated_images/sky/Eight_of_Sky.png" },
  { id: 58, name: "Nine of Sky", keywords: ["악몽", "트라우마", "학대경험", "집착"], image: "@assets/generated_images/sky/Nine_of_Sky.png" },
  { id: 59, name: "Ten of Sky", keywords: ["절망", "한계도달", "죽어가는", "버려진"], image: "@assets/generated_images/sky/Ten_of_Sky.png" },
  { id: 60, name: "Sky Kitten", keywords: ["미성숙한", "밝은", "잡고싶어하는", "새것 시도", "낚싯대", "줄 장난감"], image: "@assets/generated_images/sky/Sky_Kitten.png" },
  { id: 61, name: "Sky Tom", keywords: ["사냥꾼", "민첩한", "점프하는", "새", "깃털 장난감"], image: "@assets/generated_images/sky/Sky_Tom.png" },
  { id: 62, name: "Sky Queen", keywords: ["독립적인", "무심한", "관찰하는", "높은곳 좋아함"], image: "@assets/generated_images/sky/Sky_Queen.png" },
  { id: 63, name: "Sky King", keywords: ["무관심한", "냉철한", "혹독한 환경에서 살아남을 수 있는", "많은 굴곡 경험"], image: "@assets/generated_images/sky/Sky_King.png" },

  { id: 64, name: "Ace of Earth", keywords: ["풍요", "안정", "행운", "좋은 일"], image: "@assets/generated_images/earth/Ace_of_Earth.png" },
  { id: 65, name: "Two of Earth", keywords: ["균형잡힌", "균형 유지"], image: "@assets/generated_images/earth/Two_of_Earth.png" },
  { id: 66, name: "Three of Earth", keywords: ["협력", "함께 즐기는", "벌레 놀이"], image: "@assets/generated_images/earth/Three_of_Earth.png" },
  { id: 67, name: "Four of Earth", keywords: ["욕심", "집착", "소유욕", "물질적 풍요하지만 외로움"], image: "@assets/generated_images/earth/Four_of_Earth.png" },
  { id: 68, name: "Five of Earth", keywords: ["외로움과 어려운 상황", "부러움", "유기묘"], image: "@assets/generated_images/earth/Five_of_Earth.png" },
  { id: 69, name: "Six of Earth", keywords: ["안정적 환경", "어려운 시기 후 돌봄받는", "입양", "받아들여진"], image: "@assets/generated_images/earth/Six_of_Earth.png" },
  { id: 70, name: "Seven of Earth", keywords: ["기다리는", "인내", "일관성", "기다린 보상 원하는"], image: "@assets/generated_images/earth/Seven_of_Earth.png" },
  { id: 71, name: "Eight of Earth", keywords: ["교육", "훈련", "연습"], image: "@assets/generated_images/earth/Eight_of_Earth.png" },
  { id: 72, name: "Nine of Earth", keywords: ["혼자만의 시간", "방해받지않는", "느긋한 휴식"], image: "@assets/generated_images/earth/Nine_of_Earth.png" },
  { id: 73, name: "Ten of Earth", keywords: ["개인 공간", "영역 분리하여 공존"], image: "@assets/generated_images/earth/Ten_of_Earth.png" },
  { id: 74, name: "Earth Kitten", keywords: ["흥미", "친근한 탐험", "작은 기쁨", "호기심"], image: "@assets/generated_images/earth/Earth_Kitten.png" },
  { id: 75, name: "Earth Tom", keywords: ["구조", "보호", "도움 받기", "도움 주기"], image: "@assets/generated_images/earth/Earth_Tom.png" },
  { id: 76, name: "Earth Queen", keywords: ["풍요로운", "사랑받는", "차분한", "자애로운"], image: "@assets/generated_images/earth/Earth_Queen.png" },
  { id: 77, name: "Earth King", keywords: ["만족한", "보호하는", "관대한", "따뜻한 마음"], image: "@assets/generated_images/earth/Earth_King.png" },
];

export const ALL_CARDS = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export const CARD_BACK_IMAGE = "@assets/generated_images/Mystical_tarot_card_back_8388aaca.png";
