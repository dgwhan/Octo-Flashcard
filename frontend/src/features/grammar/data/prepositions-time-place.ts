import type { GrammarTopicInput } from "../types";

const topic: GrammarTopicInput = {
  id: "prepositions-time-place",
  level: "A1",
  title: "Prepositions of Time & Place: in, on, at",
  vietnameseTitle: "Giới từ thời gian & nơi chốn",
  description: "In, on, at đi từ phạm vi lớn đến điểm cụ thể, cho cả thời gian lẫn địa điểm.",
  estimatedMinutes: 20,
  theory: {
    summary:
      "Hãy hình dung một cái phễu: in cho phạm vi lớn (tháng, năm, thành phố), on cho phạm vi vừa (ngày, mặt phẳng, con đường), at cho điểm cụ thể (giờ, địa chỉ, một điểm).",
    formulas: [
      {
        type: "affirmative",
        label: "In",
        structure: "in + tháng / năm / mùa / thế kỷ / buổi (in the morning) · in + thành phố / quốc gia / không gian kín",
        exampleEn: "I was born in May, in 2004, in Hue.",
        exampleVi: "Tôi sinh vào tháng Năm, năm 2004, ở Huế.",
      },
      {
        type: "affirmative",
        label: "On",
        structure: "on + thứ / ngày tháng / ngày lễ cụ thể · on + bề mặt / tầng / con đường",
        exampleEn: "See you on Monday, on the second floor.",
        exampleVi: "Gặp bạn vào thứ Hai, ở tầng hai.",
      },
      {
        type: "affirmative",
        label: "At",
        structure: "at + giờ / at night / at the weekend (Anh-Anh) · at + địa chỉ cụ thể / một điểm",
        exampleEn: "The class starts at 7:30 at 12 Le Loi Street.",
        exampleVi: "Lớp học bắt đầu lúc 7:30 ở số 12 đường Lê Lợi.",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Ngày lễ: on hay at?",
        explanation: "On cho một ngày cụ thể (on Christmas Day); at cho cả dịp lễ (at Christmas).",
        exampleEn: "We visit our grandparents at Tet.",
        exampleVi: "Chúng tôi về thăm ông bà vào dịp Tết.",
      },
      {
        id: "u2",
        title: "Không dùng giới từ trước next / last / this / every",
        explanation: "Các từ này đã chỉ thời gian nên không cần in/on/at.",
        exampleEn: "I'll call you next Friday.",
        exampleVi: "Tôi sẽ gọi bạn vào thứ Sáu tới.",
      },
      {
        id: "u3",
        title: "Địa điểm: in, on, at",
        explanation: "In: bên trong. On: trên bề mặt hoặc trên một con đường. At: tại một điểm, một nơi diễn ra hoạt động.",
        exampleEn: "The keys are in the drawer. The map is on the wall. She's at the bus stop.",
        exampleVi: "Chìa khóa trong ngăn kéo. Bản đồ trên tường. Cô ấy ở trạm xe buýt.",
      },
    ],
    signals: [
      {
        category: "Cụm cố định nên học thuộc",
        words: ["at night", "in the morning", "at home", "at work", "on the bus", "in a car"],
        explanation: "Phương tiện công cộng/lớn dùng on (on the bus); xe con dùng in (in a car).",
      },
    ],
    commonMistakes: [
      {
        incorrect: "I'll see you on next Monday.",
        correct: "I'll see you next Monday.",
        explanation: "Không dùng giới từ trước next/last/this.",
      },
      {
        incorrect: "She lives at Vietnam.",
        correct: "She lives in Vietnam.",
        explanation: "Quốc gia, thành phố → in.",
      },
      {
        incorrect: "The meeting is in 3 o'clock.",
        correct: "The meeting is at 3 o'clock.",
        explanation: "Giờ cụ thể → at.",
      },
    ],
    proTips: [
      "Phễu thời gian: in (rộng) → on (ngày) → at (giờ).",
      "Có ngày cụ thể kèm buổi thì dùng on: on Monday morning, không phải in Monday morning.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "My birthday is ___ June.",
      options: ["in", "on", "at", "(không giới từ)"],
      correctIndex: 0,
      explanation: "Tháng → in.",
    },
    {
      id: "p2",
      question: "The shop opens ___ 8 a.m.",
      options: ["in", "on", "at", "by"],
      correctIndex: 2,
      explanation: "Giờ cụ thể → at.",
    },
    {
      id: "p3",
      question: "We have English ___ Tuesdays.",
      options: ["in", "on", "at", "(không giới từ)"],
      correctIndex: 1,
      explanation: "Thứ trong tuần → on.",
    },
    {
      id: "p4",
      question: "There's a picture ___ the wall.",
      options: ["in", "on", "at", "under"],
      correctIndex: 1,
      explanation: "Trên bề mặt tường → on.",
    },
    {
      id: "p5",
      question: "I'll finish the report ___ next week.",
      options: ["in", "on", "at", "(không giới từ)"],
      correctIndex: 3,
      explanation: "Không dùng giới từ trước next.",
    },
    {
      id: "p6",
      type: "input",
      question: "I usually read ___ night. (in / on / at)",
      answers: ["at"],
      explanation: "Cụm cố định at night.",
    },
    {
      id: "p7",
      type: "input",
      question: "She works ___ a hospital in Da Nang. (in / on / at)",
      answers: ["at", "in"],
      explanation: "At a hospital (nơi làm việc) phổ biến; in a hospital cũng đúng khi nhấn mạnh 'bên trong'.",
    },
    {
      id: "p8",
      type: "input",
      question: "The concert is ___ 20th December. (in / on / at)",
      answers: ["on"],
      explanation: "Ngày tháng cụ thể → on.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "We met ___ a cold morning ___ January.",
      options: ["in / on", "on / in", "at / in", "on / at"],
      correctIndex: 1,
      explanation: "Một buổi sáng cụ thể (có tính từ 'a cold') → on; tháng → in.",
    },
    {
      id: "a2",
      question: "I'll be there ___ ten minutes.",
      options: ["at", "on", "in", "after"],
      correctIndex: 2,
      explanation: "In + khoảng thời gian = sau bao lâu nữa (tính từ bây giờ).",
    },
    {
      id: "a3",
      question: "Chọn câu đúng:",
      options: [
        "I got in the bus at the corner.",
        "I got on the bus at the corner.",
        "I got at the bus on the corner.",
        "I got on the bus in the corner.",
      ],
      correctIndex: 1,
      explanation: "Lên phương tiện công cộng → get on; tại góc đường (một điểm) → at the corner.",
    },
    {
      id: "a4",
      type: "input",
      question: "My office is ___ the third floor. (in / on / at)",
      answers: ["on"],
      explanation: "Tầng → on.",
    },
    {
      id: "a5",
      type: "input",
      question: "The museum was built ___ the 19th century. (in / on / at)",
      answers: ["in"],
      explanation: "Thế kỷ → in.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "in / on / at cho thời gian", back: "in: tháng, năm, mùa\non: thứ, ngày tháng\nat: giờ, at night" },
      { id: "f2", front: "___ Monday morning", back: "on Monday morning\nCó ngày cụ thể → on." },
      { id: "f3", front: "on the bus hay in the bus?", back: "on the bus (phương tiện công cộng)\nin a car (xe con)" },
      { id: "f4", front: "Giới từ trước 'next week'?", back: "Không dùng giới từ: next week, last year, this morning." },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "The train leaves ___ 6:15 ___ Friday.",
        options: ["at / on", "on / at", "in / on", "at / in"],
        correctIndex: 0,
        explanation: "Giờ → at; thứ → on.",
      },
      {
        id: "m2",
        question: "There are many trees ___ the park.",
        options: ["on", "at", "in", "to"],
        correctIndex: 2,
        explanation: "Bên trong công viên (một khu vực) → in.",
      },
      {
        id: "m3",
        question: "It's usually cold here ___ winter.",
        options: ["on", "in", "at", "(không giới từ)"],
        correctIndex: 1,
        explanation: "Mùa → in.",
      },
    ],
  },
};

export default topic;
