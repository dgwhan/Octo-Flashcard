import type { GrammarTopicInput } from "../types";

const topic: GrammarTopicInput = {
  id: "present-perfect",
  level: "B1",
  title: "Present Perfect Tense",
  vietnameseTitle: "Thì Hiện tại hoàn thành",
  description: "Kết nối quá khứ với hiện tại: trải nghiệm, hành động kéo dài từ quá khứ và kết quả còn lưu lại ở hiện tại.",
  estimatedMinutes: 25,
  theory: {
    summary: "Thì Hiện tại hoàn thành (Present Perfect) dùng để nói về hành động xảy ra trong quá khứ nhưng có kết quả hoặc liên hệ chặt chẽ tới hiện tại, hoặc trải nghiệm tính đến thời điểm này.",
    formulas: [
      {
        type: "affirmative",
        label: "Khẳng định (+)",
        structure: "S + have/has + V3/ed + (O)",
        exampleEn: "She has worked for this technology company since 2021.",
        exampleVi: "Cô ấy đã làm việc cho công ty công nghệ này từ năm 2021 đến nay.",
      },
      {
        type: "negative",
        label: "Phủ định (-)",
        structure: "S + have/has + not (haven't/hasn't) + V3/ed",
        exampleEn: "They haven't finished their final report yet.",
        exampleVi: "Họ vẫn chưa hoàn thành bản báo cáo cuối cùng.",
      },
      {
        type: "interrogative",
        label: "Nghi vấn (?)",
        structure: "Have/Has + S + V3/ed?",
        exampleEn: "Have you ever traveled to Japan?",
        exampleVi: "Bạn đã từng đi du lịch Nhật Bản bao giờ chưa?",
      },
    ],
    usages: [
      {
        id: "pp-u1",
        title: "Hành động bắt đầu trong quá khứ và vẫn đang tiếp diễn ở hiện tại",
        explanation: "Thường đi kèm với 'since' (mốc thời gian) hoặc 'for' (khoảng thời gian).",
        exampleEn: "We have known each other for over ten years.",
        exampleVi: "Chúng tôi đã quen biết nhau hơn mười năm rồi.",
      },
      {
        id: "pp-u2",
        title: "Trải nghiệm hoặc kinh nghiệm sống (tính tới thời điểm hiện tại)",
        explanation: "Không đề cập đến mốc thời gian cụ thể khi hành động xảy ra.",
        exampleEn: "This is the most delicious dish I have ever tasted.",
        exampleVi: "Đây là món ăn ngon nhất mà tôi từng nếm thử.",
      },
      {
        id: "pp-u3",
        title: "Hành động vừa mới xảy ra và để lại kết quả ở hiện tại",
        explanation: "Nhấn mạnh vào kết quả hiện hữu.",
        exampleEn: "I have lost my key, so I can't open the door now.",
        exampleVi: "Tôi đã làm mất chìa khóa, nên bây giờ không mở được cửa.",
      },
    ],
    signals: [
      {
        category: "Các phó từ đặc trưng",
        words: ["already", "yet", "just", "ever", "never", "recently", "lately", "so far", "up to now"],
        explanation: "Already (đã rồi - câu khẳng định), Yet (chưa - câu phủ định/nghi vấn ở cuối câu), Just (vừa mới).",
      },
    ],
    commonMistakes: [
      {
        incorrect: "I have seen that movie yesterday.",
        correct: "I saw that movie yesterday.",
        explanation: "Khi có mốc thời gian xác định đã chấm dứt (yesterday, last year, in 2010), BẮT BUỘC dùng Quá khứ đơn, không dùng Hiện tại hoàn thành.",
      },
    ],
    proTips: [
      "Phân biệt 'Since' và 'For': Since + Mốc thời gian (since 2015, since 8 AM); For + Khoảng thời gian (for 5 days, for 2 hours).",
    ],
  },
  practice: [
    {
      id: "pp-q1",
      question: "Lan has lived in London _______ October last year.",
      options: ["for", "since", "in", "during"],
      correctIndex: 1,
      explanation: "'October last year' là mốc thời gian cụ thể trong quá khứ -> dùng 'since'.",
    },
    {
      id: "pp-q2",
      question: "Have you _______ tried authentic Italian pizza?",
      options: ["never", "ever", "yet", "already"],
      correctIndex: 1,
      explanation: "Trong câu hỏi về trải nghiệm cuộc sống dùng 'ever' (đã từng bao giờ chưa).",
    },
    {
      id: "pp-q3",
      question: "I can't find my wallet anywhere. I think someone _______ it.",
      options: ["stole", "steals", "has stolen", "is stealing"],
      correctIndex: 2,
      explanation: "Hành động lấy cắp xảy ra trong quá khứ nhưng để lại hậu quả hiện tại (mất ví không thấy) -> dùng 'has stolen'.",
    },
    {
      id: "pp-q4",
      question: "They _______ their lunch yet, so they are very hungry now.",
      options: ["haven't eaten", "didn't eat", "don't eat", "hasn't eaten"],
      correctIndex: 0,
      explanation: "Có 'yet' ở cuối câu phủ định và chủ ngữ 'They' số nhiều -> 'haven't eaten'.",
    },
    {
      id: "pp-x1",
      type: "input",
      question: "I ___ (never / be) to Japan.",
      answers: ["have never been", "'ve never been"],
      explanation: "Kinh nghiệm: have never been.",
    },
    {
      id: "pp-x2",
      type: "input",
      question: "She ___ (just / finish) her homework.",
      answers: ["has just finished", "'s just finished"],
      explanation: "Vừa mới xong: has just + V3.",
    },
    {
      id: "pp-x3",
      question: "___ you ever ___ sushi?",
      options: ["Did / eat", "Have / eaten", "Do / eat", "Has / eaten"],
      correctIndex: 1,
      explanation: "Hỏi kinh nghiệm → Have you ever + V3.",
    },
    {
      id: "pp-x4",
      question: "We have lived here ___ 2015.",
      options: ["for", "since", "ago", "in"],
      correctIndex: 1,
      explanation: "Mốc thời gian → since.",
    },
  ],
  advanced: [
    {
      id: "pp-a1",
      question: "Chọn câu SAI:",
      options: ["I've seen that film twice.", "I've seen that film last week.", "I saw that film last week.", "Have you seen it yet?"],
      correctIndex: 1,
      explanation: "Mốc quá khứ xác định (last week) → quá khứ đơn, không dùng hiện tại hoàn thành.",
    },
    {
      id: "pp-a2",
      question: "This is the first time I ___ a plane.",
      options: ["take", "took", "have taken", "am taking"],
      correctIndex: 2,
      explanation: "This is the first time + hiện tại hoàn thành.",
    },
    {
      id: "pp-a3",
      question: "He ___ to Paris. He'll be back next week.",
      options: ["has been", "has gone", "went", "goes"],
      correctIndex: 1,
      explanation: "Has gone = đã đi và chưa về; has been = đã từng đến và đã về.",
    },
    {
      id: "pp-a4",
      type: "input",
      question: "Have you finished the report ___? (yet / already)",
      answers: ["yet"],
      explanation: "Câu hỏi/phủ định dùng yet ở cuối câu.",
    },
    {
      id: "pp-a5",
      type: "input",
      question: "I ___ (know) her for ten years.",
      answers: ["have known", "'ve known"],
      explanation: "Know là động từ trạng thái → have known.",
    },
  ],
  review: {
    flashcards: [
      {
        id: "pp-fc1",
        front: "Sự khác biệt cốt lõi giữa Quá khứ đơn (Past Simple) và Hiện tại hoàn thành (Present Perfect)?",
        back: "- Past Simple: Đã xong hoàn toàn, có mốc thời gian kết thúc (yesterday, last year).\n- Present Perfect: Không có mốc thời gian cụ thể, hoặc còn tiếp diễn đến hiện tại, hoặc kết quả ảnh hưởng đến hiện tại.",
        hint: "Mốc thời gian xác định vs Kết quả ở hiện tại",
      },
      {
        id: "pp-fc2",
        front: "Phân biệt 'Have been to' và 'Have gone to'?",
        back: "- Have been to: Đã từng đến đó và NAY ĐÃ TRỞ VỀ.\n- Have gone to: Đã đi đến đó và HIỆN VẪN Ở ĐÓ (chưa về).",
        hint: "Đã về vs Chưa về",
      },
      {
        id: "pp-fx1",
        front: "Công thức hiện tại hoàn thành",
        back: "S + have/has + V3/ed",
      },
      {
        id: "pp-fx2",
        front: "has been vs has gone",
        back: "has been to: đã từng đến (đã về)\nhas gone to: đã đi (chưa về)",
      },
    ],
    masteryQuiz: [
      {
        id: "pp-mq1",
        question: "Mr. David has worked as a senior software architect _______ more than fifteen years.",
        options: ["since", "for", "from", "in"],
        correctIndex: 1,
        explanation: "'more than fifteen years' là một khoảng thời gian dài -> dùng 'for'.",
      },
      {
        id: "pp-mx1",
        question: "She ___ three cups of coffee today.",
        options: ["drank", "has drunk", "drinks", "is drinking"],
        correctIndex: 1,
        explanation: "Today chưa kết thúc, có số lượng → has drunk.",
      },
      {
        id: "pp-mx2",
        question: "I lost my keys yesterday and I ___ them yet.",
        options: ["didn't find", "haven't found", "don't find", "hadn't found"],
        correctIndex: 1,
        explanation: "Yet + kết quả đến hiện tại → haven't found.",
      },
    ],
  },
};

export default topic;
