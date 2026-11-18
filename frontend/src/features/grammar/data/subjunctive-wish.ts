import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "subjunctive-wish",
  level: "C1",
  title: "Subjunctive & Wish Structures",
  vietnameseTitle: "Thể giả định & Cấu trúc Wish",
  description: "Câu ước ở tương lai, hiện tại, quá khứ (Wish / If only) và câu giả định với các động từ mệnh lệnh (demand, suggest, recommend).",
  estimatedMinutes: 20,
  theory: {
    summary: "Cấu trúc Wish/If only diễn tả mong muốn trái với thực tế. Giả định thức (Subjunctive) dùng sau các động từ hoặc tính từ mang tính cấp bách, yêu cầu, đòi hỏi với động từ ở dạng nguyên thể (bare infinitive).",
    formulas: [
      {
        type: "special",
        label: "Cấu trúc Wish (3 cấp độ lùi thì)",
        structure: "1. Ước ở tương lai: S + wish + S + would/could + V-bare\n2. Ước ở hiện tại: S + wish + S + V2/ed (were)\n3. Ước ở quá khứ: S + wish + S + had + V3/ed",
        exampleEn: "I wish I hadn't spent so much money during the holidays.",
        exampleVi: "Tôi ước gì mình đã không tiêu nhiều tiền đến thế trong kỳ nghỉ (nuối tiếc quá khứ).",
      },
      {
        type: "special",
        label: "Thể giả định thức (Subjunctive Mood)",
        structure: "S + suggest / demand / recommend / insist + that + S + (should) + V-BARE",
        exampleEn: "The doctor recommended that he reduce his salt intake immediately.",
        exampleVi: "Bác sĩ đề nghị rằng anh ấy giảm lượng muối ăn vào ngay lập tức (dù 'he' nhưng động từ 'reduce' không thêm s).",
      },
    ],
    usages: [
      {
        id: "sw-u1",
        title: "Tính từ giả định (It is essential / crucial / vital / important that...)",
        explanation: "Theo sau là mệnh đề với động từ nguyên thể không chia.",
        exampleEn: "It is crucial that every student be present at 7:30 AM.",
        exampleVi: "Điều tối quan trọng là mọi học sinh phải có mặt lúc 7:30 sáng ('be' nguyên thể).",
      },
    ],
    signals: [
      {
        category: "Từ kích hoạt giả định thức",
        words: ["insist", "demand", "recommend", "vital", "essential", "crucial", "mandatory", "If only", "I wish"],
        explanation: "Báo hiệu động từ sau that phải ở dạng bare infinitive.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "The manager insisted that everyone signs the contract today.",
        correct: "The manager insisted that everyone sign the contract today.",
        explanation: "Trong cấu trúc Subjunctive, động từ 'sign' giữ nguyên mẫu không chia theo 'everyone'.",
      },
    ],
    proTips: [
      "Trong tiếng Anh Mỹ, người ta thường lược bỏ 'should' và giữ nguyên V-bare (that he go, that she be). Trong tiếng Anh Anh có thể dùng 'should go'.",
    ],
  },
  practice: [
    {
      id: "sw-q1",
      question: "It is essential that each applicant _______ all transcripts before the strict deadline.",
      options: ["submits", "submit", "submitted", "is submitting"],
      correctIndex: 1,
      explanation: "Cấu trúc giả định thức 'It is essential that S + (should) + V-bare' -> dùng 'submit' (nguyên mẫu không chia).",
    },
    {
      id: "sw-q2",
      question: "I wish I _______ to my mentor's advice when I started my business last year.",
      options: ["listened", "would listen", "had listened", "have listened"],
      correctIndex: 2,
      explanation: "Ước về một sự việc trong quá khứ ('last year') -> lùi về thì quá khứ hoàn thành 'had listened'.",
    },
    {
      id: "sw-q3",
      question: "The environmental committee proposed that the factory _______ fined heavily for polluting the river.",
      options: ["is", "was", "be", "were"],
      correctIndex: 2,
      explanation: "Giả định thức bị động: S + propose that + S + (should) + be + V3/ed -> dùng 'be'.",
    },
    {
      id: "sw-x1",
      type: "input",
      question: "I wish I ___ (be) taller.",
      answers: ["were", "was"],
      explanation: "Ước điều trái hiện tại: wish + quá khứ đơn (were trang trọng hơn).",
    },
    {
      id: "sw-x2",
      type: "input",
      question: "I wish I ___ (study) harder last year.",
      answers: ["had studied"],
      explanation: "Ước điều trái quá khứ: wish + had V3.",
    },
    {
      id: "sw-x3",
      question: "If only I ___ how to swim!",
      options: ["know", "knew", "had know", "would know"],
      correctIndex: 1,
      explanation: "If only + quá khứ đơn (hiện tại).",
    },
    {
      id: "sw-x4",
      question: "I wish you ___ stop making that noise.",
      options: ["will", "would", "can", "should"],
      correctIndex: 1,
      explanation: "Wish + would: mong ai đó thay đổi hành vi (phàn nàn).",
    },
    {
      id: "sw-x5",
      type: "input",
      question: "It's time we ___ (go) home.",
      answers: ["went"],
      explanation: "It's time + S + quá khứ đơn.",
    },
  ],
  advanced: [
    {
      id: "sw-a1",
      question: "The doctor suggested that he ___ more exercise.",
      options: ["takes", "take", "took", "would take"],
      correctIndex: 1,
      explanation: "Suggest that + S + V nguyên mẫu (giả định cách).",
    },
    {
      id: "sw-a2",
      question: "It is essential that every student ___ on time.",
      options: ["is", "be", "was", "being"],
      correctIndex: 1,
      explanation: "It is essential that + S + V nguyên mẫu.",
    },
    {
      id: "sw-a3",
      question: "I'd rather you ___ smoke in here.",
      options: ["don't", "didn't", "won't", "not"],
      correctIndex: 1,
      explanation: "Would rather + S + quá khứ đơn (nói về hiện tại).",
    },
    {
      id: "sw-a4",
      type: "input",
      question: "If only I ___ (not / say) that to her yesterday.",
      answers: ["hadn't said", "had not said"],
      explanation: "If only + had V3 (tiếc về quá khứ).",
    },
    {
      id: "sw-a5",
      type: "input",
      question: "They demanded that the manager ___ (resign).",
      answers: ["resign"],
      explanation: "Demand that + S + V nguyên mẫu.",
    },
  ],
  review: {
    flashcards: [
      {
        id: "sw-fc1",
        front: "Quy tắc động từ sau: 'It is vital / crucial / essential that S + ...'?",
        back: "Động từ LUÔN ở dạng nguyên mẫu không 'to' (V-bare), bất kể chủ ngữ là số ít hay số nhiều!\nVí dụ: It is vital that he BE informed. / that she SUBMIT on time.",
        hint: "Luôn dùng V-bare",
      },
      {
        id: "sw-fx1",
        front: "wish cho hiện tại / quá khứ",
        back: "hiện tại: wish + QKĐ\nquá khứ: wish + had V3",
      },
      {
        id: "sw-fx2",
        front: "suggest / demand / insist that…",
        back: "… that + S + V nguyên mẫu\nShe suggested that he go.",
      },
      {
        id: "sw-fx3",
        front: "It's time…",
        back: "It's time + S + QKĐ\nIt's time we left.",
      },
    ],
    masteryQuiz: [
      {
        id: "sw-mq1",
        question: "If only I _______ speak multiple foreign languages fluently right now.",
        options: ["could", "can", "had could", "will be able to"],
        correctIndex: 0,
        explanation: "Ước một điều trái với thực tế hiện tại (right now) -> dùng 'could + V-bare'.",
      },
      {
        id: "sw-mx1",
        question: "I wish I ___ to the party last night.",
        options: ["went", "had gone", "would go", "go"],
        correctIndex: 1,
        explanation: "Tiếc về quá khứ → had gone.",
      },
      {
        id: "sw-mx2",
        question: "She insisted that he ___ the truth.",
        options: ["tells", "tell", "told", "telling"],
        correctIndex: 1,
        explanation: "Insist that + S + V nguyên mẫu.",
      },
    ],
  },
};

export default topic;
