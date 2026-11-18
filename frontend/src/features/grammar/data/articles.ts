import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "articles",
  level: "A1",
  title: "Articles: a, an, the",
  vietnameseTitle: "Mạo từ a, an, the",
  description: "Khi nào dùng a/an, khi nào dùng the, và khi nào không cần mạo từ nào.",
  estimatedMinutes: 20,
  theory: {
    summary:
      "Mạo từ đứng trước danh từ. A/an là mạo từ không xác định: nói tới một thứ chưa cụ thể, lần đầu nhắc tới. The là mạo từ xác định: cả người nói lẫn người nghe đều biết đang nói tới thứ nào.",
    formulas: [
      {
        type: "affirmative",
        label: "A + phụ âm",
        structure: "a + danh từ số ít đếm được bắt đầu bằng ÂM phụ âm",
        exampleEn: "She has a dog and a university degree.",
        exampleVi: "Cô ấy có một con chó và một tấm bằng đại học.",
      },
      {
        type: "affirmative",
        label: "An + nguyên âm",
        structure: "an + danh từ số ít đếm được bắt đầu bằng ÂM nguyên âm",
        exampleEn: "I waited an hour for an umbrella.",
        exampleVi: "Tôi đợi một tiếng để có một cái ô.",
      },
      {
        type: "special",
        label: "The",
        structure: "the + danh từ (số ít, số nhiều hoặc không đếm được) đã xác định",
        exampleEn: "The book you lent me is great.",
        exampleVi: "Cuốn sách bạn cho tôi mượn rất hay.",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Nhắc lần đầu dùng a/an, nhắc lại dùng the",
        explanation: "Lần đầu người nghe chưa biết là cái nào; từ lần thứ hai thì đã xác định.",
        exampleEn: "I bought a shirt. The shirt is blue.",
        exampleVi: "Tôi mua một cái áo. Cái áo đó màu xanh.",
      },
      {
        id: "u2",
        title: "The cho thứ duy nhất",
        explanation: "Mặt trời, mặt trăng, Internet, thủ đô của một nước… chỉ có một nên luôn dùng the.",
        exampleEn: "The sun rises in the east.",
        exampleVi: "Mặt trời mọc ở hướng đông.",
      },
      {
        id: "u3",
        title: "Không dùng mạo từ khi nói chung chung",
        explanation: "Danh từ số nhiều hoặc không đếm được mang nghĩa khái quát thì không cần mạo từ.",
        exampleEn: "Cats are independent. Water is essential.",
        exampleVi: "Mèo là loài độc lập. Nước là thứ thiết yếu.",
      },
    ],
    signals: [
      {
        category: "Âm đầu, không phải chữ cái đầu",
        words: ["an hour", "an honest man", "a university", "a European", "an MBA"],
        explanation: "Chọn a/an theo âm phát ra: 'hour' đọc /aʊ/ nên dùng an; 'university' đọc /juː/ nên dùng a.",
      },
      {
        category: "Thường không có mạo từ",
        words: ["go to school", "at home", "by bus", "have breakfast", "play football"],
        explanation: "Bữa ăn, môn thể thao, phương tiện sau 'by' và các cụm cố định này thường không có mạo từ.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "She is a honest person.",
        correct: "She is an honest person.",
        explanation: "Chữ h trong 'honest' câm, từ bắt đầu bằng âm nguyên âm /ɒ/.",
      },
      {
        incorrect: "I like the music.",
        correct: "I like music.",
        explanation: "Nói về âm nhạc nói chung thì không dùng the. Chỉ dùng the khi nói về một bản nhạc cụ thể.",
      },
      {
        incorrect: "My brother is engineer.",
        correct: "My brother is an engineer.",
        explanation: "Nghề nghiệp của một người là danh từ số ít đếm được, cần a/an.",
      },
    ],
    proTips: [
      "Đọc to từ đó lên: nghe thấy nguyên âm thì dùng an, nghe thấy phụ âm thì dùng a.",
      "Tự hỏi: người nghe có biết mình đang nói tới cái nào không? Có thì dùng the.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "I saw ___ elephant at the zoo yesterday.",
      options: ["a", "an", "the", "(không mạo từ)"],
      correctIndex: 1,
      explanation: "'Elephant' bắt đầu bằng âm nguyên âm /e/ và được nhắc lần đầu nên dùng an.",
    },
    {
      id: "p2",
      question: "Can you close ___ door, please?",
      options: ["a", "an", "the", "(không mạo từ)"],
      correctIndex: 2,
      explanation: "Cả hai người đều biết cánh cửa nào (cánh cửa của căn phòng đang đứng) nên dùng the.",
    },
    {
      id: "p3",
      question: "My sister wants to be ___ doctor.",
      options: ["a", "an", "the", "(không mạo từ)"],
      correctIndex: 0,
      explanation: "Nghề nghiệp, danh từ số ít, bắt đầu bằng phụ âm /d/.",
    },
    {
      id: "p4",
      question: "___ moon goes around the Earth.",
      options: ["A", "An", "The", "(không mạo từ)"],
      correctIndex: 2,
      explanation: "Mặt trăng là thứ duy nhất.",
    },
    {
      id: "p5",
      question: "I usually go to work by ___ bus.",
      options: ["a", "an", "the", "(không mạo từ)"],
      correctIndex: 3,
      explanation: "Cụm 'by + phương tiện' không dùng mạo từ: by bus, by car, by train.",
    },
    {
      id: "p6",
      type: "input",
      question: "She is ___ honest girl. (điền a / an / the)",
      answers: ["an"],
      explanation: "'Honest' có h câm, bắt đầu bằng âm nguyên âm.",
    },
    {
      id: "p7",
      type: "input",
      question: "He studies at ___ university in Hanoi. (điền a / an / the)",
      answers: ["a"],
      explanation: "'University' đọc /juː/, là âm phụ âm /j/, và chưa nói rõ trường nào nên dùng a.",
    },
    {
      id: "p8",
      type: "input",
      question: "I have a cat and a dog. ___ cat is black. (điền A / An / The)",
      answers: ["the"],
      explanation: "Con mèo đã được nhắc tới ở câu trước nên đã xác định.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "Chọn câu đúng:",
      options: [
        "The life is short.",
        "Life is short.",
        "A life is short.",
        "Lives is short.",
      ],
      correctIndex: 1,
      explanation: "Nói về 'cuộc sống' nói chung, danh từ trừu tượng không đếm được, không dùng mạo từ.",
    },
    {
      id: "a2",
      question: "She plays ___ piano, and her brother plays ___ football.",
      options: ["the / the", "the / (không)", "(không) / the", "a / a"],
      correctIndex: 1,
      explanation: "Nhạc cụ dùng the (play the piano); môn thể thao không dùng mạo từ (play football).",
    },
    {
      id: "a3",
      question: "It was ___ unusual decision, but ___ decision was right.",
      options: ["a / the", "an / a", "an / the", "the / the"],
      correctIndex: 2,
      explanation: "'Unusual' bắt đầu bằng âm nguyên âm /ʌ/ → an; nhắc lại quyết định đó → the.",
    },
    {
      id: "a4",
      type: "input",
      question: "Sửa lỗi: 'He is a European who has a MBA.' → He is a European who has ___ MBA.",
      answers: ["an"],
      explanation: "'MBA' đọc /em biː eɪ/, bắt đầu bằng âm nguyên âm nên dùng an. 'European' đọc /jʊə/ nên vẫn là a.",
    },
    {
      id: "a5",
      type: "input",
      question: "___ rich should help ___ poor. (điền cùng một mạo từ vào cả hai chỗ)",
      answers: ["the"],
      explanation: "The + tính từ chỉ một nhóm người: the rich (người giàu), the poor (người nghèo).",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "a hay an: ___ hour", back: "an hour\nVì h câm, âm đầu là /aʊ/." },
      { id: "f2", front: "a hay an: ___ university", back: "a university\nVì âm đầu là /juː/ (phụ âm)." },
      { id: "f3", front: "Khi nào dùng the?", back: "Khi người nghe biết đang nói tới thứ nào: đã nhắc trước đó, chỉ có một, hoặc được xác định bằng mệnh đề phía sau." },
      { id: "f4", front: "go to ___ school (học sinh đi học)", back: "go to school\nKhông mạo từ khi nói về mục đích chính của nơi đó." },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "There is ___ apple and ___ orange on the table.",
        options: ["a / a", "an / an", "an / a", "the / the"],
        correctIndex: 1,
        explanation: "Cả 'apple' và 'orange' đều bắt đầu bằng âm nguyên âm.",
      },
      {
        id: "m2",
        question: "___ Eiffel Tower is in Paris.",
        options: ["A", "An", "The", "(không mạo từ)"],
        correctIndex: 2,
        explanation: "Công trình nổi tiếng, duy nhất dùng the.",
      },
      {
        id: "m3",
        question: "I don't like ___ coffee, but I love ___ tea my mum makes.",
        options: ["the / the", "(không) / the", "the / (không)", "a / the"],
        correctIndex: 1,
        explanation: "Cà phê nói chung không dùng mạo từ; trà do mẹ pha là loại trà cụ thể nên dùng the.",
      },
    ],
  },
};

export default topic;
