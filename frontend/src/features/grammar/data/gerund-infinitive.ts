import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "gerund-infinitive",
  level: "B1",
  title: "Gerunds & Infinitives",
  vietnameseTitle: "Danh động từ & Động từ nguyên mẫu",
  description: "Động từ nào theo sau bởi V-ing, động từ nào theo sau bởi to V, và những từ đổi nghĩa.",
  estimatedMinutes: 30,
  theory: {
    summary:
      "Khi một động từ đi sau động từ khác, nó có thể ở dạng V-ing (gerund) hoặc to V (infinitive). Không có quy tắc tuyệt đối, nhưng có những nhóm động từ quen thuộc giúp nhớ nhanh.",
    formulas: [
      {
        type: "affirmative",
        label: "Động từ + V-ing",
        structure: "enjoy · avoid · finish · mind · suggest · keep · practise · consider + V-ing",
        exampleEn: "I enjoy reading. Would you mind closing the window?",
        exampleVi: "Tôi thích đọc sách. Bạn có phiền đóng cửa sổ không?",
      },
      {
        type: "affirmative",
        label: "Động từ + to V",
        structure: "want · decide · hope · plan · agree · refuse · promise · afford + to V",
        exampleEn: "She decided to study abroad.",
        exampleVi: "Cô ấy quyết định đi du học.",
      },
      {
        type: "special",
        label: "Sau giới từ → V-ing",
        structure: "giới từ (in, on, at, of, about, without, before, after…) + V-ing",
        exampleEn: "She is good at drawing. He left without saying goodbye.",
        exampleVi: "Cô ấy giỏi vẽ. Anh ấy đi mà không chào tạm biệt.",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "V-ing làm chủ ngữ",
        explanation: "Khi một hành động đứng đầu câu làm chủ ngữ, dùng V-ing.",
        exampleEn: "Swimming is good for your health.",
        exampleVi: "Bơi lội tốt cho sức khỏe.",
      },
      {
        id: "u2",
        title: "To V chỉ mục đích",
        explanation: "Trả lời câu hỏi 'để làm gì'.",
        exampleEn: "I went to the shop to buy some bread.",
        exampleVi: "Tôi ra cửa hàng để mua bánh mì.",
      },
      {
        id: "u3",
        title: "Động từ đổi nghĩa: remember, stop, try, forget",
        explanation: "stop doing: ngừng làm · stop to do: dừng lại để làm. remember doing: nhớ đã làm · remember to do: nhớ phải làm.",
        exampleEn: "He stopped smoking. / He stopped to smoke.",
        exampleVi: "Anh ấy bỏ thuốc. / Anh ấy dừng lại để hút thuốc.",
      },
    ],
    signals: [
      {
        category: "Hai dạng, nghĩa gần như nhau",
        words: ["like", "love", "hate", "start", "begin", "continue", "prefer"],
        explanation: "Các động từ này đi được với cả V-ing và to V.",
      },
      {
        category: "Động từ + tân ngữ + to V",
        words: ["ask sb to", "tell sb to", "want sb to", "allow sb to", "encourage sb to"],
        explanation: "Yêu cầu ai đó làm gì.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "I look forward to meet you.",
        correct: "I look forward to meeting you.",
        explanation: "'To' trong look forward to là giới từ → V-ing.",
      },
      {
        incorrect: "She suggested to go to the beach.",
        correct: "She suggested going to the beach.",
        explanation: "Suggest + V-ing (hoặc suggest that…).",
      },
      {
        incorrect: "I want that you come.",
        correct: "I want you to come.",
        explanation: "Want + tân ngữ + to V.",
      },
    ],
    proTips: [
      "To V thường hướng tới tương lai (muốn, định, hứa); V-ing thường nói về hoạt động nói chung hoặc đã xảy ra.",
      "Gặp 'to' mà phía trước là look forward / be used to / object to → đó là giới từ, dùng V-ing.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "Do you enjoy ___ to music?",
      options: ["listen", "to listen", "listening", "listened"],
      correctIndex: 2,
      explanation: "Enjoy + V-ing.",
    },
    {
      id: "p2",
      question: "We decided ___ a new car.",
      options: ["buying", "to buy", "buy", "bought"],
      correctIndex: 1,
      explanation: "Decide + to V.",
    },
    {
      id: "p3",
      question: "She's interested in ___ photography.",
      options: ["learn", "to learn", "learning", "learned"],
      correctIndex: 2,
      explanation: "Sau giới từ 'in' → V-ing.",
    },
    {
      id: "p4",
      question: "My parents don't allow me ___ out late.",
      options: ["go", "going", "to go", "went"],
      correctIndex: 2,
      explanation: "Allow + sb + to V.",
    },
    {
      id: "p5",
      question: "___ English every day will help you improve quickly.",
      options: ["Practise", "Practising", "To practising", "Practised"],
      correctIndex: 1,
      explanation: "V-ing làm chủ ngữ.",
    },
    {
      id: "p6",
      type: "input",
      question: "Have you finished ___ (write) your essay?",
      answers: ["writing"],
      explanation: "Finish + V-ing.",
    },
    {
      id: "p7",
      type: "input",
      question: "I hope ___ (see) you again soon.",
      answers: ["to see"],
      explanation: "Hope + to V.",
    },
    {
      id: "p8",
      type: "input",
      question: "He avoided ___ (answer) my question.",
      answers: ["answering"],
      explanation: "Avoid + V-ing.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "I remember ___ the door, but now it's open!",
      options: ["to lock", "locking", "lock", "locked"],
      correctIndex: 1,
      explanation: "Remember doing = nhớ là đã làm (trong quá khứ).",
    },
    {
      id: "a2",
      question: "Please remember ___ the lights before you leave.",
      options: ["turning off", "to turn off", "turn off", "turned off"],
      correctIndex: 1,
      explanation: "Remember to do = nhớ phải làm (việc trong tương lai).",
    },
    {
      id: "a3",
      question: "On the way home, I stopped ___ some milk.",
      options: ["buying", "to buy", "buy", "bought"],
      correctIndex: 1,
      explanation: "Stop to do = dừng lại để làm việc khác.",
    },
    {
      id: "a4",
      type: "input",
      question: "If the printer doesn't work, try ___ (turn) it off and on again.",
      answers: ["turning"],
      explanation: "Try doing = thử một cách để xem có hiệu quả không.",
    },
    {
      id: "a5",
      type: "input",
      question: "I'm looking forward to ___ (hear) from you.",
      answers: ["hearing"],
      explanation: "Look forward to + V-ing.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "enjoy, avoid, finish, mind + ?", back: "+ V-ing" },
      { id: "f2", front: "want, decide, hope, plan + ?", back: "+ to V" },
      { id: "f3", front: "stop doing vs stop to do", back: "stop doing: ngừng làm việc đó\nstop to do: dừng lại để làm việc khác" },
      { id: "f4", front: "Sau giới từ dùng dạng gì?", back: "V-ing: good at drawing, without saying" },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "Would you mind ___ a little quieter?",
        options: ["to be", "being", "be", "been"],
        correctIndex: 1,
        explanation: "Mind + V-ing.",
      },
      {
        id: "m2",
        question: "They agreed ___ the meeting until Friday.",
        options: ["postponing", "to postpone", "postpone", "postponed"],
        correctIndex: 1,
        explanation: "Agree + to V.",
      },
      {
        id: "m3",
        question: "The teacher told us ___ quietly.",
        options: ["work", "working", "to work", "worked"],
        correctIndex: 2,
        explanation: "Tell + sb + to V.",
      },
    ],
  },
};

export default topic;
