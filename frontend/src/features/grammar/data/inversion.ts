import type { GrammarTopicInput } from "../grammar.types";

const topic: GrammarTopicInput = {
  id: "inversion",
  level: "C1",
  title: "Inversion",
  vietnameseTitle: "Đảo ngữ trong tiếng Anh",
  description: "Cấu trúc ngữ pháp cao cấp đưa trợ động từ lên trước chủ ngữ để nhấn mạnh tính kịch tính, sự ngạc nhiên và tính học thuật.",
  estimatedMinutes: 25,
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
    {
      id: "inv-x1",
      question: "Never ___ such a beautiful sunset.",
      options: ["I have seen", "have I seen", "I saw", "did I saw"],
      correctIndex: 1,
      explanation: "Never đầu câu → đảo trợ động từ.",
    },
    {
      id: "inv-x2",
      question: "Not only ___ late, but he also forgot his books.",
      options: ["he was", "was he", "he is", "did he was"],
      correctIndex: 1,
      explanation: "Not only đầu câu → đảo: was he.",
    },
    {
      id: "inv-x3",
      type: "input",
      question: "Hardly ___ I arrived when it started to rain. (trợ động từ)",
      answers: ["had"],
      explanation: "Hardly + had + S + V3 … when …",
    },
    {
      id: "inv-x4",
      type: "input",
      question: "Rarely ___ she eat meat. (trợ động từ)",
      answers: ["does"],
      explanation: "Hiện tại đơn → đảo với does.",
    },
    {
      id: "inv-x5",
      question: "Only when I got home ___ I had lost my wallet.",
      options: ["I realised", "did I realise", "I did realise", "realised I"],
      correctIndex: 1,
      explanation: "Only when… → đảo ở mệnh đề chính.",
    },
  ],
  advanced: [
    {
      id: "inv-a1",
      question: "No sooner had we sat down ___ the phone rang.",
      options: ["when", "than", "then", "that"],
      correctIndex: 1,
      explanation: "No sooner… than…",
    },
    {
      id: "inv-a2",
      question: "___ I known, I would have helped. (= If I had known)",
      options: ["Were", "Had", "Should", "Did"],
      correctIndex: 1,
      explanation: "Đảo điều kiện loại 3: Had + S + V3.",
    },
    {
      id: "inv-a3",
      question: "___ you need help, please call me. (= If you need help)",
      options: ["Should", "Had", "Were", "Would"],
      correctIndex: 0,
      explanation: "Đảo điều kiện loại 1: Should + S + V.",
    },
    {
      id: "inv-a4",
      type: "input",
      question: "___ I you, I would accept the offer. (= If I were you)",
      answers: ["were"],
      explanation: "Đảo điều kiện loại 2: Were + S…",
    },
    {
      id: "inv-a5",
      type: "input",
      question: "Under no circumstances ___ you open this door. (trợ động từ, nghĩa cấm)",
      answers: ["should", "must"],
      explanation: "Under no circumstances + đảo: should/must you…",
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
      {
        id: "inv-fx1",
        front: "Đảo ngữ với trạng từ phủ định",
        back: "Never / Rarely / Seldom + trợ động từ + S + V",
      },
      {
        id: "inv-fx2",
        front: "No sooner… / Hardly…",
        back: "No sooner had S V3 than…\nHardly had S V3 when…",
      },
      {
        id: "inv-fx3",
        front: "Đảo điều kiện",
        back: "Should + S + V (loại 1)\nWere + S… (loại 2)\nHad + S + V3 (loại 3)",
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
      {
        id: "inv-mx1",
        question: "Seldom ___ him so angry.",
        options: ["I have seen", "have I seen", "I saw", "saw I"],
        correctIndex: 1,
        explanation: "Seldom đầu câu → đảo.",
      },
      {
        id: "inv-mx2",
        question: "Not until midnight ___ home.",
        options: ["she came", "did she come", "came she", "she did come"],
        correctIndex: 1,
        explanation: "Not until… → đảo ở mệnh đề chính.",
      },
    ],
  },
};

export default topic;
