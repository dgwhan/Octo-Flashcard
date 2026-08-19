"use client";

import styles from "./DecksPage.module.css";
import { useEffect, useState } from "react";
import DeckCard from "../components/DeckCard";
import DeckEmptyState from "../components/DeckEmptyState";
import { DeckResponse, DeckVisibility } from "@/src/types/decks";
import { deckApi } from "../api/desk.api";
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
                    // Lọc chỉ lấy các bộ thẻ Public
                    const publicDecks = data.filter(
                        (deck) => deck.visibility === DeckVisibility.Public
                    );
                    setDecks(publicDecks);
                }
            } catch {
                // Xử lý an toàn khi chưa đăng nhập (401) hoặc lỗi kết nối, không để crash trang
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
        <>
            <TopProgressBar isLoading={loading} />
            <div className={styles.card}>
                {!loading && decks.length === 0 ? (
                    <DeckEmptyState />
                ) : (
                    decks.map((deck) => (
                        <DeckCard
                            key={deck.id}
                            name={deck.name}
                            author="by author"
                        />
                    ))
                )}
            </div>
        </>
    );
}