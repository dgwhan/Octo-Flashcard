import type { GrammarTopicInput } from "../types";

const topic: GrammarTopicInput = {
  id: "future-simple",
  level: "A2",
  title: "Future Simple & Be Going To",
  vietnameseTitle: "Tương lai đơn & Be Going To",
  description: "Phân biệt quyết định tức thời, lời hứa hẹn (Will) và kế hoạch có chủ đích, dự đoán có bằng chứng (Be going to).",
  estimatedMinutes: 20,
  theory: {
    summary: "Tương lai đơn (Will + V-bare) dùng cho quyết định bột phát tại thời điểm nói hoặc lời hứa. 'Be going to' dùng cho kế hoạch đã dự định trước hoặc dự đoán có căn cứ mắt thấy tai nghe.",
    formulas: [
      {
        type: "affirmative",
        label: "Will (Quyết định tức thời / Hứa hẹn)",
        structure: "S + will ('ll) + V-bare",
        exampleEn: "Don't worry, I will help you with this luggage.",
        exampleVi: "Đừng lo, tôi sẽ giúp bạn xách hành lý này.",
      },
      {
        type: "affirmative",
        label: "Be Going To (Kế hoạch / Dự đoán có chứng cứ)",
        structure: "S + am/is/are + going to + V-bare",
        exampleEn: "Look at those dark clouds! It is going to rain.",
        exampleVi: "Nhìn những đám mây đen kìa! Trời sắp mưa rồi.",
      },
    ],
    usages: [
      {
        id: "fs-u1",
        title: "Will: Quyết định ngay tại thời điểm nói",
        explanation: "Không có sự chuẩn bị hay lên kế hoạch từ trước.",
        exampleEn: "The phone is ringing. I'll get it!",
        exampleVi: "Điện thoại đang reo. Tôi sẽ nghe máy!",
      },
      {
        id: "fs-u2",
        title: "Be going to: Dự đoán dựa trên bằng chứng hiện tại",
        explanation: "Có dấu hiệu thực tế rõ ràng để tin sự việc sắp xảy ra.",
        exampleEn: "He is driving too fast; he is going to crash!",
        exampleVi: "Anh ta phóng nhanh quá; anh ta sắp đâm xe rồi!",
      },
    ],
    signals: [
      {
        category: "Từ chỉ tương lai",
        words: ["tomorrow", "next week/month/year", "soon", "in 2 days"],
        explanation: "Các mốc thời gian sắp tới.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "I will study medicine next semester, I enrolled yesterday.",
        correct: "I am going to study medicine next semester, I enrolled yesterday.",
        explanation: "Đã có đăng ký từ hôm qua (kế hoạch có trước) nên phải dùng 'be going to'.",
      },
    ],
    proTips: [
      "Nhớ câu thần chú: 'Will' = Tức thời & Hứa hẹn; 'Be going to' = Đã tính trước & Mắt thấy tai nghe.",
    ],
  },
  practice: [
    {
      id: "fs-q1",
      question: "A: 'The phone is ringing.' - B: 'OK, I _______ answer it.'",
      options: ["am going to", "will", "am answering", "answer"],
      correctIndex: 1,
      explanation: "Quyết định bột phát ngay tại thời điểm nghe tiếng chuông điện thoại -> dùng 'will'.",
    },
    {
      id: "fs-q2",
      question: "Look at the dark clouds! It _______ rain very soon.",
      options: ["will", "is going to", "rains", "is raining"],
      correctIndex: 1,
      explanation: "Có bằng chứng thực tế rõ ràng (mây đen) chứng tỏ trời sắp mưa -> dùng 'is going to'.",
    },
    {
      id: "fs-q3",
      question: "We bought our plane tickets last week. We _______ visit France this summer.",
      options: ["will", "are going to", "shall", "would"],
      correctIndex: 1,
      explanation: "Đã mua vé máy bay từ tuần trước (kế hoạch chuẩn bị trước) -> dùng 'are going to'.",
    },
    {
      id: "fs-x1",
      question: "I think it ___ rain later. Take an umbrella.",
      options: ["is", "will", "is going", "does"],
      correctIndex: 1,
      explanation: "Dự đoán dựa trên ý kiến (I think) → will.",
    },
    {
      id: "fs-x2",
      question: "She ___ to study medicine. She's already applied.",
      options: ["will", "is going", "goes", "will be going to"],
      correctIndex: 1,
      explanation: "Dự định đã có kế hoạch → be going to.",
    },
    {
      id: "fs-x3",
      type: "input",
      question: "Don't worry, I ___ (help) you with your homework. (quyết định ngay)",
      answers: ["will help", "'ll help"],
      explanation: "Quyết định tức thời / lời hứa → will.",
    },
    {
      id: "fs-x4",
      type: "input",
      question: "We ___ (not / be) late, I promise.",
      answers: ["won't be", "will not be"],
      explanation: "Lời hứa phủ định → won't.",
    },
    {
      id: "fs-x5",
      question: "Watch out! You ___ fall!",
      options: ["will", "are going to", "go to", "would"],
      correctIndex: 1,
      explanation: "Dự đoán có bằng chứng ngay trước mắt → be going to.",
    },
  ],
  advanced: [
    {
      id: "fs-a1",
      question: "A: 'We've run out of milk.' B: 'Really? I ___ some on my way home.'",
      options: ["am going to buy", "will buy", "buy", "am buying"],
      correctIndex: 1,
      explanation: "Quyết định ngay lúc nói → will.",
    },
    {
      id: "fs-a2",
      question: "A: 'Why are you wearing old clothes?' B: 'I ___ paint the fence.'",
      options: ["will", "am going to", "would", "shall to"],
      correctIndex: 1,
      explanation: "Dự định đã có trước (đã mặc đồ cũ) → be going to.",
    },
    {
      id: "fs-a3",
      question: "___ I open the window? It's hot in here.",
      options: ["Will", "Shall", "Am I going to", "Do"],
      correctIndex: 1,
      explanation: "Đề nghị giúp đỡ với I/we → Shall.",
    },
    {
      id: "fs-a4",
      type: "input",
      question: "If you need anything, I ___ be in my office. (một từ)",
      answers: ["will", "'ll"],
      explanation: "Sự sẵn sàng / thông tin tương lai → will.",
    },
    {
      id: "fs-a5",
      type: "input",
      question: "Look at the score! Our team ___ going to win. (một từ)",
      answers: ["is", "'s"],
      explanation: "Có bằng chứng → be going to.",
    },
  ],
  review: {
    flashcards: [
      {
        id: "fs-fc1",
        front: "Khi nào bắt buộc dùng 'Be going to' thay vì 'Will'?",
        back: "1. Kế hoạch, dự định đã có sẵn trước thời điểm nói.\n2. Dự đoán dựa trên bằng chứng cụ thể trước mắt (như mây đen, người nghiêng ngả...).",
        hint: "Kế hoạch trước & Bằng chứng thực tế",
      },
      {
        id: "fs-fx1",
        front: "will hay be going to: quyết định ngay lúc nói?",
        back: "will\n'I'll get it!'",
      },
      {
        id: "fs-fx2",
        front: "will hay be going to: đã có kế hoạch từ trước?",
        back: "be going to\n'I'm going to visit Hue next month.'",
      },
      {
        id: "fs-fx3",
        front: "Dự đoán có bằng chứng trước mắt",
        back: "be going to\n'Look at those clouds! It's going to rain.'",
      },
    ],
    masteryQuiz: [
      {
        id: "fs-mq1",
        question: "I promise I _______ tell anyone your secret.",
        options: ["will not", "am not going to", "don't", "haven't"],
        correctIndex: 0,
        explanation: "Lời hứa hẹn (promise) luôn đi kèm với 'will / will not (won't)'.",
      },
      {
        id: "fs-mx1",
        question: "I'm sure you ___ the exam.",
        options: ["will pass", "are passing", "pass", "passed"],
        correctIndex: 0,
        explanation: "Dự đoán dựa trên niềm tin (I'm sure) → will.",
      },
      {
        id: "fs-mx2",
        question: "They've bought a lot of paint. They ___ the house.",
        options: ["will paint", "are going to paint", "paint", "painted"],
        correctIndex: 1,
        explanation: "Có bằng chứng về kế hoạch → be going to.",
      },
    ],
  },
};

export default topic;
