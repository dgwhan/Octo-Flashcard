import type { GrammarTopicInput } from "../types";

const topic: GrammarTopicInput = {
  id: "reported-speech",
  level: "B2",
  title: "Reported Speech",
  vietnameseTitle: "Câu tường thuật (Gián tiếp)",
  description: "Quy tắc lùi thì, chuyển đổi đại từ, thời gian và địa điểm; các động từ tường thuật đặc biệt (warn, advise, suggest, apologize).",
  estimatedMinutes: 20,
  theory: {
    summary: "Câu gián tiếp (Reported Speech) dùng để thuật lại lời người khác nói mà không dùng nguyên văn trong dấu ngoặc kép. Cần áp dụng quy tắc 3 bước: Lùi thì + Đổi đại từ + Đổi từ chỉ thời gian và nơi chốn.",
    formulas: [
      {
        type: "special",
        label: "Bảng lùi thì cơ bản",
        structure: "Hiện tại đơn -> Quá khứ đơn | Hiện tại tiếp diễn -> Quá khứ tiếp diễn | Hiện tại hoàn thành -> Quá khứ hoàn thành | Will -> Would | Can -> Could",
        exampleEn: "Direct: 'I am learning Spanish.' -> He said he was learning Spanish.",
        exampleVi: "Trực tiếp: 'Tôi đang học tiếng Tây Ban Nha.' -> Anh ấy nói rằng anh ấy đang học tiếng Tây Ban Nha.",
      },
      {
        type: "special",
        label: "Đổi từ chỉ thời gian & nơi chốn",
        structure: "now -> then | today -> that day | tomorrow -> the next day | yesterday -> the day before | here -> there | this -> that",
        exampleEn: "Direct: 'I will call you tomorrow.' -> She said she would call me the next day.",
        exampleVi: "Trực tiếp: 'Tôi sẽ gọi bạn vào ngày mai.' -> Cô ấy nói cô ấy sẽ gọi cho tôi vào ngày hôm sau.",
      },
    ],
    usages: [
      {
        id: "rs-u1",
        title: "Các động từ tường thuật đặc biệt",
        explanation: "Suggest + V-ing (gợi ý), Apologize for + V-ing (xin lỗi), Warn someone not to V (cảnh báo), Advise someone to V (khuyên).",
        exampleEn: "He advised me to consult a doctor immediately.",
        exampleVi: "Anh ấy khuyên tôi nên đi khám bác sĩ ngay.",
      },
    ],
    signals: [
      {
        category: "Động từ dẫn truyền",
        words: ["said (that)", "told someone (that)", "asked", "suggested", "wondered"],
        explanation: "Bắt đầu mệnh đề tường thuật.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "He said me that he was tired.",
        correct: "He told me that he was tired. / He said that he was tired.",
        explanation: "'Said to someone' hoặc 'Told someone', không dùng 'Said me'.",
      },
    ],
    proTips: [
      "KHÔNG lùi thì khi câu nói trực tiếp diễn tả một chân lý khoa học hoặc sự thật hiển nhiên luôn đúng (ví dụ: The teacher said that the Earth moves around the Sun).",
    ],
  },
  practice: [
    {
      id: "rs-q1",
      question: "'I saw Linda at the library yesterday,' Kevin told me.",
      options: [
        "Kevin told me that he saw Linda at the library yesterday.",
        "Kevin told me that he had seen Linda at the library the day before.",
        "Kevin told me that he has seen Linda at the library that day.",
        "Kevin told to me that he had seen Linda.",
      ],
      correctIndex: 1,
      explanation: "Thì quá khứ đơn 'saw' lùi thành quá khứ hoàn thành 'had seen', 'yesterday' đổi thành 'the day before'.",
    },
    {
      id: "rs-q2",
      question: "The police officer warned the driver _______ so fast in the residential area.",
      options: ["not driving", "don't drive", "not to drive", "to not drive"],
      correctIndex: 2,
      explanation: "Cấu trúc cảnh báo: Warn someone (not) to V -> 'warned the driver not to drive'.",
    },
    {
      id: "rs-q3",
      question: "Our geography teacher said that Mount Everest _______ the highest peak in the world.",
      options: ["was", "is", "had been", "is being"],
      correctIndex: 1,
      explanation: "Sự thật hiển nhiên và chân lý địa lý không thay đổi nên giữ nguyên thì hiện tại đơn 'is', không lùi thì.",
    },
    {
      id: "rs-x1",
      type: "input",
      question: "'I am tired.' → She said she ___ tired.",
      answers: ["was"],
      explanation: "Lùi thì: am → was.",
    },
    {
      id: "rs-x2",
      type: "input",
      question: "'I will call you.' → He said he ___ call me.",
      answers: ["would"],
      explanation: "Will → would.",
    },
    {
      id: "rs-x3",
      question: "'Do you like pizza?' → She asked me ___ I liked pizza.",
      options: ["that", "if", "what", "do"],
      correctIndex: 1,
      explanation: "Câu hỏi Yes/No → if/whether.",
    },
    {
      id: "rs-x4",
      question: "'Where do you live?' → He asked me where ___.",
      options: ["do I live", "I lived", "did I live", "I live did"],
      correctIndex: 1,
      explanation: "Câu hỏi tường thuật: trật tự câu kể, lùi thì.",
    },
    {
      id: "rs-x5",
      type: "input",
      question: "'Don't be late.' → The teacher told us ___ to be late.",
      answers: ["not"],
      explanation: "Mệnh lệnh phủ định: told sb not to V.",
    },
  ],
  advanced: [
    {
      id: "rs-a1",
      question: "'I saw him yesterday.' → She said she ___ him the day before.",
      options: ["saw", "had seen", "has seen", "sees"],
      correctIndex: 1,
      explanation: "Quá khứ đơn → quá khứ hoàn thành; yesterday → the day before.",
    },
    {
      id: "rs-a2",
      question: "'You should see a doctor.' → She ___ me to see a doctor.",
      options: ["said", "advised", "suggested", "told that"],
      correctIndex: 1,
      explanation: "Advise sb to V.",
    },
    {
      id: "rs-a3",
      question: "'Let's go to the beach.' → He suggested ___ to the beach.",
      options: ["to go", "going", "we going", "go"],
      correctIndex: 1,
      explanation: "Suggest + V-ing (hoặc suggest that we go).",
    },
    {
      id: "rs-a4",
      type: "input",
      question: "'I'm sorry I broke the vase.' → She apologised for ___ the vase.",
      answers: ["breaking", "having broken"],
      explanation: "Apologise for + V-ing.",
    },
    {
      id: "rs-a5",
      type: "input",
      question: "'Can you help me?' → He asked me ___ I could help him.",
      answers: ["if", "whether"],
      explanation: "Câu hỏi Yes/No → if/whether.",
    },
  ],
  review: {
    flashcards: [
      {
        id: "rs-fc1",
        front: "Trường hợp nào NGOẠI LỆ không cần lùi thì trong câu tường thuật?",
        back: "1. Câu trực tiếp là chân lý, sự thật khoa học hiển nhiên (The sun rises in the east).\n2. Động từ dẫn ở thì hiện tại (He says that...).\n3. Câu điều kiện loại 2 hoặc loại 3.",
        hint: "Chân lý tự nhiên, động từ dẫn ở hiện tại",
      },
      {
        id: "rs-fx1",
        front: "Lùi thì trong câu tường thuật",
        back: "HTĐ → QKĐ\nHTHT / QKĐ → QKHT\nwill → would, can → could",
      },
      {
        id: "rs-fx2",
        front: "Đổi trạng từ thời gian",
        back: "now → then\ntoday → that day\nyesterday → the day before\ntomorrow → the next day",
      },
      {
        id: "rs-fx3",
        front: "Tường thuật mệnh lệnh",
        back: "told sb (not) to V",
      },
    ],
    masteryQuiz: [
      {
        id: "rs-mq1",
        question: "Jack suggested _______ for a picnic by the lake this weekend.",
        options: ["to go", "going", "that we go to", "go"],
        correctIndex: 1,
        explanation: "Cấu trúc với suggest: Suggest + V-ing -> 'suggested going'.",
      },
      {
        id: "rs-mx1",
        question: "'I have finished.' → He said he ___.",
        options: ["has finished", "had finished", "finished", "finishes"],
        correctIndex: 1,
        explanation: "Hiện tại hoàn thành → quá khứ hoàn thành.",
      },
      {
        id: "rs-mx2",
        question: "'Close the door.' → She told me ___ the door.",
        options: ["close", "to close", "closing", "closed"],
        correctIndex: 1,
        explanation: "Told sb to V.",
      },
    ],
  },
};

export default topic;
