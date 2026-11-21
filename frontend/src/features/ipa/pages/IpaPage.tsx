"use client";

import React, { useState } from "react";
import { IPA_PHONEMES } from "../data/ipa.data";
import type { IpaPhoneme } from "../types";
import { ipaAudio } from "../lib/ipa.audio";
import IpaToolbar from "../components/IpaToolbar";
import IpaQuiz from "../components/IpaQuiz";
import PhonemeGrid from "../components/PhonemeGrid";
import PhonemeDetail from "../components/PhonemeDetail";

export default function IpaPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPhoneme, setSelectedPhoneme] = useState<IpaPhoneme | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isQuizMode, setIsQuizMode] = useState(false);

  // Quiz state
  const [quizQuestion, setQuizQuestion] = useState<IpaPhoneme | null>(null);
  const [quizOptions, setQuizOptions] = useState<IpaPhoneme[]>([]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<"correct" | "wrong" | null>(null);

  const startQuiz = () => {
    setIsQuizMode(true);
    setQuizScore(0);
    nextQuizQuestion();
  };

  const nextQuizQuestion = () => {
    setQuizSelected(null);
    setQuizFeedback(null);
    const target = IPA_PHONEMES[Math.floor(Math.random() * IPA_PHONEMES.length)];
    const others = IPA_PHONEMES.filter((p) => p.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const options = [target, ...others].sort(() => 0.5 - Math.random());
    setQuizQuestion(target);
    setQuizOptions(options);

    // Auto play audio for test
    setTimeout(() => {
      ipaAudio.playPhoneme(target);
    }, 200);
  };

  const handleQuizAnswer = (option: IpaPhoneme) => {
    if (quizSelected || !quizQuestion) return;
    setQuizSelected(option.id);

    if (option.id === quizQuestion.id) {
      setQuizFeedback("correct");
      setQuizScore((prev) => prev + 10);
    } else {
      setQuizFeedback("wrong");
    }
  };

  const playSound = (phoneme: IpaPhoneme, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlayingId(phoneme.id);
    ipaAudio.playPhoneme(phoneme, () => {
      setPlayingId(null);
    });
  };

  const playWord = (word: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    ipaAudio.speakWord(word);
  };

  const filteredPhonemes = IPA_PHONEMES.filter((item) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "monophthongs") {
      return item.category === "monophthong_long" || item.category === "monophthong_short";
    }
    if (activeCategory === "diphthongs") {
      return item.category === "diphthong";
    }
    if (activeCategory === "unvoiced") {
      return item.category === "consonant_unvoiced";
    }
    if (activeCategory === "voiced") {
      return item.category === "consonant_voiced";
    }
    return true;
  });


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
      {/* Top Banner & Control Bar */}
      <IpaToolbar
        activeCategory={activeCategory}
        isQuizMode={isQuizMode}
        onCategory={(id) => {
          setActiveCategory(id);
          setIsQuizMode(false);
        }}
        onToggleQuiz={() => (isQuizMode ? setIsQuizMode(false) : startQuiz())}
      />

      {/* QUIZ MODE UI */}
      {isQuizMode && quizQuestion && (
        <IpaQuiz
          quizQuestion={quizQuestion}
          quizOptions={quizOptions}
          quizScore={quizScore}
          quizSelected={quizSelected}
          quizFeedback={quizFeedback}
          onAnswer={handleQuizAnswer}
          onNext={nextQuizQuestion}
        />
      )}

      {/* IPA TILES GRID */}
      {!isQuizMode && (
        <PhonemeGrid
          phonemes={filteredPhonemes}
          playingId={playingId}
          onSelect={setSelectedPhoneme}
          onPlaySound={playSound}
          onPlayWord={playWord}
        />
      )}

      {/* DETAIL MODAL */}
      {selectedPhoneme && (
        <PhonemeDetail phoneme={selectedPhoneme} onClose={() => setSelectedPhoneme(null)} onPlaySound={playSound} onPlayWord={playWord} />
      )}
    </div>
  );
}
