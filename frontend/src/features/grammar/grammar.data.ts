import { GrammarTopic } from "./grammar.types";

export const GRAMMAR_ROADMAP_TOPICS: GrammarTopic[] = [
  // =========================================================================
  // STAGE 1: NỀN TẢNG CỐT LÕI (A1 - A2)
  // =========================================================================
  {
    id: "present-simple",
    stage: 1,
    stageName: "Giai đoạn 1: Nền tảng cơ bản (A1 - A2)",
    level: "A1",
    order: 1,
    title: "Present Simple Tense",
    vietnameseTitle: "Thì Hiện tại đơn",
    description: "Nền móng ngữ pháp diễn đạt thói quen hàng ngày, sự thật hiển nhiên và lịch trình cố định.",
    estimatedMinutes: 20,
    badgeColor: "#10b981",
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
      ],
    },
  },

  {
    id: "present-continuous",
    stage: 1,
    stageName: "Giai đoạn 1: Nền tảng cơ bản (A1 - A2)",
    level: "A1",
    order: 2,
    title: "Present Continuous Tense",
    vietnameseTitle: "Thì Hiện tại tiếp diễn",
    description: "Diễn tả hành động đang diễn ra ngay tại thời điểm nói hoặc kế hoạch chắc chắn trong tương lai gần.",
    estimatedMinutes: 20,
    badgeColor: "#10b981",
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
      ],
      masteryQuiz: [
        {
          id: "pc-mq1",
          question: "Look at that boy! He _______ across the busy street.",
          options: ["runs", "is running", "run", "running"],
          correctIndex: 1,
          explanation: "Có 'Look at that boy!' báo hiệu sự việc đang diễn ra trước mắt -> 'is running' (gấp đôi chữ n).",
        },
      ],
    },
  },

  {
    id: "past-simple",
    stage: 1,
    stageName: "Giai đoạn 1: Nền tảng cơ bản (A1 - A2)",
    level: "A2",
    order: 3,
    title: "Past Simple Tense",
    vietnameseTitle: "Thì Quá khứ đơn",
    description: "Diễn tả hành động đã bắt đầu và hoàn toàn kết thúc tại một thời điểm xác định trong quá khứ.",
    estimatedMinutes: 25,
    badgeColor: "#10b981",
    theory: {
      summary: "Thì Quá khứ đơn (Past Simple) diễn tả sự việc, hành động đã xảy ra và chấm dứt hoàn toàn trong quá khứ, không còn liên hệ trực tiếp đến hiện tại.",
      formulas: [
        {
          type: "affirmative",
          label: "Khẳng định (+)",
          structure: "S + V2/ed + (O)  hoặc  S + was/were + (N/Adj)",
          exampleEn: "We visited our grandparents in Da Lat last summer.",
          exampleVi: "Chúng tôi đã đến thăm ông bà ở Đà Lạt mùa hè năm ngoái.",
        },
        {
          type: "negative",
          label: "Phủ định (-)",
          structure: "S + did + not (didn't) + V-bare  hoặc  S + was/were + not",
          exampleEn: "She didn't attend the meeting yesterday.",
          exampleVi: "Cô ấy đã không tham dự cuộc họp hôm qua.",
        },
        {
          type: "interrogative",
          label: "Nghi vấn (?)",
          structure: "Did + S + V-bare?  hoặc  Was/Were + S + (N/Adj)?",
          exampleEn: "Did you watch the football match last night?",
          exampleVi: "Bạn có xem trận bóng đá tối qua không?",
        },
      ],
      usages: [
        {
          id: "ps-u1",
          title: "Hành động đã xảy ra và kết thúc trong quá khứ có mốc thời gian rõ ràng",
          explanation: "Thời điểm xảy ra được chỉ rõ hoặc ngầm hiểu trong ngữ cảnh.",
          exampleEn: "Thomas Edison invented the light bulb in 1879.",
          exampleVi: "Thomas Edison đã phát minh ra bóng đèn vào năm 1879.",
        },
        {
          id: "ps-u2",
          title: "Chuỗi các hành động liên tiếp xảy ra trong quá khứ",
          explanation: "Hành động này vừa dứt thì hành động kia tiếp nối ngay (kể chuyện).",
          exampleEn: "He opened the door, turned on the light, and sat down.",
          exampleVi: "Anh ấy mở cửa, bật đèn và ngồi xuống.",
        },
      ],
      signals: [
        {
          category: "Từ chỉ thời gian trong quá khứ",
          words: ["yesterday", "last night/week/month/year", "ago (two days ago)", "in 1995", "when I was young"],
          explanation: "Đều là mốc thời gian đã chấm dứt hoàn toàn.",
        },
      ],
      commonMistakes: [
        {
          incorrect: "Did you saw the new movie yesterday?",
          correct: "Did you see the new movie yesterday?",
          explanation: "Trong câu hỏi hoặc phủ định khi đã có trợ động từ 'did/didn't', động từ chính phải ở dạng nguyên thể (V-bare).",
        },
        {
          incorrect: "He writed a letter to his pen pal.",
          correct: "He wrote a letter to his pen pal.",
          explanation: "'Write' là động từ bất quy tắc (Write -> Wrote -> Written), không thêm đuôi -ed.",
        },
      ],
      proTips: [
        "Cách phát âm đuôi -ed: /id/ sau âm /t, d/ (wanted, decided); /t/ sau âm vô thanh /p, k, f, s, sh, ch/ (stopped, washed); /d/ cho các trường hợp còn lại (played, loved).",
      ],
    },
    practice: [
      {
        id: "past-q1",
        question: "They _______ in Da Nang for five years before moving to Ho Chi Minh City.",
        options: ["lived", "live", "are living", "have lived"],
        correctIndex: 0,
        explanation: "Sự việc sống ở Đà Nẵng đã kết thúc trong quá khứ (vì nay đã chuyển vào TP.HCM) -> dùng thì quá khứ đơn 'lived'.",
      },
      {
        id: "past-q2",
        question: "What time _______ you arrive at the airport last night?",
        options: ["do", "did", "were", "had"],
        correctIndex: 1,
        explanation: "Câu hỏi quá khứ đơn có 'last night' và động từ thường 'arrive' -> dùng trợ động từ 'did'.",
      },
      {
        id: "past-q3",
        question: "She _______ her keys on the dining table yesterday evening.",
        options: ["leave", "left", "leaved", "leaving"],
        correctIndex: 1,
        explanation: "'Leave' là động từ bất quy tắc có dạng quá khứ V2 là 'left'.",
      },
      {
        id: "past-q4",
        question: "We _______ go camping last weekend because the weather was stormy.",
        options: ["didn't", "don't", "wasn't", "weren't"],
        correctIndex: 0,
        explanation: "Phủ định quá khứ đơn với động từ thường 'go' dùng 'didn't go'.",
      },
    ],
    review: {
      flashcards: [
        {
          id: "past-fc1",
          front: "3 cách phát âm chuẩn của đuôi -ed trong tiếng Anh?",
          back: "1. /id/: Khi tận cùng bằng /t/ hoặc /d/ (wanted, needed)\n2. /t/: Khi tận cùng bằng âm vô thanh /p, k, f, s, sh, ch/\n3. /d/: Các âm còn lại (called, cleaned)",
          hint: "/id/, /t/, /d/",
        },
        {
          id: "past-fc2",
          front: "Dạng V2 của các động từ bất quy tắc quen thuộc: Buy, Bring, Think, Catch?",
          back: "Buy -> Bought\nBring -> Brought\nThink -> Thought\nCatch -> Caught",
          hint: "Đều có đuôi -ought / -aught",
        },
      ],
      masteryQuiz: [
        {
          id: "past-mq1",
          question: "I _______ a strange noise while I was reading in bed last night.",
          options: ["hear", "heard", "hearing", "have heard"],
          correctIndex: 1,
          explanation: "Quá khứ của động từ bất quy tắc 'hear' là 'heard' /hɜːrd/.",
        },
      ],
    },
  },

  {
    id: "future-simple",
    stage: 1,
    stageName: "Giai đoạn 1: Nền tảng cơ bản (A1 - A2)",
    level: "A2",
    order: 4,
    title: "Future Simple & Be Going To",
    vietnameseTitle: "Tương lai đơn & Be Going To",
    description: "Phân biệt quyết định tức thời, lời hứa hẹn (Will) và kế hoạch có chủ đích, dự đoán có bằng chứng (Be going to).",
    estimatedMinutes: 20,
    badgeColor: "#10b981",
    theory: {
      summary: "Tương lai đơn (Will + V-bare) dùng cho quyết định bột phát tại thời điểm nói hoặc lời hứa. 'Be going to' dùng cho kế hoạch đã dự định trước hoặc dự đoán có căn cứ mắt thấy tai nghe.",
      formulas: [
        {
          type: "affirmative",
          label: "Will (Quyết định tức thời / Hứa hẹn)",
          structure: "S + will ('ll) + V-bare",
          exampleEn: "Don't worry, I will help you with this luggage.",
          exampleVi: "Đừng lo, tôi sẽ giúp bạn xách hành lý này.",
        },
        {
          type: "affirmative",
          label: "Be Going To (Kế hoạch / Dự đoán có chứng cứ)",
          structure: "S + am/is/are + going to + V-bare",
          exampleEn: "Look at those dark clouds! It is going to rain.",
          exampleVi: "Nhìn những đám mây đen kìa! Trời sắp mưa rồi.",
        },
      ],
      usages: [
        {
          id: "fs-u1",
          title: "Will: Quyết định ngay tại thời điểm nói",
          explanation: "Không có sự chuẩn bị hay lên kế hoạch từ trước.",
          exampleEn: "The phone is ringing. I'll get it!",
          exampleVi: "Điện thoại đang reo. Tôi sẽ nghe máy!",
        },
        {
          id: "fs-u2",
          title: "Be going to: Dự đoán dựa trên bằng chứng hiện tại",
          explanation: "Có dấu hiệu thực tế rõ ràng để tin sự việc sắp xảy ra.",
          exampleEn: "He is driving too fast; he is going to crash!",
          exampleVi: "Anh ta phóng nhanh quá; anh ta sắp đâm xe rồi!",
        },
      ],
      signals: [
        {
          category: "Từ chỉ tương lai",
          words: ["tomorrow", "next week/month/year", "soon", "in 2 days"],
          explanation: "Các mốc thời gian sắp tới.",
        },
      ],
      commonMistakes: [
        {
          incorrect: "I will study medicine next semester, I enrolled yesterday.",
          correct: "I am going to study medicine next semester, I enrolled yesterday.",
          explanation: "Đã có đăng ký từ hôm qua (kế hoạch có trước) nên phải dùng 'be going to'.",
        },
      ],
      proTips: [
        "Nhớ câu thần chú: 'Will' = Tức thời & Hứa hẹn; 'Be going to' = Đã tính trước & Mắt thấy tai nghe.",
      ],
    },
    practice: [
      {
        id: "fs-q1",
        question: "A: 'The phone is ringing.' - B: 'OK, I _______ answer it.'",
        options: ["am going to", "will", "am answering", "answer"],
        correctIndex: 1,
        explanation: "Quyết định bột phát ngay tại thời điểm nghe tiếng chuông điện thoại -> dùng 'will'.",
      },
      {
        id: "fs-q2",
        question: "Look at the dark clouds! It _______ rain very soon.",
        options: ["will", "is going to", "rains", "is raining"],
        correctIndex: 1,
        explanation: "Có bằng chứng thực tế rõ ràng (mây đen) chứng tỏ trời sắp mưa -> dùng 'is going to'.",
      },
      {
        id: "fs-q3",
        question: "We bought our plane tickets last week. We _______ visit France this summer.",
        options: ["will", "are going to", "shall", "would"],
        correctIndex: 1,
        explanation: "Đã mua vé máy bay từ tuần trước (kế hoạch chuẩn bị trước) -> dùng 'are going to'.",
      },
    ],
    review: {
      flashcards: [
        {
          id: "fs-fc1",
          front: "Khi nào bắt buộc dùng 'Be going to' thay vì 'Will'?",
          back: "1. Kế hoạch, dự định đã có sẵn trước thời điểm nói.\n2. Dự đoán dựa trên bằng chứng cụ thể trước mắt (như mây đen, người nghiêng ngả...).",
          hint: "Kế hoạch trước & Bằng chứng thực tế",
        },
      ],
      masteryQuiz: [
        {
          id: "fs-mq1",
          question: "I promise I _______ tell anyone your secret.",
          options: ["will not", "am not going to", "don't", "haven't"],
          correctIndex: 0,
          explanation: "Lời hứa hẹn (promise) luôn đi kèm với 'will / will not (won't)'.",
        },
      ],
    },
  },

  {
    id: "countable-uncountable",
    stage: 1,
    stageName: "Giai đoạn 1: Nền tảng cơ bản (A1 - A2)",
    level: "A2",
    order: 5,
    title: "Countable & Uncountable Nouns",
    vietnameseTitle: "Danh từ đếm được & Không đếm được",
    description: "Nắm vững mạo từ a/an/some/any, các lượng từ much/many, few/little và các danh từ dễ gây nhầm lẫn.",
    estimatedMinutes: 20,
    badgeColor: "#10b981",
    theory: {
      summary: "Danh từ đếm được có thể đếm theo số lượng đơn lẻ và có dạng số nhiều (thêm s/es). Danh từ không đếm được là chất liệu, khái niệm trừu tượng, không có số nhiều và luôn đi với động từ số ít.",
      formulas: [
        {
          type: "special",
          label: "Lượng từ với Danh từ Đếm được",
          structure: "Many / A few / Few / A number of + N(số nhiều)",
          exampleEn: "She has many books on history.",
          exampleVi: "Cô ấy có rất nhiều cuốn sách về lịch sử.",
        },
        {
          type: "special",
          label: "Lượng từ với Danh từ Không đếm được",
          structure: "Much / A little / Little / An amount of + N(không đếm được)",
          exampleEn: "We don't have much time left.",
          exampleVi: "Chúng ta không còn nhiều thời gian.",
        },
      ],
      usages: [
        {
          id: "cu-u1",
          title: "Some vs Any",
          explanation: "'Some' dùng trong câu khẳng định hoặc lời mời/yêu cầu lịch sự. 'Any' dùng trong câu phủ định và nghi vấn thông thường.",
          exampleEn: "Would you like some coffee? / I don't have any money.",
          exampleVi: "Bạn có muốn dùng chút cà phê không? / Tôi không có đồng nào.",
        },
      ],
      signals: [
        {
          category: "Các danh từ không đếm được phổ biến trong tiếng Anh",
          words: ["information", "advice", "furniture", "luggage", "news", "bread", "homework", "money"],
          explanation: "Tuyệt đối không thêm -s/es vào các từ này trong tiếng Anh.",
        },
      ],
      commonMistakes: [
        {
          incorrect: "He gave me an useful advice.",
          correct: "He gave me a piece of useful advice.",
          explanation: "'Advice' là danh từ không đếm được, không dùng 'an advice'. Dùng đơn vị đo lường 'a piece of advice'.",
        },
      ],
      proTips: [
        "Phân biệt 'a few' (có một vài, đủ dùng) với 'few' (rất ít, hầu như không có, mang nghĩa tiêu cực). Tương tự: 'a little' (có một ít) vs 'little' (hầu như không có gì).",
      ],
    },
    practice: [
      {
        id: "cu-q1",
        question: "Could you please give me _______ information about the summer course?",
        options: ["some", "an", "many", "a few"],
        correctIndex: 0,
        explanation: "'information' là danh từ không đếm được, câu yêu cầu lịch sự dùng 'some'.",
      },
      {
        id: "cu-q2",
        question: "There are too _______ cars in the city center during rush hours.",
        options: ["much", "many", "a little", "amount of"],
        correctIndex: 1,
        explanation: "'cars' là danh từ đếm được số nhiều -> dùng 'many'.",
      },
      {
        id: "cu-q3",
        question: "Unfortunately, I have _______ money left, so I cannot buy lunch today.",
        options: ["a little", "little", "a few", "few"],
        correctIndex: 1,
        explanation: "'money' không đếm được. Nghĩa câu tiêu cực (không đủ tiền ăn trưa) -> dùng 'little' (hầu như không có).",
      },
    ],
    review: {
      flashcards: [
        {
          id: "cu-fc1",
          front: "Các danh từ tiếng Anh người Việt hay tưởng là đếm được nhưng thực tế là KHÔNG đếm được?",
          back: "Information (thông tin), Advice (lời khuyên), Furniture (đồ nội thất), Baggage/Luggage (hành lý), Homework (bài tập về nhà).",
          hint: "Advice, Information, Furniture...",
        },
      ],
      masteryQuiz: [
        {
          id: "cu-mq1",
          question: "The news on television _______ very shocking today.",
          options: ["is", "are", "were", "have been"],
          correctIndex: 0,
          explanation: "'News' tuy có chữ s nhưng là danh từ không đếm được (tin tức) nên luôn chia động từ số ít 'is'.",
        },
      ],
    },
  },

  // =========================================================================
  // STAGE 2: TRUNG CẤP THÔNG DỤNG (B1)
  // =========================================================================
  {
    id: "present-perfect",
    stage: 2,
    stageName: "Giai đoạn 2: Trung cấp phát triển (B1)",
    level: "B1",
    order: 6,
    title: "Present Perfect Tense",
    vietnameseTitle: "Thì Hiện tại hoàn thành",
    description: "Kết nối quá khứ với hiện tại: trải nghiệm, hành động kéo dài từ quá khứ và kết quả còn lưu lại ở hiện tại.",
    estimatedMinutes: 25,
    badgeColor: "#3b82f6",
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
      ],
      masteryQuiz: [
        {
          id: "pp-mq1",
          question: "Mr. David has worked as a senior software architect _______ more than fifteen years.",
          options: ["since", "for", "from", "in"],
          correctIndex: 1,
          explanation: "'more than fifteen years' là một khoảng thời gian dài -> dùng 'for'.",
        },
      ],
    },
  },

  {
    id: "comparatives-superlatives",
    stage: 2,
    stageName: "Giai đoạn 2: Trung cấp phát triển (B1)",
    level: "B1",
    order: 7,
    title: "Comparatives & Superlatives",
    vietnameseTitle: "So sánh hơn & So sánh nhất",
    description: "Quy tắc so sánh tính từ và trạng từ ngắn/dài, các dạng bất quy tắc và cấu trúc so sánh bằng/càng ngày càng.",
    estimatedMinutes: 20,
    badgeColor: "#3b82f6",
    theory: {
      summary: "So sánh hơn dùng để so sánh giữa 2 đối tượng (Adj-er than / more Adj than). So sánh nhất dùng để so sánh một đối tượng với toàn bộ tập thể từ 3 đối tượng trở lên (the Adj-est / the most Adj).",
      formulas: [
        {
          type: "affirmative",
          label: "So sánh hơn (Tính từ ngắn)",
          structure: "S1 + be + Adj-er + than + S2",
          exampleEn: "This laptop is faster than my old one.",
          exampleVi: "Chiếc máy tính xách tay này nhanh hơn chiếc cũ của tôi.",
        },
        {
          type: "affirmative",
          label: "So sánh hơn (Tính từ dài)",
          structure: "S1 + be + more + Adj + than + S2",
          exampleEn: "Health is more important than wealth.",
          exampleVi: "Sức khỏe quan trọng hơn tiền tài.",
        },
        {
          type: "special",
          label: "So sánh nhất",
          structure: "S + be + the + Adj-est / the most + Adj",
          exampleEn: "Mount Everest is the highest mountain in the world.",
          exampleVi: "Đỉnh Everest là ngọn núi cao nhất trên thế giới.",
        },
      ],
      usages: [
        {
          id: "cs-u1",
          title: "Các tính từ bất quy tắc đặc biệt",
          explanation: "Good -> Better -> The best; Bad -> Worse -> The worst; Far -> Farther/Further -> The farthest/furthest.",
          exampleEn: "Her presentation was much better than yesterday's.",
          exampleVi: "Bài thuyết trình của cô ấy tốt hơn nhiều so với hôm qua.",
        },
      ],
      signals: [
        {
          category: "Từ nhận diện",
          words: ["than (trong so sánh hơn)", "the (trong so sánh nhất)", "as... as (so sánh bằng)"],
          explanation: "Từ khóa chính báo hiệu cấu trúc so sánh.",
        },
      ],
      commonMistakes: [
        {
          incorrect: "She is more taller than her sister.",
          correct: "She is taller than her sister.",
          explanation: "Tính từ ngắn 'tall' đã thêm đuôi -er thì tuyệt đối không thêm 'more' đằng trước.",
        },
      ],
      proTips: [
        "Tính từ 2 âm tiết tận cùng bằng -y (happy, easy, noisy, heavy) được coi như tính từ ngắn: đổi y thành i rồi thêm -er/-est (happier, the happiest).",
      ],
    },
    practice: [
      {
        id: "cs-q1",
        question: "This exercise is _______ than the one we did yesterday.",
        options: ["more easy", "easier", "easiest", "most easy"],
        correctIndex: 1,
        explanation: "'Easy' kết thúc bằng 'y' nên coi là tính từ ngắn -> đổi thành 'easier'.",
      },
      {
        id: "cs-q2",
        question: "Of the three candidates, Elena is clearly the _______ qualified for the position.",
        options: ["more", "most", "better", "best of"],
        correctIndex: 1,
        explanation: "So sánh giữa 3 người (từ 3 đối tượng trở lên) dùng so sánh nhất: 'the most qualified'.",
      },
      {
        id: "cs-q3",
        question: "The air pollution in this city is getting _______ than ever before.",
        options: ["worse", "badder", "worst", "more bad"],
        correctIndex: 0,
        explanation: "'Bad' là tính từ bất quy tắc, dạng so sánh hơn là 'worse'.",
      },
    ],
    review: {
      flashcards: [
        {
          id: "cs-fc1",
          front: "Dạng so sánh hơn và so sánh nhất của: Good, Bad, Little, Many/Much?",
          back: "- Good -> Better -> The best\n- Bad -> Worse -> The worst\n- Little -> Less -> The least\n- Many/Much -> More -> The most",
          hint: "Bảng tính từ bất quy tắc",
        },
      ],
      masteryQuiz: [
        {
          id: "cs-mq1",
          question: "Nothing is _______ than peace of mind.",
          options: ["preciouser", "more precious", "the most precious", "as precious"],
          correctIndex: 1,
          explanation: "'Precious' là tính từ dài có 2 âm tiết không tận cùng bằng y -> dùng 'more precious than'.",
        },
      ],
    },
  },

  {
    id: "modal-verbs",
    stage: 2,
    stageName: "Giai đoạn 2: Trung cấp phát triển (B1)",
    level: "B1",
    order: 8,
    title: "Modal Verbs",
    vietnameseTitle: "Động từ khuyết thiếu",
    description: "Sử dụng chính xác Can, Could, Must, Have to, Should, May, Might để thể hiện khả năng, nghĩa vụ và lời khuyên.",
    estimatedMinutes: 20,
    badgeColor: "#3b82f6",
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
    ],
    review: {
      flashcards: [
        {
          id: "mv-fc1",
          front: "Ý nghĩa của 'Mustn't' khác 'Don't have to' như thế nào?",
          back: "- Mustn't = Bị CẤM ĐOÁN, không được phép làm (vi phạm sẽ bị phạt).\n- Don't have to = KHÔNG CẦN THIẾT, không bắt buộc (thích thì làm, không thích thì thôi).",
          hint: "Cấm vs Không cần",
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
      ],
    },
  },

  {
    id: "passive-voice",
    stage: 2,
    stageName: "Giai đoạn 2: Trung cấp phát triển (B1)",
    level: "B1",
    order: 9,
    title: "Passive Voice",
    vietnameseTitle: "Câu bị động",
    description: "Biến đổi câu chủ động sang bị động: nhấn mạnh vào đối tượng chịu tác động hoặc khi người thực hiện không xác định.",
    estimatedMinutes: 25,
    badgeColor: "#3b82f6",
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
    ],
    review: {
      flashcards: [
        {
          id: "pv-fc1",
          front: "Những động từ nào TUYỆT ĐỐI không chia ở thể bị động (Passive Voice)?",
          back: "Nội động từ (không có tân ngữ đi sau): happen, occur, appear, disappear, die, exist, arrive, remain.",
          hint: "Nội động từ: happen, disappear...",
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
      ],
    },
  },

  {
    id: "conditionals-0-1",
    stage: 2,
    stageName: "Giai đoạn 2: Trung cấp phát triển (B1)",
    level: "B1",
    order: 10,
    title: "Conditionals Type 0 & 1",
    vietnameseTitle: "Câu điều kiện loại 0 & Loại 1",
    description: "Diễn tả chân lý khoa học, thói quen hiển nhiên (Loại 0) và điều kiện có thật có thể xảy ra ở hiện tại hoặc tương lai (Loại 1).",
    estimatedMinutes: 20,
    badgeColor: "#3b82f6",
    theory: {
      summary: "Câu điều kiện loại 0 diễn đạt sự thật hiển nhiên (If + Hiện tại đơn, Hiện tại đơn). Câu điều kiện loại 1 diễn đạt khả năng có thật ở hiện tại hoặc tương lai (If + Hiện tại đơn, S + will + V-bare).",
      formulas: [
        {
          type: "affirmative",
          label: "Điều kiện Loại 0 (Sự thật khoa học)",
          structure: "If / When + S + V(s/es), S + V(s/es)",
          exampleEn: "If you heat ice, it melts.",
          exampleVi: "Nếu bạn làm nóng nước đá, nó tan chảy.",
        },
        {
          type: "affirmative",
          label: "Điều kiện Loại 1 (Có thật ở tương lai)",
          structure: "If + S + V(s/es), S + will / can / may + V-bare",
          exampleEn: "If it rains tomorrow, we will stay at home.",
          exampleVi: "Nếu ngày mai trời mưa, chúng tôi sẽ ở nhà.",
        },
      ],
      usages: [
        {
          id: "c01-u1",
          title: "Unless = If ... not (Trừ phi)",
          explanation: "Unless mang nghĩa phủ định, nên mệnh đề chứa Unless không dùng trợ động từ phủ định nữa.",
          exampleEn: "You will fail the exam unless you study hard.",
          exampleVi: "Bạn sẽ thi trượt trừ phi bạn học hành chăm chỉ (= If you don't study hard).",
        },
      ],
      signals: [
        {
          category: "Liên từ điều kiện",
          words: ["If", "When", "Unless", "As long as", "Provided that"],
          explanation: "Mở đầu mệnh đề điều kiện.",
        },
      ],
      commonMistakes: [
        {
          incorrect: "If it will rain tomorrow, I will take an umbrella.",
          correct: "If it rains tomorrow, I will take an umbrella.",
          explanation: "Mệnh đề 'If' trong câu điều kiện loại 1 KHÔNG BAO GIỜ dùng 'will', mà dùng thì Hiện tại đơn.",
        },
      ],
      proTips: [
        "Đảo ngữ loại 1: Bỏ If, đưa 'Should' lên đầu: 'Should it rain tomorrow, we will cancel the picnic.'",
      ],
    },
    practice: [
      {
        id: "c01-q1",
        question: "If you _______ red and yellow together, you get orange.",
        options: ["mix", "will mix", "mixed", "are mixing"],
        correctIndex: 0,
        explanation: "Sự thật khoa học pha màu (Loại 0) -> dùng thì hiện tại đơn ở cả hai vế: 'mix'.",
      },
      {
        id: "c01-q2",
        question: "If the plane _______ on schedule, she will arrive before dinner.",
        options: ["lands", "will land", "landed", "has landed"],
        correctIndex: 0,
        explanation: "Mệnh đề If loại 1 chia thì hiện tại đơn: 'lands' (chủ ngữ the plane số ít).",
      },
      {
        id: "c01-q3",
        question: "We will miss our flight _______ we leave for the airport immediately.",
        options: ["if", "unless", "provided", "when"],
        correctIndex: 1,
        explanation: "'Unless' = Trừ phi (Chúng ta sẽ lỡ chuyến bay trừ phi chúng ta xuất phát ngay lập tức).",
      },
    ],
    review: {
      flashcards: [
        {
          id: "c01-fc1",
          front: "Quy tắc cấm kỵ trong mệnh đề IF của câu điều kiện loại 1?",
          back: "TUYỆT ĐỐI không dùng 'will' trong mệnh đề IF! Phải chia ở thì Hiện tại đơn (Present Simple).\nVí dụ: If she CALLS (không nói If she will call), I will answer.",
          hint: "Không dùng will trong mệnh đề If",
        },
      ],
      masteryQuiz: [
        {
          id: "c01-mq1",
          question: "Should you _______ any further assistance, please do not hesitate to contact our customer support.",
          options: ["need", "needs", "needed", "will need"],
          correctIndex: 0,
          explanation: "Đảo ngữ câu điều kiện loại 1 với 'Should': Should + S + V-bare -> dùng 'need'.",
        },
      ],
    },
  },

  // =========================================================================
  // STAGE 3: NÂNG CAO & HỌC THUẬT (B2 - C1)
  // =========================================================================
  {
    id: "conditionals-2-3",
    stage: 3,
    stageName: "Giai đoạn 3: Nâng cao & Học thuật (B2 - C1)",
    level: "B2",
    order: 11,
    title: "Conditionals Type 2 & 3",
    vietnameseTitle: "Câu điều kiện loại 2, 3 & Hỗn hợp",
    description: "Giả định trái thực tế ở hiện tại (Loại 2), nuối tiếc trái thực tế trong quá khứ (Loại 3) và đảo ngữ nâng cao.",
    estimatedMinutes: 25,
    badgeColor: "#8b5cf6",
    theory: {
      summary: "Loại 2 giả định điều không có thật hoặc trái với thực tế hiện tại. Loại 3 giả định điều trái với quá khứ và bày tỏ sự nuối tiếc. Điều kiện hỗn hợp kết hợp nguyên nhân quá khứ với hệ quả hiện tại.",
      formulas: [
        {
          type: "affirmative",
          label: "Điều kiện Loại 2 (Trái với hiện tại)",
          structure: "If + S + V2/ed (were), S + would / could + V-bare",
          exampleEn: "If I had a million dollars, I would travel around the world.",
          exampleVi: "Nếu tôi có 1 triệu đô la (thực tế hiện tại không có), tôi sẽ đi du lịch vòng quanh thế giới.",
        },
        {
          type: "affirmative",
          label: "Điều kiện Loại 3 (Trái với quá khứ)",
          structure: "If + S + had + V3/ed, S + would / could + have + V3/ed",
          exampleEn: "If she had left home earlier, she wouldn't have missed the train.",
          exampleVi: "Nếu cô ấy rời nhà sớm hơn (quá khứ cô ấy không làm vậy), cô ấy đã không bị lỡ tàu.",
        },
        {
          type: "special",
          label: "Điều kiện Hỗn hợp (Mixed Conditional 3 + 2)",
          structure: "If + S + had + V3/ed, S + would + V-bare (now)",
          exampleEn: "If I had taken your advice yesterday, I wouldn't be in trouble now.",
          exampleVi: "Nếu hôm qua tôi nghe lời khuyên của bạn, thì bây giờ tôi đã không gặp rắc rối.",
        },
      ],
      usages: [
        {
          id: "c23-u1",
          title: "To be trong câu điều kiện loại 2",
          explanation: "Trong văn phong chuẩn ngữ pháp và học thuật, động từ 'to be' trong mệnh đề If loại 2 dùng 'were' cho TẤT CẢ các ngôi (I, he, she, it).",
          exampleEn: "If I were you, I would accept the job offer.",
          exampleVi: "Nếu tôi là bạn, tôi sẽ nhận lời đề nghị làm việc đó.",
        },
      ],
      signals: [
        {
          category: "Đảo ngữ nâng cao",
          words: ["Were S to V... (đảo loại 2)", "Had S + V3/ed... (đảo loại 3)"],
          explanation: "Bỏ If để tăng tính trang trọng trong văn viết.",
        },
      ],
      commonMistakes: [
        {
          incorrect: "If he studied harder last year, he would pass the exam.",
          correct: "If he had studied harder last year, he would have passed the exam.",
          explanation: "Sự việc xảy ra trong quá khứ ('last year') phải dùng câu điều kiện Loại 3, không dùng Loại 2.",
        },
      ],
      proTips: [
        "Đảo ngữ loại 3: 'Had you told me earlier, I would have prepared better.' (Bỏ If, đảo Had lên đầu).",
      ],
    },
    practice: [
      {
        id: "c23-q1",
        question: "If I _______ your contact number, I would have invited you to my birthday party.",
        options: ["have", "had", "had had", "would have"],
        correctIndex: 2,
        explanation: "Vế sau có 'would have invited' (Loại 3) -> vế If phải là thì Quá khứ hoàn thành 'had had' (had + V3 của have).",
      },
      {
        id: "c23-q2",
        question: "If she _______ bilingual, she could easily get that prestigious international position.",
        options: ["is", "were", "had been", "will be"],
        correctIndex: 1,
        explanation: "Giả định trái với hiện tại (Loại 2) với to be cho ngôi 'she' dùng 'were'.",
      },
      {
        id: "c23-q3",
        question: "_______ the emergency rescue team arrived ten minutes earlier, more lives could have been saved.",
        options: ["Had", "Were", "Should", "If did"],
        correctIndex: 0,
        explanation: "Đảo ngữ câu điều kiện loại 3: 'Had + S + V3/ed' (thay cho 'If the emergency rescue team had arrived...').",
      },
    ],
    review: {
      flashcards: [
        {
          id: "c23-fc1",
          front: "Công thức đảo ngữ của câu điều kiện Loại 2 và Loại 3?",
          back: "- Loại 2: Were + S + to V (hoặc Were + S + adj/noun)\nVí dụ: Were I you, I would go.\n- Loại 3: Had + S + V3/ed\nVí dụ: Had he known the truth, he wouldn't have come.",
          hint: "Were S to V / Had S V3",
        },
      ],
      masteryQuiz: [
        {
          id: "c23-mq1",
          question: "If we had brought a map, we _______ lost in the forest right now.",
          options: ["wouldn't be", "wouldn't have been", "aren't", "won't be"],
          correctIndex: 0,
          explanation: "Câu điều kiện hỗn hợp: Điều kiện trong quá khứ (had brought) dẫn tới kết quả ở hiện tại (now) -> dùng 'wouldn't be'.",
        },
      ],
    },
  },

  {
    id: "relative-clauses",
    stage: 3,
    stageName: "Giai đoạn 3: Nâng cao & Học thuật (B2 - C1)",
    level: "B2",
    order: 12,
    title: "Relative Clauses",
    vietnameseTitle: "Mệnh đề quan hệ & Rút gọn",
    description: "Sử dụng đại từ quan hệ Who, Whom, Whose, Which, That, Where; mệnh đề xác định và không xác định, cùng kỹ thuật rút gọn mệnh đề đỉnh cao.",
    estimatedMinutes: 25,
    badgeColor: "#8b5cf6",
    theory: {
      summary: "Mệnh đề quan hệ bổ nghĩa cho danh từ đứng trước nó. Gồm 2 loại: Mệnh đề xác định (không có dấu phẩy, bắt buộc phải có để câu đủ nghĩa) và Mệnh đề không xác định (có dấu phẩy, cung cấp thêm thông tin phụ).",
      formulas: [
        {
          type: "special",
          label: "Bảng Đại từ quan hệ",
          structure: "Who (người - chủ ngữ/tân ngữ), Whom (người - tân ngữ), Which (vật), Whose (sở hữu), That (thay cho Who/Which trong mệnh đề xác định)",
          exampleEn: "The scientist who discovered the cure was awarded the Nobel Prize.",
          exampleVi: "Nhà khoa học người đã phát hiện ra phương thuốc đã được trao giải Nobel.",
        },
        {
          type: "special",
          label: "Rút gọn Mệnh đề quan hệ (3 dạng chính)",
          structure: "1. V-ing (Chủ động) | 2. V3/ed (Bị động) | 3. To V (Sau the first, last, only, so sánh nhất)",
          exampleEn: "The man standing over there is my professor. (= who is standing)",
          exampleVi: "Người đàn ông đang đứng đằng kia là giáo sư của tôi.",
        },
      ],
      usages: [
        {
          id: "rc-u1",
          title: "Quy tắc dấu phẩy và chữ 'THAT'",
          explanation: "Tuyệt đối KHÔNG dùng 'THAT' trong mệnh đề quan hệ không xác định (mệnh đề có dấu phẩy) hoặc ngay sau giới từ.",
          exampleEn: "Paris, which is the capital of France, attracts millions of tourists.",
          exampleVi: "Paris, nơi là thủ đô của nước Pháp, thu hút hàng triệu khách du lịch.",
        },
      ],
      signals: [
        {
          category: "Rút gọn mệnh đề",
          words: ["The first / second / last / only ... + to V", "Chủ động -> V-ing", "Bị động -> V3/ed"],
          explanation: "Công thức rút gọn cực kỳ phổ biến trong đề thi học thuật và IELTS.",
        },
      ],
      commonMistakes: [
        {
          incorrect: "My mother, that loves gardening, bought some rose bushes.",
          correct: "My mother, who loves gardening, bought some rose bushes.",
          explanation: "Mệnh đề có dấu phẩy ngăn cách KHÔNG ĐƯỢC dùng 'that', phải dùng 'who'.",
        },
      ],
      proTips: [
        "Whose + Noun không có mạo từ (whose car, whose parents).",
      ],
    },
    practice: [
      {
        id: "rc-q1",
        question: "Neil Armstrong was the first person _______ foot on the Moon.",
        options: ["set", "to set", "setting", "who set him"],
        correctIndex: 1,
        explanation: "Sau các từ chỉ thứ tự 'the first / the second / the only' rút gọn mệnh đề quan hệ bằng 'to V' -> 'to set'.",
      },
      {
        id: "rc-q2",
        question: "The documents _______ to all board members contained confidential financial data.",
        options: ["sending", "which sent", "sent", "were sent"],
        correctIndex: 2,
        explanation: "Tài liệu được gửi (nghĩa bị động: which were sent) rút gọn thành phân từ 2: 'sent'.",
      },
      {
        id: "rc-q3",
        question: "Albert Einstein, _______ theories revolutionized physics, was born in Germany.",
        options: ["who", "whom", "whose", "that"],
        correctIndex: 2,
        explanation: "'theories' là danh từ chỉ vật sở hữu của Einstein -> dùng đại từ quan hệ sở hữu 'whose theories'.",
      },
    ],
    review: {
      flashcards: [
        {
          id: "rc-fc1",
          front: "3 trường hợp rút gọn mệnh đề quan hệ chuẩn học thuật?",
          back: "1. V-ing: Hành động chủ động (The girl who lives next door -> The girl living next door)\n2. V3/ed: Hành động bị động (The book which was written by Nam -> The book written by Nam)\n3. To V: Sau the first, last, only, next, so sánh nhất.",
          hint: "V-ing (chủ động), V3 (bị động), To V (thứ tự)",
        },
      ],
      masteryQuiz: [
        {
          id: "rc-mq1",
          question: "The students _______ high scores in the national contest were awarded scholarships.",
          options: ["achieved", "achieving", "who achieve them", "to achieve"],
          correctIndex: 1,
          explanation: "Học sinh chủ động đạt điểm cao (who achieved) rút gọn thành hiện tại phân từ chủ động 'achieving'.",
        },
      ],
    },
  },

  {
    id: "reported-speech",
    stage: 3,
    stageName: "Giai đoạn 3: Nâng cao & Học thuật (B2 - C1)",
    level: "B2",
    order: 13,
    title: "Reported Speech",
    vietnameseTitle: "Câu tường thuật (Gián tiếp)",
    description: "Quy tắc lùi thì, chuyển đổi đại từ, thời gian và địa điểm; các động từ tường thuật đặc biệt (warn, advise, suggest, apologize).",
    estimatedMinutes: 20,
    badgeColor: "#8b5cf6",
    theory: {
      summary: "Câu gián tiếp (Reported Speech) dùng để thuật lại lời người khác nói mà không dùng nguyên văn trong dấu ngoặc kép. Cần áp dụng quy tắc 3 bước: Lùi thì + Đổi đại từ + Đổi từ chỉ thời gian và nơi chốn.",
      formulas: [
        {
          type: "special",
          label: "Bảng lùi thì cơ bản",
          structure: "Hiện tại đơn -> Quá khứ đơn | Hiện tại tiếp diễn -> Quá khứ tiếp diễn | Hiện tại hoàn thành -> Quá khứ hoàn thành | Will -> Would | Can -> Could",
          exampleEn: "Direct: 'I am learning Spanish.' -> He said he was learning Spanish.",
          exampleVi: "Trực tiếp: 'Tôi đang học tiếng Tây Ban Nha.' -> Anh ấy nói rằng anh ấy đang học tiếng Tây Ban Nha.",
        },
        {
          type: "special",
          label: "Đổi từ chỉ thời gian & nơi chốn",
          structure: "now -> then | today -> that day | tomorrow -> the next day | yesterday -> the day before | here -> there | this -> that",
          exampleEn: "Direct: 'I will call you tomorrow.' -> She said she would call me the next day.",
          exampleVi: "Trực tiếp: 'Tôi sẽ gọi bạn vào ngày mai.' -> Cô ấy nói cô ấy sẽ gọi cho tôi vào ngày hôm sau.",
        },
      ],
      usages: [
        {
          id: "rs-u1",
          title: "Các động từ tường thuật đặc biệt",
          explanation: "Suggest + V-ing (gợi ý), Apologize for + V-ing (xin lỗi), Warn someone not to V (cảnh báo), Advise someone to V (khuyên).",
          exampleEn: "He advised me to consult a doctor immediately.",
          exampleVi: "Anh ấy khuyên tôi nên đi khám bác sĩ ngay.",
        },
      ],
      signals: [
        {
          category: "Động từ dẫn truyền",
          words: ["said (that)", "told someone (that)", "asked", "suggested", "wondered"],
          explanation: "Bắt đầu mệnh đề tường thuật.",
        },
      ],
      commonMistakes: [
        {
          incorrect: "He said me that he was tired.",
          correct: "He told me that he was tired. / He said that he was tired.",
          explanation: "'Said to someone' hoặc 'Told someone', không dùng 'Said me'.",
        },
      ],
      proTips: [
        "KHÔNG lùi thì khi câu nói trực tiếp diễn tả một chân lý khoa học hoặc sự thật hiển nhiên luôn đúng (ví dụ: The teacher said that the Earth moves around the Sun).",
      ],
    },
    practice: [
      {
        id: "rs-q1",
        question: "'I saw Linda at the library yesterday,' Kevin told me.",
        options: [
          "Kevin told me that he saw Linda at the library yesterday.",
          "Kevin told me that he had seen Linda at the library the day before.",
          "Kevin told me that he has seen Linda at the library that day.",
          "Kevin told to me that he had seen Linda.",
        ],
        correctIndex: 1,
        explanation: "Thì quá khứ đơn 'saw' lùi thành quá khứ hoàn thành 'had seen', 'yesterday' đổi thành 'the day before'.",
      },
      {
        id: "rs-q2",
        question: "The police officer warned the driver _______ so fast in the residential area.",
        options: ["not driving", "don't drive", "not to drive", "to not drive"],
        correctIndex: 2,
        explanation: "Cấu trúc cảnh báo: Warn someone (not) to V -> 'warned the driver not to drive'.",
      },
      {
        id: "rs-q3",
        question: "Our geography teacher said that Mount Everest _______ the highest peak in the world.",
        options: ["was", "is", "had been", "is being"],
        correctIndex: 1,
        explanation: "Sự thật hiển nhiên và chân lý địa lý không thay đổi nên giữ nguyên thì hiện tại đơn 'is', không lùi thì.",
      },
    ],
    review: {
      flashcards: [
        {
          id: "rs-fc1",
          front: "Trường hợp nào NGOẠI LỆ không cần lùi thì trong câu tường thuật?",
          back: "1. Câu trực tiếp là chân lý, sự thật khoa học hiển nhiên (The sun rises in the east).\n2. Động từ dẫn ở thì hiện tại (He says that...).\n3. Câu điều kiện loại 2 hoặc loại 3.",
          hint: "Chân lý tự nhiên, động từ dẫn ở hiện tại",
        },
      ],
      masteryQuiz: [
        {
          id: "rs-mq1",
          question: "Jack suggested _______ for a picnic by the lake this weekend.",
          options: ["to go", "going", "that we go to", "go"],
          correctIndex: 1,
          explanation: "Cấu trúc với suggest: Suggest + V-ing -> 'suggested going'.",
        },
      ],
    },
  },

  {
    id: "inversion",
    stage: 3,
    stageName: "Giai đoạn 3: Nâng cao & Học thuật (B2 - C1)",
    level: "C1",
    order: 14,
    title: "Inversion",
    vietnameseTitle: "Đảo ngữ trong tiếng Anh",
    description: "Cấu trúc ngữ pháp cao cấp đưa trợ động từ lên trước chủ ngữ để nhấn mạnh tính kịch tính, sự ngạc nhiên và tính học thuật.",
    estimatedMinutes: 25,
    badgeColor: "#ec4899",
    theory: {
      summary: "Đảo ngữ (Inversion) là hiện tượng đảo trợ động từ hoặc động từ to be lên trước chủ ngữ (giống trật tự câu hỏi nhưng vẫn là câu khẳng định), dùng để nhấn mạnh mức độ, cảm xúc và tăng tính sang trọng cho câu văn.",
      formulas: [
        {
          type: "special",
          label: "Đảo ngữ với Trạng từ phủ định đứng đầu câu",
          structure: "Never / Rarely / Seldom / Hardly / Scarcely + Trợ động từ + S + V-bare",
          exampleEn: "Never in my entire life have I witnessed such profound courage.",
          exampleVi: "Chưa bao giờ trong suốt cả cuộc đời tôi được chứng kiến sự dũng cảm sâu sắc đến thế.",
        },
        {
          type: "special",
          label: "Hardly ... when & No sooner ... than (Vừa mới ... thì đã)",
          structure: "Hardly + had + S + V3 + when + S + V2  hoặc  No sooner + had + S + V3 + than + S + V2",
          exampleEn: "No sooner had we stepped outside than it began to pour heavily.",
          exampleVi: "Chúng tôi vừa mới bước chân ra ngoài thì trời đã đổ mưa như trút nước.",
        },
        {
          type: "special",
          label: "Not only ... but also (Không những ... mà còn)",
          structure: "Not only + Trợ động từ + S + V, but S + also + V",
          exampleEn: "Not only is he a brilliant mathematician, but he is also an accomplished pianist.",
          exampleVi: "Anh ấy không những là một nhà toán học lỗi lạc, mà còn là một nghệ sĩ dương cầm tài ba.",
        },
      ],
      usages: [
        {
          id: "inv-u1",
          title: "Only after / Only when / Only by",
          explanation: "Lưu ý: Mệnh đề chứa 'Only...' giữ trật tự bình thường; mệnh đề CHÍNH phía sau mới bị đảo ngữ.",
          exampleEn: "Only when you leave home will you realize the true value of family.",
          exampleVi: "Chỉ khi bạn rời xa nhà thì bạn mới nhận ra giá trị thực sự của gia đình.",
        },
      ],
      signals: [
        {
          category: "Từ đứng đầu câu gây đảo ngữ",
          words: ["Never", "Rarely", "Seldom", "Little", "At no time", "Under no circumstances", "Not until"],
          explanation: "Bắt buộc đảo trợ động từ lên trước chủ ngữ.",
        },
      ],
      commonMistakes: [
        {
          incorrect: "Hardly had I arrived when the phone didn't ring.",
          correct: "Hardly had I arrived when the phone rang.",
          explanation: "Mệnh đề sau 'when' hoặc 'than' là mệnh đề thời gian thông thường ở thì quá khứ đơn khẳng định.",
        },
      ],
      proTips: [
        "Nhớ cặp từ: 'Hardly đi với WHEN', 'No sooner đi với THAN'.",
      ],
    },
    practice: [
      {
        id: "inv-q1",
        question: "Rarely _______ such extraordinary dedication to social welfare.",
        options: ["we have seen", "have we seen", "we saw", "did we saw"],
        correctIndex: 1,
        explanation: "Phó từ bán phủ định 'Rarely' đứng đầu câu đảo trợ động từ 'have' lên trước 'we': 'have we seen'.",
      },
      {
        id: "inv-q2",
        question: "No sooner had the keynote speaker finished his speech _______ the audience gave a standing ovation.",
        options: ["when", "than", "then", "that"],
        correctIndex: 1,
        explanation: "Cấu trúc 'No sooner' luôn đi với liên từ 'than'.",
      },
      {
        id: "inv-q3",
        question: "Under no circumstances _______ confidential client records be disclosed without written consent.",
        options: ["should", "they should", "should they", "that should"],
        correctIndex: 0,
        explanation: "Cụm phủ định 'Under no circumstances' đứng đầu câu đòi hỏi đảo trợ động từ 'should' lên trước chủ ngữ 'confidential client records'.",
      },
    ],
    review: {
      flashcards: [
        {
          id: "inv-fc1",
          front: "Quy tắc cặp từ của: No sooner ... và Hardly ...?",
          back: "- NO SOONER đi với THAN (No sooner had S V3 than S V2)\n- HARDLY / SCARCELY đi với WHEN (Hardly had S V3 when S V2)",
          hint: "No sooner THAN - Hardly WHEN",
        },
      ],
      masteryQuiz: [
        {
          id: "inv-mq1",
          question: "Not only _______ the championship trophy, but they also broke the tournament scoring record.",
          options: ["they won", "did they win", "have they won", "won they"],
          correctIndex: 1,
          explanation: "Đảo ngữ với 'Not only': Not only + did + S + V-bare -> 'did they win'.",
        },
      ],
    },
  },

  {
    id: "subjunctive-wish",
    stage: 3,
    stageName: "Giai đoạn 3: Nâng cao & Học thuật (B2 - C1)",
    level: "C1",
    order: 15,
    title: "Subjunctive & Wish Structures",
    vietnameseTitle: "Thể giả định & Cấu trúc Wish",
    description: "Câu ước ở tương lai, hiện tại, quá khứ (Wish / If only) và câu giả định với các động từ mệnh lệnh (demand, suggest, recommend).",
    estimatedMinutes: 20,
    badgeColor: "#ec4899",
    theory: {
      summary: "Cấu trúc Wish/If only diễn tả mong muốn trái với thực tế. Giả định thức (Subjunctive) dùng sau các động từ hoặc tính từ mang tính cấp bách, yêu cầu, đòi hỏi với động từ ở dạng nguyên thể (bare infinitive).",
      formulas: [
        {
          type: "special",
          label: "Cấu trúc Wish (3 cấp độ lùi thì)",
          structure: "1. Ước ở tương lai: S + wish + S + would/could + V-bare\n2. Ước ở hiện tại: S + wish + S + V2/ed (were)\n3. Ước ở quá khứ: S + wish + S + had + V3/ed",
          exampleEn: "I wish I hadn't spent so much money during the holidays.",
          exampleVi: "Tôi ước gì mình đã không tiêu nhiều tiền đến thế trong kỳ nghỉ (nuối tiếc quá khứ).",
        },
        {
          type: "special",
          label: "Thể giả định thức (Subjunctive Mood)",
          structure: "S + suggest / demand / recommend / insist + that + S + (should) + V-BARE",
          exampleEn: "The doctor recommended that he reduce his salt intake immediately.",
          exampleVi: "Bác sĩ đề nghị rằng anh ấy giảm lượng muối ăn vào ngay lập tức (dù 'he' nhưng động từ 'reduce' không thêm s).",
        },
      ],
      usages: [
        {
          id: "sw-u1",
          title: "Tính từ giả định (It is essential / crucial / vital / important that...)",
          explanation: "Theo sau là mệnh đề với động từ nguyên thể không chia.",
          exampleEn: "It is crucial that every student be present at 7:30 AM.",
          exampleVi: "Điều tối quan trọng là mọi học sinh phải có mặt lúc 7:30 sáng ('be' nguyên thể).",
        },
      ],
      signals: [
        {
          category: "Từ kích hoạt giả định thức",
          words: ["insist", "demand", "recommend", "vital", "essential", "crucial", "mandatory", "If only", "I wish"],
          explanation: "Báo hiệu động từ sau that phải ở dạng bare infinitive.",
        },
      ],
      commonMistakes: [
        {
          incorrect: "The manager insisted that everyone signs the contract today.",
          correct: "The manager insisted that everyone sign the contract today.",
          explanation: "Trong cấu trúc Subjunctive, động từ 'sign' giữ nguyên mẫu không chia theo 'everyone'.",
        },
      ],
      proTips: [
        "Trong tiếng Anh Mỹ, người ta thường lược bỏ 'should' và giữ nguyên V-bare (that he go, that she be). Trong tiếng Anh Anh có thể dùng 'should go'.",
      ],
    },
    practice: [
      {
        id: "sw-q1",
        question: "It is essential that each applicant _______ all transcripts before the strict deadline.",
        options: ["submits", "submit", "submitted", "is submitting"],
        correctIndex: 1,
        explanation: "Cấu trúc giả định thức 'It is essential that S + (should) + V-bare' -> dùng 'submit' (nguyên mẫu không chia).",
      },
      {
        id: "sw-q2",
        question: "I wish I _______ to my mentor's advice when I started my business last year.",
        options: ["listened", "would listen", "had listened", "have listened"],
        correctIndex: 2,
        explanation: "Ước về một sự việc trong quá khứ ('last year') -> lùi về thì quá khứ hoàn thành 'had listened'.",
      },
      {
        id: "sw-q3",
        question: "The environmental committee proposed that the factory _______ fined heavily for polluting the river.",
        options: ["is", "was", "be", "were"],
        correctIndex: 2,
        explanation: "Giả định thức bị động: S + propose that + S + (should) + be + V3/ed -> dùng 'be'.",
      },
    ],
    review: {
      flashcards: [
        {
          id: "sw-fc1",
          front: "Quy tắc động từ sau: 'It is vital / crucial / essential that S + ...'?",
          back: "Động từ LUÔN ở dạng nguyên mẫu không 'to' (V-bare), bất kể chủ ngữ là số ít hay số nhiều!\nVí dụ: It is vital that he BE informed. / that she SUBMIT on time.",
          hint: "Luôn dùng V-bare",
        },
      ],
      masteryQuiz: [
        {
          id: "sw-mq1",
          question: "If only I _______ speak multiple foreign languages fluently right now.",
          options: ["could", "can", "had could", "will be able to"],
          correctIndex: 0,
          explanation: "Ước một điều trái với thực tế hiện tại (right now) -> dùng 'could + V-bare'.",
        },
      ],
    },
  },
];
