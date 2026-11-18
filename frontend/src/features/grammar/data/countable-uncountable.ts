import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "countable-uncountable",
  level: "A2",
  title: "Countable & Uncountable Nouns",
  vietnameseTitle: "Danh từ đếm được & Không đếm được",
  description: "Nắm vững mạo từ a/an/some/any, các lượng từ much/many, few/little và các danh từ dễ gây nhầm lẫn.",
  estimatedMinutes: 20,
  theory: {
    summary: "Danh từ đếm được có thể đếm theo số lượng đơn lẻ và có dạng số nhiều (thêm s/es). Danh từ không đếm được là chất liệu, khái niệm trừu tượng, không có số nhiều và luôn đi với động từ số ít.",
    formulas: [
      {
        type: "special",
        label: "Lượng từ với Danh từ Đếm được",
        structure: "Many / A few / Few / A number of + N(số nhiều)",
        exampleEn: "She has many books on history.",
        exampleVi: "Cô ấy có rất nhiều cuốn sách về lịch sử.",
      },
      {
        type: "special",
        label: "Lượng từ với Danh từ Không đếm được",
        structure: "Much / A little / Little / An amount of + N(không đếm được)",
        exampleEn: "We don't have much time left.",
        exampleVi: "Chúng ta không còn nhiều thời gian.",
      },
    ],
    usages: [
      {
        id: "cu-u1",
        title: "Some vs Any",
        explanation: "'Some' dùng trong câu khẳng định hoặc lời mời/yêu cầu lịch sự. 'Any' dùng trong câu phủ định và nghi vấn thông thường.",
        exampleEn: "Would you like some coffee? / I don't have any money.",
        exampleVi: "Bạn có muốn dùng chút cà phê không? / Tôi không có đồng nào.",
      },
    ],
    signals: [
      {
        category: "Các danh từ không đếm được phổ biến trong tiếng Anh",
        words: ["information", "advice", "furniture", "luggage", "news", "bread", "homework", "money"],
        explanation: "Tuyệt đối không thêm -s/es vào các từ này trong tiếng Anh.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "He gave me an useful advice.",
        correct: "He gave me a piece of useful advice.",
        explanation: "'Advice' là danh từ không đếm được, không dùng 'an advice'. Dùng đơn vị đo lường 'a piece of advice'.",
      },
    ],
    proTips: [
      "Phân biệt 'a few' (có một vài, đủ dùng) với 'few' (rất ít, hầu như không có, mang nghĩa tiêu cực). Tương tự: 'a little' (có một ít) vs 'little' (hầu như không có gì).",
    ],
  },
  practice: [
    {
      id: "cu-q1",
      question: "Could you please give me _______ information about the summer course?",
      options: ["some", "an", "many", "a few"],
      correctIndex: 0,
      explanation: "'information' là danh từ không đếm được, câu yêu cầu lịch sự dùng 'some'.",
    },
    {
      id: "cu-q2",
      question: "There are too _______ cars in the city center during rush hours.",
      options: ["much", "many", "a little", "amount of"],
      correctIndex: 1,
      explanation: "'cars' là danh từ đếm được số nhiều -> dùng 'many'.",
    },
    {
      id: "cu-q3",
      question: "Unfortunately, I have _______ money left, so I cannot buy lunch today.",
      options: ["a little", "little", "a few", "few"],
      correctIndex: 1,
      explanation: "'money' không đếm được. Nghĩa câu tiêu cực (không đủ tiền ăn trưa) -> dùng 'little' (hầu như không có).",
    },
    {
      id: "cu-x1",
      question: "How ___ sugar do you take in your tea?",
      options: ["many", "much", "few", "a few"],
      correctIndex: 1,
      explanation: "Sugar không đếm được → how much.",
    },
    {
      id: "cu-x2",
      question: "There are only ___ students in the library today.",
      options: ["a little", "a few", "much", "little"],
      correctIndex: 1,
      explanation: "Students đếm được, số ít ỏi nhưng đủ → a few.",
    },
    {
      id: "cu-x3",
      type: "input",
      question: "Is there ___ milk in the fridge? (some / any)",
      answers: ["any"],
      explanation: "Câu hỏi thông thường → any.",
    },
    {
      id: "cu-x4",
      type: "input",
      question: "I need ___ advice about my career. (some / a)",
      answers: ["some"],
      explanation: "Advice không đếm được → không dùng a, dùng some.",
    },
    {
      id: "cu-x5",
      question: "We have ___ homework this weekend.",
      options: ["many", "a lot of", "a few", "few"],
      correctIndex: 1,
      explanation: "Homework không đếm được → a lot of / much.",
    },
  ],
  advanced: [
    {
      id: "cu-a1",
      question: "Chọn câu SAI:",
      options: ["I bought two loaves of bread.", "She gave me some useful informations.", "There's a lot of furniture here.", "Can I have a piece of cake?"],
      correctIndex: 1,
      explanation: "Information không đếm được, không có dạng số nhiều.",
    },
    {
      id: "cu-a2",
      question: "Would you like ___ coffee?",
      options: ["any", "some", "many", "a few"],
      correctIndex: 1,
      explanation: "Lời mời dùng some dù là câu hỏi.",
    },
    {
      id: "cu-a3",
      question: "He has ___ friends, so he often feels lonely.",
      options: ["a few", "few", "a little", "little"],
      correctIndex: 1,
      explanation: "Few (không có a) = rất ít, mang nghĩa tiêu cực.",
    },
    {
      id: "cu-a4",
      type: "input",
      question: "Could I have a ___ of water, please? (bottle / slice)",
      answers: ["bottle", "glass"],
      explanation: "Đơn vị cho chất lỏng: a bottle / a glass of water.",
    },
    {
      id: "cu-a5",
      type: "input",
      question: "There ___ (be) too much traffic this morning.",
      answers: ["was"],
      explanation: "Traffic không đếm được, chia số ít; this morning đã qua → was.",
    },
  ],
  review: {
    flashcards: [
      {
        id: "cu-fc1",
        front: "Các danh từ tiếng Anh người Việt hay tưởng là đếm được nhưng thực tế là KHÔNG đếm được?",
        back: "Information (thông tin), Advice (lời khuyên), Furniture (đồ nội thất), Baggage/Luggage (hành lý), Homework (bài tập về nhà).",
        hint: "Advice, Information, Furniture...",
      },
      {
        id: "cu-fx1",
        front: "much hay many?",
        back: "many + N đếm được số nhiều\nmuch + N không đếm được",
      },
      {
        id: "cu-fx2",
        front: "a few vs few",
        back: "a few: một vài (đủ dùng)\nfew: rất ít (gần như không đủ)",
      },
      {
        id: "cu-fx3",
        front: "Ví dụ danh từ không đếm được dễ nhầm",
        back: "information, advice, news, furniture, luggage, homework",
      },
    ],
    masteryQuiz: [
      {
        id: "cu-mq1",
        question: "The news on television _______ very shocking today.",
        options: ["is", "are", "were", "have been"],
        correctIndex: 0,
        explanation: "'News' tuy có chữ s nhưng là danh từ không đếm được (tin tức) nên luôn chia động từ số ít 'is'.",
      },
      {
        id: "cu-mx1",
        question: "I don't have ___ time, so let's be quick.",
        options: ["many", "much", "a few", "few"],
        correctIndex: 1,
        explanation: "Time (thời gian) không đếm được, câu phủ định → much.",
      },
      {
        id: "cu-mx2",
        question: "She added ___ salt to the soup.",
        options: ["a few", "a little", "many", "few of"],
        correctIndex: 1,
        explanation: "Salt không đếm được, một ít → a little.",
      },
    ],
  },
};

export default topic;
