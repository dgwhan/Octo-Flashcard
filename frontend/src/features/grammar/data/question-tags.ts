import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "question-tags",
  level: "B1",
  title: "Question Tags",
  vietnameseTitle: "Câu hỏi đuôi",
  description: "…, isn't it? / …, don't you? Câu khẳng định đi với đuôi phủ định và ngược lại.",
  estimatedMinutes: 20,
  theory: {
    summary:
      "Câu hỏi đuôi là một câu hỏi ngắn gắn vào cuối câu để xác nhận thông tin. Quy tắc: vế chính khẳng định thì đuôi phủ định, vế chính phủ định thì đuôi khẳng định. Đuôi dùng trợ động từ của vế chính và đại từ chủ ngữ.",
    formulas: [
      {
        type: "affirmative",
        label: "Khẳng định → đuôi phủ định",
        structure: "S + V (+), trợ động từ + n't + đại từ?",
        exampleEn: "You live in Hanoi, don't you?",
        exampleVi: "Bạn sống ở Hà Nội, đúng không?",
      },
      {
        type: "negative",
        label: "Phủ định → đuôi khẳng định",
        structure: "S + trợ động từ + not + V, trợ động từ + đại từ?",
        exampleEn: "She can't swim, can she?",
        exampleVi: "Cô ấy không biết bơi, phải không?",
      },
      {
        type: "special",
        label: "Trường hợp đặc biệt",
        structure: "I am → aren't I? · Let's → shall we? · Câu mệnh lệnh → will you?",
        exampleEn: "I'm late, aren't I? Let's go, shall we?",
        exampleVi: "Tôi trễ rồi nhỉ? Đi thôi, nhé?",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Trợ động từ theo thì",
        explanation: "Hiện tại đơn dùng do/does, quá khứ đơn dùng did, các thì khác dùng lại trợ động từ có sẵn.",
        exampleEn: "He went home early, didn't he? They have finished, haven't they?",
        exampleVi: "Anh ấy về sớm, phải không? Họ xong rồi, đúng không?",
      },
      {
        id: "u2",
        title: "Từ mang nghĩa phủ định",
        explanation: "never, hardly, nobody, nothing làm vế chính mang nghĩa phủ định → đuôi khẳng định.",
        exampleEn: "She never eats meat, does she?",
        exampleVi: "Cô ấy không bao giờ ăn thịt, phải không?",
      },
      {
        id: "u3",
        title: "Ngữ điệu",
        explanation: "Lên giọng: hỏi thật vì chưa chắc. Xuống giọng: chỉ muốn người nghe đồng ý.",
        exampleEn: "It's a lovely day, isn't it? ↘",
        exampleVi: "Hôm nay đẹp trời quá nhỉ? (xuống giọng)",
      },
    ],
    signals: [
      {
        category: "Đại từ trong đuôi",
        words: ["this/that → it", "these/those → they", "everyone/somebody → they", "there is → isn't there"],
        explanation: "Đuôi luôn dùng đại từ, không dùng lại danh từ.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "I am right, amn't I?",
        correct: "I am right, aren't I?",
        explanation: "Đuôi của I am là aren't I.",
      },
      {
        incorrect: "She likes tea, isn't she?",
        correct: "She likes tea, doesn't she?",
        explanation: "Động từ thường ở hiện tại đơn → trợ động từ does.",
      },
      {
        incorrect: "Nobody called, didn't they?",
        correct: "Nobody called, did they?",
        explanation: "Nobody mang nghĩa phủ định → đuôi khẳng định; đại từ là they.",
      },
    ],
    proTips: [
      "Tìm trợ động từ ẩn: 'She works' = 'She does work' → doesn't she?",
      "Vế chính có never/hardly/nobody thì coi như phủ định.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "You're a student, ___?",
      options: ["are you", "aren't you", "don't you", "isn't it"],
      correctIndex: 1,
      explanation: "Khẳng định với be → aren't you.",
    },
    {
      id: "p2",
      question: "He doesn't like spicy food, ___?",
      options: ["does he", "doesn't he", "is he", "did he"],
      correctIndex: 0,
      explanation: "Phủ định → đuôi khẳng định does he.",
    },
    {
      id: "p3",
      question: "They went to the beach, ___?",
      options: ["did they", "didn't they", "weren't they", "don't they"],
      correctIndex: 1,
      explanation: "Quá khứ đơn khẳng định → didn't they.",
    },
    {
      id: "p4",
      question: "You've seen this film, ___?",
      options: ["haven't you", "didn't you", "don't you", "have you"],
      correctIndex: 0,
      explanation: "Hiện tại hoàn thành → dùng lại have: haven't you.",
    },
    {
      id: "p5",
      question: "Let's have a break, ___?",
      options: ["will we", "shall we", "don't we", "let we"],
      correctIndex: 1,
      explanation: "Let's → shall we.",
    },
    {
      id: "p6",
      type: "input",
      question: "She can speak Korean, ___ she?",
      answers: ["can't"],
      explanation: "Khẳng định với can → can't.",
    },
    {
      id: "p7",
      type: "input",
      question: "It isn't raining, ___ it?",
      answers: ["is"],
      explanation: "Phủ định → đuôi khẳng định is it.",
    },
    {
      id: "p8",
      type: "input",
      question: "Your brother works in a bank, ___ he?",
      answers: ["doesn't"],
      explanation: "Hiện tại đơn khẳng định, ngôi ba số ít → doesn't he.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "I'm your best friend, ___?",
      options: ["am I not", "aren't I", "amn't I", "don't I"],
      correctIndex: 1,
      explanation: "Đặc biệt: I am → aren't I.",
    },
    {
      id: "a2",
      question: "Nobody knows the answer, ___?",
      options: ["don't they", "do they", "does he", "doesn't it"],
      correctIndex: 1,
      explanation: "Nobody = phủ định → đuôi khẳng định; đại từ thay cho nobody là they.",
    },
    {
      id: "a3",
      question: "There's a problem with the printer, ___?",
      options: ["isn't it", "isn't there", "is there", "doesn't it"],
      correctIndex: 1,
      explanation: "There is → isn't there.",
    },
    {
      id: "a4",
      type: "input",
      question: "Close the door, ___ you? (câu mệnh lệnh)",
      answers: ["will", "would", "won't", "can", "could"],
      explanation: "Câu mệnh lệnh thường dùng will you? (lịch sự hơn: would/could you?).",
    },
    {
      id: "a5",
      type: "input",
      question: "He hardly ever goes out, ___ he?",
      answers: ["does"],
      explanation: "Hardly ever mang nghĩa phủ định → đuôi khẳng định does he.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "Quy tắc chung của câu hỏi đuôi", back: "Khẳng định → đuôi phủ định\nPhủ định → đuôi khẳng định" },
      { id: "f2", front: "I am…, ___?", back: "aren't I?" },
      { id: "f3", front: "Let's…, ___?", back: "shall we?" },
      { id: "f4", front: "Nobody/never trong vế chính", back: "Coi là phủ định → đuôi khẳng định." },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "This is your bag, ___?",
        options: ["isn't this", "isn't it", "is it", "doesn't it"],
        correctIndex: 1,
        explanation: "This → it; khẳng định → isn't it.",
      },
      {
        id: "m2",
        question: "You won't tell anyone, ___?",
        options: ["will you", "won't you", "do you", "would you"],
        correctIndex: 0,
        explanation: "Phủ định với will → will you.",
      },
      {
        id: "m3",
        question: "She had a good time, ___?",
        options: ["hadn't she", "didn't she", "wasn't she", "had she"],
        correctIndex: 1,
        explanation: "'Had' ở đây là động từ thường (có, trải qua) → didn't she.",
      },
    ],
  },
};

export default topic;
