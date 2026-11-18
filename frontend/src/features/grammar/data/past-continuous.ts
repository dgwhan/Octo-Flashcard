import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "past-continuous",
  level: "A2",
  title: "Past Continuous Tense",
  vietnameseTitle: "Thì Quá khứ tiếp diễn",
  description: "Hành động đang diễn ra tại một thời điểm trong quá khứ, hoặc đang diễn ra thì bị cắt ngang.",
  estimatedMinutes: 20,
  theory: {
    summary:
      "Quá khứ tiếp diễn (was/were + V-ing) vẽ ra 'khung cảnh' đang diễn ra trong quá khứ. Thường đi cùng quá khứ đơn: hành động dài dùng tiếp diễn, hành động ngắn chen vào dùng quá khứ đơn.",
    formulas: [
      {
        type: "affirmative",
        label: "Khẳng định (+)",
        structure: "S + was/were + V-ing",
        exampleEn: "At 8 p.m. yesterday, I was cooking dinner.",
        exampleVi: "Lúc 8 giờ tối qua, tôi đang nấu bữa tối.",
      },
      {
        type: "negative",
        label: "Phủ định (-)",
        structure: "S + wasn't/weren't + V-ing",
        exampleEn: "They weren't listening to the teacher.",
        exampleVi: "Họ đã không nghe giáo viên giảng.",
      },
      {
        type: "interrogative",
        label: "Nghi vấn (?)",
        structure: "Was/Were + S + V-ing?",
        exampleEn: "What were you doing when I called?",
        exampleVi: "Bạn đang làm gì khi tôi gọi?",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Đang diễn ra tại một thời điểm trong quá khứ",
        explanation: "Đi với mốc giờ cụ thể: at 9 o'clock last night, at this time yesterday.",
        exampleEn: "At this time yesterday, we were flying to Seoul.",
        exampleVi: "Giờ này hôm qua, chúng tôi đang bay tới Seoul.",
      },
      {
        id: "u2",
        title: "Bị một hành động ngắn cắt ngang (when)",
        explanation: "Hành động dài: quá khứ tiếp diễn. Hành động chen vào: quá khứ đơn.",
        exampleEn: "I was walking home when it started to rain.",
        exampleVi: "Tôi đang đi bộ về nhà thì trời bắt đầu mưa.",
      },
      {
        id: "u3",
        title: "Hai hành động song song (while)",
        explanation: "Hai việc cùng diễn ra trong một khoảng thời gian.",
        exampleEn: "While Mom was cooking, Dad was cleaning the house.",
        exampleVi: "Trong khi mẹ nấu ăn thì bố dọn nhà.",
      },
    ],
    signals: [
      {
        category: "Dấu hiệu nhận biết",
        words: ["at 7 p.m. yesterday", "at this time last week", "while", "when", "all morning"],
        explanation: "While thường đứng trước vế tiếp diễn; when thường đứng trước vế quá khứ đơn.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "When I arrived, she cooked dinner.",
        correct: "When I arrived, she was cooking dinner.",
        explanation: "Bữa tối đang được nấu dở lúc tôi đến → tiếp diễn. Câu sai mang nghĩa 'tôi đến rồi cô ấy mới nấu'.",
      },
      {
        incorrect: "I was knowing the answer.",
        correct: "I knew the answer.",
        explanation: "Động từ trạng thái (know, like, want, believe) không chia tiếp diễn.",
      },
    ],
    proTips: [
      "Vẽ một đường thẳng dài (tiếp diễn) và một mũi tên ngắn cắt qua nó (quá khứ đơn).",
      "Was đi với I/he/she/it; were đi với you/we/they.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "At 10 p.m. last night, I ___ a film.",
      options: ["watched", "was watching", "were watching", "am watching"],
      correctIndex: 1,
      explanation: "Mốc giờ cụ thể trong quá khứ, chủ ngữ I → was watching.",
    },
    {
      id: "p2",
      question: "They ___ football when the storm started.",
      options: ["played", "was playing", "were playing", "are playing"],
      correctIndex: 2,
      explanation: "Hành động dài bị cắt ngang, chủ ngữ they → were playing.",
    },
    {
      id: "p3",
      question: "While I was reading, my brother ___ to music.",
      options: ["listened", "was listening", "listens", "has listened"],
      correctIndex: 1,
      explanation: "Hai hành động song song với while → cả hai tiếp diễn.",
    },
    {
      id: "p4",
      question: "She ___ her phone while she was running.",
      options: ["dropped", "was dropping", "drops", "were dropping"],
      correctIndex: 0,
      explanation: "Hành động ngắn xen vào → quá khứ đơn.",
    },
    {
      id: "p5",
      question: "What ___ you doing at 6 this morning?",
      options: ["was", "were", "did", "are"],
      correctIndex: 1,
      explanation: "Câu hỏi với you → were.",
    },
    {
      id: "p6",
      type: "input",
      question: "I ___ (sleep) when you called me.",
      answers: ["was sleeping"],
      explanation: "Hành động đang diễn ra bị cuộc gọi cắt ngang.",
    },
    {
      id: "p7",
      type: "input",
      question: "The kids ___ (not / do) their homework at 9 p.m. They were playing games.",
      answers: ["weren't doing", "were not doing"],
      explanation: "Phủ định, chủ ngữ số nhiều → weren't doing.",
    },
    {
      id: "p8",
      type: "input",
      question: "It ___ (rain) all morning yesterday.",
      answers: ["was raining"],
      explanation: "Kéo dài suốt một khoảng thời gian trong quá khứ.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "When the teacher came in, the students ___ .",
      options: ["stood up", "were standing up", "stand up", "had stood"],
      correctIndex: 0,
      explanation: "Giáo viên vào rồi học sinh mới đứng dậy: hai hành động nối tiếp → cả hai quá khứ đơn.",
    },
    {
      id: "a2",
      question: "Chọn câu sai:",
      options: [
        "I was having lunch when he arrived.",
        "She was wanting a new bike.",
        "We were talking while they were eating.",
        "He was driving fast when the police stopped him.",
      ],
      correctIndex: 1,
      explanation: "'Want' là động từ trạng thái, không chia tiếp diễn → She wanted a new bike.",
    },
    {
      id: "a3",
      question: "I ___ my keys while I ___ for the bus.",
      options: [
        "lost / waited",
        "was losing / waited",
        "lost / was waiting",
        "was losing / was waiting",
      ],
      correctIndex: 2,
      explanation: "Mất chìa khóa là việc xảy ra trong lúc đang đợi xe buýt.",
    },
    {
      id: "a4",
      type: "input",
      question: "Nối câu: She was cooking. The lights went out. → The lights went out ___ she was cooking.",
      answers: ["while", "when"],
      explanation: "While/when đứng trước vế tiếp diễn đều được; while tự nhiên hơn.",
    },
    {
      id: "a5",
      type: "input",
      question: "What ___ (he / do) when the accident happened?",
      answers: ["was he doing"],
      explanation: "Câu hỏi tiếp diễn: Was + he + doing.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "Công thức quá khứ tiếp diễn", back: "S + was/were + V-ing" },
      { id: "f2", front: "Hành động dài bị cắt ngang", back: "Dài: was/were + V-ing\nNgắn chen vào: quá khứ đơn (when + V2)" },
      { id: "f3", front: "while hay when trước vế tiếp diễn?", back: "Thường dùng while: While I was working, …" },
      { id: "f4", front: "Có chia 'know' ở tiếp diễn không?", back: "Không. Know, want, like, believe là động từ trạng thái." },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "I ___ TV when the doorbell ___ .",
        options: ["watched / was ringing", "was watching / rang", "watch / rang", "was watching / was ringing"],
        correctIndex: 1,
        explanation: "Đang xem TV (dài) thì chuông reo (ngắn).",
      },
      {
        id: "m2",
        question: "At midnight, we ___ still ___ .",
        options: ["were / studying", "was / studying", "did / study", "are / studying"],
        correctIndex: 0,
        explanation: "Mốc giờ trong quá khứ, chủ ngữ we → were studying.",
      },
      {
        id: "m3",
        question: "While she ___ , her son was playing in the garden.",
        options: ["was gardening", "gardened", "gardens", "has gardened"],
        correctIndex: 0,
        explanation: "Hai hành động song song → cùng tiếp diễn.",
      },
    ],
  },
};

export default topic;
