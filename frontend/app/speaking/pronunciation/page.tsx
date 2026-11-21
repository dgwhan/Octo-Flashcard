import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { PronunciationPage, getPronunciationGroups } from "@/src/features/speaking";

export const metadata: Metadata = constructMetadata({
  title: "Luyện phát âm các âm người Việt hay sai",
  description: "Âm cuối, đuôi -s và -ed, /θ ð/, /ʃ/, /tʃ dʒ/, /iː ɪ/, /æ e/: nghe âm mẫu, đọc cặp từ và câu, máy chấm từng từ.",
  path: "/speaking/pronunciation",
});

export default function Page() {
  return (
    <ModulePage
      href={ROUTES.SPEAKING}
      eyebrow="Luyện nói · Phát âm"
      title="Những âm người Việt hay đọc sai"
      lead="Tám nhóm âm khó nhất với người Việt. Nghe âm mẫu, đọc từng cặp từ rồi cả câu; từ nào máy không nhận ra sẽ được đánh dấu để bạn luyện lại."
      narrow
    >
      <PronunciationPage groups={getPronunciationGroups()} />
    </ModulePage>
  );
}
