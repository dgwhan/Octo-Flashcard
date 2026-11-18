import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "relative-clauses",
  level: "B2",
  title: "Relative Clauses",
  vietnameseTitle: "Mệnh đề quan hệ & Rút gọn",
  description: "Sử dụng đại từ quan hệ Who, Whom, Whose, Which, That, Where; mệnh đề xác định và không xác định, cùng kỹ thuật rút gọn mệnh đề đỉnh cao.",
  estimatedMinutes: 25,
  theory: {
    summary: "Mệnh đề quan hệ bổ nghĩa cho danh từ đứng trước nó. Gồm 2 loại: Mệnh đề xác định (không có dấu phẩy, bắt buộc phải có để câu đủ nghĩa) và Mệnh đề không xác định (có dấu phẩy, cung cấp thêm thông tin phụ).",
    formulas: [
      {
        type: "special",
        label: "Bảng Đại từ quan hệ",
        structure: "Who (người - chủ ngữ/tân ngữ), Whom (người - tân ngữ), Which (vật), Whose (sở hữu), That (thay cho Who/Which trong mệnh đề xác định)",
        exampleEn: "The scientist who discovered the cure was awarded the Nobel Prize.",
        exampleVi: "Nhà khoa học người đã phát hiện ra phương thuốc đã được trao giải Nobel.",
      },
      {
        type: "special",
        label: "Rút gọn Mệnh đề quan hệ (3 dạng chính)",
        structure: "1. V-ing (Chủ động) | 2. V3/ed (Bị động) | 3. To V (Sau the first, last, only, so sánh nhất)",
        exampleEn: "The man standing over there is my professor. (= who is standing)",
        exampleVi: "Người đàn ông đang đứng đằng kia là giáo sư của tôi.",
      },
    ],
    usages: [
      {
        id: "rc-u1",
        title: "Quy tắc dấu phẩy và chữ 'THAT'",
        explanation: "Tuyệt đối KHÔNG dùng 'THAT' trong mệnh đề quan hệ không xác định (mệnh đề có dấu phẩy) hoặc ngay sau giới từ.",
        exampleEn: "Paris, which is the capital of France, attracts millions of tourists.",
        exampleVi: "Paris, nơi là thủ đô của nước Pháp, thu hút hàng triệu khách du lịch.",
      },
    ],
    signals: [
      {
        category: "Rút gọn mệnh đề",
        words: ["The first / second / last / only ... + to V", "Chủ động -> V-ing", "Bị động -> V3/ed"],
        explanation: "Công thức rút gọn cực kỳ phổ biến trong đề thi học thuật và IELTS.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "My mother, that loves gardening, bought some rose bushes.",
        correct: "My mother, who loves gardening, bought some rose bushes.",
        explanation: "Mệnh đề có dấu phẩy ngăn cách KHÔNG ĐƯỢC dùng 'that', phải dùng 'who'.",
      },
    ],
    proTips: [
      "Whose + Noun không có mạo từ (whose car, whose parents).",
    ],
  },
  practice: [
    {
      id: "rc-q1",
      question: "Neil Armstrong was the first person _______ foot on the Moon.",
      options: ["set", "to set", "setting", "who set him"],
      correctIndex: 1,
      explanation: "Sau các từ chỉ thứ tự 'the first / the second / the only' rút gọn mệnh đề quan hệ bằng 'to V' -> 'to set'.",
    },
    {
      id: "rc-q2",
      question: "The documents _______ to all board members contained confidential financial data.",
      options: ["sending", "which sent", "sent", "were sent"],
      correctIndex: 2,
      explanation: "Tài liệu được gửi (nghĩa bị động: which were sent) rút gọn thành phân từ 2: 'sent'.",
    },
    {
      id: "rc-q3",
      question: "Albert Einstein, _______ theories revolutionized physics, was born in Germany.",
      options: ["who", "whom", "whose", "that"],
      correctIndex: 2,
      explanation: "'theories' là danh từ chỉ vật sở hữu của Einstein -> dùng đại từ quan hệ sở hữu 'whose theories'.",
    },
    {
      id: "rc-x1",
      question: "The woman ___ lives next door is a doctor.",
      options: ["which", "who", "whose", "where"],
      correctIndex: 1,
      explanation: "Thay cho người làm chủ ngữ → who.",
    },
    {
      id: "rc-x2",
      question: "This is the house ___ I was born.",
      options: ["which", "that", "where", "who"],
      correctIndex: 2,
      explanation: "Nơi chốn → where.",
    },
    {
      id: "rc-x3",
      type: "input",
      question: "I have a friend ___ father is a pilot. (sở hữu)",
      answers: ["whose"],
      explanation: "Sở hữu → whose.",
    },
    {
      id: "rc-x4",
      type: "input",
      question: "The book ___ you lent me is great. (which / who)",
      answers: ["which", "that"],
      explanation: "Thay cho vật → which/that.",
    },
    {
      id: "rc-x5",
      question: "Do you remember the day ___ we first met?",
      options: ["which", "when", "where", "who"],
      correctIndex: 1,
      explanation: "Thời gian → when.",
    },
  ],
  advanced: [
    {
      id: "rc-a1",
      question: "My brother, ___ lives in Canada, is visiting next week.",
      options: ["that", "who", "which", "whom"],
      correctIndex: 1,
      explanation: "Mệnh đề không xác định (có dấu phẩy) không dùng that.",
    },
    {
      id: "rc-a2",
      question: "He failed the exam, ___ surprised everyone.",
      options: ["that", "which", "what", "who"],
      correctIndex: 1,
      explanation: "Which thay cho cả mệnh đề phía trước.",
    },
    {
      id: "rc-a3",
      question: "The man to ___ I spoke was very helpful.",
      options: ["who", "whom", "that", "which"],
      correctIndex: 1,
      explanation: "Sau giới từ dùng whom (người) / which (vật).",
    },
    {
      id: "rc-a4",
      type: "input",
      question: "Rút gọn: 'The girl who is standing there is my sister.' → The girl ___ there is my sister.",
      answers: ["standing"],
      explanation: "Rút gọn mệnh đề quan hệ chủ động → V-ing.",
    },
    {
      id: "rc-a5",
      type: "input",
      question: "Everything ___ he said was true. (that / which)",
      answers: ["that"],
      explanation: "Sau everything/all/nothing ưu tiên dùng that.",
    },
  ],
  review: {
    flashcards: [
      {
        id: "rc-fc1",
        front: "3 trường hợp rút gọn mệnh đề quan hệ chuẩn học thuật?",
        back: "1. V-ing: Hành động chủ động (The girl who lives next door -> The girl living next door)\n2. V3/ed: Hành động bị động (The book which was written by Nam -> The book written by Nam)\n3. To V: Sau the first, last, only, next, so sánh nhất.",
        hint: "V-ing (chủ động), V3 (bị động), To V (thứ tự)",
      },
      {
        id: "rc-fx1",
        front: "who / which / whose",
        back: "who: người\nwhich: vật\nwhose: sở hữu",
      },
      {
        id: "rc-fx2",
        front: "where / when",
        back: "where: nơi chốn\nwhen: thời gian",
      },
      {
        id: "rc-fx3",
        front: "Khi nào KHÔNG dùng that?",
        back: "Trong mệnh đề không xác định (có dấu phẩy) và ngay sau giới từ.",
      },
    ],
    masteryQuiz: [
      {
        id: "rc-mq1",
        question: "The students _______ high scores in the national contest were awarded scholarships.",
        options: ["achieved", "achieving", "who achieve them", "to achieve"],
        correctIndex: 1,
        explanation: "Học sinh chủ động đạt điểm cao (who achieved) rút gọn thành hiện tại phân từ chủ động 'achieving'.",
      },
      {
        id: "rc-mx1",
        question: "The film ___ we watched last night was boring.",
        options: ["who", "which", "where", "whose"],
        correctIndex: 1,
        explanation: "Vật → which/that.",
      },
      {
        id: "rc-mx2",
        question: "Hanoi, ___ is the capital of Vietnam, has a long history.",
        options: ["that", "which", "where", "who"],
        correctIndex: 1,
        explanation: "Mệnh đề không xác định về vật → which.",
      },
    ],
  },
};

export default topic;
