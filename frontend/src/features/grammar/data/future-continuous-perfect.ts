import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "future-continuous-perfect",
  level: "B2",
  title: "Future Continuous & Future Perfect",
  vietnameseTitle: "Tương lai tiếp diễn & Tương lai hoàn thành",
  description: "Đang làm gì vào một lúc trong tương lai, và sẽ làm xong trước một mốc tương lai.",
  estimatedMinutes: 25,
  theory: {
    summary:
      "Tương lai tiếp diễn (will be + V-ing) đặt bạn vào giữa một hành động tại một thời điểm tương lai. Tương lai hoàn thành (will have + V3) nhìn ngược lại từ một mốc tương lai: đến lúc đó việc đã xong.",
    formulas: [
      {
        type: "affirmative",
        label: "Tương lai tiếp diễn",
        structure: "S + will be + V-ing",
        exampleEn: "This time tomorrow, I'll be lying on the beach.",
        exampleVi: "Giờ này ngày mai, tôi sẽ đang nằm trên bãi biển.",
      },
      {
        type: "affirmative",
        label: "Tương lai hoàn thành",
        structure: "S + will have + V3/ed",
        exampleEn: "By 2030, I will have graduated.",
        exampleVi: "Đến năm 2030, tôi sẽ đã tốt nghiệp.",
      },
      {
        type: "negative",
        label: "Phủ định",
        structure: "S + won't be + V-ing · S + won't have + V3",
        exampleEn: "I won't have finished the report by Friday.",
        exampleVi: "Đến thứ Sáu tôi vẫn chưa làm xong báo cáo.",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Đang diễn ra tại một mốc tương lai",
        explanation: "at this time tomorrow, at 9 p.m. next Monday…",
        exampleEn: "Don't call at 8. We'll be having dinner.",
        exampleVi: "Đừng gọi lúc 8 giờ. Lúc đó chúng tôi sẽ đang ăn tối.",
      },
      {
        id: "u2",
        title: "Hỏi lịch trình lịch sự",
        explanation: "Will you be + V-ing? nhẹ nhàng hơn Will you + V?",
        exampleEn: "Will you be using the car tonight?",
        exampleVi: "Tối nay bạn có định dùng xe không?",
      },
      {
        id: "u3",
        title: "Hoàn thành trước một mốc tương lai (by)",
        explanation: "By + mốc / by the time + hiện tại đơn.",
        exampleEn: "By the time you arrive, we will have eaten.",
        exampleVi: "Lúc bạn đến thì chúng tôi đã ăn xong rồi.",
      },
    ],
    signals: [
      {
        category: "Dấu hiệu nhận biết",
        words: ["this time next week", "at 10 a.m. tomorrow", "by + mốc", "by the time", "by the end of"],
        explanation: "'By' gần như luôn báo hiệu tương lai hoàn thành.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "By the time you will arrive, we will have left.",
        correct: "By the time you arrive, we will have left.",
        explanation: "Sau by the time / when / before dùng hiện tại đơn để nói về tương lai.",
      },
      {
        incorrect: "At 9 tomorrow I will work.",
        correct: "At 9 tomorrow I will be working.",
        explanation: "Đang diễn ra tại một thời điểm → tiếp diễn.",
      },
    ],
    proTips: [
      "Hỏi 'lúc đó đang làm gì?' → will be V-ing. Hỏi 'đến lúc đó xong chưa?' → will have V3.",
      "Mệnh đề thời gian (when, by the time, before) không dùng will.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "This time next week, I ___ in Paris.",
      options: ["will travel", "will be travelling", "will have travelled", "travel"],
      correctIndex: 1,
      explanation: "Đang diễn ra tại một mốc tương lai → will be travelling.",
    },
    {
      id: "p2",
      question: "By the end of this year, she ___ three books.",
      options: ["will write", "will be writing", "will have written", "writes"],
      correctIndex: 2,
      explanation: "By + mốc tương lai → will have written.",
    },
    {
      id: "p3",
      question: "Don't phone me at 7. I ___ my kids to school.",
      options: ["will take", "will be taking", "will have taken", "take"],
      correctIndex: 1,
      explanation: "Đang làm gì lúc 7 giờ → tiếp diễn.",
    },
    {
      id: "p4",
      question: "By the time we ___ there, the shop will have closed.",
      options: ["will get", "get", "will have got", "are getting"],
      correctIndex: 1,
      explanation: "By the time + hiện tại đơn.",
    },
    {
      id: "p5",
      question: "___ you ___ the printer this afternoon? I need it.",
      options: ["Will / use", "Will / be using", "Will / have used", "Are / used"],
      correctIndex: 1,
      explanation: "Hỏi lịch trình lịch sự → Will you be using…?",
    },
    {
      id: "p6",
      type: "input",
      question: "At midnight tonight, we ___ (sleep).",
      answers: ["will be sleeping", "'ll be sleeping"],
      explanation: "Đang diễn ra tại một mốc tương lai.",
    },
    {
      id: "p7",
      type: "input",
      question: "By next June, they ___ (build) the new bridge.",
      answers: ["will have built", "'ll have built"],
      explanation: "By + mốc → will have + V3.",
    },
    {
      id: "p8",
      type: "input",
      question: "I ___ (not / finish) the project by Monday. I need more time.",
      answers: ["won't have finished", "will not have finished"],
      explanation: "Phủ định tương lai hoàn thành.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "In 2030, my parents ___ married for 40 years.",
      options: ["will be", "will have been", "will be being", "are"],
      correctIndex: 1,
      explanation: "Khoảng thời gian tính đến một mốc tương lai → will have been.",
    },
    {
      id: "a2",
      question: "Chọn câu đúng:",
      options: [
        "When you will arrive, I will be waiting.",
        "When you arrive, I will be waiting.",
        "When you arrive, I will have waited.",
        "When you will have arrived, I wait.",
      ],
      correctIndex: 1,
      explanation: "Mệnh đề thời gian dùng hiện tại đơn; lúc bạn đến tôi đang đợi → tiếp diễn.",
    },
    {
      id: "a3",
      question: "Hurry up! The film ___ by the time we get there.",
      options: ["will start", "will be starting", "will have started", "starts"],
      correctIndex: 2,
      explanation: "Lúc chúng ta đến thì phim đã bắt đầu rồi → will have started.",
    },
    {
      id: "a4",
      type: "input",
      question: "Next month, I ___ (work) here for exactly ten years.",
      answers: ["will have worked", "will have been working", "'ll have worked", "'ll have been working"],
      explanation: "Tròn mười năm tính đến tháng sau → will have worked (hoặc will have been working).",
    },
    {
      id: "a5",
      type: "input",
      question: "Tomorrow at 10, she ___ (take) her driving test, so wish her luck!",
      answers: ["will be taking", "'ll be taking"],
      explanation: "Đang làm bài thi vào lúc 10 giờ ngày mai.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "Tương lai tiếp diễn", back: "S + will be + V-ing\n= sẽ đang làm" },
      { id: "f2", front: "Tương lai hoàn thành", back: "S + will have + V3\n= sẽ đã làm xong (trước một mốc)" },
      { id: "f3", front: "By the time + ?", back: "By the time + hiện tại đơn, S + will have V3" },
      { id: "f4", front: "Cách hỏi lịch trình lịch sự", back: "Will you be + V-ing…?" },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "By 6 p.m., I ___ all my emails.",
        options: ["will answer", "will have answered", "will be answering", "answer"],
        correctIndex: 1,
        explanation: "By + mốc → will have answered.",
      },
      {
        id: "m2",
        question: "This time tomorrow, they ___ over the Pacific.",
        options: ["will fly", "will be flying", "will have flown", "fly"],
        correctIndex: 1,
        explanation: "Đang diễn ra vào một thời điểm tương lai.",
      },
      {
        id: "m3",
        question: "I'll call you when I ___ .",
        options: ["will finish", "will have finished", "finish", "will be finishing"],
        correctIndex: 2,
        explanation: "Mệnh đề thời gian dùng hiện tại đơn.",
      },
    ],
  },
};

export default topic;
