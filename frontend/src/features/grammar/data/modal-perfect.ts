import type { GrammarTopicInput } from "../types";

const topic: GrammarTopicInput = {
  id: "modal-perfect",
  level: "B2",
  title: "Modal Perfects",
  vietnameseTitle: "Động từ khuyết thiếu hoàn thành",
  description: "Must have, can't have, might have, should have + V3: suy đoán và tiếc nuối về quá khứ.",
  estimatedMinutes: 25,
  theory: {
    summary:
      "Modal + have + V3 dùng để nói về quá khứ: suy đoán điều gì có lẽ đã xảy ra (must/might/can't have), hoặc nhận xét điều đáng lẽ nên làm mà không làm (should have).",
    formulas: [
      {
        type: "affirmative",
        label: "Suy đoán chắc chắn",
        structure: "must have + V3 (chắc hẳn đã) · can't/couldn't have + V3 (không thể nào đã)",
        exampleEn: "The ground is wet. It must have rained.",
        exampleVi: "Đất ướt. Chắc hẳn trời đã mưa.",
      },
      {
        type: "affirmative",
        label: "Suy đoán không chắc",
        structure: "might / may / could have + V3 (có lẽ đã)",
        exampleEn: "She's late. She might have missed the bus.",
        exampleVi: "Cô ấy trễ. Có lẽ cô ấy đã lỡ chuyến xe buýt.",
      },
      {
        type: "special",
        label: "Tiếc nuối / phê bình",
        structure: "should(n't) have + V3 (đáng lẽ nên/không nên) · needn't have + V3 (đã làm nhưng không cần)",
        exampleEn: "You should have told me earlier.",
        exampleVi: "Đáng lẽ bạn nên nói với tôi sớm hơn.",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Must have: kết luận gần như chắc chắn",
        explanation: "Dựa trên bằng chứng rõ ràng.",
        exampleEn: "He got 10/10. He must have studied hard.",
        exampleVi: "Cậu ấy được 10 điểm. Chắc hẳn đã học rất chăm.",
      },
      {
        id: "u2",
        title: "Can't have: phủ định chắc chắn",
        explanation: "Phủ định của must have là can't have, không phải mustn't have.",
        exampleEn: "She can't have seen me. She was looking the other way.",
        exampleVi: "Cô ấy không thể đã nhìn thấy tôi. Cô ấy đang nhìn hướng khác.",
      },
      {
        id: "u3",
        title: "Could have: có khả năng nhưng đã không xảy ra",
        explanation: "Nói về một khả năng đã bị bỏ lỡ.",
        exampleEn: "You could have won if you'd tried harder.",
        exampleVi: "Bạn đã có thể thắng nếu cố gắng hơn.",
      },
    ],
    signals: [
      {
        category: "Mức độ chắc chắn",
        words: ["must have (~95%)", "might/may/could have (~50%)", "can't have (~5%)"],
        explanation: "Chọn modal theo mức độ chắc chắn của suy đoán.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "He mustn't have heard the news.",
        correct: "He can't have heard the news.",
        explanation: "Suy đoán phủ định chắc chắn về quá khứ dùng can't have.",
      },
      {
        incorrect: "You should have went to the doctor.",
        correct: "You should have gone to the doctor.",
        explanation: "Sau have dùng V3 (gone), không dùng V2.",
      },
    ],
    proTips: [
      "Nói nhanh: should have → /ʃʊdəv/, nghe như 'should of'. Viết vẫn là 'have'.",
      "Hiện tại: must be / can't be. Quá khứ: must have been / can't have been.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "The lights are off. They ___ to bed.",
      options: ["must go", "must have gone", "should have gone", "can't have gone"],
      correctIndex: 1,
      explanation: "Kết luận chắc chắn về quá khứ dựa trên bằng chứng.",
    },
    {
      id: "p2",
      question: "I failed the test. I ___ more.",
      options: ["should study", "should have studied", "must have studied", "can't have studied"],
      correctIndex: 1,
      explanation: "Tiếc nuối việc đáng lẽ nên làm.",
    },
    {
      id: "p3",
      question: "He ___ the window. He was at work all day.",
      options: ["must have broken", "can't have broken", "should have broken", "might break"],
      correctIndex: 1,
      explanation: "Có bằng chứng ngược lại → không thể nào.",
    },
    {
      id: "p4",
      question: "I'm not sure where my keys are. I ___ them in the car.",
      options: ["must have left", "might have left", "can't have left", "should have left"],
      correctIndex: 1,
      explanation: "Không chắc → might have.",
    },
    {
      id: "p5",
      question: "You ___ so much food. Only three people came.",
      options: ["needn't have cooked", "mustn't have cooked", "can't cook", "shouldn't cook"],
      correctIndex: 0,
      explanation: "Đã nấu nhưng hóa ra không cần → needn't have cooked.",
    },
    {
      id: "p6",
      type: "input",
      question: "She looks very happy. She ___ have passed the exam. (must / can't)",
      answers: ["must"],
      explanation: "Kết luận chắc chắn → must have.",
    },
    {
      id: "p7",
      type: "input",
      question: "You shouldn't have ___ (say) that. She's upset now.",
      answers: ["said"],
      explanation: "Should(n't) have + V3.",
    },
    {
      id: "p8",
      type: "input",
      question: "We ___ have taken a taxi. It was only five minutes' walk. (một từ: needn't)",
      answers: ["needn't", "need not"],
      explanation: "Đã đi taxi nhưng hóa ra không cần → needn't have taken.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "'Tôi chắc chắn anh ấy không nói dối' (về chuyện hôm qua):",
      options: [
        "He mustn't have lied.",
        "He can't have lied.",
        "He shouldn't have lied.",
        "He needn't have lied.",
      ],
      correctIndex: 1,
      explanation: "Suy đoán phủ định chắc chắn → can't have.",
    },
    {
      id: "a2",
      question: "You ___ me! I was so worried. (Bạn đã không gọi, giờ tôi trách)",
      options: ["could have called", "must have called", "can't have called", "needn't have called"],
      correctIndex: 0,
      explanation: "Could have dùng để trách: lẽ ra đã có thể gọi.",
    },
    {
      id: "a3",
      question: "Chọn câu có nghĩa 'Có lẽ cô ấy đã không nhận được tin nhắn':",
      options: [
        "She can't have got the message.",
        "She might not have got the message.",
        "She mustn't have got the message.",
        "She shouldn't have got the message.",
      ],
      correctIndex: 1,
      explanation: "Không chắc, phủ định → might not have.",
    },
    {
      id: "a4",
      type: "input",
      question: "Viết lại: 'I'm sure he forgot the meeting.' → He ___ forgotten the meeting.",
      answers: ["must have"],
      explanation: "I'm sure + quá khứ → must have + V3.",
    },
    {
      id: "a5",
      type: "input",
      question: "Viết lại: 'It was a mistake to sell the house.' → We ___ sold the house.",
      answers: ["shouldn't have", "should not have"],
      explanation: "Việc đã làm là sai → shouldn't have + V3.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "must have + V3", back: "Chắc hẳn đã (kết luận gần như chắc chắn)" },
      { id: "f2", front: "Phủ định của must have", back: "can't have + V3 (không thể nào đã)" },
      { id: "f3", front: "should have + V3", back: "Đáng lẽ nên (nhưng đã không làm)" },
      { id: "f4", front: "needn't have + V3", back: "Đã làm nhưng hóa ra không cần thiết" },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "The door was locked. Someone ___ it.",
        options: ["must have locked", "can't have locked", "should lock", "needn't have locked"],
        correctIndex: 0,
        explanation: "Kết luận chắc chắn từ bằng chứng.",
      },
      {
        id: "m2",
        question: "You ___ that cake. Now you feel sick.",
        options: ["shouldn't have eaten", "can't have eaten", "must have eaten", "might eat"],
        correctIndex: 0,
        explanation: "Phê bình việc đã làm.",
      },
      {
        id: "m3",
        question: "She ___ the email. She hasn't checked her inbox for days.",
        options: ["must have read", "can't have read", "should have read", "needn't have read"],
        correctIndex: 1,
        explanation: "Bằng chứng cho thấy không thể đã đọc.",
      },
    ],
  },
};

export default topic;
