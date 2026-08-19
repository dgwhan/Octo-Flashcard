import styles from "./DeckCard.module.css";
import { DotIcon } from "lucide-react";

interface DeckCardProps {
    name: string;
    author: string;
}

export default function DeckCard({
    name,
    author
}: DeckCardProps) {

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{name}</h3>

            <span className={styles.icon}>
                <DotIcon />
            </span>
            <span className={styles.author}>{author}</span>
        </div>
    );
}