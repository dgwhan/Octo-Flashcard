import type { GrammarTopicInput } from "../types";

const topic: GrammarTopicInput = {
  id: "passive-voice",
  level: "B1",
  title: "Passive Voice",
  vietnameseTitle: "Câu bị động",
  description: "Biến đổi câu chủ động sang bị động: nhấn mạnh vào đối tượng chịu tác động hoặc khi người thực hiện không xác định.",
  estimatedMinutes: 25,
  theory: {
    summary: "Câu bị động (Passive Voice) được dùng khi muốn nhấn mạnh vào bản thân hành động hoặc đối tượng chịu tác động, hơn là người thực hiện hành động đó.",
    formulas: [
      {
        type: "affirmative",
        label: "Công thức tổng quát",
        structure: "S + be (chia theo thì) + V3/ed + (by O)",
        exampleEn: "The telephone was invented by Alexander Graham Bell.",
        exampleVi: "Điện thoại được phát minh bởi Alexander Graham Bell.",
      },
      {
        type: "special",
        label: "Bị động thì Hiện tại đơn",
        structure: "S + am/is/are + V3/ed",
        exampleEn: "English is spoken all over the world.",
        exampleVi: "Tiếng Anh được nói trên khắp thế giới.",
      },
      {
        type: "special",
        label: "Bị động thì Quá khứ đơn",
        structure: "S + was/were + V3/ed",
        exampleEn: "This bridge was built in 1990.",
        exampleVi: "Cây cầu này được xây dựng vào năm 1990.",
      },
      {
        type: "special",
        label: "Bị động thì Hiện tại hoàn thành",
        structure: "S + have/has + been + V3/ed",
        exampleEn: "A new shopping mall has just been opened.",
        exampleVi: "Một trung tâm thương mại mới vừa được khai trương.",
      },
    ],
    usages: [
      {
        id: "pv-u1",
        title: "Khi không biết hoặc không cần thiết nhắc tới người thực hiện",
        explanation: "Người gây ra hành động là ai không quan trọng bằng kết quả sự việc.",
        exampleEn: "My bicycle was stolen last night.",
        exampleVi: "Xe đạp của tôi đã bị trộm mất tối qua (không biết ai lấy).",
      },
    ],
    signals: [
      {
        category: "Dấu hiệu nhận biết",
        words: ["by + tác nhân (by the teacher, by experts)", "đối tượng nhận hành động đứng đầu câu"],
        explanation: "Chủ ngữ không tự thực hiện hành động mà chịu tác động từ bên ngoài.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "The car was disappeared last night.",
        correct: "The car disappeared last night.",
        explanation: "Các nội động từ (Intransitive verbs: disappear, happen, occur, arrive, die) không có tân ngữ nên KHÔNG BAO GIỜ chia ở thể bị động.",
      },
    ],
    proTips: [
      "Có thể lược bỏ 'by O' khi tân ngữ là đại từ mơ hồ: by people, by someone, by them, by everyone.",
    ],
  },
  practice: [
    {
      id: "pv-q1",
      question: "The famous novel 'Harry Potter' _______ by J.K. Rowling.",
      options: ["wrote", "was written", "is writing", "has written"],
      correctIndex: 1,
      explanation: "Cuốn tiểu thuyết được viết trong quá khứ bởi tác giả -> bị động quá khứ đơn: 'was written'.",
    },
    {
      id: "pv-q2",
      question: "Thousands of new jobs _______ by renewable energy industries every year.",
      options: ["are created", "create", "is created", "were creating"],
      correctIndex: 0,
      explanation: "'Thousands of new jobs' là danh từ số nhiều, diễn ra hàng năm (hiện tại đơn) -> 'are created'.",
    },
    {
      id: "pv-q3",
      question: "A serious car accident _______ on the highway this morning.",
      options: ["was happened", "happened", "is happened", "has been happened"],
      correctIndex: 1,
      explanation: "'Happen' là nội động từ, không bao giờ dùng dạng bị động -> dùng chủ động 'happened'.",
    },
    {
      id: "pv-x1",
      type: "input",
      question: "English ___ (speak) all over the world.",
      answers: ["is spoken"],
      explanation: "Bị động hiện tại đơn: is + V3.",
    },
    {
      id: "pv-x2",
      type: "input",
      question: "The bridge ___ (build) in 1990.",
      answers: ["was built"],
      explanation: "Bị động quá khứ đơn: was + V3.",
    },
    {
      id: "pv-x3",
      question: "The letters ___ every morning.",
      options: ["deliver", "are delivered", "delivered", "are delivering"],
      correctIndex: 1,
      explanation: "Thư được giao (bị động, hiện tại đơn).",
    },
    {
      id: "pv-x4",
      question: "My car ___ at the moment.",
      options: ["is repaired", "is being repaired", "repairs", "has repaired"],
      correctIndex: 1,
      explanation: "Bị động hiện tại tiếp diễn: is being + V3.",
    },
    {
      id: "pv-x5",
      type: "input",
      question: "The results will ___ (announce) tomorrow.",
      answers: ["be announced"],
      explanation: "Bị động tương lai: will be + V3.",
    },
  ],
  advanced: [
    {
      id: "pv-a1",
      question: "The house ___ since last year.",
      options: ["hasn't been cleaned", "didn't clean", "isn't cleaned", "hasn't cleaned"],
      correctIndex: 0,
      explanation: "Bị động hiện tại hoàn thành: has been + V3.",
    },
    {
      id: "pv-a2",
      question: "Viết lại: 'Someone stole my bike.' =",
      options: ["My bike stole.", "My bike was stolen.", "My bike was stealing.", "My bike has stolen."],
      correctIndex: 1,
      explanation: "Bỏ 'someone' (không cần by), bị động quá khứ.",
    },
    {
      id: "pv-a3",
      question: "The meeting ___ until next week.",
      options: ["has put off", "has been put off", "has putting off", "put off"],
      correctIndex: 1,
      explanation: "Cụm động từ ở bị động giữ nguyên giới từ: has been put off.",
    },
    {
      id: "pv-a4",
      type: "input",
      question: "The project must ___ (finish) by Friday.",
      answers: ["be finished"],
      explanation: "Modal + be + V3.",
    },
    {
      id: "pv-a5",
      type: "input",
      question: "I was ___ (give) a present by my friends.",
      answers: ["given"],
      explanation: "Bị động với tân ngữ người: I was given…",
    },
  ],
  review: {
    flashcards: [
      {
        id: "pv-fc1",
        front: "Những động từ nào TUYỆT ĐỐI không chia ở thể bị động (Passive Voice)?",
        back: "Nội động từ (không có tân ngữ đi sau): happen, occur, appear, disappear, die, exist, arrive, remain.",
        hint: "Nội động từ: happen, disappear...",
      },
      {
        id: "pv-fx1",
        front: "Công thức bị động chung",
        back: "S + be (chia theo thì) + V3 (+ by O)",
      },
      {
        id: "pv-fx2",
        front: "Bị động hiện tại tiếp diễn",
        back: "am/is/are + being + V3",
      },
      {
        id: "pv-fx3",
        front: "Bị động với modal",
        back: "modal + be + V3\nIt must be done.",
      },
    ],
    masteryQuiz: [
      {
        id: "pv-mq1",
        question: "The historic building _______ currently being renovated by expert architects.",
        options: ["is", "was", "has", "will"],
        correctIndex: 0,
        explanation: "Bị động thì hiện tại tiếp diễn: S + is/are + being + V3/ed -> dùng 'is'.",
      },
      {
        id: "pv-mx1",
        question: "This song ___ by millions of people.",
        options: ["has heard", "has been heard", "hears", "heard"],
        correctIndex: 1,
        explanation: "Bị động hiện tại hoàn thành.",
      },
      {
        id: "pv-mx2",
        question: "The windows ___ yesterday.",
        options: ["cleaned", "were cleaned", "are cleaned", "have cleaned"],
        correctIndex: 1,
        explanation: "Bị động quá khứ đơn, chủ ngữ số nhiều.",
      },
    ],
  },
};

export default topic;
