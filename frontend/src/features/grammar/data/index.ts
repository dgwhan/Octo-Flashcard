import type { GrammarCEFR, GrammarTopic, GrammarTopicInput, GrammarTopicSummary, GrammarQuestion } from "../types";

// A1
import presentSimple from "./present-simple";
import articles from "./articles";
import pronounsPossessives from "./pronouns-possessives";
import thereIsAre from "./there-is-are";
import presentContinuous from "./present-continuous";
import prepositionsTimePlace from "./prepositions-time-place";
// A2
import pastSimple from "./past-simple";
import pastContinuous from "./past-continuous";
import futureSimple from "./future-simple";
import countableUncountable from "./countable-uncountable";
import questionForms from "./question-forms";
import usedTo from "./used-to";
// B1
import presentPerfect from "./present-perfect";
import presentPerfectContinuous from "./present-perfect-continuous";
import pastPerfect from "./past-perfect";
import comparativesSuperlatives from "./comparatives-superlatives";
import modalVerbs from "./modal-verbs";
import gerundInfinitive from "./gerund-infinitive";
import passiveVoice from "./passive-voice";
import conditionals01 from "./conditionals-0-1";
import tooEnoughSoSuch from "./too-enough-so-such";
import questionTags from "./question-tags";
// B2
import futureContinuousPerfect from "./future-continuous-perfect";
import conditionals23 from "./conditionals-2-3";
import relativeClauses from "./relative-clauses";
import reportedSpeech from "./reported-speech";
import modalPerfect from "./modal-perfect";
import causative from "./causative";
import indirectQuestions from "./indirect-questions";
import linkingWords from "./linking-words";
// C1
import inversion from "./inversion";
import subjunctiveWish from "./subjunctive-wish";
import participleClauses from "./participle-clauses";
import cleftSentences from "./cleft-sentences";
import impersonalPassive from "./impersonal-passive";

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
