import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "causative",
  level: "B2",
  title: "Causative: have / get something done",
  vietnameseTitle: "Thể sai khiến",
  description: "Nhờ hoặc thuê người khác làm việc gì cho mình: have my hair cut, get the car fixed.",
  estimatedMinutes: 20,
  theory: {
    summary:
      "Thể sai khiến diễn tả việc mình không tự làm mà nhờ/thuê người khác làm. Dạng bị động (have sth done) tập trung vào việc được làm; dạng chủ động (have sb do / get sb to do) nêu rõ người làm.",
    formulas: [
      {
        type: "affirmative",
        label: "Bị động",
        structure: "S + have/get + vật + V3",
        exampleEn: "I had my hair cut yesterday. She gets her car washed every week.",
        exampleVi: "Hôm qua tôi đi cắt tóc. Tuần nào cô ấy cũng mang xe đi rửa.",
      },
      {
        type: "affirmative",
        label: "Chủ động với have",
        structure: "S + have + người + V nguyên mẫu",
        exampleEn: "I'll have the technician check your laptop.",
        exampleVi: "Tôi sẽ nhờ kỹ thuật viên kiểm tra laptop của bạn.",
      },
      {
        type: "affirmative",
        label: "Chủ động với get",
        structure: "S + get + người + to V",
        exampleEn: "I got my brother to help me move.",
        exampleVi: "Tôi nhờ được anh trai giúp chuyển nhà.",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Dịch vụ thường ngày",
        explanation: "Cắt tóc, sửa xe, khám mắt, giao hàng…",
        exampleEn: "I need to have my eyes tested.",
        exampleVi: "Tôi cần đi kiểm tra mắt.",
      },
      {
        id: "u2",
        title: "Chuyện không may xảy ra",
        explanation: "Have sth + V3 cũng dùng cho việc xấu xảy ra với mình.",
        exampleEn: "He had his phone stolen on the bus.",
        exampleVi: "Anh ấy bị trộm điện thoại trên xe buýt.",
      },
      {
        id: "u3",
        title: "Chia have/get theo thì",
        explanation: "Chỉ chia have/get; V3 giữ nguyên.",
        exampleEn: "We are having our kitchen renovated.",
        exampleVi: "Chúng tôi đang cho sửa lại nhà bếp.",
      },
    ],
    signals: [
      {
        category: "Thường đi với",
        words: ["hair cut", "car repaired", "house painted", "photo taken", "eyes tested"],
        explanation: "Các dịch vụ do người khác làm cho mình.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "I cut my hair at the barber's.",
        correct: "I had my hair cut at the barber's.",
        explanation: "Thợ cắt cho mình, không phải mình tự cắt.",
      },
      {
        incorrect: "She had her car repair.",
        correct: "She had her car repaired.",
        explanation: "Dạng bị động: have + vật + V3.",
      },
      {
        incorrect: "I got him fix my bike.",
        correct: "I got him to fix my bike.",
        explanation: "Get + người + to V (have + người + V).",
      },
    ],
    proTips: [
      "have sb DO · get sb TO DO · have/get sth DONE.",
      "Get thân mật hơn have một chút, nghĩa gần như nhau.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "I need to ___ my car serviced.",
      options: ["have", "make", "let", "do"],
      correctIndex: 0,
      explanation: "Have + vật + V3.",
    },
    {
      id: "p2",
      question: "She had her nails ___ for the wedding.",
      options: ["do", "did", "done", "doing"],
      correctIndex: 2,
      explanation: "Have + vật + V3.",
    },
    {
      id: "p3",
      question: "I'll get my sister ___ the kids.",
      options: ["pick up", "to pick up", "picked up", "picking up"],
      correctIndex: 1,
      explanation: "Get + người + to V.",
    },
    {
      id: "p4",
      question: "The manager had his assistant ___ the report.",
      options: ["to send", "send", "sent", "sending"],
      correctIndex: 1,
      explanation: "Have + người + V nguyên mẫu.",
    },
    {
      id: "p5",
      question: "We're having our house ___ next week.",
      options: ["paint", "painted", "to paint", "painting"],
      correctIndex: 1,
      explanation: "Have + vật + V3, have chia tiếp diễn.",
    },
    {
      id: "p6",
      type: "input",
      question: "I had my photo ___ (take) for my passport.",
      answers: ["taken"],
      explanation: "Have + vật + V3.",
    },
    {
      id: "p7",
      type: "input",
      question: "He got his friend ___ (lend) him some money.",
      answers: ["to lend"],
      explanation: "Get + người + to V.",
    },
    {
      id: "p8",
      type: "input",
      question: "Where do you ___ your hair cut? (have / get, hiện tại)",
      answers: ["have", "get"],
      explanation: "Cả have và get đều đúng.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "'Anh ấy bị lấy cắp ví ở chợ':",
      options: [
        "He stole his wallet at the market.",
        "He had his wallet stolen at the market.",
        "He had stolen his wallet at the market.",
        "He got stealing his wallet at the market.",
      ],
      correctIndex: 1,
      explanation: "Have sth V3 dùng cho chuyện không may xảy ra với mình.",
    },
    {
      id: "a2",
      question: "Viết lại: 'A mechanic is repairing my bike.' =",
      options: [
        "I'm having my bike repaired.",
        "I'm repairing my bike.",
        "I have repaired my bike.",
        "I'm having a mechanic repaired my bike.",
      ],
      correctIndex: 0,
      explanation: "Người khác đang sửa cho mình → be having + vật + V3.",
    },
    {
      id: "a3",
      question: "You should ___ that tooth looked at.",
      options: ["make", "get", "let", "take"],
      correctIndex: 1,
      explanation: "Get + vật + V3 (đi khám răng).",
    },
    {
      id: "a4",
      type: "input",
      question: "Viết lại: 'The hotel staff cleaned our room.' → We had our room ___.",
      answers: ["cleaned"],
      explanation: "Have + vật + V3.",
    },
    {
      id: "a5",
      type: "input",
      question: "Viết lại: 'I asked the waiter to bring the bill.' → I got the waiter ___ the bill.",
      answers: ["to bring"],
      explanation: "Get + người + to V.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "have/get + vật + ?", back: "+ V3 (have my hair cut)" },
      { id: "f2", front: "have + người + ?", back: "+ V nguyên mẫu (have him fix it)" },
      { id: "f3", front: "get + người + ?", back: "+ to V (get him to fix it)" },
      { id: "f4", front: "'Tôi bị trộm xe đạp' với thể sai khiến", back: "I had my bike stolen." },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "I'm going to have my eyes ___ .",
        options: ["test", "tested", "testing", "to test"],
        correctIndex: 1,
        explanation: "Have + vật + V3.",
      },
      {
        id: "m2",
        question: "She got the plumber ___ the leak.",
        options: ["fix", "fixed", "to fix", "fixing"],
        correctIndex: 2,
        explanation: "Get + người + to V.",
      },
      {
        id: "m3",
        question: "We had the carpenter ___ new shelves.",
        options: ["build", "to build", "built", "building"],
        correctIndex: 0,
        explanation: "Have + người + V nguyên mẫu.",
      },
    ],
  },
};

export default topic;
