"use client";

import styles from "./DecksPage.module.css";
import { useEffect, useState } from "react";
import DeckCard from "../components/DeckCard";
import DeckEmptyState from "../components/DeckEmptyState";
import { DeckResponse } from "@/src/types/decks";
import { deckApi } from "../api/deck.api";
import TopProgressBar from "@/src/components/ui/TopProgressBar";

export default function DecksPage() {
    const [decks, setDecks] = useState<DeckResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchDecks = async () => {
            try {
                setLoading(true);
                const data = await deckApi.getAll();
                if (isMounted && Array.isArray(data)) {
                    setDecks(data);
                }
            } catch {
                if (isMounted) {
                    setDecks([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchDecks();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className={styles.container}>
            <TopProgressBar isLoading={loading} />

            <div className={styles.headerContainer}>
                <h1 className={styles.title}>My Decks</h1>
            </div>

            <div className={styles.card}>
                {!loading && decks.length === 0 ? (
                    <DeckEmptyState />
                ) : (
                    decks.map((deck) => (
                        <DeckCard
                            key={deck.id}
                            name={deck.name}
                            author={deck.ownerName}
                        />
                    ))
                )}
            </div>
        </div>
    );
}