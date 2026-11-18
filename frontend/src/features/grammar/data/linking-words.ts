import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "linking-words",
  level: "B2",
  title: "Linking Words: Contrast, Reason, Result",
  vietnameseTitle: "Từ nối: tương phản, nguyên nhân, kết quả",
  description: "Although vs despite, because vs because of, so vs therefore: chọn đúng từ theo cấu trúc phía sau.",
  estimatedMinutes: 25,
  theory: {
    summary:
      "Nhiều từ nối có nghĩa giống nhau nhưng khác cấu trúc: một số theo sau là mệnh đề (S + V), một số theo sau là danh từ/V-ing, một số đứng đầu câu thứ hai kèm dấu phẩy.",
    formulas: [
      {
        type: "affirmative",
        label: "Tương phản + mệnh đề",
        structure: "although / even though / though + S + V",
        exampleEn: "Although it was raining, we went out.",
        exampleVi: "Mặc dù trời mưa, chúng tôi vẫn ra ngoài.",
      },
      {
        type: "affirmative",
        label: "Tương phản + danh từ / V-ing",
        structure: "despite / in spite of + N / V-ing / the fact that + S + V",
        exampleEn: "Despite the rain, we went out.",
        exampleVi: "Bất chấp trời mưa, chúng tôi vẫn ra ngoài.",
      },
      {
        type: "special",
        label: "Đầu câu thứ hai",
        structure: "S + V. However, / Therefore, / Moreover, + S + V.",
        exampleEn: "The plan was good. However, it was too expensive.",
        exampleVi: "Kế hoạch tốt. Tuy nhiên, nó quá tốn kém.",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Nguyên nhân",
        explanation: "because / as / since + S + V · because of / due to + N.",
        exampleEn: "The flight was delayed because of the storm.",
        exampleVi: "Chuyến bay bị hoãn vì cơn bão.",
      },
      {
        id: "u2",
        title: "Kết quả",
        explanation: "so + S + V (giữa câu) · therefore / as a result (đầu câu, có dấu phẩy).",
        exampleEn: "He missed the bus, so he was late. / He missed the bus. As a result, he was late.",
        exampleVi: "Anh ấy lỡ xe buýt nên bị muộn.",
      },
      {
        id: "u3",
        title: "Bổ sung ý",
        explanation: "Moreover / Furthermore / In addition, … (trang trọng) · also, as well as + N/V-ing.",
        exampleEn: "The hotel is cheap. Moreover, it's close to the beach.",
        exampleVi: "Khách sạn rẻ. Hơn nữa, nó gần biển.",
      },
    ],
    signals: [
      {
        category: "Nhìn phía sau để chọn",
        words: ["+ S + V → although / because / so", "+ N / V-ing → despite / because of / due to", "Đầu câu + dấu phẩy → However / Therefore"],
        explanation: "Đây là cách nhanh nhất để không chọn nhầm.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "Despite it was cold, she didn't wear a coat.",
        correct: "Although it was cold, she didn't wear a coat.",
        explanation: "Sau despite không dùng mệnh đề. Hoặc dùng: Despite the cold / Despite the fact that it was cold.",
      },
      {
        incorrect: "Although he was tired, but he kept working.",
        correct: "Although he was tired, he kept working.",
        explanation: "Không dùng although và but trong cùng một câu.",
      },
      {
        incorrect: "I stayed home because the rain.",
        correct: "I stayed home because of the rain.",
        explanation: "Trước danh từ dùng because of.",
      },
    ],
    proTips: [
      "Despite + V-ing: 'Despite being tired, he kept working.'",
      "However đứng giữa câu cần dấu chấm phẩy hoặc dấu chấm trước nó, không chỉ dấu phẩy.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "___ the traffic, we arrived on time.",
      options: ["Although", "Despite", "Because", "However"],
      correctIndex: 1,
      explanation: "Theo sau là danh từ → despite.",
    },
    {
      id: "p2",
      question: "___ she studied hard, she failed the exam.",
      options: ["Despite", "In spite of", "Although", "Because of"],
      correctIndex: 2,
      explanation: "Theo sau là mệnh đề → although.",
    },
    {
      id: "p3",
      question: "The match was cancelled ___ the heavy rain.",
      options: ["because", "due to", "so", "although"],
      correctIndex: 1,
      explanation: "Theo sau là danh từ → due to / because of.",
    },
    {
      id: "p4",
      question: "It was late, ___ we took a taxi.",
      options: ["so", "therefore", "because", "despite"],
      correctIndex: 0,
      explanation: "Kết quả, nối hai mệnh đề trong một câu → so.",
    },
    {
      id: "p5",
      question: "The product is popular. ___, it is quite expensive.",
      options: ["Although", "Despite", "However", "Because"],
      correctIndex: 2,
      explanation: "Đầu câu thứ hai, có dấu phẩy, ý tương phản → However.",
    },
    {
      id: "p6",
      type: "input",
      question: "In spite ___ being ill, he went to work. (một từ)",
      answers: ["of"],
      explanation: "In spite of + V-ing.",
    },
    {
      id: "p7",
      type: "input",
      question: "I couldn't sleep ___ of the noise. (một từ)",
      answers: ["because"],
      explanation: "Because of + N.",
    },
    {
      id: "p8",
      type: "input",
      question: "He didn't study. ___, he failed. (một từ, nghĩa 'vì vậy', trang trọng)",
      answers: ["therefore", "consequently", "thus"],
      explanation: "Đầu câu, trang trọng → Therefore,.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "Viết lại: 'Although he was injured, he finished the race.' =",
      options: [
        "Despite he was injured, he finished the race.",
        "Despite being injured, he finished the race.",
        "Despite of his injury, he finished the race.",
        "Despite injured, he finished the race.",
      ],
      correctIndex: 1,
      explanation: "Despite + V-ing (cùng chủ ngữ).",
    },
    {
      id: "a2",
      question: "Chọn câu đúng dấu câu:",
      options: [
        "The test was hard, however, I passed.",
        "The test was hard; however, I passed.",
        "The test was hard however I passed.",
        "However the test was hard, I passed.",
      ],
      correctIndex: 1,
      explanation: "However nối hai mệnh đề độc lập cần dấu chấm phẩy trước nó.",
    },
    {
      id: "a3",
      question: "___ the fact that it was expensive, they bought it.",
      options: ["Although", "Despite", "Because", "Even though"],
      correctIndex: 1,
      explanation: "Despite the fact that + S + V.",
    },
    {
      id: "a4",
      type: "input",
      question: "Viết lại: 'The road was icy, so the driver slowed down.' → ___ the road was icy, the driver slowed down. (nguyên nhân)",
      answers: ["because", "as", "since"],
      explanation: "Because/As/Since + mệnh đề chỉ nguyên nhân.",
    },
    {
      id: "a5",
      type: "input",
      question: "Viết lại: 'Despite the bad weather, the event went ahead.' → ___ the weather was bad, the event went ahead.",
      answers: ["although", "even though", "though"],
      explanation: "Theo sau là mệnh đề → although/even though.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "although vs despite", back: "although + S + V\ndespite + N / V-ing" },
      { id: "f2", front: "because vs because of", back: "because + S + V\nbecause of / due to + N" },
      { id: "f3", front: "so vs therefore", back: "so: giữa câu (…, so …)\ntherefore: đầu câu, có dấu phẩy" },
      { id: "f4", front: "Although… but… đúng không?", back: "Sai. Chỉ dùng một trong hai." },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "___ having a map, we got lost.",
        options: ["Although", "Despite", "Because", "So"],
        correctIndex: 1,
        explanation: "Despite + V-ing.",
      },
      {
        id: "m2",
        question: "The shop was closed ___ it was a public holiday.",
        options: ["because of", "because", "despite", "however"],
        correctIndex: 1,
        explanation: "Theo sau là mệnh đề → because.",
      },
      {
        id: "m3",
        question: "Prices have risen. ___, many people are buying less.",
        options: ["Despite", "Although", "As a result", "Because"],
        correctIndex: 2,
        explanation: "Kết quả, đầu câu → As a result,.",
      },
    ],
  },
};

export default topic;
