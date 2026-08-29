"use client";

import styles from "./DecksPage.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeckCard from "../components/DeckCard";
import DeckEmptyState from "../components/DeckEmptyState";
import { DeckResponse } from "@/src/types/decks";
import { deckApi } from "../api/deck.api";
import { authApi } from "@/src/features/auth/api/auth.api";
import { ApiError } from "@/src/lib/api";
import TopProgressBar from "@/src/components/ui/TopProgressBar";

export default function DecksPage() {
    const router = useRouter();
    const [decks, setDecks] = useState<DeckResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const token = authApi.getStoredToken();
        if (!token) {
            router.push("/auth/login?redirect=/decks");
            return;
        }

        const fetchDecks = async () => {
            try {
                const data = await deckApi.getAll();
                if (isMounted && Array.isArray(data)) {
                    setDecks(data);
                }
            } catch (err: unknown) {
                if (isMounted) {
                    if (err instanceof ApiError && err.status === 401) {
                        router.push("/auth/login?redirect=/decks");
                        return;
                    }
                    setDecks([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchDecks();

        return () => {
            isMounted = false;
        };
    }, [router]);

    return (
        <div className={styles.container}>
            <TopProgressBar isLoading={isLoading} />

            <div className={styles.headerContainer}>
                <h1 className={styles.title}>My Decks</h1>
            </div>

            <div className={styles.card}>
                {!isLoading && decks.length === 0 ? (
                    <DeckEmptyState onCreateClick={() => router.push("/decks/create")} />
                ) : (
                    decks.map((deck) => (
                        <DeckCard
                            key={deck.id}
                            id={deck.id}
                            name={deck.name}
                            author={deck.ownerName}
                        />
                    ))
                )}
            </div>
        </div>
    );
}