import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "there-is-are",
  level: "A1",
  title: "There is / There are",
  vietnameseTitle: "Cấu trúc There is / There are",
  description: "Nói rằng ở đâu đó có cái gì: chia is/are theo danh từ đứng ngay sau.",
  estimatedMinutes: 15,
  theory: {
    summary:
      "There is / there are dùng để giới thiệu sự tồn tại của người hoặc vật: 'Có … ở …'. Động từ be chia theo danh từ đứng ngay sau nó.",
    formulas: [
      {
        type: "affirmative",
        label: "Khẳng định (+)",
        structure: "There is + N số ít / không đếm được · There are + N số nhiều",
        exampleEn: "There is a bank near here. There are two cafés too.",
        exampleVi: "Gần đây có một ngân hàng. Còn có hai quán cà phê nữa.",
      },
      {
        type: "negative",
        label: "Phủ định (-)",
        structure: "There isn't a/any + N · There aren't any + N số nhiều",
        exampleEn: "There isn't any milk. There aren't any chairs.",
        exampleVi: "Không còn chút sữa nào. Không có cái ghế nào.",
      },
      {
        type: "interrogative",
        label: "Nghi vấn (?)",
        structure: "Is there a/any + N? · Are there any + N? · How many + N + are there?",
        exampleEn: "Is there a pharmacy nearby? How many students are there?",
        exampleVi: "Gần đây có hiệu thuốc không? Có bao nhiêu học sinh?",
      },
    ],
    usages: [
      {
        id: "u1",
        title: "Mô tả một nơi chốn",
        explanation: "Dùng để liệt kê những gì có trong phòng, thành phố, bức tranh…",
        exampleEn: "In my room, there is a bed and there are two windows.",
        exampleVi: "Trong phòng tôi có một cái giường và hai cửa sổ.",
      },
      {
        id: "u2",
        title: "Chia theo danh từ đứng đầu danh sách",
        explanation: "Khi liệt kê, be chia theo danh từ đầu tiên ngay sau nó.",
        exampleEn: "There is a sofa and two lamps in the living room.",
        exampleVi: "Trong phòng khách có một ghế sofa và hai cái đèn.",
      },
      {
        id: "u3",
        title: "Quá khứ: there was / there were",
        explanation: "Đổi is → was, are → were khi nói về quá khứ.",
        exampleEn: "There were many people at the concert last night.",
        exampleVi: "Tối qua có rất nhiều người ở buổi hòa nhạc.",
      },
    ],
    signals: [
      {
        category: "Danh từ không đếm được → is",
        words: ["water", "money", "information", "furniture", "traffic"],
        explanation: "Không đếm được luôn đi với is/was dù nghĩa là 'nhiều'.",
      },
    ],
    commonMistakes: [
      {
        incorrect: "There have many books on the shelf.",
        correct: "There are many books on the shelf.",
        explanation: "Tiếng Việt nói 'có', nhưng tiếng Anh dùng there are, không dùng have.",
      },
      {
        incorrect: "There are some information on the website.",
        correct: "There is some information on the website.",
        explanation: "'Information' không đếm được → is.",
      },
    ],
    proTips: [
      "Nhìn vào danh từ ngay sau chỗ trống để chọn is hay are.",
      "Câu hỏi 'có … không' ở một nơi: Is there…? / Are there…? Đừng dùng 'Do you have' nếu không phải đồ của người nghe.",
    ],
  },
  practice: [
    {
      id: "p1",
      question: "There ___ a cat under the table.",
      options: ["is", "are", "have", "has"],
      correctIndex: 0,
      explanation: "'A cat' số ít → is.",
    },
    {
      id: "p2",
      question: "There ___ three bedrooms in our flat.",
      options: ["is", "are", "be", "has"],
      correctIndex: 1,
      explanation: "'Three bedrooms' số nhiều → are.",
    },
    {
      id: "p3",
      question: "___ any eggs in the fridge?",
      options: ["Is there", "Are there", "There are", "Have there"],
      correctIndex: 1,
      explanation: "Câu hỏi với danh từ số nhiều → Are there any…?",
    },
    {
      id: "p4",
      question: "There ___ much traffic this morning.",
      options: ["wasn't", "weren't", "isn't any", "aren't"],
      correctIndex: 0,
      explanation: "'Traffic' không đếm được, 'this morning' đã qua → wasn't.",
    },
    {
      id: "p5",
      question: "How many people ___ in your family?",
      options: ["is there", "are there", "there are", "have"],
      correctIndex: 1,
      explanation: "How many + N số nhiều + are there?",
    },
    {
      id: "p6",
      type: "input",
      question: "There ___ some juice in the glass. (is / are)",
      answers: ["is"],
      explanation: "'Juice' không đếm được → is.",
    },
    {
      id: "p7",
      type: "input",
      question: "There ___ two big parks in my city. (is / are)",
      answers: ["are"],
      explanation: "'Two big parks' số nhiều → are.",
    },
    {
      id: "p8",
      type: "input",
      question: "Last year there ___ a fire in this building. (was / were)",
      answers: ["was"],
      explanation: "Quá khứ, danh từ số ít → was.",
    },
  ],
  advanced: [
    {
      id: "a1",
      question: "There ___ a pen and some notebooks on the desk.",
      options: ["is", "are", "be", "have"],
      correctIndex: 0,
      explanation: "Liệt kê thì chia theo danh từ đầu tiên 'a pen' → is.",
    },
    {
      id: "a2",
      question: "Chọn câu đúng nghĩa 'Ngày mai sẽ có một cuộc họp':",
      options: [
        "There will be a meeting tomorrow.",
        "There will have a meeting tomorrow.",
        "It will be a meeting tomorrow.",
        "There is going to have a meeting tomorrow.",
      ],
      correctIndex: 0,
      explanation: "Tương lai của there is là there will be (hoặc there is going to be).",
    },
    {
      id: "a3",
      question: "There ___ a lot of changes since you left.",
      options: ["is", "has been", "have been", "was"],
      correctIndex: 2,
      explanation: "Hiện tại hoàn thành, 'a lot of changes' số nhiều → there have been.",
    },
    {
      id: "a4",
      type: "input",
      question: "Viết phủ định: There are some apples. → There ___ any apples.",
      answers: ["aren't", "are not"],
      explanation: "Số nhiều phủ định → there aren't any.",
    },
    {
      id: "a5",
      type: "input",
      question: "Đặt câu hỏi: ___ there a post office near here? (is / are)",
      answers: ["is"],
      explanation: "'A post office' số ít → Is there…?",
    },
  ],
  review: {
    flashcards: [
      { id: "f1", front: "'Có một cái bàn' tiếng Anh là gì?", back: "There is a table.\nKhông dùng 'There has' hay 'Have a table'." },
      { id: "f2", front: "There is hay there are + money?", back: "There is money.\nMoney không đếm được." },
      { id: "f3", front: "Quá khứ của there are", back: "there were" },
      { id: "f4", front: "Hỏi số lượng với there", back: "How many + N số nhiều + are there?" },
    ],
    masteryQuiz: [
      {
        id: "m1",
        question: "There ___ some good news for you.",
        options: ["is", "are", "have", "were"],
        correctIndex: 0,
        explanation: "'News' không đếm được dù có đuôi s → is.",
      },
      {
        id: "m2",
        question: "___ any students in the classroom now?",
        options: ["Is there", "Are there", "Was there", "Have there"],
        correctIndex: 1,
        explanation: "'Students' số nhiều, hiện tại → Are there…?",
      },
      {
        id: "m3",
        question: "There ___ many tourists here in 2019.",
        options: ["was", "were", "are", "is"],
        correctIndex: 1,
        explanation: "Quá khứ, số nhiều → were.",
      },
    ],
  },
};

export default topic;
