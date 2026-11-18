import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "cleft-sentences",
  level: "C1",
  title: "Cleft Sentences",
  vietnameseTitle: "Câu chẻ (câu nhấn mạnh)",
  description: "It is… that… và What… is… để nhấn mạnh đúng thông tin bạn muốn.",
  estimatedMinutes: 25,
  theory: {
    summary:
      "Câu chẻ tách một câu đơn thành hai phần để làm nổi bật một thành phần (người, vật, thời gian, nơi chốn, hành động). Hai dạng phổ biến: It-cleft (It is/was … that/who …) và Wh-cleft (What … is/was …).",
    formulas: [
      {
        type: "affirmative",
        label: "It-cleft",
        structure: "It is/was + phần nhấn mạnh + that/who + phần còn lại",
        exampleEn: "It was Linh who broke the vase.",
        exampleVi: "Chính Linh là người làm vỡ cái bình.",
      },
      {
        type: "affirmative",
        label: "Wh-cleft",
        structure: "What + S + V + is/was + phần nhấn mạnh",
        exampleEn: "What I need is a long holiday.",
        exampleVi: "Thứ tôi cần là một kỳ nghỉ dài.",
      },
      {
        type: "special",
        label: "Nhấn mạnh hành động",
        structure: "What + S + did + was (to) + V",
        exampleEn: "What she did was (to) call the police.",
        exampleVi: "Việc cô ấy làm là gọi cảnh sát.",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Sửa thông tin sai",
        explanation: "Nhấn mạnh phần đúng để đối lập với điều người kia nghĩ.",
        exampleEn: "It wasn't John who called. It was his brother.",
        exampleVi: "Không phải John gọi đâu. Là anh trai cậu ấy.",
      },
      {
        id: "u2",
        title: "Nhấn mạnh thời gian / nơi chốn",
        explanation: "It was in 2010 that… · It was in Hue that…",
        exampleEn: "It was in Hue that my parents first met.",
        exampleVi: "Chính ở Huế bố mẹ tôi gặp nhau lần đầu.",
      },
      {
        id: "u3",
        title: "All… is… (chỉ cần)",
        explanation: "All + S + V + is… nghĩa là 'tất cả những gì… chỉ là…'.",
        exampleEn: "All I want is a quiet evening.",
        exampleVi: "Tất cả những gì tôi muốn chỉ là một buổi tối yên tĩnh.",
      },
    ],
    signals: [
      {
        category: "Chọn that hay who",
        words: ["người → who/that", "vật, thời gian, nơi chốn → that"],
        explanation: "Trong It-cleft, that dùng được cho mọi trường hợp; who chỉ cho người.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "It was in 1998 when I was born.",
        correct: "It was in 1998 that I was born.",
        explanation: "It-cleft dùng that, không dùng when/where.",
      },
      {
        incorrect: "What I need it is more time.",
        correct: "What I need is more time.",
        explanation: "Không thêm 'it' trước is trong Wh-cleft.",
      },
    ],
    proTips: [
      "Chia is/was theo thì của câu gốc: câu quá khứ thì dùng It was…",
      "Trong văn nói, câu chẻ giúp bạn nhấn mạnh mà không cần lên giọng.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "___ my mother who taught me to cook.",
      options: ["It was", "What was", "There was", "That was"],
      correctIndex: 0,
      explanation: "It-cleft nhấn mạnh người: It was + người + who.",
    },
    {
      id: "p2",
      question: "___ I love about this city is the food.",
      options: ["It", "What", "That", "Which"],
      correctIndex: 1,
      explanation: "Wh-cleft: What I love… is…",
    },
    {
      id: "p3",
      question: "It was at the airport ___ I lost my passport.",
      options: ["where", "when", "that", "which"],
      correctIndex: 2,
      explanation: "It-cleft nhấn mạnh nơi chốn vẫn dùng that.",
    },
    {
      id: "p4",
      question: "What he did ___ apologise to everyone.",
      options: ["was", "is", "were", "has been"],
      correctIndex: 0,
      explanation: "What + S + did + was (to) + V. Hành động trong quá khứ, phần nhấn mạnh là một việc → was.",
    },
    {
      id: "p5",
      question: "It ___ the noise that kept me awake, not the heat.",
      options: ["is", "was", "were", "has"],
      correctIndex: 1,
      explanation: "Sự việc trong quá khứ → It was.",
    },
    {
      id: "p6",
      type: "input",
      question: "It was Nam ___ won the competition. (who / which)",
      answers: ["who", "that"],
      explanation: "Nhấn mạnh người → who (hoặc that).",
    },
    {
      id: "p7",
      type: "input",
      question: "___ I need right now is a cup of coffee. (một từ)",
      answers: ["what", "all"],
      explanation: "Wh-cleft với What (hoặc All: 'tất cả những gì').",
    },
    {
      id: "p8",
      type: "input",
      question: "It ___ in 2019 that we moved to Saigon. (is / was)",
      answers: ["was"],
      explanation: "Sự việc trong quá khứ → It was.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "Nhấn mạnh 'last Friday' trong câu 'We met last Friday.':",
      options: [
        "It was last Friday that we met.",
        "It was last Friday when we met.",
        "What we met was last Friday.",
        "Last Friday it was that we met.",
      ],
      correctIndex: 0,
      explanation: "It was + thời gian + that…",
    },
    {
      id: "a2",
      question: "Nhấn mạnh hành động: 'She resigned.' →",
      options: [
        "What she did was resign.",
        "What she did was she resigned.",
        "It was resign that she did.",
        "What she resigned was.",
      ],
      correctIndex: 0,
      explanation: "What + S + did + was + V.",
    },
    {
      id: "a3",
      question: "It's not the money ___ matters, it's the experience.",
      options: ["what", "that", "who", "it"],
      correctIndex: 1,
      explanation: "It-cleft với vật → that.",
    },
    {
      id: "a4",
      type: "input",
      question: "Viết lại nhấn mạnh tân ngữ: 'I want a new laptop.' → What I want ___ a new laptop.",
      answers: ["is"],
      explanation: "Wh-cleft hiện tại → is.",
    },
    {
      id: "a5",
      type: "input",
      question: "Viết lại: 'Tom didn't break the window; Ben did.' → It wasn't Tom ___ broke the window.",
      answers: ["who", "that"],
      explanation: "It wasn't + người + who/that…",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "It-cleft", back: "It is/was + phần nhấn mạnh + that/who + phần còn lại" },
      { id: "f2", front: "Wh-cleft", back: "What + S + V + is/was + phần nhấn mạnh" },
      { id: "f3", front: "Nhấn mạnh hành động", back: "What + S + did + was (to) + V" },
      { id: "f4", front: "It was in 2010 when…?", back: "Sai. Dùng that: It was in 2010 that…" },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "It was in this café ___ we first met.",
        options: ["where", "that", "which", "when"],
        correctIndex: 1,
        explanation: "It-cleft dùng that.",
      },
      {
        id: "m2",
        question: "What surprised me ___ his reaction.",
        options: ["were", "was", "it was", "that"],
        correctIndex: 1,
        explanation: "Wh-cleft quá khứ, phần nhấn mạnh số ít → was.",
      },
      {
        id: "m3",
        question: "All you have to do ___ press this button.",
        options: ["are", "is", "were", "it is"],
        correctIndex: 1,
        explanation: "All + S + V + is (to) + V. Hiện tại, một việc → is.",
      },
    ],
  },
};

export default topic;
