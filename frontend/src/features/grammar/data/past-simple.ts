import type { GrammarTopicInput } from "../types";

const topic: GrammarTopicInput = {
  id: "past-simple",
  level: "A2",
  title: "Past Simple Tense",
  vietnameseTitle: "Thì Quá khứ đơn",
  description: "Diễn tả hành động đã bắt đầu và hoàn toàn kết thúc tại một thời điểm xác định trong quá khứ.",
  estimatedMinutes: 25,
  theory: {
    summary: "Thì Quá khứ đơn (Past Simple) diễn tả sự việc, hành động đã xảy ra và chấm dứt hoàn toàn trong quá khứ, không còn liên hệ trực tiếp đến hiện tại.",
    formulas: [
      {
        type: "affirmative",
        label: "Khẳng định (+)",
        structure: "S + V2/ed + (O)  hoặc  S + was/were + (N/Adj)",
        exampleEn: "We visited our grandparents in Da Lat last summer.",
        exampleVi: "Chúng tôi đã đến thăm ông bà ở Đà Lạt mùa hè năm ngoái.",
      },
      {
        type: "negative",
        label: "Phủ định (-)",
        structure: "S + did + not (didn't) + V-bare  hoặc  S + was/were + not",
        exampleEn: "She didn't attend the meeting yesterday.",
        exampleVi: "Cô ấy đã không tham dự cuộc họp hôm qua.",
      },
      {
        type: "interrogative",
        label: "Nghi vấn (?)",
        structure: "Did + S + V-bare?  hoặc  Was/Were + S + (N/Adj)?",
        exampleEn: "Did you watch the football match last night?",
        exampleVi: "Bạn có xem trận bóng đá tối qua không?",
      },
    ],
    usages: [
      {
        id: "ps-u1",
        title: "Hành động đã xảy ra và kết thúc trong quá khứ có mốc thời gian rõ ràng",
        explanation: "Thời điểm xảy ra được chỉ rõ hoặc ngầm hiểu trong ngữ cảnh.",
        exampleEn: "Thomas Edison invented the light bulb in 1879.",
        exampleVi: "Thomas Edison đã phát minh ra bóng đèn vào năm 1879.",
      },
      {
        id: "ps-u2",
        title: "Chuỗi các hành động liên tiếp xảy ra trong quá khứ",
        explanation: "Hành động này vừa dứt thì hành động kia tiếp nối ngay (kể chuyện).",
        exampleEn: "He opened the door, turned on the light, and sat down.",
        exampleVi: "Anh ấy mở cửa, bật đèn và ngồi xuống.",
      },
    ],
    signals: [
      {
        category: "Từ chỉ thời gian trong quá khứ",
        words: ["yesterday", "last night/week/month/year", "ago (two days ago)", "in 1995", "when I was young"],
        explanation: "Đều là mốc thời gian đã chấm dứt hoàn toàn.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "Did you saw the new movie yesterday?",
        correct: "Did you see the new movie yesterday?",
        explanation: "Trong câu hỏi hoặc phủ định khi đã có trợ động từ 'did/didn't', động từ chính phải ở dạng nguyên thể (V-bare).",
      },
      {
        incorrect: "He writed a letter to his pen pal.",
        correct: "He wrote a letter to his pen pal.",
        explanation: "'Write' là động từ bất quy tắc (Write -> Wrote -> Written), không thêm đuôi -ed.",
      },
    ],
    proTips: [
      "Cách phát âm đuôi -ed: /id/ sau âm /t, d/ (wanted, decided); /t/ sau âm vô thanh /p, k, f, s, sh, ch/ (stopped, washed); /d/ cho các trường hợp còn lại (played, loved).",
    ],
  },
  practice: [
    {
      id: "past-q1",
      question: "They _______ in Da Nang for five years before moving to Ho Chi Minh City.",
      options: ["lived", "live", "are living", "have lived"],
      correctIndex: 0,
      explanation: "Sự việc sống ở Đà Nẵng đã kết thúc trong quá khứ (vì nay đã chuyển vào TP.HCM) -> dùng thì quá khứ đơn 'lived'.",
    },
    {
      id: "past-q2",
      question: "What time _______ you arrive at the airport last night?",
      options: ["do", "did", "were", "had"],
      correctIndex: 1,
      explanation: "Câu hỏi quá khứ đơn có 'last night' và động từ thường 'arrive' -> dùng trợ động từ 'did'.",
    },
    {
      id: "past-q3",
      question: "She _______ her keys on the dining table yesterday evening.",
      options: ["leave", "left", "leaved", "leaving"],
      correctIndex: 1,
      explanation: "'Leave' là động từ bất quy tắc có dạng quá khứ V2 là 'left'.",
    },
    {
      id: "past-q4",
      question: "We _______ go camping last weekend because the weather was stormy.",
      options: ["didn't", "don't", "wasn't", "weren't"],
      correctIndex: 0,
      explanation: "Phủ định quá khứ đơn với động từ thường 'go' dùng 'didn't go'.",
    },
    {
      id: "past-x1",
      type: "input",
      question: "I ___ (buy) a new bike last month.",
      answers: ["bought"],
      explanation: "Buy là động từ bất quy tắc: bought.",
    },
    {
      id: "past-x2",
      type: "input",
      question: "She ___ (not / come) to class yesterday.",
      answers: ["didn't come", "did not come"],
      explanation: "Phủ định quá khứ: didn't + V nguyên mẫu.",
    },
    {
      id: "past-x3",
      question: "When ___ you start learning English?",
      options: ["do", "did", "were", "have"],
      correctIndex: 1,
      explanation: "Hỏi thời điểm trong quá khứ → did.",
    },
    {
      id: "past-x4",
      type: "input",
      question: "We ___ (stop) at a small café on the way.",
      answers: ["stopped"],
      explanation: "Phụ âm-nguyên âm-phụ âm: gấp đôi p rồi thêm -ed.",
    },
  ],
  advanced: [
    {
      id: "past-a1",
      question: "Chọn câu SAI:",
      options: ["I saw her two days ago.", "Did you went out last night?", "They flew to Seoul in May.", "He didn't eat anything."],
      correctIndex: 1,
      explanation: "Sau did dùng V nguyên mẫu: Did you go out…?",
    },
    {
      id: "past-a2",
      question: "Mozart ___ more than 600 pieces of music.",
      options: ["has written", "wrote", "writes", "had write"],
      correctIndex: 1,
      explanation: "Người đã mất, sự việc hoàn toàn thuộc quá khứ → quá khứ đơn.",
    },
    {
      id: "past-a3",
      question: "I ___ my homework, had dinner and then watched TV.",
      options: ["did", "was doing", "have done", "do"],
      correctIndex: 0,
      explanation: "Chuỗi hành động nối tiếp trong quá khứ.",
    },
    {
      id: "past-a4",
      type: "input",
      question: "The thief ___ (run) away when he saw the police.",
      answers: ["ran"],
      explanation: "Run → ran (bất quy tắc).",
    },
    {
      id: "past-a5",
      type: "input",
      question: "How much ___ the tickets cost? (trợ động từ)",
      answers: ["did"],
      explanation: "Câu hỏi quá khứ: How much did … cost?",
    },
  ],
  review: {
    flashcards: [
      {
        id: "past-fc1",
        front: "3 cách phát âm chuẩn của đuôi -ed trong tiếng Anh?",
        back: "1. /id/: Khi tận cùng bằng /t/ hoặc /d/ (wanted, needed)\n2. /t/: Khi tận cùng bằng âm vô thanh /p, k, f, s, sh, ch/\n3. /d/: Các âm còn lại (called, cleaned)",
        hint: "/id/, /t/, /d/",
      },
      {
        id: "past-fc2",
        front: "Dạng V2 của các động từ bất quy tắc quen thuộc: Buy, Bring, Think, Catch?",
        back: "Buy -> Bought\nBring -> Brought\nThink -> Thought\nCatch -> Caught",
        hint: "Đều có đuôi -ought / -aught",
      },
      {
        id: "past-fx1",
        front: "Phủ định & nghi vấn quá khứ đơn",
        back: "S + didn't + V nguyên mẫu\nDid + S + V nguyên mẫu?",
      },
      {
        id: "past-fx2",
        front: "Dấu hiệu quá khứ đơn",
        back: "yesterday, last week, ago, in 2010, when I was a child",
      },
    ],
    masteryQuiz: [
      {
        id: "past-mq1",
        question: "I _______ a strange noise while I was reading in bed last night.",
        options: ["hear", "heard", "hearing", "have heard"],
        correctIndex: 1,
        explanation: "Quá khứ của động từ bất quy tắc 'hear' là 'heard' /hɜːrd/.",
      },
      {
        id: "past-mx1",
        question: "My grandfather ___ in the army for ten years.",
        options: ["serve", "served", "has served", "serving"],
        correctIndex: 1,
        explanation: "Đã kết thúc trong quá khứ.",
      },
      {
        id: "past-mx2",
        question: "___ they enjoy the concert last night?",
        options: ["Do", "Did", "Were", "Have"],
        correctIndex: 1,
        explanation: "Last night → Did.",
      },
    ],
  },
};

export default topic;
