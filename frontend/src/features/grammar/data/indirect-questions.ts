import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "indirect-questions",
  level: "B2",
  title: "Indirect Questions",
  vietnameseTitle: "Câu hỏi gián tiếp",
  description: "Hỏi lịch sự hơn: Could you tell me where the station is? Trật tự từ trở về như câu khẳng định.",
  estimatedMinutes: 20,
  theory: {
    summary:
      "Câu hỏi gián tiếp lồng một câu hỏi vào sau một cụm mở đầu lịch sự (Could you tell me…, Do you know…, I wonder…). Phần câu hỏi được lồng vào dùng trật tự của câu khẳng định: không đảo trợ động từ, không dùng do/does/did.",
    formulas: [
      {
        type: "interrogative",
        label: "Với từ để hỏi",
        structure: "Cụm mở đầu + Wh- + S + V",
        exampleEn: "Could you tell me where the station is?",
        exampleVi: "Bạn có thể chỉ tôi ga tàu ở đâu không?",
      },
      {
        type: "interrogative",
        label: "Câu hỏi Yes/No",
        structure: "Cụm mở đầu + if/whether + S + V",
        exampleEn: "Do you know if the shop is open?",
        exampleVi: "Bạn có biết cửa hàng còn mở không?",
      },
      {
        type: "special",
        label: "Câu khẳng định",
        structure: "I wonder / I'd like to know + Wh-/if + S + V. (dấu chấm)",
        exampleEn: "I wonder why she left so early.",
        exampleVi: "Tôi thắc mắc tại sao cô ấy về sớm vậy.",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Bỏ do/does/did, chia lại động từ",
        explanation: "Where does he live? → Do you know where he lives?",
        exampleEn: "Can you tell me what time the train leaves?",
        exampleVi: "Bạn có thể cho tôi biết mấy giờ tàu chạy không?",
      },
      {
        id: "u2",
        title: "Đưa be/can/will về sau chủ ngữ",
        explanation: "Where is the bank? → Do you know where the bank is?",
        exampleEn: "Do you know how long the meeting will last?",
        exampleVi: "Bạn có biết cuộc họp kéo dài bao lâu không?",
      },
      {
        id: "u3",
        title: "Dấu câu theo cụm mở đầu",
        explanation: "Cụm mở đầu là câu hỏi thì dùng dấu hỏi; là câu khẳng định (I wonder) thì dùng dấu chấm.",
        exampleEn: "I'd like to know whether you received my email.",
        exampleVi: "Tôi muốn biết bạn đã nhận được email của tôi chưa.",
      },
    ],
    signals: [
      {
        category: "Cụm mở đầu thường gặp",
        words: ["Could you tell me…", "Do you know…", "Do you have any idea…", "I wonder…", "Would you mind telling me…"],
        explanation: "Dùng trong giao tiếp lịch sự, công việc, hỏi đường.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "Can you tell me where is the bank?",
        correct: "Can you tell me where the bank is?",
        explanation: "Không đảo be trong câu hỏi gián tiếp.",
      },
      {
        incorrect: "Do you know what time does the film start?",
        correct: "Do you know what time the film starts?",
        explanation: "Bỏ does, động từ chia lại theo chủ ngữ.",
      },
    ],
    proTips: [
      "Sau từ để hỏi trong câu gián tiếp, viết như câu kể bình thường.",
      "Không có từ để hỏi thì thêm if hoặc whether.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "Could you tell me where ___?",
      options: ["is the post office", "the post office is", "does the post office", "the post office does"],
      correctIndex: 1,
      explanation: "Trật tự câu khẳng định: S + be.",
    },
    {
      id: "p2",
      question: "Do you know what time ___?",
      options: ["does the bus leave", "the bus leaves", "leaves the bus", "the bus does leave"],
      correctIndex: 1,
      explanation: "Bỏ does, chia leaves theo the bus.",
    },
    {
      id: "p3",
      question: "I wonder ___ he will come to the party.",
      options: ["that", "if", "what", "does"],
      correctIndex: 1,
      explanation: "Câu hỏi Yes/No → if/whether.",
    },
    {
      id: "p4",
      question: "Can you tell me how much ___?",
      options: ["this costs", "does this cost", "costs this", "is this cost"],
      correctIndex: 0,
      explanation: "How much does this cost? → how much this costs.",
    },
    {
      id: "p5",
      question: "Do you have any idea why ___ so upset?",
      options: ["is she", "she is", "does she", "she does"],
      correctIndex: 1,
      explanation: "Why is she…? → why she is.",
    },
    {
      id: "p6",
      type: "input",
      question: "Do you know ___ the museum opens on Sundays? (if / that)",
      answers: ["if", "whether"],
      explanation: "Câu hỏi Yes/No → if/whether.",
    },
    {
      id: "p7",
      type: "input",
      question: "Where did she go? → Do you know where she ___?",
      answers: ["went"],
      explanation: "Bỏ did, động từ về quá khứ: went.",
    },
    {
      id: "p8",
      type: "input",
      question: "What is his name? → Could you tell me what his name ___?",
      answers: ["is"],
      explanation: "Be đứng sau chủ ngữ.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "Chọn câu đúng:",
      options: [
        "Would you mind telling me how old are you?",
        "Would you mind telling me how old you are?",
        "Would you mind to tell me how old you are?",
        "Would you mind telling me how old do you are?",
      ],
      correctIndex: 1,
      explanation: "Would you mind + V-ing; trật tự câu kể: you are.",
    },
    {
      id: "a2",
      question: "I'd like to know whether the price ___ breakfast.",
      options: ["does include", "includes", "is include", "include"],
      correctIndex: 1,
      explanation: "Trật tự câu kể, chia theo the price → includes.",
    },
    {
      id: "a3",
      question: "Có bao nhiêu câu SAI? (1) Do you know who wrote this? (2) I wonder where is he. (3) Tell me what do you want.",
      options: ["0", "1", "2", "3"],
      correctIndex: 2,
      explanation: "(1) đúng vì 'who' là chủ ngữ. (2) sai → where he is. (3) sai → what you want.",
    },
    {
      id: "a4",
      type: "input",
      question: "How long have you lived here? → Can I ask how long you ___ lived here?",
      answers: ["have", "'ve"],
      explanation: "Have đứng sau chủ ngữ you.",
    },
    {
      id: "a5",
      type: "input",
      question: "Will it rain tomorrow? → I wonder ___ it will rain tomorrow.",
      answers: ["if", "whether"],
      explanation: "Câu hỏi Yes/No → if/whether + S + will + V.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "Where is the bank? → gián tiếp", back: "Could you tell me where the bank is?" },
      { id: "f2", front: "Câu hỏi Yes/No gián tiếp", back: "… if/whether + S + V\nDo you know if he's coming?" },
      { id: "f3", front: "Có dùng do/does/did không?", back: "Không. Bỏ đi và chia lại động từ chính." },
      { id: "f4", front: "I wonder… kết thúc bằng dấu gì?", back: "Dấu chấm, vì cả câu là câu khẳng định." },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "Do you know where ___?",
        options: ["does she work", "she works", "works she", "she does work at"],
        correctIndex: 1,
        explanation: "Trật tự câu kể.",
      },
      {
        id: "m2",
        question: "Could you tell me ___ this seat is free?",
        options: ["that", "if", "what", "is"],
        correctIndex: 1,
        explanation: "Yes/No → if.",
      },
      {
        id: "m3",
        question: "I have no idea what ___ .",
        options: ["does it mean", "it means", "means it", "is it mean"],
        correctIndex: 1,
        explanation: "What does it mean? → what it means.",
      },
    ],
  },
};

export default topic;
