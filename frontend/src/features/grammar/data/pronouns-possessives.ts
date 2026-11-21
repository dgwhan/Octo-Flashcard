import type { GrammarTopicInput } from "../types";

const topic: GrammarTopicInput = {
  id: "pronouns-possessives",
  level: "A1",
  title: "Pronouns & Possessives",
  vietnameseTitle: "Đại từ & Sở hữu",
  description: "I/me/my/mine, sở hữu cách 's và đại từ phản thân myself, yourself…",
  estimatedMinutes: 20,
  theory: {
    summary:
      "Mỗi ngôi có bốn dạng: chủ ngữ (I), tân ngữ (me), tính từ sở hữu đứng trước danh từ (my book) và đại từ sở hữu đứng một mình (mine). Ngoài ra, sở hữu cách 's dùng cho người và động vật.",
    formulas: [
      {
        type: "affirmative",
        label: "Chủ ngữ → Tân ngữ",
        structure: "I→me · you→you · he→him · she→her · it→it · we→us · they→them",
        exampleEn: "She called him, and he called her back.",
        exampleVi: "Cô ấy gọi anh ấy, và anh ấy gọi lại cho cô ấy.",
      },
      {
        type: "affirmative",
        label: "Tính từ sở hữu + N",
        structure: "my · your · his · her · its · our · their + danh từ",
        exampleEn: "This is my phone, not your phone.",
        exampleVi: "Đây là điện thoại của tôi, không phải của bạn.",
      },
      {
        type: "special",
        label: "Đại từ sở hữu (đứng một mình)",
        structure: "mine · yours · his · hers · ours · theirs",
        exampleEn: "This phone is mine. Where is yours?",
        exampleVi: "Điện thoại này là của tôi. Của bạn đâu?",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Sở hữu cách 's",
        explanation: "Người/động vật + 's + danh từ. Danh từ số nhiều có đuôi s thì chỉ thêm dấu '.",
        exampleEn: "Tom's car · my parents' house · the children's toys",
        exampleVi: "xe của Tom · nhà của bố mẹ tôi · đồ chơi của bọn trẻ",
      },
      {
        id: "u2",
        title: "Đại từ phản thân -self/-selves",
        explanation: "Dùng khi chủ ngữ và tân ngữ là cùng một người, hoặc để nhấn mạnh 'tự mình'.",
        exampleEn: "She taught herself English. I did it myself.",
        exampleVi: "Cô ấy tự học tiếng Anh. Tôi tự làm việc đó.",
      },
      {
        id: "u3",
        title: "Its và it's khác nhau",
        explanation: "Its là tính từ sở hữu (của nó). It's là viết tắt của it is / it has.",
        exampleEn: "The cat licked its paw. It's raining.",
        exampleVi: "Con mèo liếm chân của nó. Trời đang mưa.",
      },
    ],
    signals: [
      {
        category: "Sau giới từ và sau động từ",
        words: ["with me", "for him", "to us", "love them", "help her"],
        explanation: "Sau giới từ hoặc động từ luôn dùng dạng tân ngữ.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "Me and my friend went to the cinema.",
        correct: "My friend and I went to the cinema.",
        explanation: "Ở vị trí chủ ngữ phải dùng I, và lịch sự thì đặt người kia lên trước.",
      },
      {
        incorrect: "The dog wagged it's tail.",
        correct: "The dog wagged its tail.",
        explanation: "Sở hữu của 'it' là its, không có dấu nháy.",
      },
      {
        incorrect: "This book is my.",
        correct: "This book is mine.",
        explanation: "Đứng một mình, không có danh từ theo sau, thì dùng đại từ sở hữu.",
      },
    ],
    proTips: [
      "Mẹo kiểm tra I hay me: bỏ người còn lại đi. 'Me went…' sai thì phải là 'I'.",
      "Có danh từ theo sau → my/your/her… Không có danh từ → mine/yours/hers…",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "Can you help ___ with this box?",
      options: ["I", "me", "my", "mine"],
      correctIndex: 1,
      explanation: "Sau động từ 'help' dùng tân ngữ me.",
    },
    {
      id: "p2",
      question: "Is this ___ bag or Lan's?",
      options: ["you", "yours", "your", "yourself"],
      correctIndex: 2,
      explanation: "Có danh từ 'bag' theo sau nên dùng tính từ sở hữu your.",
    },
    {
      id: "p3",
      question: "That house is ___. We bought it last year.",
      options: ["our", "ours", "us", "we"],
      correctIndex: 1,
      explanation: "Đứng một mình cuối câu, dùng đại từ sở hữu ours.",
    },
    {
      id: "p4",
      question: "The children enjoyed ___ at the party.",
      options: ["them", "their", "themselves", "theirs"],
      correctIndex: 2,
      explanation: "'Enjoy oneself' là vui vẻ; chủ ngữ và tân ngữ cùng là the children.",
    },
    {
      id: "p5",
      question: "This is ___ bike. (của anh trai tôi)",
      options: ["my brother bike", "my brother's", "my brothers'", "my brother of"],
      correctIndex: 1,
      explanation: "Một người anh → my brother's bike.",
    },
    {
      id: "p6",
      type: "input",
      question: "Look at that bird. ___ wings are very colourful. (điền Its / It's)",
      answers: ["its"],
      explanation: "Đôi cánh của nó → tính từ sở hữu its.",
    },
    {
      id: "p7",
      type: "input",
      question: "I don't need help. I can do it ___. (đại từ phản thân)",
      answers: ["myself"],
      explanation: "Chủ ngữ I → myself.",
    },
    {
      id: "p8",
      type: "input",
      question: "Mary and John love ___ kids very much. (tính từ sở hữu)",
      answers: ["their"],
      explanation: "Mary and John = they → their.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "Between you and ___, I don't trust him.",
      options: ["I", "me", "my", "myself"],
      correctIndex: 1,
      explanation: "Sau giới từ 'between' dùng tân ngữ: between you and me.",
    },
    {
      id: "a2",
      question: "The ___ toilets are on the second floor.",
      options: ["women's", "womens'", "woman's", "womens"],
      correctIndex: 0,
      explanation: "'Women' là số nhiều bất quy tắc không có đuôi s → thêm 's: women's.",
    },
    {
      id: "a3",
      question: "She is a friend of ___.",
      options: ["me", "my", "mine", "I"],
      correctIndex: 2,
      explanation: "Cấu trúc 'a friend of + đại từ sở hữu': a friend of mine.",
    },
    {
      id: "a4",
      type: "input",
      question: "Chuyển sang sở hữu cách: the house of my parents → my ___ house",
      answers: ["parents'"],
      explanation: "Danh từ số nhiều có đuôi s chỉ thêm dấu nháy: parents'.",
    },
    {
      id: "a5",
      type: "input",
      question: "They looked at ___ in the mirror and laughed. (nhìn chính họ)",
      answers: ["themselves"],
      explanation: "Chủ ngữ they, tự nhìn chính mình → themselves.",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "Bốn dạng của ngôi 'she'", back: "she (chủ ngữ) · her (tân ngữ) · her + N (tính từ sở hữu) · hers (đại từ sở hữu)" },
      { id: "f2", front: "its hay it's?", back: "its = của nó\nit's = it is / it has" },
      { id: "f3", front: "Sở hữu cách của 'the students'", back: "the students' books\nSố nhiều có s → chỉ thêm '" },
      { id: "f4", front: "Đại từ phản thân của 'we'", back: "ourselves" },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "Is this pen ___? — No, it's ___.",
        options: ["your / her", "yours / hers", "yours / her", "your / hers"],
        correctIndex: 1,
        explanation: "Cả hai đứng một mình, không có danh từ theo sau → đại từ sở hữu.",
      },
      {
        id: "m2",
        question: "My parents and ___ are going to Da Nang.",
        options: ["me", "I", "my", "mine"],
        correctIndex: 1,
        explanation: "Vị trí chủ ngữ → I.",
      },
      {
        id: "m3",
        question: "The company changed ___ logo last month.",
        options: ["it's", "its", "their's", "it"],
        correctIndex: 1,
        explanation: "Sở hữu của it → its (không có dấu nháy).",
      },
    ],
  },
};

export default topic;
