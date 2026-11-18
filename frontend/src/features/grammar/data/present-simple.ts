import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "present-simple",
  level: "A1",
  title: "Present Simple Tense",
  vietnameseTitle: "Thì Hiện tại đơn",
  description: "Nền móng ngữ pháp diễn đạt thói quen hàng ngày, sự thật hiển nhiên và lịch trình cố định.",
  estimatedMinutes: 20,
  theory: {
    summary: "Thì Hiện tại đơn (Present Simple) dùng để diễn tả một hành động lặp đi lặp lại như một thói quen, một chân lý hay sự thật hiển nhiên trong tự nhiên và cuộc sống.",
    formulas: [
      {
        type: "affirmative",
        label: "Khẳng định (+)",
        structure: "S + V(s/es) + (O)  hoặc  S + am/is/are + (N/Adj)",
        exampleEn: "She drinks green tea every morning.",
        exampleVi: "Cô ấy uống trà xanh vào mỗi buổi sáng.",
      },
      {
        type: "negative",
        label: "Phủ định (-)",
        structure: "S + do/does + not + V-bare  hoặc  S + am/is/are + not",
        exampleEn: "They do not (don't) live in London.",
        exampleVi: "Họ không sống ở Luân Đôn.",
      },
      {
        type: "interrogative",
        label: "Nghi vấn (?)",
        structure: "Do/Does + S + V-bare?  hoặc  Am/Is/Are + S + (N/Adj)?",
        exampleEn: "Does your brother play football?",
        exampleVi: "Anh trai bạn có chơi bóng đá không?",
      },
    ],
    usages: [
      {
        id: "ps-u1",
        title: "Thói quen hoặc hành động lặp lại thường xuyên",
        explanation: "Những việc bạn làm định kỳ hàng ngày, hàng tuần hoặc thói quen sinh hoạt.",
        exampleEn: "I wake up at 6:30 AM every day.",
        exampleVi: "Tôi thức dậy lúc 6:30 sáng mỗi ngày.",
      },
      {
        id: "ps-u2",
        title: "Chân lý, sự thật hiển nhiên",
        explanation: "Quy luật tự nhiên, khoa học hoặc sự thật không đổi theo thời gian.",
        exampleEn: "Water boils at 100 degrees Celsius.",
        exampleVi: "Nước sôi ở 100 độ C.",
      },
      {
        id: "ps-u3",
        title: "Lịch trình tàu xe, thời khóa biểu cố định",
        explanation: "Diễn đạt giờ chạy của tàu, xe buýt, máy bay, lịch chiếu phim.",
        exampleEn: "The train leaves at 8:00 PM tonight.",
        exampleVi: "Chuyến tàu khởi hành lúc 8 giờ tối nay.",
      },
    ],
    signals: [
      {
        category: "Trạng từ chỉ tần suất (Adverbs of frequency)",
        words: ["always", "usually", "often", "sometimes", "rarely", "never"],
        explanation: "Đứng trước động từ thường và đứng sau động từ to be.",
      },
      {
        category: "Cụm từ chỉ thời gian lặp lại",
        words: ["every day/week/month/year", "once a week", "twice a month", "on Mondays"],
        explanation: "Thường đứng ở đầu hoặc cuối câu.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "He play tennis very well.",
        correct: "He plays tennis very well.",
        explanation: "Với chủ ngữ số ít (He, She, It, Danh từ số ít), động từ thường phải thêm -s hoặc -es.",
      },
      {
        incorrect: "Does she likes chocolate?",
        correct: "Does she like chocolate?",
        explanation: "Khi đã có trợ động từ 'Does', động từ chính phải quay về nguyên thể (V-bare).",
      },
    ],
    proTips: [
      "Động từ tận cùng bằng: -o, -s, -z, -ch, -x, -sh (nhớ câu: 'O-S-Z-CH-X-SH') thì thêm đuôi -es (ví dụ: go -> goes, watch -> watches).",
      "Tận cùng là phụ âm + y: đổi y thành i rồi thêm -es (study -> studies).",
    ],
  },
  practice: [
    {
      id: "ps-q1",
      question: "My father _______ coffee in the morning, but my mother prefers tea.",
      options: ["drinks", "drink", "drinking", "is drinking"],
      correctIndex: 0,
      explanation: "'My father' là chủ ngữ số ít ở ngôi thứ ba, hành động chỉ thói quen nên chia động từ thêm 's': 'drinks'.",
    },
    {
      id: "ps-q2",
      question: "Where _______ your grandparents live?",
      options: ["does", "are", "do", "is"],
      correctIndex: 2,
      explanation: "'your grandparents' là danh từ số nhiều (ông bà), động từ 'live' là động từ thường nên dùng trợ động từ 'do'.",
    },
    {
      id: "ps-q3",
      question: "The Earth _______ around the Sun once every 365 days.",
      options: ["move", "moves", "moved", "moving"],
      correctIndex: 1,
      explanation: "Sự thật hiển nhiên trong khoa học vũ trụ, 'The Earth' là chủ ngữ số ít nên chia 'moves'.",
    },
    {
      id: "ps-q4",
      question: "She _______ watch TV during weekdays because of her busy study schedule.",
      options: ["doesn't", "don't", "isn't", "not"],
      correctIndex: 0,
      explanation: "'She' đi với trợ động từ phủ định 'doesn't' + động từ nguyên thể 'watch'.",
    },
    {
      id: "ps-q5",
      question: "Water _______ at 0 degrees Celsius.",
      options: ["freeze", "freezes", "freezing", "is freezing"],
      correctIndex: 1,
      explanation: "Hiện tượng tự nhiên (nước đóng băng ở 0 độ C), 'Water' là danh từ không đếm được nên chia số ít 'freezes'.",
    },
    {
      id: "ps-x1",
      type: "input",
      question: "He ___ (not / like) horror films.",
      answers: ["doesn't like", "does not like"],
      explanation: "Phủ định ngôi ba số ít: doesn't + V nguyên mẫu.",
    },
    {
      id: "ps-x2",
      type: "input",
      question: "My sister ___ (study) at a university in Hue.",
      answers: ["studies"],
      explanation: "Phụ âm + y → đổi y thành i rồi thêm -es.",
    },
    {
      id: "ps-x3",
      question: "How often ___ you go swimming?",
      options: ["are", "do", "does", "is"],
      correctIndex: 1,
      explanation: "Câu hỏi tần suất với you → do.",
    },
  ],
  advanced: [
    {
      id: "ps-a1",
      question: "The train ___ at 6:45 tomorrow morning, so don't be late.",
      options: ["leave", "leaves", "is leaving to", "will leaves"],
      correctIndex: 1,
      explanation: "Lịch trình cố định (tàu, xe, phim) dùng hiện tại đơn dù nói về tương lai.",
    },
    {
      id: "ps-a2",
      question: "Chọn câu SAI:",
      options: ["She watches TV every evening.", "He fixs computers.", "It rarely snows here.", "They don't own a car."],
      correctIndex: 1,
      explanation: "Động từ tận cùng bằng -x thêm -es: fixes.",
    },
    {
      id: "ps-a3",
      question: "Neither my brother nor my parents ___ coffee.",
      options: ["drinks", "drink", "drinking", "is drinking"],
      correctIndex: 1,
      explanation: "Neither…nor: chia theo chủ ngữ gần nhất (my parents, số nhiều) → drink.",
    },
    {
      id: "ps-a4",
      type: "input",
      question: "I'll call you as soon as I ___ (get) home.",
      answers: ["get"],
      explanation: "Mệnh đề thời gian (as soon as, when) dùng hiện tại đơn cho tương lai.",
    },
    {
      id: "ps-a5",
      type: "input",
      question: "Everyone in my class ___ (have) a smartphone.",
      answers: ["has"],
      explanation: "Everyone là chủ ngữ số ít → has.",
    },
  ],
  review: {
    flashcards: [
      {
        id: "ps-fc1",
        front: "Công thức câu hỏi thì Hiện tại đơn với Động từ thường?",
        back: "Do / Does + S + V-bare + (O)?\nVí dụ: Do you study English every day?",
        hint: "Nhớ dùng trợ động từ Do/Does",
      },
      {
        id: "ps-fc2",
        front: "Quy tắc thêm 'es' sau động từ?",
        back: "Thêm -es khi động từ tận cùng bằng: -o, -s, -z, -ch, -x, -sh.\nVí dụ: watch -> watches, go -> goes, wash -> washes.",
        hint: "Những âm gió và chữ o",
      },
      {
        id: "ps-fc3",
        front: "Vị trí của trạng từ tần suất (always, often, usually...)?",
        back: "Đứng TRƯỚC động từ thường, nhưng đứng SAU động từ 'to be'.\nVí dụ: He often reads books. / She is always on time.",
        hint: "Trước V thường, sau Be",
      },
    ],
    masteryQuiz: [
      {
        id: "ps-mq1",
        question: "Sarah _______ to the gym on Mondays and Thursdays.",
        options: ["go", "goes", "is going", "has gone"],
        correctIndex: 1,
        explanation: "Sarah là ngôi thứ 3 số ít, động từ kết thúc bằng 'o' nên thêm 'es' thành 'goes'.",
      },
      {
        id: "ps-mq2",
        question: "_______ you know the answer to this difficult math problem?",
        options: ["Does", "Are", "Do", "Have"],
        correctIndex: 2,
        explanation: "Chủ ngữ 'you' với động từ chỉ nhận thức 'know' dùng trợ động từ 'Do'.",
      },
      {
        id: "ps-mx1",
        question: "She never ___ breakfast.",
        options: ["skip", "skips", "skipping", "is skip"],
        correctIndex: 1,
        explanation: "Ngôi ba số ít, thói quen → skips.",
      },
    ],
  },
};

export default topic;
