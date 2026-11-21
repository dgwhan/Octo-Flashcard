import type { CueCard, Part1Topic } from "../types";

/** Seconds: Part 2 has 1 minute to prepare and up to 2 minutes to talk. */
export const LIMITS = { part1: 45, prep: 60, part2: 120, part3: 75 } as const;

export const PART1_TOPICS: Part1Topic[] = [
  {
    id: "hometown",
    title: "Quê hương",
    questions: [
      "Where is your hometown?",
      "What do you like most about your hometown?",
      "Has your hometown changed much in recent years?",
      "Would you like to live there in the future?",
    ],
  },
  {
    id: "work-study",
    title: "Công việc, học tập",
    questions: [
      "Do you work or are you a student?",
      "Why did you choose that job or subject?",
      "What is the most difficult part of it?",
      "What would you like to do in the future?",
    ],
  },
  {
    id: "free-time",
    title: "Thời gian rảnh",
    questions: [
      "What do you usually do in your free time?",
      "Do you prefer spending free time alone or with other people?",
      "Is there a hobby you would like to try?",
      "How did you spend your last weekend?",
    ],
  },
  {
    id: "food",
    title: "Ăn uống",
    questions: [
      "What kind of food do you like?",
      "Do you often cook at home?",
      "Was there any food you didn't like as a child?",
      "Do you think people in your country eat healthily?",
    ],
  },
  {
    id: "technology",
    title: "Công nghệ",
    questions: [
      "How often do you use your phone?",
      "Which apps do you use the most?",
      "Do you think you spend too much time online?",
      "How has technology changed the way you study?",
    ],
  },
  {
    id: "weather",
    title: "Thời tiết",
    questions: [
      "What's the weather like in your city?",
      "What is your favourite season?",
      "Does the weather affect your mood?",
      "What do you like to do on rainy days?",
    ],
  },
];

export const CUE_CARDS: CueCard[] = [
  {
    id: "person",
    title: "Người ảnh hưởng tới bạn",
    prompt: "Describe a person who has influenced you.",
    bullets: ["who this person is", "how you know them", "what they did", "and explain why they influenced you"],
    discussion: [
      "What qualities make someone a good role model?",
      "Do famous people have a responsibility to set a good example?",
      "How do parents and teachers influence young people differently?",
    ],
  },
  {
    id: "place",
    title: "Nơi muốn quay lại",
    prompt: "Describe a place you visited that you would like to go back to.",
    bullets: ["where it is", "when you went there", "what you did there", "and explain why you want to return"],
    discussion: [
      "Why do people like to travel to new places?",
      "How does tourism affect local communities?",
      "Will people travel more or less in the future?",
    ],
  },
  {
    id: "skill",
    title: "Kỹ năng bạn tự hào",
    prompt: "Describe a skill you learned that you are proud of.",
    bullets: ["what the skill is", "when and how you learned it", "how difficult it was", "and explain why you are proud of it"],
    discussion: [
      "What skills are most important for young people today?",
      "Is it better to learn skills at school or from experience?",
      "Do older people find it harder to learn new skills?",
    ],
  },
  {
    id: "book-film",
    title: "Cuốn sách hoặc bộ phim",
    prompt: "Describe a book or film that made you think.",
    bullets: ["what it was", "when you read or watched it", "what it was about", "and explain why it made you think"],
    discussion: [
      "Do people read less than they used to?",
      "Should films be used for teaching in schools?",
      "Why do some stories stay popular for a long time?",
    ],
  },
  {
    id: "decision",
    title: "Một quyết định quan trọng",
    prompt: "Describe an important decision you made.",
    bullets: ["what the decision was", "when you made it", "how you made it", "and explain why it was important"],
    discussion: [
      "Do young people make decisions differently from older people?",
      "Should parents make important decisions for their children?",
      "Is it better to decide quickly or slowly?",
    ],
  },
  {
    id: "technology",
    title: "Món đồ công nghệ hữu ích",
    prompt: "Describe a piece of technology you find useful.",
    bullets: ["what it is", "how long you have had it", "how you use it", "and explain why it is useful to you"],
    discussion: [
      "How has technology changed the way people communicate?",
      "Are there any disadvantages of relying on technology?",
      "What new technology will change our lives in the future?",
    ],
  },
];
