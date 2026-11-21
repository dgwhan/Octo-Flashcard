import type { GrammarTopicInput } from "../types";

const topic: GrammarTopicInput = {
  id: "conditionals-2-3",
  level: "B2",
  title: "Conditionals Type 2 & 3",
  vietnameseTitle: "Câu điều kiện loại 2, 3 & Hỗn hợp",
  description: "Giả định trái thực tế ở hiện tại (Loại 2), nuối tiếc trái thực tế trong quá khứ (Loại 3) và đảo ngữ nâng cao.",
  estimatedMinutes: 25,
  theory: {
    summary: "Loại 2 giả định điều không có thật hoặc trái với thực tế hiện tại. Loại 3 giả định điều trái với quá khứ và bày tỏ sự nuối tiếc. Điều kiện hỗn hợp kết hợp nguyên nhân quá khứ với hệ quả hiện tại.",
    formulas: [
      {
        type: "affirmative",
        label: "Điều kiện Loại 2 (Trái với hiện tại)",
        structure: "If + S + V2/ed (were), S + would / could + V-bare",
        exampleEn: "If I had a million dollars, I would travel around the world.",
        exampleVi: "Nếu tôi có 1 triệu đô la (thực tế hiện tại không có), tôi sẽ đi du lịch vòng quanh thế giới.",
      },
      {
        type: "affirmative",
        label: "Điều kiện Loại 3 (Trái với quá khứ)",
        structure: "If + S + had + V3/ed, S + would / could + have + V3/ed",
        exampleEn: "If she had left home earlier, she wouldn't have missed the train.",
        exampleVi: "Nếu cô ấy rời nhà sớm hơn (quá khứ cô ấy không làm vậy), cô ấy đã không bị lỡ tàu.",
      },
      {
        type: "special",
        label: "Điều kiện Hỗn hợp (Mixed Conditional 3 + 2)",
        structure: "If + S + had + V3/ed, S + would + V-bare (now)",
        exampleEn: "If I had taken your advice yesterday, I wouldn't be in trouble now.",
        exampleVi: "Nếu hôm qua tôi nghe lời khuyên của bạn, thì bây giờ tôi đã không gặp rắc rối.",
      },
    ],
    usages: [
      {
        id: "c23-u1",
        title: "To be trong câu điều kiện loại 2",
        explanation: "Trong văn phong chuẩn ngữ pháp và học thuật, động từ 'to be' trong mệnh đề If loại 2 dùng 'were' cho TẤT CẢ các ngôi (I, he, she, it).",
        exampleEn: "If I were you, I would accept the job offer.",
        exampleVi: "Nếu tôi là bạn, tôi sẽ nhận lời đề nghị làm việc đó.",
      },
    ],
    signals: [
      {
        category: "Đảo ngữ nâng cao",
        words: ["Were S to V... (đảo loại 2)", "Had S + V3/ed... (đảo loại 3)"],
        explanation: "Bỏ If để tăng tính trang trọng trong văn viết.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "If he studied harder last year, he would pass the exam.",
        correct: "If he had studied harder last year, he would have passed the exam.",
        explanation: "Sự việc xảy ra trong quá khứ ('last year') phải dùng câu điều kiện Loại 3, không dùng Loại 2.",
      },
    ],
    proTips: [
      "Đảo ngữ loại 3: 'Had you told me earlier, I would have prepared better.' (Bỏ If, đảo Had lên đầu).",
    ],
  },
  practice: [
    {
      id: "c23-q1",
      question: "If I _______ your contact number, I would have invited you to my birthday party.",
      options: ["have", "had", "had had", "would have"],
      correctIndex: 2,
      explanation: "Vế sau có 'would have invited' (Loại 3) -> vế If phải là thì Quá khứ hoàn thành 'had had' (had + V3 của have).",
    },
    {
      id: "c23-q2",
      question: "If she _______ bilingual, she could easily get that prestigious international position.",
      options: ["is", "were", "had been", "will be"],
      correctIndex: 1,
      explanation: "Giả định trái với hiện tại (Loại 2) với to be cho ngôi 'she' dùng 'were'.",
    },
    {
      id: "c23-q3",
      question: "_______ the emergency rescue team arrived ten minutes earlier, more lives could have been saved.",
      options: ["Had", "Were", "Should", "If did"],
      correctIndex: 0,
      explanation: "Đảo ngữ câu điều kiện loại 3: 'Had + S + V3/ed' (thay cho 'If the emergency rescue team had arrived...').",
    },
    {
      id: "c23-x1",
      type: "input",
      question: "If I ___ (have) more money, I would travel the world.",
      answers: ["had"],
      explanation: "Loại 2: If + quá khứ đơn.",
    },
    {
      id: "c23-x2",
      type: "input",
      question: "If she had studied, she ___ (pass) the exam.",
      answers: ["would have passed"],
      explanation: "Loại 3: would have + V3.",
    },
    {
      id: "c23-x3",
      question: "If I ___ you, I would apologise.",
      options: ["am", "was", "were", "had been"],
      correctIndex: 2,
      explanation: "Lời khuyên: If I were you…",
    },
    {
      id: "c23-x4",
      question: "If we had left earlier, we ___ the train.",
      options: ["wouldn't miss", "wouldn't have missed", "didn't miss", "won't miss"],
      correctIndex: 1,
      explanation: "Loại 3: would have + V3.",
    },
    {
      id: "c23-x5",
      type: "input",
      question: "What would you do if you ___ (win) the lottery?",
      answers: ["won"],
      explanation: "Loại 2: tình huống giả định ở hiện tại/tương lai.",
    },
  ],
  advanced: [
    {
      id: "c23-a1",
      question: "If I had taken the job, I ___ in Singapore now.",
      options: ["would live", "would be living", "would have lived", "will live"],
      correctIndex: 1,
      explanation: "Câu hỗn hợp: điều kiện quá khứ (loại 3), kết quả hiện tại (loại 2).",
    },
    {
      id: "c23-a2",
      question: "If she ___ so shy, she would have spoken to him.",
      options: ["isn't", "weren't", "hadn't been", "wouldn't be"],
      correctIndex: 1,
      explanation: "Hỗn hợp: đặc điểm luôn đúng (loại 2) → kết quả quá khứ (loại 3).",
    },
    {
      id: "c23-a3",
      question: "Chọn câu SAI:",
      options: ["If I knew, I would tell you.", "If I would know, I would tell you.", "If I had known, I would have told you.", "If I were rich, I'd buy a boat."],
      correctIndex: 1,
      explanation: "Vế if không dùng would.",
    },
    {
      id: "c23-a4",
      type: "input",
      question: "Viết lại: 'I didn't know, so I didn't help.' → If I had known, I ___ helped.",
      answers: ["would have", "could have"],
      explanation: "Loại 3: would/could have + V3.",
    },
    {
      id: "c23-a5",
      type: "input",
      question: "If he ___ (not / break) his leg, he would be playing in the final now.",
      answers: ["hadn't broken", "had not broken"],
      explanation: "Hỗn hợp: quá khứ ảnh hưởng hiện tại → If + had not + V3.",
    },
  ],
  review: {
    flashcards: [
      {
        id: "c23-fc1",
        front: "Công thức đảo ngữ của câu điều kiện Loại 2 và Loại 3?",
        back: "- Loại 2: Were + S + to V (hoặc Were + S + adj/noun)\nVí dụ: Were I you, I would go.\n- Loại 3: Had + S + V3/ed\nVí dụ: Had he known the truth, he wouldn't have come.",
        hint: "Were S to V / Had S V3",
      },
      {
        id: "c23-fx1",
        front: "Câu điều kiện loại 2",
        back: "If + QKĐ, would + V\nKhông có thật ở hiện tại.",
      },
      {
        id: "c23-fx2",
        front: "Câu điều kiện loại 3",
        back: "If + had V3, would have V3\nKhông có thật ở quá khứ.",
      },
      {
        id: "c23-fx3",
        front: "Câu điều kiện hỗn hợp (quá khứ → hiện tại)",
        back: "If + had V3, would + V (now)",
      },
    ],
    masteryQuiz: [
      {
        id: "c23-mq1",
        question: "If we had brought a map, we _______ lost in the forest right now.",
        options: ["wouldn't be", "wouldn't have been", "aren't", "won't be"],
        correctIndex: 0,
        explanation: "Câu điều kiện hỗn hợp: Điều kiện trong quá khứ (had brought) dẫn tới kết quả ở hiện tại (now) -> dùng 'wouldn't be'.",
      },
      {
        id: "c23-mx1",
        question: "If I ___ wings, I would fly to you.",
        options: ["have", "had", "had had", "would have"],
        correctIndex: 1,
        explanation: "Loại 2: điều không có thật ở hiện tại.",
      },
      {
        id: "c23-mx2",
        question: "We ___ the match if we had played better.",
        options: ["would win", "would have won", "won", "will win"],
        correctIndex: 1,
        explanation: "Loại 3.",
      },
    ],
  },
};

export default topic;
