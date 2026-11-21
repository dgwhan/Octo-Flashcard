import type { GrammarTopicInput } from "../types";

const topic: GrammarTopicInput = {
  id: "participle-clauses",
  level: "C1",
  title: "Participle Clauses",
  vietnameseTitle: "Mệnh đề phân từ",
  description: "Rút gọn mệnh đề bằng V-ing, V3 và Having V3 để câu văn gọn và trang trọng hơn.",
  estimatedMinutes: 30,
  theory: {
    summary:
      "Mệnh đề phân từ thay một mệnh đề đầy đủ (có liên từ và chủ ngữ) bằng một phân từ, khi hai vế có CÙNG chủ ngữ. Hiện tại phân từ (V-ing) mang nghĩa chủ động, quá khứ phân từ (V3) mang nghĩa bị động, Having + V3 nhấn mạnh việc xảy ra trước.",
    formulas: [
      {
        type: "affirmative",
        label: "V-ing (chủ động, đồng thời)",
        structure: "V-ing …, S + V",
        exampleEn: "Walking along the beach, she found a shell.",
        exampleVi: "Đang đi dạo trên bãi biển, cô ấy tìm thấy một vỏ ốc.",
      },
      {
        type: "affirmative",
        label: "V3 (bị động)",
        structure: "V3 …, S + V",
        exampleEn: "Written in 1813, the novel is still popular.",
        exampleVi: "Được viết năm 1813, cuốn tiểu thuyết vẫn còn được yêu thích.",
      },
      {
        type: "special",
        label: "Having V3 (xảy ra trước)",
        structure: "Having + V3 …, S + V",
        exampleEn: "Having finished her work, she went home.",
        exampleVi: "Làm xong việc, cô ấy về nhà.",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Thay mệnh đề chỉ lý do",
        explanation: "Because/As + S + V → V-ing / Being + …",
        exampleEn: "Being a doctor, he knew what to do.",
        exampleVi: "Là bác sĩ nên anh ấy biết phải làm gì.",
      },
      {
        id: "u2",
        title: "Rút gọn mệnh đề quan hệ",
        explanation: "Who/which + V chủ động → V-ing; who/which + be + V3 → V3.",
        exampleEn: "The man sitting next to me was snoring. The car stolen last week was found.",
        exampleVi: "Người đàn ông ngồi cạnh tôi đang ngáy. Chiếc xe bị trộm tuần trước đã được tìm thấy.",
      },
      {
        id: "u3",
        title: "Giữ liên từ để rõ nghĩa",
        explanation: "Có thể giữ when, while, after, before trước phân từ.",
        exampleEn: "After graduating, he moved to Singapore.",
        exampleVi: "Sau khi tốt nghiệp, anh ấy chuyển tới Singapore.",
      },
    ],
    signals: [
      {
        category: "Kiểm tra trước khi rút gọn",
        words: ["cùng chủ ngữ?", "chủ động → V-ing", "bị động → V3", "xảy ra trước → Having V3"],
        explanation: "Hai vế khác chủ ngữ thì không rút gọn được (trừ cấu trúc tuyệt đối).",
      },
    ],
    commonMistakes: [
      {
        incorrect: "Walking into the room, the lights were turned on.",
        correct: "Walking into the room, I turned on the lights.",
        explanation: "Lỗi 'phân từ treo': chủ ngữ của vế chính phải là người làm hành động walking.",
      },
      {
        incorrect: "Built in 1990, we bought the house in 2015.",
        correct: "Built in 1990, the house was bought by us in 2015.",
        explanation: "Ngôi nhà mới là thứ 'được xây', nên nó phải là chủ ngữ vế chính.",
      },
    ],
    proTips: [
      "Đọc phân từ, rồi hỏi 'ai/cái gì làm việc đó?'. Câu trả lời phải là chủ ngữ vế chính.",
      "Phân từ đứng đầu câu thường gặp trong văn viết, báo chí, bài luận IELTS.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "___ the email, she called her boss.",
      options: ["Read", "Having read", "Be read", "To have read"],
      correctIndex: 1,
      explanation: "Đọc email xong rồi mới gọi → Having read.",
    },
    {
      id: "p2",
      question: "___ in 1889, the Eiffel Tower attracts millions of visitors.",
      options: ["Building", "Built", "Having building", "Build"],
      correctIndex: 1,
      explanation: "Tháp được xây (bị động) → Built.",
    },
    {
      id: "p3",
      question: "The girl ___ by the window is my cousin.",
      options: ["sat", "sitting", "sits", "to sit"],
      correctIndex: 1,
      explanation: "Rút gọn 'who is sitting' (chủ động) → sitting.",
    },
    {
      id: "p4",
      question: "___ tired, I went to bed early.",
      options: ["Felt", "Feeling", "Having feel", "Be felt"],
      correctIndex: 1,
      explanation: "Lý do, chủ động, đồng thời → Feeling.",
    },
    {
      id: "p5",
      question: "The documents ___ yesterday are on your desk.",
      options: ["sending", "sent", "having sent", "send"],
      correctIndex: 1,
      explanation: "Rút gọn 'which were sent' (bị động) → sent.",
    },
    {
      id: "p6",
      type: "input",
      question: "___ (know) the area well, he offered to be our guide.",
      answers: ["knowing"],
      explanation: "Lý do, chủ động → Knowing.",
    },
    {
      id: "p7",
      type: "input",
      question: "___ (shock) by the news, she couldn't speak.",
      answers: ["shocked"],
      explanation: "Bị sốc (bị động) → Shocked.",
    },
    {
      id: "p8",
      type: "input",
      question: "After ___ (eat) lunch, we went for a walk.",
      answers: ["eating", "having eaten"],
      explanation: "After + V-ing (hoặc having eaten).",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "Câu nào có lỗi 'phân từ treo'?",
      options: [
        "Looking out of the window, I saw a rainbow.",
        "Looking out of the window, a rainbow appeared.",
        "Having seen the film, she didn't want to see it again.",
        "Tired of waiting, we left.",
      ],
      correctIndex: 1,
      explanation: "Cầu vồng không thể 'nhìn ra cửa sổ'. Vế chính phải có chủ ngữ là người nhìn.",
    },
    {
      id: "a2",
      question: "Viết lại: 'Because she had lived in Japan, she spoke Japanese well.' =",
      options: [
        "Living in Japan, she spoke Japanese well.",
        "Having lived in Japan, she spoke Japanese well.",
        "Lived in Japan, she spoke Japanese well.",
        "Having living in Japan, she spoke Japanese well.",
      ],
      correctIndex: 1,
      explanation: "Việc sống ở Nhật xảy ra trước → Having lived.",
    },
    {
      id: "a3",
      question: "___ the instructions carefully, you will avoid mistakes.",
      options: ["Followed", "Following", "Having been followed", "Follows"],
      correctIndex: 1,
      explanation: "Điều kiện / cách thức, chủ động → Following.",
    },
    {
      id: "a4",
      type: "input",
      question: "Viết lại: 'The report, which was written by the CEO, was very clear.' → The report ___ by the CEO was very clear.",
      answers: ["written"],
      explanation: "Rút gọn mệnh đề quan hệ bị động → V3.",
    },
    {
      id: "a5",
      type: "input",
      question: "Viết lại: 'As he didn't know what to say, he stayed silent.' → Not ___ what to say, he stayed silent.",
      answers: ["knowing"],
      explanation: "Phủ định của phân từ: Not + V-ing.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "V-ing hay V3 ở đầu câu?", back: "V-ing: chủ ngữ tự làm (chủ động)\nV3: chủ ngữ bị tác động (bị động)" },
      { id: "f2", front: "Having + V3 dùng khi nào?", back: "Khi hành động trong mệnh đề phân từ xảy ra TRƯỚC hành động chính." },
      { id: "f3", front: "Điều kiện để rút gọn", back: "Hai vế phải cùng chủ ngữ." },
      { id: "f4", front: "Phân từ phủ định", back: "Not + V-ing: Not knowing the way, …" },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "___ by her parents, she felt confident.",
        options: ["Supporting", "Supported", "Having supporting", "Support"],
        correctIndex: 1,
        explanation: "Được bố mẹ ủng hộ (bị động) → Supported.",
      },
      {
        id: "m2",
        question: "___ the train, he realised he'd left his bag.",
        options: ["Having boarded", "Boarded", "Being boarded", "To board"],
        correctIndex: 0,
        explanation: "Lên tàu xong rồi mới nhận ra → Having boarded.",
      },
      {
        id: "m3",
        question: "Anyone ___ to join the club should email us.",
        options: ["wanted", "wanting", "wants", "having want"],
        correctIndex: 1,
        explanation: "Rút gọn 'who wants' (chủ động) → wanting.",
      },
    ],
  },
};

export default topic;
