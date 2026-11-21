/** Sound groups Vietnamese learners most often get wrong. `symbols` match IPA_PHONEMES for the reference audio. */
export interface SoundGroup {
  id: string;
  title: string;
  symbols: string[];
  tip: string;
  /** Words or minimal pairs; " – " separates the words of a pair. */
  words: string[];
  sentences: string[];
}

export const SOUND_GROUPS: SoundGroup[] = [
  {
    id: "final",
    title: "Âm cuối /t/ /d/ /k/ /p/",
    symbols: ["t", "d", "k", "p"],
    tip: "Người Việt hay nuốt âm cuối. Đóng khẩu hình dứt khoát và bật nhẹ hơi ở cuối từ: cat, cap và can là ba từ khác nhau.",
    words: ["cat – cap – can", "bed – bet", "back – bag", "light – like", "road – rope", "seat – seed"],
    sentences: ["I need to buy a big black bag.", "Put the cat in the back seat.", "He liked the old red bike."],
  },
  {
    id: "s-ending",
    title: "Đuôi -s, -es",
    symbols: ["s", "z"],
    tip: "Không bỏ đuôi -s. Sau âm vô thanh đọc /s/ (books), sau âm hữu thanh đọc /z/ (dogs), sau s, sh, ch đọc /ɪz/ (watches).",
    words: ["book – books", "dog – dogs", "watch – watches", "cup – cups", "car – cars", "bus – buses"],
    sentences: ["She walks to school and takes two buses.", "My friends like cats and dogs.", "He watches films on weekends."],
  },
  {
    id: "ed-ending",
    title: "Đuôi -ed",
    symbols: ["t", "d"],
    tip: "Sau âm vô thanh đọc /t/ (worked), sau âm hữu thanh đọc /d/ (played), sau t hoặc d đọc /ɪd/ (wanted). Không thêm âm 'ơ' sau đuôi.",
    words: ["work – worked", "play – played", "want – wanted", "stop – stopped", "need – needed", "clean – cleaned"],
    sentences: ["I worked late and missed the bus.", "She played the piano and danced.", "We waited and wanted to leave."],
  },
  {
    id: "th",
    title: "/θ/ và /ð/",
    symbols: ["θ", "ð"],
    tip: "Đặt đầu lưỡi giữa hai hàm răng rồi thổi hơi. /θ/ không rung dây thanh (think), /ð/ có rung (this). Không đọc thành 't', 'đ' hay 's'.",
    words: ["think – sink", "three – tree", "thank – tank", "they – day", "mouth – mouse", "bath – bat"],
    sentences: ["I think there are three of them.", "This is my mother and my brother.", "Thank you for the birthday gift."],
  },
  {
    id: "sh-s",
    title: "/ʃ/ và /s/",
    symbols: ["ʃ", "s"],
    tip: "/ʃ/ tròn môi, lưỡi lùi về sau như khi bảo 'suỵt' (ship). /s/ môi bè, đầu lưỡi sát răng trên (sip).",
    words: ["ship – sip", "she – see", "shoe – sue", "sheet – seat", "shell – sell", "shy – sigh"],
    sentences: ["She sells sea shells on the shore.", "Show me the shop, please.", "I'm sure she will wash the dishes."],
  },
  {
    id: "ch-j",
    title: "/tʃ/ và /dʒ/",
    symbols: ["tʃ", "dʒ"],
    tip: "Bắt đầu như /t/ hoặc /d/ rồi bật sang 'sh'. /tʃ/ không rung (cheap), /dʒ/ có rung (jeep). Không đọc thành 'ch' hay 'gi' tiếng Việt.",
    words: ["cheap – jeep", "chin – gin", "choke – joke", "rich – ridge", "watch – wash", "chair – share"],
    sentences: ["Check the change before you leave.", "John enjoys orange juice.", "The children watched a jazz show."],
  },
  {
    id: "ee-i",
    title: "/iː/ và /ɪ/",
    symbols: ["iː", "ɪ"],
    tip: "/iː/ dài, miệng bè như đang cười (sheep). /ɪ/ ngắn và thả lỏng (ship). Độ dài làm đổi nghĩa của từ.",
    words: ["sheep – ship", "leave – live", "seat – sit", "feel – fill", "beat – bit", "eat – it"],
    sentences: ["Please sit in this seat.", "We will leave if you live here.", "Feel free to fill in the form."],
  },
  {
    id: "ae-e",
    title: "/æ/ và /e/",
    symbols: ["æ", "e"],
    tip: "/æ/ mở miệng rộng, hạ hàm thấp (bad). /e/ miệng hẹp hơn, lưỡi cao hơn (bed).",
    words: ["bad – bed", "man – men", "sat – set", "pan – pen", "had – head", "sad – said"],
    sentences: ["The man sat on the bed.", "Pass me a pen and a pan.", "Dad said he was glad."],
  },
];

/** "cat – cap – can" → "cat cap can" (what the learner reads out). */
export const spokenForm = (item: string) => item.replace(/\s+–\s+/g, " ");
