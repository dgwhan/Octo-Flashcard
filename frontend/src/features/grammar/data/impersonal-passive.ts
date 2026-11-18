import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "impersonal-passive",
  level: "C1",
  title: "Impersonal Passive",
  vietnameseTitle: "Bị động khách quan",
  description: "It is said that… / He is believed to… Cách đưa tin khách quan trong văn viết, báo chí.",
  estimatedMinutes: 25,
  theory: {
    summary:
      "Khi muốn thuật lại ý kiến, tin đồn hay niềm tin chung mà không nêu ai nói, ta dùng bị động khách quan với các động từ say, believe, think, report, expect, know, consider… Có hai cấu trúc tương đương.",
    formulas: [
      {
        type: "affirmative",
        label: "Cấu trúc 1",
        structure: "It + is/was + V3 (said, believed…) + that + S + V",
        exampleEn: "It is said that the house is haunted.",
        exampleVi: "Người ta nói rằng ngôi nhà có ma.",
      },
      {
        type: "affirmative",
        label: "Cấu trúc 2 (cùng thời)",
        structure: "S + is/was + V3 + to V",
        exampleEn: "The house is said to be haunted.",
        exampleVi: "Ngôi nhà được cho là có ma.",
      },
      {
        type: "special",
        label: "Cấu trúc 2 (xảy ra trước)",
        structure: "S + is/was + V3 + to have V3",
        exampleEn: "He is believed to have left the country.",
        exampleVi: "Người ta tin rằng anh ta đã rời khỏi đất nước.",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Cùng thời điểm → to V",
        explanation: "Việc được nói tới xảy ra cùng lúc với lúc 'người ta nói'.",
        exampleEn: "She is thought to be the best candidate.",
        exampleVi: "Cô ấy được cho là ứng viên tốt nhất.",
      },
      {
        id: "u2",
        title: "Xảy ra trước → to have V3",
        explanation: "Việc được nói tới xảy ra trước lúc 'người ta nói'.",
        exampleEn: "The painting is reported to have been stolen in 1990.",
        exampleVi: "Bức tranh được cho là đã bị đánh cắp năm 1990.",
      },
      {
        id: "u3",
        title: "Đang diễn ra → to be V-ing",
        explanation: "Việc được nói tới đang diễn ra.",
        exampleEn: "The president is reported to be considering the plan.",
        exampleVi: "Tổng thống được cho là đang cân nhắc kế hoạch.",
      },
    ],
    signals: [
      {
        category: "Động từ thường dùng",
        words: ["say", "believe", "think", "report", "expect", "know", "consider", "rumour"],
        explanation: "Hay gặp trong tin tức, bài luận học thuật, IELTS Writing Task 2.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "He is said that he is rich.",
        correct: "It is said that he is rich. / He is said to be rich.",
        explanation: "Không trộn hai cấu trúc.",
      },
      {
        incorrect: "She is believed to win the prize last year.",
        correct: "She is believed to have won the prize last year.",
        explanation: "Việc đã xảy ra trước → to have V3.",
      },
    ],
    proTips: [
      "Đổi từ cấu trúc 1 sang 2: lấy chủ ngữ của mệnh đề that đưa lên đầu, động từ thành to V / to have V3.",
      "Cấu trúc 2 thường gọn và tự nhiên hơn trong văn viết.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "It ___ that the company will close next year.",
      options: ["says", "is said", "is saying", "said to"],
      correctIndex: 1,
      explanation: "It + is + V3 + that.",
    },
    {
      id: "p2",
      question: "The singer is said ___ very generous.",
      options: ["be", "to be", "being", "to have"],
      correctIndex: 1,
      explanation: "S + is said + to V (cùng thời).",
    },
    {
      id: "p3",
      question: "The thief is thought ___ through the window.",
      options: ["to escape", "to have escaped", "escaping", "escaped"],
      correctIndex: 1,
      explanation: "Việc tẩu thoát xảy ra trước → to have escaped.",
    },
    {
      id: "p4",
      question: "It ___ that more than 100 people were injured.",
      options: ["reports", "was reported", "is reporting", "reported to"],
      correctIndex: 1,
      explanation: "It + was + V3 + that.",
    },
    {
      id: "p5",
      question: "The new bridge is expected ___ next month.",
      options: ["to open", "opening", "to have opened", "opened"],
      correctIndex: 0,
      explanation: "Kỳ vọng việc trong tương lai → to V.",
    },
    {
      id: "p6",
      type: "input",
      question: "It is ___ (believe) that he has left the country.",
      answers: ["believed"],
      explanation: "It is + V3 + that.",
    },
    {
      id: "p7",
      type: "input",
      question: "She is known ___ (be) an excellent cook.",
      answers: ["to be"],
      explanation: "Cùng thời → to V.",
    },
    {
      id: "p8",
      type: "input",
      question: "The ship is reported to ___ sunk near the coast. (một từ)",
      answers: ["have"],
      explanation: "Đã xảy ra trước → to have + V3.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "Viết lại: 'People believe that he was a spy.' =",
      options: [
        "He is believed to be a spy.",
        "He is believed to have been a spy.",
        "He was believed to be a spy.",
        "It is believed him to have been a spy.",
      ],
      correctIndex: 1,
      explanation: "Believe ở hiện tại, việc là gián điệp ở quá khứ → is believed to have been.",
    },
    {
      id: "a2",
      question: "Viết lại: 'People say that she is working on a new album.' =",
      options: [
        "She is said to work on a new album.",
        "She is said to be working on a new album.",
        "She is said to have worked on a new album.",
        "She says to be working on a new album.",
      ],
      correctIndex: 1,
      explanation: "Đang diễn ra → to be V-ing.",
    },
    {
      id: "a3",
      question: "Viết lại: 'It was thought that the ship had sunk.' =",
      options: [
        "The ship was thought to sink.",
        "The ship was thought to have sunk.",
        "The ship is thought to have sunk.",
        "The ship was thinking to have sunk.",
      ],
      correctIndex: 1,
      explanation: "Thought ở quá khứ, việc chìm xảy ra trước đó → was thought to have sunk.",
    },
    {
      id: "a4",
      type: "input",
      question: "Viết lại: 'People expect that prices will rise.' → Prices are expected ___ rise.",
      answers: ["to"],
      explanation: "S + is/are expected + to V.",
    },
    {
      id: "a5",
      type: "input",
      question: "Viết lại: 'They say the castle was built in 1400.' → The castle is said to have ___ built in 1400.",
      answers: ["been"],
      explanation: "Bị động + xảy ra trước → to have been + V3.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "Hai cấu trúc bị động khách quan", back: "It is said that S + V\nS is said to V / to have V3" },
      { id: "f2", front: "to V hay to have V3?", back: "Cùng thời → to V\nXảy ra trước → to have V3" },
      { id: "f3", front: "Đang diễn ra", back: "S + is said to be V-ing" },
      { id: "f4", front: "He is said that… đúng không?", back: "Sai. Không trộn hai cấu trúc." },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "It is known ___ smoking causes cancer.",
        options: ["to", "that", "which", "as"],
        correctIndex: 1,
        explanation: "It is + V3 + that.",
      },
      {
        id: "m2",
        question: "The suspect is believed ___ the city last night.",
        options: ["to leave", "to have left", "leaving", "left"],
        correctIndex: 1,
        explanation: "Đã xảy ra trước → to have left.",
      },
      {
        id: "m3",
        question: "The minister is reported ___ resign soon.",
        options: ["to", "that", "to have", "being"],
        correctIndex: 0,
        explanation: "Việc trong tương lai → to + V.",
      },
    ],
  },
};

export default topic;
