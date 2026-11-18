import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "too-enough-so-such",
  level: "B1",
  title: "Too, Enough, So, Such",
  vietnameseTitle: "Too, enough, so, such",
  description: "Quá… đến nỗi không, đủ… để, và cấu trúc so/such… that diễn tả kết quả.",
  estimatedMinutes: 20,
  theory: {
    summary:
      "Too nghĩa là 'quá mức' (thường dẫn tới không làm được). Enough là 'đủ'. So và such nhấn mạnh mức độ và thường đi với 'that' để nêu kết quả.",
    formulas: [
      {
        type: "affirmative",
        label: "Too",
        structure: "too + adj/adv (+ for sb) + to V",
        exampleEn: "The box is too heavy for me to carry.",
        exampleVi: "Cái hộp quá nặng, tôi không mang được.",
      },
      {
        type: "affirmative",
        label: "Enough",
        structure: "adj/adv + enough + to V · enough + N + to V",
        exampleEn: "She is old enough to drive. We have enough time to finish.",
        exampleVi: "Cô ấy đủ tuổi lái xe. Chúng ta có đủ thời gian để làm xong.",
      },
      {
        type: "special",
        label: "So / Such … that",
        structure: "so + adj/adv + that … · such + (a/an) + adj + N + that …",
        exampleEn: "It was so cold that we stayed inside. It was such a cold day that we stayed inside.",
        exampleVi: "Trời lạnh đến mức chúng tôi ở trong nhà.",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Vị trí của enough",
        explanation: "Enough đứng SAU tính từ/trạng từ nhưng đứng TRƯỚC danh từ.",
        exampleEn: "He isn't tall enough. / We don't have enough chairs.",
        exampleVi: "Anh ấy không đủ cao. / Chúng ta không đủ ghế.",
      },
      {
        id: "u2",
        title: "Too mang nghĩa tiêu cực",
        explanation: "Too không giống very: 'too hot' là nóng đến mức có vấn đề.",
        exampleEn: "The soup is very hot (but I can eat it). / The soup is too hot to eat.",
        exampleVi: "Súp rất nóng (vẫn ăn được). / Súp nóng quá, không ăn được.",
      },
      {
        id: "u3",
        title: "So với much/many, such với danh từ",
        explanation: "so much/many + N; such a lot of + N.",
        exampleEn: "There were so many people that we couldn't move.",
        exampleVi: "Đông người đến mức chúng tôi không nhúc nhích được.",
      },
    ],
    signals: [
      {
        category: "Phân biệt nhanh",
        words: ["so + adj", "such + a + adj + N", "such + adj + N số nhiều", "so many + N"],
        explanation: "Có danh từ thì dùng such; chỉ có tính từ thì dùng so.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "He is enough tall to reach the shelf.",
        correct: "He is tall enough to reach the shelf.",
        explanation: "Enough đứng sau tính từ.",
      },
      {
        incorrect: "It was so a beautiful day.",
        correct: "It was such a beautiful day.",
        explanation: "Có danh từ (day) → such a + adj + N.",
      },
      {
        incorrect: "The coffee is too hot to drink it.",
        correct: "The coffee is too hot to drink.",
        explanation: "Chủ ngữ đã là 'coffee' nên không lặp lại 'it' sau to V.",
      },
    ],
    proTips: [
      "Too… to = không thể; … enough to = có thể.",
      "Thử bỏ danh từ: còn lại tính từ → so; còn danh từ → such.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "This jacket is ___ big for me.",
      options: ["too", "enough", "so", "such"],
      correctIndex: 0,
      explanation: "Quá rộng (không mặc được) → too.",
    },
    {
      id: "p2",
      question: "Is the water warm ___ to swim in?",
      options: ["too", "enough", "so", "very"],
      correctIndex: 1,
      explanation: "Đủ ấm để bơi → warm enough.",
    },
    {
      id: "p3",
      question: "She speaks ___ quickly that I can't understand her.",
      options: ["such", "so", "too", "enough"],
      correctIndex: 1,
      explanation: "So + trạng từ + that.",
    },
    {
      id: "p4",
      question: "It was ___ a boring film that I fell asleep.",
      options: ["so", "such", "too", "enough"],
      correctIndex: 1,
      explanation: "Such + a + adj + N + that.",
    },
    {
      id: "p5",
      question: "We don't have ___ to buy a new house.",
      options: ["money enough", "enough money", "too money", "so money"],
      correctIndex: 1,
      explanation: "Enough đứng trước danh từ.",
    },
    {
      id: "p6",
      type: "input",
      question: "He's not old ___ to vote. (một từ)",
      answers: ["enough"],
      explanation: "Adj + enough + to V.",
    },
    {
      id: "p7",
      type: "input",
      question: "There were ___ many people that we left early. (so / such)",
      answers: ["so"],
      explanation: "So many + N.",
    },
    {
      id: "p8",
      type: "input",
      question: "They are ___ nice people. (so / such)",
      answers: ["such"],
      explanation: "Such + adj + N số nhiều.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "Viết lại: 'The tea is very hot. I can't drink it.' =",
      options: [
        "The tea is too hot for me to drink.",
        "The tea is too hot for me to drink it.",
        "The tea is hot enough for me to drink.",
        "The tea is so hot to drink.",
      ],
      correctIndex: 0,
      explanation: "Too + adj + for sb + to V, không lặp lại tân ngữ 'it'.",
    },
    {
      id: "a2",
      question: "He didn't run ___ to catch the bus.",
      options: ["enough fast", "fast enough", "too fast", "so fast"],
      correctIndex: 1,
      explanation: "Trạng từ + enough.",
    },
    {
      id: "a3",
      question: "It was ___ that we went to the beach.",
      options: ["such lovely weather", "such a lovely weather", "so lovely weather", "too lovely weather"],
      correctIndex: 0,
      explanation: "'Weather' không đếm được → such + adj + N (không có a).",
    },
    {
      id: "a4",
      type: "input",
      question: "Viết lại: 'The book was so interesting that I read it twice.' → It was ___ an interesting book that I read it twice.",
      answers: ["such"],
      explanation: "So + adj ↔ such + a/an + adj + N.",
    },
    {
      id: "a5",
      type: "input",
      question: "Viết lại: 'She is too young to watch this film.' → She isn't old ___ to watch this film.",
      answers: ["enough"],
      explanation: "Too young to = not old enough to.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "too + adj + to V nghĩa là?", back: "Quá… đến nỗi không thể…" },
      { id: "f2", front: "Vị trí của enough", back: "adj + enough\nenough + N" },
      { id: "f3", front: "so hay such + a nice day?", back: "such a nice day" },
      { id: "f4", front: "so many / such a lot of", back: "so many people = such a lot of people" },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "The room isn't ___ for ten people.",
        options: ["big enough", "enough big", "too big", "so big"],
        correctIndex: 0,
        explanation: "Adj + enough.",
      },
      {
        id: "m2",
        question: "She was ___ tired that she went to bed at 8.",
        options: ["such", "so", "too", "enough"],
        correctIndex: 1,
        explanation: "So + adj + that.",
      },
      {
        id: "m3",
        question: "It's ___ late to call him now.",
        options: ["too", "enough", "such", "so much"],
        correctIndex: 0,
        explanation: "Quá muộn (không nên gọi) → too.",
      },
    ],
  },
};

export default topic;
