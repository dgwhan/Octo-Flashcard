import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "past-perfect",
  level: "B1",
  title: "Past Perfect Tense",
  vietnameseTitle: "Thì Quá khứ hoàn thành",
  description: "Hành động xảy ra trước một hành động hoặc mốc khác trong quá khứ: 'quá khứ của quá khứ'.",
  estimatedMinutes: 20,
  theory: {
    summary:
      "Quá khứ hoàn thành (had + V3) cho biết việc nào xảy ra TRƯỚC khi kể hai việc trong quá khứ. Việc xảy ra trước dùng had + V3, việc xảy ra sau dùng quá khứ đơn.",
    formulas: [
      {
        type: "affirmative",
        label: "Khẳng định (+)",
        structure: "S + had + V3/ed",
        exampleEn: "When I arrived, the train had left.",
        exampleVi: "Khi tôi đến thì tàu đã rời đi (từ trước đó).",
      },
      {
        type: "negative",
        label: "Phủ định (-)",
        structure: "S + hadn't + V3/ed",
        exampleEn: "I hadn't seen snow before I moved to Canada.",
        exampleVi: "Trước khi chuyển sang Canada, tôi chưa từng thấy tuyết.",
      },
      {
        type: "interrogative",
        label: "Nghi vấn (?)",
        structure: "Had + S + V3/ed?",
        exampleEn: "Had you finished your work when he called?",
        exampleVi: "Khi anh ấy gọi, bạn đã xong việc chưa?",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Việc xảy ra trước một việc khác trong quá khứ",
        explanation: "Hay đi với before, after, when, by the time, already.",
        exampleEn: "By the time we got to the cinema, the film had started.",
        exampleVi: "Lúc chúng tôi tới rạp thì phim đã bắt đầu rồi.",
      },
      {
        id: "u2",
        title: "Kinh nghiệm tính đến một thời điểm trong quá khứ",
        explanation: "Tương tự hiện tại hoàn thành, nhưng mốc là quá khứ.",
        exampleEn: "It was the best meal I had ever eaten.",
        exampleVi: "Đó là bữa ăn ngon nhất tôi từng ăn (tính đến lúc đó).",
      },
      {
        id: "u3",
        title: "Trong câu tường thuật và câu điều kiện loại 3",
        explanation: "Lùi thì từ quá khứ đơn/hiện tại hoàn thành; vế if của loại 3.",
        exampleEn: "She said she had lost her keys.",
        exampleVi: "Cô ấy nói rằng cô ấy đã làm mất chìa khóa.",
      },
    ],
    signals: [
      {
        category: "Dấu hiệu nhận biết",
        words: ["by the time", "before", "after", "already", "never … before", "when"],
        explanation: "By the time + quá khứ đơn, mệnh đề còn lại thường là quá khứ hoàn thành.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "When I got home, my mother cooked dinner already.",
        correct: "When I got home, my mother had already cooked dinner.",
        explanation: "Nấu xong trước khi tôi về → had cooked.",
      },
      {
        incorrect: "I had gone to Hanoi last year.",
        correct: "I went to Hanoi last year.",
        explanation: "Chỉ có một sự kiện trong quá khứ, không có mốc nào để so 'trước' → quá khứ đơn.",
      },
    ],
    proTips: [
      "Vẽ trục thời gian: điểm nào xa hơn về quá khứ thì dùng had + V3.",
      "Với after/before, thứ tự đã rõ nên đôi khi dùng quá khứ đơn cho cả hai cũng được chấp nhận.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "When we arrived, the party ___ .",
      options: ["already finished", "had already finished", "has already finished", "was already finishing"],
      correctIndex: 1,
      explanation: "Bữa tiệc kết thúc trước khi chúng tôi đến.",
    },
    {
      id: "p2",
      question: "She ___ never ___ a plane before that trip.",
      options: ["has / taken", "had / taken", "did / take", "was / taking"],
      correctIndex: 1,
      explanation: "Kinh nghiệm tính đến một thời điểm trong quá khứ → had never taken.",
    },
    {
      id: "p3",
      question: "After he ___ his homework, he went to bed.",
      options: ["finishes", "had finished", "has finished", "was finishing"],
      correctIndex: 1,
      explanation: "Làm xong bài trước, rồi mới đi ngủ.",
    },
    {
      id: "p4",
      question: "By the time the police arrived, the thief ___ .",
      options: ["escaped", "had escaped", "has escaped", "escapes"],
      correctIndex: 1,
      explanation: "By the time + quá khứ đơn → vế còn lại quá khứ hoàn thành.",
    },
    {
      id: "p5",
      question: "I couldn't get into the house because I ___ my keys.",
      options: ["lost", "had lost", "have lost", "was losing"],
      correctIndex: 1,
      explanation: "Mất chìa khóa xảy ra trước khi không vào được nhà.",
    },
    {
      id: "p6",
      type: "input",
      question: "The film ___ (start) when we got to the cinema.",
      answers: ["had started", "had already started"],
      explanation: "Phim bắt đầu trước khi chúng tôi tới.",
    },
    {
      id: "p7",
      type: "input",
      question: "He told me he ___ (not / see) that movie.",
      answers: ["hadn't seen", "had not seen"],
      explanation: "Câu tường thuật lùi thì → hadn't seen.",
    },
    {
      id: "p8",
      type: "input",
      question: "___ you ever been abroad before you went to Japan? (trợ động từ)",
      answers: ["had"],
      explanation: "Kinh nghiệm tính đến một thời điểm trong quá khứ → Had you ever been…?",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "Chọn câu có nghĩa 'Tàu đi trước rồi tôi mới tới ga':",
      options: [
        "When I arrived at the station, the train left.",
        "When I arrived at the station, the train had left.",
        "When I had arrived at the station, the train left.",
        "When I arrived at the station, the train was leaving.",
      ],
      correctIndex: 1,
      explanation: "Việc xảy ra trước (tàu đi) dùng had + V3.",
    },
    {
      id: "a2",
      question: "She was nervous because she ___ in public before.",
      options: ["never spoke", "had never spoken", "has never spoken", "never speaks"],
      correctIndex: 1,
      explanation: "Chưa từng có kinh nghiệm tính đến lúc đó.",
    },
    {
      id: "a3",
      question: "If I ___ about the traffic, I would have left earlier.",
      options: ["knew", "had known", "have known", "would know"],
      correctIndex: 1,
      explanation: "Điều kiện loại 3: If + had + V3.",
    },
    {
      id: "a4",
      type: "input",
      question: "Nối câu: She finished the report. Then she went home. → She went home after she ___ the report.",
      answers: ["had finished"],
      explanation: "Việc xảy ra trước → had finished.",
    },
    {
      id: "a5",
      type: "input",
      question: "It was the most beautiful place I had ever ___ (visit).",
      answers: ["visited"],
      explanation: "So sánh nhất + kinh nghiệm trong quá khứ → had ever visited.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "Công thức quá khứ hoàn thành", back: "S + had + V3/ed" },
      { id: "f2", front: "By the time + QKĐ, …", back: "… vế còn lại thường dùng had + V3." },
      { id: "f3", front: "Hai việc trong quá khứ: việc nào dùng had + V3?", back: "Việc xảy ra TRƯỚC." },
      { id: "f4", front: "I had gone to Hanoi last year. Đúng không?", back: "Sai nếu chỉ có một sự kiện → I went to Hanoi last year." },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "When I woke up, my parents ___ to work.",
        options: ["went", "had gone", "have gone", "go"],
        correctIndex: 1,
        explanation: "Bố mẹ đi làm trước khi tôi thức dậy.",
      },
      {
        id: "m2",
        question: "I ___ the book before I saw the film.",
        options: ["had read", "have read", "was reading", "read already"],
        correctIndex: 0,
        explanation: "Đọc sách trước, xem phim sau.",
      },
      {
        id: "m3",
        question: "They ___ married for ten years when they had their first child.",
        options: ["have been", "had been", "were being", "are"],
        correctIndex: 1,
        explanation: "Khoảng thời gian tính đến một mốc trong quá khứ → had been.",
      },
    ],
  },
};

export default topic;
