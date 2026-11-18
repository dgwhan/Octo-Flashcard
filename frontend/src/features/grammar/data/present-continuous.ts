import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "present-continuous",
  level: "A1",
  title: "Present Continuous Tense",
  vietnameseTitle: "Thì Hiện tại tiếp diễn",
  description: "Diễn tả hành động đang diễn ra ngay tại thời điểm nói hoặc kế hoạch chắc chắn trong tương lai gần.",
  estimatedMinutes: 20,
  theory: {
    summary: "Thì Hiện tại tiếp diễn (Present Continuous) mô tả hành động đang diễn ra tại thời điểm nói, xu hướng tạm thời hoặc một kế hoạch đã ấn định trước.",
    formulas: [
      {
        type: "affirmative",
        label: "Khẳng định (+)",
        structure: "S + am/is/are + V-ing + (O)",
        exampleEn: "They are discussing the project right now.",
        exampleVi: "Họ đang thảo luận về dự án ngay lúc này.",
      },
      {
        type: "negative",
        label: "Phủ định (-)",
        structure: "S + am/is/are + not + V-ing",
        exampleEn: "He is not (isn't) listening to music.",
        exampleVi: "Anh ấy không đang nghe nhạc.",
      },
      {
        type: "interrogative",
        label: "Nghi vấn (?)",
        structure: "Am/Is/Are + S + V-ing?",
        exampleEn: "Are you working on your assignment?",
        exampleVi: "Bạn có đang làm bài tập không?",
      },
    ],
    usages: [
      {
        id: "pc-u1",
        title: "Hành động đang diễn ra ngay lúc nói",
        explanation: "Đang xảy ra tại thời điểm hiện tại và chưa kết thúc.",
        exampleEn: "Look! The baby is taking her first steps.",
        exampleVi: "Nhìn kìa! Đứa bé đang đi những bước đầu tiên.",
      },
      {
        id: "pc-u2",
        title: "Kế hoạch đã chuẩn bị chắc chắn xảy ra trong tương lai gần",
        explanation: "Có thời gian, địa điểm cụ thể và sự chuẩn bị trước.",
        exampleEn: "I am flying to Tokyo tomorrow morning.",
        exampleVi: "Tôi sẽ bay đến Tokyo vào sáng mai.",
      },
      {
        id: "pc-u3",
        title: "Phàn nàn về hành động gây bực mình với 'always'",
        explanation: "Diễn tả sự khó chịu lặp đi lặp lại của người nói.",
        exampleEn: "He is always leaving his dirty socks on the floor!",
        exampleVi: "Anh ta cứ liên tục để tất bẩn trên sàn nhà!",
      },
    ],
    signals: [
      {
        category: "Từ chỉ thời điểm hiện tại",
        words: ["now", "right now", "at the moment", "at present"],
        explanation: "Báo hiệu hành động đang diễn ra ngay lúc này.",
      },
      {
        category: "Câu mệnh lệnh gây chú ý",
        words: ["Look!", "Listen!", "Be quiet!", "Watch out!"],
        explanation: "Kêu gọi chú ý đến sự việc đang xảy ra trước mắt.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "I am knowing the answer right now.",
        correct: "I know the answer right now.",
        explanation: "Các động từ chỉ nhận thức, cảm giác, sở hữu (stative verbs: know, want, like, love, believe, understand) không dùng thì tiếp diễn.",
      },
      {
        incorrect: "She is runing fast.",
        correct: "She is running fast.",
        explanation: "Động từ 1 âm tiết kết thúc bằng 1 phụ âm trước đó là 1 nguyên âm phải gấp đôi phụ âm cuối trước khi thêm -ing (run -> running).",
      },
    ],
    proTips: [
      "Quy tắc gấp đôi phụ âm cuối: 1 nguyên âm + 1 phụ âm ở cuối từ 1 âm tiết (sit -> sitting, get -> getting, swim -> swimming).",
      "Nếu tận cùng là 'e', bỏ 'e' rồi thêm 'ing' (write -> writing, dance -> dancing). Ngoại lệ: see -> seeing.",
    ],
  },
  practice: [
    {
      id: "pc-q1",
      question: "Listen! Someone _______ at the front door.",
      options: ["knocks", "is knocking", "knocked", "was knocking"],
      correctIndex: 1,
      explanation: "Có từ cảm thán 'Listen!' báo hiệu hành động đang diễn ra ngay lúc này -> dùng 'is knocking'.",
    },
    {
      id: "pc-q2",
      question: "Why _______ you wearing a heavy coat today? It is quite hot outside.",
      options: ["do", "are", "did", "have"],
      correctIndex: 1,
      explanation: "Hành động mặc áo khoác đang xảy ra tại thời điểm hôm nay (tạm thời) -> 'Why are you wearing...'.",
    },
    {
      id: "pc-q3",
      question: "Please be quiet! The students _______ an important examination.",
      options: ["take", "takes", "are taking", "taken"],
      correctIndex: 2,
      explanation: "Mệnh lệnh 'Please be quiet!' cho thấy các học sinh đang làm bài thi ngay thời điểm này -> 'are taking'.",
    },
    {
      id: "pc-q4",
      question: "I _______ what you mean, but I don't agree with your decision.",
      options: ["am understanding", "understand", "understands", "understood"],
      correctIndex: 1,
      explanation: "'understand' là stative verb (động từ chỉ nhận thức), không dùng thì tiếp diễn dù đang nói về hiện tại.",
    },
    {
      id: "pc-x1",
      type: "input",
      question: "Look! The baby ___ (sleep). Please be quiet.",
      answers: ["is sleeping", "'s sleeping"],
      explanation: "Đang diễn ra ngay lúc nói.",
    },
    {
      id: "pc-x2",
      type: "input",
      question: "We ___ (not / go) out tonight. We're too tired.",
      answers: ["aren't going", "are not going", "'re not going"],
      explanation: "Kế hoạch tương lai gần (phủ định).",
    },
    {
      id: "pc-x3",
      question: "I ___ my grandparents this weekend. I've already bought the ticket.",
      options: ["visit", "am visiting", "visits", "will visiting"],
      correctIndex: 1,
      explanation: "Kế hoạch đã sắp xếp → hiện tại tiếp diễn.",
    },
    {
      id: "pc-x4",
      question: "This coffee ___ delicious.",
      options: ["is tasting", "tastes", "taste", "is taste"],
      correctIndex: 1,
      explanation: "'Taste' (có vị) là động từ trạng thái → hiện tại đơn.",
    },
  ],
  advanced: [
    {
      id: "pc-a1",
      question: "He ___ always ___ his keys! It's so annoying.",
      options: ["is / losing", "does / lose", "has / lost", "was / lose"],
      correctIndex: 0,
      explanation: "Always + tiếp diễn diễn tả sự phàn nàn về thói quen gây khó chịu.",
    },
    {
      id: "pc-a2",
      question: "The climate ___ warmer every year.",
      options: ["gets", "is getting", "get", "has get"],
      correctIndex: 1,
      explanation: "Xu hướng đang thay đổi → hiện tại tiếp diễn.",
    },
    {
      id: "pc-a3",
      question: "Chọn câu đúng:",
      options: ["I am thinking you are right.", "I think you are right.", "I am think you are right.", "I thinking you are right."],
      correctIndex: 1,
      explanation: "Think = cho rằng (trạng thái) → hiện tại đơn.",
    },
    {
      id: "pc-a4",
      type: "input",
      question: "What ___ you doing these days? (trợ động từ)",
      answers: ["are"],
      explanation: "Khoảng thời gian hiện tại tạm thời (these days) → are you doing.",
    },
    {
      id: "pc-a5",
      type: "input",
      question: "She ___ (stay) with friends until she finds a flat.",
      answers: ["is staying", "'s staying"],
      explanation: "Tình huống tạm thời.",
    },
  ],
  review: {
    flashcards: [
      {
        id: "pc-fc1",
        front: "Nhóm động từ Stative Verbs KHÔNG dùng thì tiếp diễn gồm những từ nào?",
        back: "Tri giác/nhận thức: know, understand, believe, realize, recognize.\nCảm xúc: love, like, hate, want, prefer.\nSở hữu: have (sở hữu), own, belong.",
        hint: "Nhận thức, cảm xúc, sở hữu",
      },
      {
        id: "pc-fc2",
        front: "Ý nghĩa đặc biệt của cấu trúc: S + am/is/are + ALWAYS + V-ing?",
        back: "Dùng để diễn tả sự phàn nàn, khó chịu về một hành vi lặp đi lặp lại thường xuyên.\nVí dụ: You are always losing your keys!",
        hint: "Phàn nàn về hành động gây khó chịu",
      },
      {
        id: "pc-fx1",
        front: "Công thức hiện tại tiếp diễn",
        back: "S + am/is/are + V-ing",
      },
      {
        id: "pc-fx2",
        front: "Động từ nào KHÔNG chia tiếp diễn?",
        back: "Động từ trạng thái: know, like, want, believe, own, understand…",
      },
    ],
    masteryQuiz: [
      {
        id: "pc-mq1",
        question: "Look at that boy! He _______ across the busy street.",
        options: ["runs", "is running", "run", "running"],
        correctIndex: 1,
        explanation: "Có 'Look at that boy!' báo hiệu sự việc đang diễn ra trước mắt -> 'is running' (gấp đôi chữ n).",
      },
      {
        id: "pc-mx1",
        question: "Where's Tom? — He ___ a shower.",
        options: ["has", "is having", "have", "having"],
        correctIndex: 1,
        explanation: "Đang diễn ra lúc nói; have a shower là hành động nên dùng được tiếp diễn.",
      },
      {
        id: "pc-mx2",
        question: "I ___ to the gym on Mondays, but this Monday I ___ my dentist.",
        options: ["go / am seeing", "am going / see", "go / see", "am going / am seeing"],
        correctIndex: 0,
        explanation: "Thói quen → hiện tại đơn; lịch hẹn cụ thể → tiếp diễn.",
      },
    ],
  },
};

export default topic;
