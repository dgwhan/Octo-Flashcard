import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "conditionals-0-1",
  level: "B1",
  title: "Conditionals Type 0 & 1",
  vietnameseTitle: "Câu điều kiện loại 0 & Loại 1",
  description: "Diễn tả chân lý khoa học, thói quen hiển nhiên (Loại 0) và điều kiện có thật có thể xảy ra ở hiện tại hoặc tương lai (Loại 1).",
  estimatedMinutes: 20,
  theory: {
    summary: "Câu điều kiện loại 0 diễn đạt sự thật hiển nhiên (If + Hiện tại đơn, Hiện tại đơn). Câu điều kiện loại 1 diễn đạt khả năng có thật ở hiện tại hoặc tương lai (If + Hiện tại đơn, S + will + V-bare).",
    formulas: [
      {
        type: "affirmative",
        label: "Điều kiện Loại 0 (Sự thật khoa học)",
        structure: "If / When + S + V(s/es), S + V(s/es)",
        exampleEn: "If you heat ice, it melts.",
        exampleVi: "Nếu bạn làm nóng nước đá, nó tan chảy.",
      },
      {
        type: "affirmative",
        label: "Điều kiện Loại 1 (Có thật ở tương lai)",
        structure: "If + S + V(s/es), S + will / can / may + V-bare",
        exampleEn: "If it rains tomorrow, we will stay at home.",
        exampleVi: "Nếu ngày mai trời mưa, chúng tôi sẽ ở nhà.",
      },
    ],
    usages: [
      {
        id: "c01-u1",
        title: "Unless = If ... not (Trừ phi)",
        explanation: "Unless mang nghĩa phủ định, nên mệnh đề chứa Unless không dùng trợ động từ phủ định nữa.",
        exampleEn: "You will fail the exam unless you study hard.",
        exampleVi: "Bạn sẽ thi trượt trừ phi bạn học hành chăm chỉ (= If you don't study hard).",
      },
    ],
    signals: [
      {
        category: "Liên từ điều kiện",
        words: ["If", "When", "Unless", "As long as", "Provided that"],
        explanation: "Mở đầu mệnh đề điều kiện.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "If it will rain tomorrow, I will take an umbrella.",
        correct: "If it rains tomorrow, I will take an umbrella.",
        explanation: "Mệnh đề 'If' trong câu điều kiện loại 1 KHÔNG BAO GIỜ dùng 'will', mà dùng thì Hiện tại đơn.",
      },
    ],
    proTips: [
      "Đảo ngữ loại 1: Bỏ If, đưa 'Should' lên đầu: 'Should it rain tomorrow, we will cancel the picnic.'",
    ],
  },
  practice: [
    {
      id: "c01-q1",
      question: "If you _______ red and yellow together, you get orange.",
      options: ["mix", "will mix", "mixed", "are mixing"],
      correctIndex: 0,
      explanation: "Sự thật khoa học pha màu (Loại 0) -> dùng thì hiện tại đơn ở cả hai vế: 'mix'.",
    },
    {
      id: "c01-q2",
      question: "If the plane _______ on schedule, she will arrive before dinner.",
      options: ["lands", "will land", "landed", "has landed"],
      correctIndex: 0,
      explanation: "Mệnh đề If loại 1 chia thì hiện tại đơn: 'lands' (chủ ngữ the plane số ít).",
    },
    {
      id: "c01-q3",
      question: "We will miss our flight _______ we leave for the airport immediately.",
      options: ["if", "unless", "provided", "when"],
      correctIndex: 1,
      explanation: "'Unless' = Trừ phi (Chúng ta sẽ lỡ chuyến bay trừ phi chúng ta xuất phát ngay lập tức).",
    },
    {
      id: "c01-x1",
      type: "input",
      question: "If you heat ice, it ___ (melt).",
      answers: ["melts"],
      explanation: "Loại 0 (sự thật): If + HTĐ, HTĐ.",
    },
    {
      id: "c01-x2",
      type: "input",
      question: "If it ___ (rain) tomorrow, we will stay at home.",
      answers: ["rains"],
      explanation: "Loại 1: If + hiện tại đơn.",
    },
    {
      id: "c01-x3",
      question: "If you study hard, you ___ the exam.",
      options: ["pass", "will pass", "would pass", "passed"],
      correctIndex: 1,
      explanation: "Loại 1: mệnh đề chính will + V.",
    },
    {
      id: "c01-x4",
      question: "___ you hurry, you'll miss the bus.",
      options: ["If", "Unless", "When", "As"],
      correctIndex: 1,
      explanation: "Unless = if not: Nếu không nhanh lên…",
    },
    {
      id: "c01-x5",
      type: "input",
      question: "I'll call you when I ___ (arrive).",
      answers: ["arrive"],
      explanation: "Mệnh đề thời gian dùng hiện tại đơn.",
    },
  ],
  advanced: [
    {
      id: "c01-a1",
      question: "If you ___ Tom, tell him to call me.",
      options: ["will see", "see", "saw", "would see"],
      correctIndex: 1,
      explanation: "Mệnh lệnh ở mệnh đề chính, vế if vẫn hiện tại đơn.",
    },
    {
      id: "c01-a2",
      question: "Chọn câu SAI:",
      options: ["If I see her, I'll tell her.", "If you will need help, call me.", "Unless it rains, we'll go.", "If you mix red and blue, you get purple."],
      correctIndex: 1,
      explanation: "Vế if không dùng will: If you need help…",
    },
    {
      id: "c01-a3",
      question: "You can borrow my car ___ you drive carefully.",
      options: ["unless", "as long as", "even if", "in case"],
      correctIndex: 1,
      explanation: "As long as = miễn là.",
    },
    {
      id: "c01-a4",
      type: "input",
      question: "Viết lại: 'If you don't leave now, you'll be late.' → ___ you leave now, you'll be late.",
      answers: ["unless"],
      explanation: "If… not = unless.",
    },
    {
      id: "c01-a5",
      type: "input",
      question: "If water ___ (reach) 100°C, it boils.",
      answers: ["reaches"],
      explanation: "Loại 0, ngôi ba số ít → reaches.",
    },
  ],
  review: {
    flashcards: [
      {
        id: "c01-fc1",
        front: "Quy tắc cấm kỵ trong mệnh đề IF của câu điều kiện loại 1?",
        back: "TUYỆT ĐỐI không dùng 'will' trong mệnh đề IF! Phải chia ở thì Hiện tại đơn (Present Simple).\nVí dụ: If she CALLS (không nói If she will call), I will answer.",
        hint: "Không dùng will trong mệnh đề If",
      },
      {
        id: "c01-fx1",
        front: "Câu điều kiện loại 0",
        back: "If + HTĐ, HTĐ\nSự thật, quy luật.",
      },
      {
        id: "c01-fx2",
        front: "Câu điều kiện loại 1",
        back: "If + HTĐ, will + V\nCó thể xảy ra ở tương lai.",
      },
      {
        id: "c01-fx3",
        front: "unless = ?",
        back: "if… not",
      },
    ],
    masteryQuiz: [
      {
        id: "c01-mq1",
        question: "Should you _______ any further assistance, please do not hesitate to contact our customer support.",
        options: ["need", "needs", "needed", "will need"],
        correctIndex: 0,
        explanation: "Đảo ngữ câu điều kiện loại 1 với 'Should': Should + S + V-bare -> dùng 'need'.",
      },
      {
        id: "c01-mx1",
        question: "If you press this button, the machine ___.",
        options: ["starts", "would start", "started", "had started"],
        correctIndex: 0,
        explanation: "Loại 0: kết quả luôn đúng.",
      },
      {
        id: "c01-mx2",
        question: "She won't come ___ you invite her.",
        options: ["if", "unless", "when", "as"],
        correctIndex: 1,
        explanation: "Unless = if… not.",
      },
    ],
  },
};

export default topic;
