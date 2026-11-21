import type { GrammarTopicInput } from "../types";

const topic: GrammarTopicInput = {
  id: "comparatives-superlatives",
  level: "B1",
  title: "Comparatives & Superlatives",
  vietnameseTitle: "So sánh hơn & So sánh nhất",
  description: "Quy tắc so sánh tính từ và trạng từ ngắn/dài, các dạng bất quy tắc và cấu trúc so sánh bằng/càng ngày càng.",
  estimatedMinutes: 20,
  theory: {
    summary: "So sánh hơn dùng để so sánh giữa 2 đối tượng (Adj-er than / more Adj than). So sánh nhất dùng để so sánh một đối tượng với toàn bộ tập thể từ 3 đối tượng trở lên (the Adj-est / the most Adj).",
    formulas: [
      {
        type: "affirmative",
        label: "So sánh hơn (Tính từ ngắn)",
        structure: "S1 + be + Adj-er + than + S2",
        exampleEn: "This laptop is faster than my old one.",
        exampleVi: "Chiếc máy tính xách tay này nhanh hơn chiếc cũ của tôi.",
      },
      {
        type: "affirmative",
        label: "So sánh hơn (Tính từ dài)",
        structure: "S1 + be + more + Adj + than + S2",
        exampleEn: "Health is more important than wealth.",
        exampleVi: "Sức khỏe quan trọng hơn tiền tài.",
      },
      {
        type: "special",
        label: "So sánh nhất",
        structure: "S + be + the + Adj-est / the most + Adj",
        exampleEn: "Mount Everest is the highest mountain in the world.",
        exampleVi: "Đỉnh Everest là ngọn núi cao nhất trên thế giới.",
      },
    ],
    usages: [
      {
        id: "cs-u1",
        title: "Các tính từ bất quy tắc đặc biệt",
        explanation: "Good -> Better -> The best; Bad -> Worse -> The worst; Far -> Farther/Further -> The farthest/furthest.",
        exampleEn: "Her presentation was much better than yesterday's.",
        exampleVi: "Bài thuyết trình của cô ấy tốt hơn nhiều so với hôm qua.",
      },
    ],
    signals: [
      {
        category: "Từ nhận diện",
        words: ["than (trong so sánh hơn)", "the (trong so sánh nhất)", "as... as (so sánh bằng)"],
        explanation: "Từ khóa chính báo hiệu cấu trúc so sánh.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "She is more taller than her sister.",
        correct: "She is taller than her sister.",
        explanation: "Tính từ ngắn 'tall' đã thêm đuôi -er thì tuyệt đối không thêm 'more' đằng trước.",
      },
    ],
    proTips: [
      "Tính từ 2 âm tiết tận cùng bằng -y (happy, easy, noisy, heavy) được coi như tính từ ngắn: đổi y thành i rồi thêm -er/-est (happier, the happiest).",
    ],
  },
  practice: [
    {
      id: "cs-q1",
      question: "This exercise is _______ than the one we did yesterday.",
      options: ["more easy", "easier", "easiest", "most easy"],
      correctIndex: 1,
      explanation: "'Easy' kết thúc bằng 'y' nên coi là tính từ ngắn -> đổi thành 'easier'.",
    },
    {
      id: "cs-q2",
      question: "Of the three candidates, Elena is clearly the _______ qualified for the position.",
      options: ["more", "most", "better", "best of"],
      correctIndex: 1,
      explanation: "So sánh giữa 3 người (từ 3 đối tượng trở lên) dùng so sánh nhất: 'the most qualified'.",
    },
    {
      id: "cs-q3",
      question: "The air pollution in this city is getting _______ than ever before.",
      options: ["worse", "badder", "worst", "more bad"],
      correctIndex: 0,
      explanation: "'Bad' là tính từ bất quy tắc, dạng so sánh hơn là 'worse'.",
    },
    {
      id: "cs-x1",
      type: "input",
      question: "This bag is ___ (heavy) than that one.",
      answers: ["heavier"],
      explanation: "Tính từ tận cùng y → đổi y thành i + er.",
    },
    {
      id: "cs-x2",
      type: "input",
      question: "It's the ___ (good) restaurant in town.",
      answers: ["best"],
      explanation: "Good → better → best.",
    },
    {
      id: "cs-x3",
      question: "My new phone is ___ than my old one.",
      options: ["more expensive", "expensiver", "most expensive", "more expensiver"],
      correctIndex: 0,
      explanation: "Tính từ dài → more + adj.",
    },
    {
      id: "cs-x4",
      question: "She is ___ student in the class.",
      options: ["the tallest", "taller", "the most tall", "tallest than"],
      correctIndex: 0,
      explanation: "So sánh nhất với tính từ ngắn → the + adj-est.",
    },
    {
      id: "cs-x5",
      type: "input",
      question: "Today is ___ (hot) than yesterday.",
      answers: ["hotter"],
      explanation: "Phụ âm-nguyên âm-phụ âm → gấp đôi phụ âm: hotter.",
    },
  ],
  advanced: [
    {
      id: "cs-a1",
      question: "The ___ you practise, the ___ you get.",
      options: ["more / better", "most / best", "much / good", "more / good"],
      correctIndex: 0,
      explanation: "So sánh kép: The + so sánh hơn…, the + so sánh hơn…",
    },
    {
      id: "cs-a2",
      question: "This test was ___ easier than I expected.",
      options: ["very", "much", "more", "most"],
      correctIndex: 1,
      explanation: "Nhấn mạnh so sánh hơn dùng much/far/a lot, không dùng very.",
    },
    {
      id: "cs-a3",
      question: "Her English is not ___ good ___ her sister's.",
      options: ["as / as", "so / than", "more / than", "as / than"],
      correctIndex: 0,
      explanation: "So sánh không bằng: not as/so + adj + as.",
    },
    {
      id: "cs-a4",
      type: "input",
      question: "Winter is coming. It's getting ___ and colder. (cold)",
      answers: ["colder"],
      explanation: "So sánh tăng dần: colder and colder.",
    },
    {
      id: "cs-a5",
      type: "input",
      question: "He drives ___ (carefully) than his brother.",
      answers: ["more carefully"],
      explanation: "Trạng từ dài → more + adv.",
    },
  ],
  review: {
    flashcards: [
      {
        id: "cs-fc1",
        front: "Dạng so sánh hơn và so sánh nhất của: Good, Bad, Little, Many/Much?",
        back: "- Good -> Better -> The best\n- Bad -> Worse -> The worst\n- Little -> Less -> The least\n- Many/Much -> More -> The most",
        hint: "Bảng tính từ bất quy tắc",
      },
      {
        id: "cs-fx1",
        front: "So sánh hơn tính từ ngắn / dài",
        back: "ngắn: adj-er + than\ndài: more + adj + than",
      },
      {
        id: "cs-fx2",
        front: "Bất quy tắc: good, bad, far",
        back: "good → better → best\nbad → worse → worst\nfar → farther/further → farthest/furthest",
      },
      {
        id: "cs-fx3",
        front: "So sánh kép",
        back: "The + so sánh hơn…, the + so sánh hơn…\nThe sooner, the better.",
      },
    ],
    masteryQuiz: [
      {
        id: "cs-mq1",
        question: "Nothing is _______ than peace of mind.",
        options: ["preciouser", "more precious", "the most precious", "as precious"],
        correctIndex: 1,
        explanation: "'Precious' là tính từ dài có 2 âm tiết không tận cùng bằng y -> dùng 'more precious than'.",
      },
      {
        id: "cs-mx1",
        question: "This is the ___ book I've ever read.",
        options: ["interesting", "more interesting", "most interesting", "interestingest"],
        correctIndex: 2,
        explanation: "So sánh nhất tính từ dài → the most.",
      },
      {
        id: "cs-mx2",
        question: "My house is ___ from the station than yours.",
        options: ["far", "farther", "farthest", "more far"],
        correctIndex: 1,
        explanation: "Far → farther/further.",
      },
    ],
  },
};

export default topic;
