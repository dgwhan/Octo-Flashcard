import type { GrammarTopicInput } from "../types";

const topic: GrammarTopicInput = {
  id: "present-perfect-continuous",
  level: "B1",
  title: "Present Perfect Continuous",
  vietnameseTitle: "Thì Hiện tại hoàn thành tiếp diễn",
  description: "Hành động bắt đầu trong quá khứ, kéo dài liên tục đến bây giờ, nhấn mạnh quá trình.",
  estimatedMinutes: 25,
  theory: {
    summary:
      "Have/has been + V-ing nhấn mạnh quá trình kéo dài từ quá khứ đến hiện tại (và có thể còn tiếp). Hiện tại hoàn thành thường nhấn mạnh kết quả hoặc số lần; hoàn thành tiếp diễn nhấn mạnh 'đã làm bao lâu'.",
    formulas: [
      {
        type: "affirmative",
        label: "Khẳng định (+)",
        structure: "S + have/has been + V-ing",
        exampleEn: "I have been studying English for three years.",
        exampleVi: "Tôi đã học tiếng Anh được ba năm (và vẫn đang học).",
      },
      {
        type: "negative",
        label: "Phủ định (-)",
        structure: "S + haven't/hasn't been + V-ing",
        exampleEn: "She hasn't been sleeping well lately.",
        exampleVi: "Dạo này cô ấy ngủ không ngon.",
      },
      {
        type: "interrogative",
        label: "Nghi vấn (?)",
        structure: "How long + have/has + S + been + V-ing?",
        exampleEn: "How long have you been waiting?",
        exampleVi: "Bạn đợi bao lâu rồi?",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Kéo dài đến hiện tại (for / since)",
        explanation: "For + khoảng thời gian; since + mốc thời gian.",
        exampleEn: "It has been raining since this morning.",
        exampleVi: "Trời mưa từ sáng đến giờ.",
      },
      {
        id: "u2",
        title: "Giải thích kết quả nhìn thấy được ngay bây giờ",
        explanation: "Hành động vừa mới dừng nhưng để lại dấu vết.",
        exampleEn: "Your eyes are red. Have you been crying?",
        exampleVi: "Mắt bạn đỏ. Bạn vừa khóc à?",
      },
      {
        id: "u3",
        title: "So với hiện tại hoàn thành",
        explanation: "Hoàn thành: bao nhiêu, xong chưa. Hoàn thành tiếp diễn: bao lâu, quá trình.",
        exampleEn: "I've read 50 pages. / I've been reading for two hours.",
        exampleVi: "Tôi đã đọc 50 trang. / Tôi đã đọc suốt hai tiếng.",
      },
    ],
    signals: [
      {
        category: "Dấu hiệu nhận biết",
        words: ["for", "since", "all day", "how long", "lately", "recently"],
        explanation: "Đặc biệt hay đi với 'How long…?' và 'all day/all morning'.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "I have been knowing him for years.",
        correct: "I have known him for years.",
        explanation: "Động từ trạng thái (know, own, believe) dùng hiện tại hoàn thành, không dùng tiếp diễn.",
      },
      {
        incorrect: "I am waiting here for an hour.",
        correct: "I have been waiting here for an hour.",
        explanation: "Kéo dài từ quá khứ đến giờ với 'for' → hoàn thành tiếp diễn, không dùng hiện tại tiếp diễn.",
      },
    ],
    proTips: [
      "Câu trả lời cho 'How long…?' gần như luôn là hoàn thành tiếp diễn (trừ động từ trạng thái).",
      "Có con số kết quả (3 cốc, 5 email) → quay về hiện tại hoàn thành.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "She ___ for this company since 2018.",
      options: ["works", "is working", "has been working", "worked"],
      correctIndex: 2,
      explanation: "Since + mốc, vẫn tiếp tục → has been working.",
    },
    {
      id: "p2",
      question: "How long ___ you ___ for the bus?",
      options: ["are / waiting", "have / been waiting", "did / wait", "have / waited"],
      correctIndex: 1,
      explanation: "How long + quá trình đến hiện tại → have you been waiting.",
    },
    {
      id: "p3",
      question: "I'm tired because I ___ all day.",
      options: ["have been working", "worked", "work", "have worked twice"],
      correctIndex: 0,
      explanation: "Giải thích trạng thái hiện tại bằng một quá trình kéo dài.",
    },
    {
      id: "p4",
      question: "He ___ three cups of coffee this morning.",
      options: ["has been drinking", "has drunk", "is drinking", "drinks"],
      correctIndex: 1,
      explanation: "Có số lượng (three cups) → hiện tại hoàn thành.",
    },
    {
      id: "p5",
      question: "I ___ this phone for five years.",
      options: ["have been having", "have had", "am having", "had been having"],
      correctIndex: 1,
      explanation: "'Have' (sở hữu) là động từ trạng thái → have had.",
    },
    {
      id: "p6",
      type: "input",
      question: "It ___ (snow) since last night.",
      answers: ["has been snowing"],
      explanation: "Since + mốc, kéo dài đến giờ.",
    },
    {
      id: "p7",
      type: "input",
      question: "They ___ (learn) Japanese for six months.",
      answers: ["have been learning", "'ve been learning"],
      explanation: "For + khoảng thời gian, quá trình còn tiếp tục.",
    },
    {
      id: "p8",
      type: "input",
      question: "Your hands are dirty. What ___ you been doing?",
      answers: ["have"],
      explanation: "Dấu vết còn lại → What have you been doing?",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "Chọn câu tự nhiên nhất: 'Tôi đã viết xong ba bài báo hôm nay.'",
      options: [
        "I've been writing three articles today.",
        "I've written three articles today.",
        "I'm writing three articles today.",
        "I wrote three articles since today.",
      ],
      correctIndex: 1,
      explanation: "Kết quả đếm được, đã xong → hiện tại hoàn thành.",
    },
    {
      id: "a2",
      question: "The ground is wet. It ___ .",
      options: ["has rained", "has been raining", "rains", "is raining since"],
      correctIndex: 1,
      explanation: "Trời vừa mưa (quá trình) để lại dấu vết → has been raining.",
    },
    {
      id: "a3",
      question: "Chọn câu SAI:",
      options: [
        "She has been living here since 2015.",
        "She has lived here since 2015.",
        "She has been belonging to the club since 2015.",
        "She has been teaching for ten years.",
      ],
      correctIndex: 2,
      explanation: "'Belong' là động từ trạng thái → has belonged.",
    },
    {
      id: "a4",
      type: "input",
      question: "Nối câu: I started learning the piano two years ago. I'm still learning. → I ___ the piano for two years.",
      answers: ["have been learning", "'ve been learning"],
      explanation: "Bắt đầu trong quá khứ, vẫn tiếp tục → have been learning.",
    },
    {
      id: "a5",
      type: "input",
      question: "We've been waiting ___ 9 o'clock. (for / since)",
      answers: ["since"],
      explanation: "9 o'clock là mốc thời gian → since.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "Công thức HTHT tiếp diễn", back: "S + have/has been + V-ing" },
      { id: "f2", front: "Nhấn mạnh 'bao lâu' hay 'bao nhiêu'?", back: "Bao lâu (quá trình) → have been V-ing\nBao nhiêu (kết quả) → have V3" },
      { id: "f3", front: "for hay since + 2019?", back: "since 2019 (mốc)\nfor 5 years (khoảng)" },
      { id: "f4", front: "I have been knowing… đúng không?", back: "Sai. Know là động từ trạng thái → I have known…" },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "Sorry I'm late. ___ long?",
        options: ["Are you waiting", "Have you been waiting", "Did you wait", "Do you wait"],
        correctIndex: 1,
        explanation: "Hỏi quá trình đợi kéo dài đến giờ.",
      },
      {
        id: "m2",
        question: "He's out of breath because he ___ .",
        options: ["has run", "has been running", "runs", "ran since"],
        correctIndex: 1,
        explanation: "Dấu vết của một hoạt động kéo dài vừa kết thúc.",
      },
      {
        id: "m3",
        question: "I ___ her since we were at school.",
        options: ["have been knowing", "have known", "know", "am knowing"],
        correctIndex: 1,
        explanation: "Know không dùng tiếp diễn → have known.",
      },
    ],
  },
};

export default topic;
