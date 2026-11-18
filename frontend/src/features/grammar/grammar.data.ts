import type { GrammarCEFR, GrammarTopic, GrammarTopicInput, GrammarTopicSummary, GrammarQuestion } from "./grammar.types";

// A1
import presentSimple from "./data/present-simple";
import articles from "./data/articles";
import pronounsPossessives from "./data/pronouns-possessives";
import thereIsAre from "./data/there-is-are";
import presentContinuous from "./data/present-continuous";
import prepositionsTimePlace from "./data/prepositions-time-place";
// A2
import pastSimple from "./data/past-simple";
import pastContinuous from "./data/past-continuous";
import futureSimple from "./data/future-simple";
import countableUncountable from "./data/countable-uncountable";
import questionForms from "./data/question-forms";
import usedTo from "./data/used-to";
// B1
import presentPerfect from "./data/present-perfect";
import presentPerfectContinuous from "./data/present-perfect-continuous";
import pastPerfect from "./data/past-perfect";
import comparativesSuperlatives from "./data/comparatives-superlatives";
import modalVerbs from "./data/modal-verbs";
import gerundInfinitive from "./data/gerund-infinitive";
import passiveVoice from "./data/passive-voice";
import conditionals01 from "./data/conditionals-0-1";
import tooEnoughSoSuch from "./data/too-enough-so-such";
import questionTags from "./data/question-tags";
// B2
import futureContinuousPerfect from "./data/future-continuous-perfect";
import conditionals23 from "./data/conditionals-2-3";
import relativeClauses from "./data/relative-clauses";
import reportedSpeech from "./data/reported-speech";
import modalPerfect from "./data/modal-perfect";
import causative from "./data/causative";
import indirectQuestions from "./data/indirect-questions";
import linkingWords from "./data/linking-words";
// C1
import inversion from "./data/inversion";
import subjunctiveWish from "./data/subjunctive-wish";
import participleClauses from "./data/participle-clauses";
import cleftSentences from "./data/cleft-sentences";
import impersonalPassive from "./data/impersonal-passive";

/** The curriculum, in teaching order. Stage = CEFR level; order = position here. */
const CURRICULUM: GrammarTopicInput[] = [
  presentSimple, articles, pronounsPossessives, thereIsAre, presentContinuous, prepositionsTimePlace,
  pastSimple, pastContinuous, futureSimple, countableUncountable, questionForms, usedTo,
  presentPerfect, presentPerfectContinuous, pastPerfect, comparativesSuperlatives, modalVerbs,
  gerundInfinitive, passiveVoice, conditionals01, tooEnoughSoSuch, questionTags,
  futureContinuousPerfect, conditionals23, relativeClauses, reportedSpeech, modalPerfect, causative,
  indirectQuestions, linkingWords,
  inversion, subjunctiveWish, participleClauses, cleftSentences, impersonalPassive,
];

export const GRAMMAR_LEVELS: GrammarCEFR[] = ["A1", "A2", "B1", "B2", "C1"];

export const GRAMMAR_ROADMAP_TOPICS: GrammarTopic[] = CURRICULUM.map((t, i) => ({
  ...t,
  stage: (GRAMMAR_LEVELS.indexOf(t.level) + 1) as GrammarTopic["stage"],
  order: i + 1,
}));

export const GRAMMAR_TOPIC_SUMMARIES: GrammarTopicSummary[] = GRAMMAR_ROADMAP_TOPICS.map(
  ({ id, level, stage, order, title, vietnameseTitle, description, estimatedMinutes }) => ({
    id, level, stage, order, title, vietnameseTitle, description, estimatedMinutes,
  })
);

// ---------------------------------------------------------------------------
// Self-check: bad content fails the build (pages import this module at build time).
// ---------------------------------------------------------------------------
function validate(topics: GrammarTopic[]) {
  const errors: string[] = [];
  const ids = new Set<string>();
  let lastStage = 1;

  const checkQuestions = (topicId: string, set: string, qs: GrammarQuestion[], min: number) => {
    if (qs.length < min) errors.push(`${topicId}.${set}: ${qs.length} questions, need ≥ ${min}`);
    const qIds = new Set<string>();
    for (const q of qs) {
      if (qIds.has(q.id)) errors.push(`${topicId}.${set}: duplicate question id ${q.id}`);
      qIds.add(q.id);
      if (q.type === "input") {
        if (!q.answers.length || q.answers.some((a) => !a.trim())) errors.push(`${topicId}.${q.id}: empty answers`);
        if (!q.question.includes("___")) errors.push(`${topicId}.${q.id}: typed question needs a ___ blank`);
      } else {
        if (q.options.length < 2) errors.push(`${topicId}.${q.id}: < 2 options`);
        if (!(q.correctIndex >= 0 && q.correctIndex < q.options.length)) errors.push(`${topicId}.${q.id}: correctIndex out of range`);
        if (new Set(q.options).size !== q.options.length) errors.push(`${topicId}.${q.id}: duplicate options`);
      }
    }
  };

  for (const t of topics) {
    if (ids.has(t.id)) errors.push(`duplicate topic id ${t.id}`);
    ids.add(t.id);
    if (t.stage < lastStage) errors.push(`${t.id}: level ${t.level} is out of curriculum order`);
    lastStage = t.stage;
    if (!t.theory.formulas.length || !t.theory.usages.length) errors.push(`${t.id}: theory needs formulas and usages`);
    checkQuestions(t.id, "practice", t.practice, 6);
    checkQuestions(t.id, "advanced", t.advanced, 4);
    checkQuestions(t.id, "masteryQuiz", t.review.masteryQuiz, 2);
    if (t.review.flashcards.length < 3) errors.push(`${t.id}: needs ≥ 3 flashcards`);
  }
  if (errors.length) throw new Error("Grammar data invalid:\n- " + errors.join("\n- "));
}

validate(GRAMMAR_ROADMAP_TOPICS);
