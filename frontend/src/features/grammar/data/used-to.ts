import type { GrammarTopicInput } from "../types";

const topic: GrammarTopicInput = {
  id: "used-to",
  level: "A2",
  title: "Used to / Be used to / Get used to",
  vietnameseTitle: "Used to: thói quen trong quá khứ",
  description: "Used to + V (đã từng), be used to + V-ing (đã quen với), get used to + V-ing (dần quen với).",
  estimatedMinutes: 20,
  theory: {
    summary:
      "Used to + động từ nguyên mẫu nói về thói quen hoặc trạng thái trong quá khứ, nay không còn. Be used to và get used to lại là chuyện khác: 'quen với' và 'dần quen với', theo sau là V-ing hoặc danh từ.",
    formulas: [
      {
        type: "affirmative",
        label: "Used to (đã từng)",
        structure: "S + used to + V nguyên mẫu",
        exampleEn: "I used to live in the countryside.",
        exampleVi: "Tôi đã từng sống ở nông thôn (giờ không còn).",
      },
      {
        type: "negative",
        label: "Phủ định / nghi vấn",
        structure: "S + didn't use to + V · Did + S + use to + V?",
        exampleEn: "She didn't use to like vegetables. Did you use to play the guitar?",
        exampleVi: "Trước đây cô ấy không thích rau. Bạn từng chơi guitar à?",
      },
      {
        type: "special",
        label: "Be / get used to",
        structure: "S + be/get used to + V-ing / N",
        exampleEn: "I'm used to getting up early. He's getting used to the cold.",
        exampleVi: "Tôi quen dậy sớm rồi. Anh ấy đang dần quen với cái lạnh.",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Thói quen cũ, nay đã bỏ",
        explanation: "So sánh quá khứ với hiện tại.",
        exampleEn: "He used to smoke, but he quit last year.",
        exampleVi: "Anh ấy từng hút thuốc nhưng đã bỏ năm ngoái.",
      },
      {
        id: "u2",
        title: "Trạng thái cũ",
        explanation: "Không chỉ hành động lặp lại mà cả trạng thái: có, là, thích…",
        exampleEn: "There used to be a cinema here.",
        exampleVi: "Ở đây từng có một rạp chiếu phim.",
      },
      {
        id: "u3",
        title: "Quen / dần quen",
        explanation: "Be used to: đã quen. Get used to: quá trình làm quen.",
        exampleEn: "It took me months to get used to driving on the left.",
        exampleVi: "Tôi mất mấy tháng mới quen lái xe bên trái.",
      },
    ],
    signals: [
      {
        category: "Phân biệt nhanh",
        words: ["used to + V", "be used to + V-ing", "get used to + V-ing"],
        explanation: "Trong be/get used to, 'to' là giới từ nên sau nó là V-ing.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "I am used to wake up at 6.",
        correct: "I am used to waking up at 6.",
        explanation: "Be used to + V-ing.",
      },
      {
        incorrect: "Did you used to swim?",
        correct: "Did you use to swim?",
        explanation: "Sau did dùng use (không có d).",
      },
      {
        incorrect: "I use to play tennis every weekend.",
        correct: "I play tennis every weekend.",
        explanation: "Used to chỉ có ở quá khứ. Thói quen hiện tại dùng hiện tại đơn (hoặc usually).",
      },
    ],
    proTips: [
      "Có be/get trước used to → V-ing. Không có → V nguyên mẫu.",
      "Muốn nhấn mạnh 'giờ không còn nữa' thì used to tự nhiên hơn quá khứ đơn.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "When I was a child, I ___ afraid of the dark.",
      options: ["use to be", "used to be", "am used to being", "used to being"],
      correctIndex: 1,
      explanation: "Trạng thái trong quá khứ → used to + V.",
    },
    {
      id: "p2",
      question: "She ___ working at night. She's a nurse.",
      options: ["used to", "is used to", "uses to", "use to"],
      correctIndex: 1,
      explanation: "Đã quen với việc làm đêm (hiện tại) → is used to + V-ing.",
    },
    {
      id: "p3",
      question: "We ___ go camping every summer, but now we're too busy.",
      options: ["used to", "are used to", "get used to", "were used to"],
      correctIndex: 0,
      explanation: "Thói quen cũ đã bỏ → used to + V.",
    },
    {
      id: "p4",
      question: "Did your dad ___ play football?",
      options: ["used to", "use to", "using to", "uses to"],
      correctIndex: 1,
      explanation: "Sau did → use to.",
    },
    {
      id: "p5",
      question: "I can't ___ to this noisy street.",
      options: ["get used", "used", "use", "getting used"],
      correctIndex: 0,
      explanation: "Can't + V nguyên mẫu → get used to.",
    },
    {
      id: "p6",
      type: "input",
      question: "My grandmother ___ (use to / tell) us stories every night.",
      answers: ["used to tell"],
      explanation: "Thói quen trong quá khứ.",
    },
    {
      id: "p7",
      type: "input",
      question: "I'm not used to ___ (eat) spicy food.",
      answers: ["eating"],
      explanation: "Be used to + V-ing.",
    },
    {
      id: "p8",
      type: "input",
      question: "She ___ use to wear glasses. (phủ định, quá khứ)",
      answers: ["didn't", "did not"],
      explanation: "Phủ định: didn't use to.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "Chọn câu đúng nghĩa 'Tôi đang dần quen với khí hậu ở đây':",
      options: [
        "I used to the climate here.",
        "I'm getting used to the climate here.",
        "I'm used to get the climate here.",
        "I get use to the climate here.",
      ],
      correctIndex: 1,
      explanation: "Quá trình làm quen đang diễn ra → be getting used to + N.",
    },
    {
      id: "a2",
      question: "There ___ a big tree in front of my house, but they cut it down.",
      options: ["used to be", "was used to", "used to being", "is used to be"],
      correctIndex: 0,
      explanation: "Trạng thái trong quá khứ với there → there used to be.",
    },
    {
      id: "a3",
      question: "Khi mới sang Anh, anh ấy thấy khó vì chưa quen lái xe bên trái:",
      options: [
        "He wasn't used to driving on the left.",
        "He didn't use to drive on the left.",
        "He wasn't use to drive on the left.",
        "He used not to driving on the left.",
      ],
      correctIndex: 0,
      explanation: "Chưa quen (trạng thái tại thời điểm đó) → wasn't used to + V-ing.",
    },
    {
      id: "a4",
      type: "input",
      question: "It took me a while to get used to ___ (work) from home.",
      answers: ["working"],
      explanation: "Get used to + V-ing.",
    },
    {
      id: "a5",
      type: "input",
      question: "Viết lại: 'I don't play video games any more.' → I ___ play video games.",
      answers: ["used to"],
      explanation: "Trước đây có, giờ không còn → used to.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "used to + ?", back: "used to + V nguyên mẫu\n= đã từng (giờ không còn)" },
      { id: "f2", front: "be used to + ?", back: "be used to + V-ing / N\n= đã quen với" },
      { id: "f3", front: "get used to + ?", back: "get used to + V-ing / N\n= dần quen với" },
      { id: "f4", front: "Phủ định của used to", back: "didn't use to + V" },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "He ___ be very shy, but now he's very confident.",
        options: ["used to", "is used to", "got used to", "uses to"],
        correctIndex: 0,
        explanation: "Trạng thái cũ đã thay đổi → used to + V.",
      },
      {
        id: "m2",
        question: "Don't worry, you'll soon get used to ___ in a big city.",
        options: ["live", "living", "lived", "lives"],
        correctIndex: 1,
        explanation: "Get used to + V-ing.",
      },
      {
        id: "m3",
        question: "I ___ to waking up early. I do it every day.",
        options: ["used", "am used", "use", "get use"],
        correctIndex: 1,
        explanation: "Đã quen (hiện tại) → am used to + V-ing.",
      },
    ],
  },
};

export default topic;
