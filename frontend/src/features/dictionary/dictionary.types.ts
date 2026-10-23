export interface DictionaryPhonetic {
  text?: string;
  audio?: string;
  sourceUrl?: string;
}

export interface DictionaryDefinition {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}

export interface DictionaryMeaning {
  partOfSpeech: string;
  definitions: DictionaryDefinition[];
  synonyms?: string[];
  antonyms?: string[];
}

export interface DictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics: DictionaryPhonetic[];
  origin?: string;
  meanings: DictionaryMeaning[];
  sourceUrls?: string[];
}
