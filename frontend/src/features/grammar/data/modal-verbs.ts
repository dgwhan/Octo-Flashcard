import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "modal-verbs",
  level: "B1",
  title: "Modal Verbs",
  vietnameseTitle: "Động từ khuyết thiếu",
  description: "Sử dụng chính xác Can, Could, Must, Have to, Should, May, Might để thể hiện khả năng, nghĩa vụ và lời khuyên.",
  estimatedMinutes: 20,
  theory: {
    summary: "Động từ khuyết thiếu (Modal Verbs) luôn đi kèm với động từ nguyên thể không to (V-bare), không chia theo ngôi và dùng để thể hiện khả năng, sự bắt buộc, xin phép hoặc lời khuyên.",
    formulas: [
      {
        type: "affirmative",
        label: "Khẳng định (+)",
        structure: "S + Modal Verb (can/must/should/may...) + V-bare",
        exampleEn: "You should get at least 7 hours of sleep every night.",
        exampleVi: "Bạn nên ngủ ít nhất 7 tiếng mỗi đêm.",
      },
      {
        type: "negative",
        label: "Phủ định (-)",
        structure: "S + Modal Verb + not + V-bare",
        exampleEn: "You must not (mustn't) touch that live wire.",
        exampleVi: "Bạn tuyệt đối không được chạm vào dây điện trần đó.",
      },
    ],
    usages: [
      {
        id: "mv-u1",
        title: "Must vs Have to (Bắt buộc)",
        explanation: "'Must' thể hiện sự bắt buộc từ ý chí chủ quan người nói; 'Have to' do quy định, luật pháp hoặc yếu tố khách quan bên ngoài.",
        exampleEn: "I have to wear a uniform at school (School rule).",
        exampleVi: "Tôi phải mặc đồng phục ở trường (Quy định nhà trường).",
      },
      {
        id: "mv-u2",
        title: "Mustn't vs Don't have to (Khác biệt quan trọng)",
        explanation: "'Mustn't' = CẤM ĐOÁN (không được phép làm); 'Don't have to' = KHÔNG CẦN THIẾT (làm hay không tùy bạn).",
        exampleEn: "You don't have to come if you are tired.",
        exampleVi: "Bạn không cần phải đến nếu bạn thấy mệt.",
      },
    ],
    signals: [
      {
        category: "Chức năng",
        words: ["Can/Could (khả năng)", "Should/Ought to (khuyên nhủ)", "May/Might (xác suất/xin phép)", "Must (chắc chắn/bắt buộc)"],
        explanation: "Mỗi từ mang sắc thái ngữ nghĩa riêng biệt.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "She cans speak three languages fluently.",
        correct: "She can speak three languages fluently.",
        explanation: "Động từ khuyết thiếu không bao giờ thêm -s/es dù chủ ngữ là ngôi thứ 3 số ít.",
      },
    ],
    proTips: [
      "Sau Modal Verbs LUÔN LUÔN là động từ nguyên mẫu không 'to' (V-bare), trừ trường hợp 'ought to'.",
    ],
  },
  practice: [
    {
      id: "mv-q1",
      question: "You _______ smoke inside the hospital. It is strictly prohibited by law.",
      options: ["mustn't", "don't have to", "shouldn't", "needn't"],
      correctIndex: 0,
      explanation: "Luật pháp nghiêm cấm (strictly prohibited) -> dùng 'mustn't' (tuyệt đối không được làm).",
    },
    {
      id: "mv-q2",
      question: "Tomorrow is Sunday, so we _______ wake up early.",
      options: ["mustn't", "don't have to", "can't", "shouldn't"],
      correctIndex: 1,
      explanation: "Chủ nhật được nghỉ nên không cần thiết phải dậy sớm (tùy ý) -> dùng 'don't have to'.",
    },
    {
      id: "mv-q3",
      question: "You look exhausted. You _______ take a short break.",
      options: ["should", "must to", "have", "ought"],
      correctIndex: 0,
      explanation: "Đưa ra lời khuyên hữu ích cho người mệt mỏi -> dùng 'should + V-bare'.",
    },
    {
      id: "mv-x1",
      question: "You ___ wear a seatbelt. It's the law.",
      options: ["must", "might", "could", "would"],
      correctIndex: 0,
      explanation: "Bắt buộc theo luật → must.",
    },
    {
      id: "mv-x2",
      question: "You ___ bring food. There will be plenty.",
      options: ["mustn't", "don't have to", "can't", "shouldn't to"],
      correctIndex: 1,
      explanation: "Không cần thiết → don't have to (khác mustn't = cấm).",
    },
    {
      id: "mv-x3",
      type: "input",
      question: "You look tired. You ___ go to bed early. (lời khuyên)",
      answers: ["should", "ought to"],
      explanation: "Lời khuyên → should / ought to.",
    },
    {
      id: "mv-x4",
      type: "input",
      question: "When I was five, I ___ swim. (could / can)",
      answers: ["could"],
      explanation: "Khả năng trong quá khứ → could.",
    },
    {
      id: "mv-x5",
      question: "___ I use your phone, please?",
      options: ["Must", "May", "Should", "Would"],
      correctIndex: 1,
      explanation: "Xin phép lịch sự → May/Can/Could I…?",
    },
  ],
  advanced: [
    {
      id: "mv-a1",
      question: "You ___ smoke here. It's a hospital.",
      options: ["don't have to", "mustn't", "needn't", "might not"],
      correctIndex: 1,
      explanation: "Cấm → mustn't.",
    },
    {
      id: "mv-a2",
      question: "She's not answering. She ___ be in a meeting.",
      options: ["must", "might", "should", "has to"],
      correctIndex: 1,
      explanation: "Suy đoán không chắc → might/may/could.",
    },
    {
      id: "mv-a3",
      question: "He's been working for 12 hours. He ___ be exhausted.",
      options: ["can't", "must", "mustn't", "shouldn't"],
      correctIndex: 1,
      explanation: "Suy đoán chắc chắn ở hiện tại → must be.",
    },
    {
      id: "mv-a4",
      type: "input",
      question: "That ___ be Lan. She's in London this week. (suy đoán phủ định chắc chắn)",
      answers: ["can't", "cannot", "couldn't"],
      explanation: "Không thể nào → can't.",
    },
    {
      id: "mv-a5",
      type: "input",
      question: "We ___ to leave early yesterday because of the storm. (bắt buộc, quá khứ)",
      answers: ["had"],
      explanation: "Quá khứ của must/have to → had to.",
    },
  ],
  review: {
    flashcards: [
      {
        id: "mv-fc1",
        front: "Ý nghĩa của 'Mustn't' khác 'Don't have to' như thế nào?",
        back: "- Mustn't = Bị CẤM ĐOÁN, không được phép làm (vi phạm sẽ bị phạt).\n- Don't have to = KHÔNG CẦN THIẾT, không bắt buộc (thích thì làm, không thích thì thôi).",
        hint: "Cấm vs Không cần",
      },
      {
        id: "mv-fx1",
        front: "mustn't vs don't have to",
        back: "mustn't: cấm\ndon't have to: không cần thiết",
      },
      {
        id: "mv-fx2",
        front: "Suy đoán ở hiện tại",
        back: "must be (chắc chắn)\nmight/may/could be (có lẽ)\ncan't be (không thể nào)",
      },
      {
        id: "mv-fx3",
        front: "Quá khứ của must (bắt buộc)",
        back: "had to",
      },
    ],
    masteryQuiz: [
      {
        id: "mv-mq1",
        question: "Take an umbrella with you. It _______ rain later this afternoon.",
        options: ["might", "must", "should", "will to"],
        correctIndex: 0,
        explanation: "Dự đoán khả năng có thể xảy ra trong tương lai nhưng không chắc chắn 100% -> dùng 'might'.",
      },
      {
        id: "mv-mx1",
        question: "Students ___ use their phones during the exam.",
        options: ["mustn't", "don't have to", "needn't", "might"],
        correctIndex: 0,
        explanation: "Cấm → mustn't.",
      },
      {
        id: "mv-mx2",
        question: "You ___ see a doctor about that cough.",
        options: ["should", "must to", "can to", "would"],
        correctIndex: 0,
        explanation: "Lời khuyên → should.",
      },
    ],
  },
};

export default topic;
