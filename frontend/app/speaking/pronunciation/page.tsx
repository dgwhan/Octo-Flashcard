import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { IPA_PHONEMES } from "@/src/features/ipa/ipa.data";
import { SOUND_GROUPS } from "@/src/features/speaking/pronunciation.data";
import PronunciationLab from "@/src/features/speaking/components/PronunciationLab";

export const metadata: Metadata = constructMetadata({
  title: "Luyện phát âm các âm người Việt hay sai",
  description: "Âm cuối, đuôi -s và -ed, /θ ð/, /ʃ/, /tʃ dʒ/, /iː ɪ/, /æ e/: nghe âm mẫu, đọc cặp từ và câu, máy chấm từng từ.",
  path: "/speaking/pronunciation",
});

// Reference audio for each sound comes from the IPA chart data (Wikimedia Commons)
const groups = SOUND_GROUPS.map((g) => ({
  ...g,
  phonemes: g.symbols.map((symbol) => {
    const p = IPA_PHONEMES.find((x) => x.symbol === symbol);
    return { symbol, name: p?.name ?? symbol, audioUrl: p?.audioUrl };
  }),
}));

export default function PronunciationPage() {
  return (
    <ModulePage
      href={ROUTES.SPEAKING}
      eyebrow="Luyện nói · Phát âm"
      title="Những âm người Việt hay đọc sai"
      lead="Tám nhóm âm khó nhất với người Việt. Nghe âm mẫu, đọc từng cặp từ rồi cả câu; từ nào máy không nhận ra sẽ được đánh dấu để bạn luyện lại."
      narrow
    >
      <PronunciationLab groups={groups} />
    </ModulePage>
  );
}
