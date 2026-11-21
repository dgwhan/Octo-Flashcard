import type { GrammarTopicInput } from "../types";

const topic: GrammarTopicInput = {
  id: "question-forms",
  level: "A2",
  title: "Question Forms",
  vietnameseTitle: "Cách đặt câu hỏi",
  description: "Câu hỏi Yes/No, câu hỏi với Wh-, và câu hỏi về chủ ngữ không cần trợ động từ.",
  estimatedMinutes: 25,
  theory: {
    summary:
      "Tiếng Anh đặt câu hỏi bằng cách đảo trợ động từ (do/does/did, be, have, can…) lên trước chủ ngữ. Câu hỏi Wh- đặt từ để hỏi lên đầu. Riêng khi hỏi về chính chủ ngữ thì không đảo.",
    formulas: [
      {
        type: "interrogative",
        label: "Yes/No",
        structure: "Trợ động từ + S + V…?",
        exampleEn: "Do you like coffee? Can she swim? Is he ready?",
        exampleVi: "Bạn có thích cà phê không? Cô ấy biết bơi không? Anh ấy sẵn sàng chưa?",
      },
      {
        type: "interrogative",
        label: "Wh-question",
        structure: "Wh- + trợ động từ + S + V…?",
        exampleEn: "Where did you go last summer?",
        exampleVi: "Hè năm ngoái bạn đã đi đâu?",
      },
      {
        type: "special",
        label: "Hỏi về chủ ngữ",
        structure: "Who/What + V (chia theo thì)…? (không dùng do/does/did)",
        exampleEn: "Who broke the window? What happened?",
        exampleVi: "Ai đã làm vỡ cửa sổ? Chuyện gì đã xảy ra?",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Từ để hỏi thường gặp",
        explanation: "What (cái gì), Where (ở đâu), When (khi nào), Why (tại sao), Who (ai), Which (cái nào), How (thế nào), How much/many (bao nhiêu), How long/often (bao lâu, bao lâu một lần).",
        exampleEn: "How often do you exercise?",
        exampleVi: "Bạn tập thể dục bao lâu một lần?",
      },
      {
        id: "u2",
        title: "Hỏi chủ ngữ và hỏi tân ngữ",
        explanation: "'Who called you?' hỏi người gọi (chủ ngữ). 'Who did you call?' hỏi người được gọi (tân ngữ).",
        exampleEn: "Who loves Mary? — John does. / Who does Mary love? — She loves Tom.",
        exampleVi: "Ai yêu Mary? — John. / Mary yêu ai? — Cô ấy yêu Tom.",
      },
      {
        id: "u3",
        title: "Giới từ đứng cuối câu hỏi",
        explanation: "Trong văn nói, giới từ thường đứng cuối câu hỏi.",
        exampleEn: "Who are you talking to? Where are you from?",
        exampleVi: "Bạn đang nói chuyện với ai? Bạn đến từ đâu?",
      },
    ],
    signals: [
      {
        category: "Trợ động từ theo thì",
        words: ["do/does (hiện tại đơn)", "did (quá khứ đơn)", "am/is/are (tiếp diễn)", "have/has (hoàn thành)", "will (tương lai)"],
        explanation: "Đã có trợ động từ thì động từ chính trở về nguyên mẫu (với do/does/did).",
      },
    ],
    commonMistakes: [
      {
        incorrect: "Where you live?",
        correct: "Where do you live?",
        explanation: "Câu hỏi Wh- cần trợ động từ do.",
      },
      {
        incorrect: "Did you went to school yesterday?",
        correct: "Did you go to school yesterday?",
        explanation: "Sau did, động từ chính ở nguyên mẫu.",
      },
      {
        incorrect: "Who did call you?",
        correct: "Who called you?",
        explanation: "Hỏi về chủ ngữ thì không dùng did.",
      },
    ],
    proTips: [
      "Trả lời được bằng tên người làm hành động → đó là câu hỏi chủ ngữ, không cần do/did.",
      "Muốn hỏi cho tự nhiên, hãy nói to cả cụm: 'Where do you…', 'What did you…'.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "___ does the film start?",
      options: ["What time", "Who", "How many", "Whose"],
      correctIndex: 0,
      explanation: "Hỏi giờ bắt đầu → What time.",
    },
    {
      id: "p2",
      question: "___ you finish your homework yesterday?",
      options: ["Do", "Did", "Have", "Were"],
      correctIndex: 1,
      explanation: "Yesterday → quá khứ đơn → Did.",
    },
    {
      id: "p3",
      question: "How ___ brothers and sisters do you have?",
      options: ["much", "many", "long", "often"],
      correctIndex: 1,
      explanation: "Anh chị em đếm được → how many.",
    },
    {
      id: "p4",
      question: "Who ___ this cake? It's delicious!",
      options: ["did make", "made", "does make", "make"],
      correctIndex: 1,
      explanation: "Hỏi về chủ ngữ (người làm bánh) → không dùng did: Who made…?",
    },
    {
      id: "p5",
      question: "___ is your new teacher like? — She's friendly.",
      options: ["How", "What", "Who", "Which"],
      correctIndex: 1,
      explanation: "What is … like? hỏi về tính cách, đặc điểm.",
    },
    {
      id: "p6",
      type: "input",
      question: "___ do you go to the gym? — Three times a week. (How + một từ)",
      answers: ["how often"],
      explanation: "Hỏi tần suất → How often.",
    },
    {
      id: "p7",
      type: "input",
      question: "Where ___ you born? (trợ động từ)",
      answers: ["were"],
      explanation: "Be born ở quá khứ, chủ ngữ you → were.",
    },
    {
      id: "p8",
      type: "input",
      question: "___ does she live? — In Hai Phong.",
      answers: ["where"],
      explanation: "Hỏi nơi chốn → Where.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "Câu trả lời là 'Linh invited me.' Câu hỏi đúng là:",
      options: ["Who did invite you?", "Who invited you?", "Who did you invite?", "Whom invited you?"],
      correctIndex: 1,
      explanation: "Hỏi về người mời (chủ ngữ) → Who invited you?",
    },
    {
      id: "a2",
      question: "Câu trả lời là 'I invited Linh.' Câu hỏi đúng là:",
      options: ["Who invited you?", "Who you invited?", "Who did you invite?", "Who did invite?"],
      correctIndex: 2,
      explanation: "Hỏi về người được mời (tân ngữ) → cần did: Who did you invite?",
    },
    {
      id: "a3",
      question: "___ have you been learning English? — For five years.",
      options: ["How often", "How long", "When", "How much"],
      correctIndex: 1,
      explanation: "Hỏi khoảng thời gian → How long.",
    },
    {
      id: "a4",
      type: "input",
      question: "Đặt câu hỏi cho phần gạch: 'She is waiting for [her sister].' → Who is she waiting ___?",
      answers: ["for"],
      explanation: "Giới từ đi kèm động từ (wait for) đứng cuối câu hỏi.",
    },
    {
      id: "a5",
      type: "input",
      question: "Đặt câu hỏi: 'They moved here [in 2020].' → When ___ they move here?",
      answers: ["did"],
      explanation: "Hỏi thời gian, quá khứ đơn → did + V nguyên mẫu.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "Cấu trúc câu hỏi Wh-", back: "Wh- + trợ động từ + S + V?" },
      { id: "f2", front: "Who called you? vs Who did you call?", back: "Who called you? → hỏi người gọi (chủ ngữ)\nWho did you call? → hỏi người được gọi" },
      { id: "f3", front: "How much hay how many + money?", back: "How much money (không đếm được)" },
      { id: "f4", front: "Hỏi tính cách một người", back: "What is he/she like?" },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "___ umbrella is this? — It's mine.",
        options: ["Who", "Whose", "Which", "What"],
        correctIndex: 1,
        explanation: "Hỏi sở hữu → Whose.",
      },
      {
        id: "m2",
        question: "What ___ to your phone? It's broken.",
        options: ["did happen", "happened", "happens did", "was happen"],
        correctIndex: 1,
        explanation: "'What' là chủ ngữ → What happened?",
      },
      {
        id: "m3",
        question: "___ she speak French?",
        options: ["Do", "Is", "Does", "Has"],
        correctIndex: 2,
        explanation: "Hiện tại đơn, chủ ngữ she → Does.",
      },
    ],
  },
};

export default topic;
