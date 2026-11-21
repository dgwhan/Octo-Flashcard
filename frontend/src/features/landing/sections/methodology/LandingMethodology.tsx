import shared from "../../landing.module.css";
import styles from "./LandingMethodology.module.css";

const PRINCIPLES = [
  {
    num: "01",
    title: "Tự nhớ trước khi lật",
    term: "Active recall",
    desc: "Mặt sau của thẻ bị che. Bạn phải tự gọi nghĩa ra trước khi lật, và chính lúc cố nhớ là lúc trí nhớ được củng cố.",
  },
  {
    num: "02",
    title: "Ôn đúng lúc sắp quên",
    term: "Lặp lại ngắt quãng · FSRS",
    desc: "Sau mỗi thẻ bạn chấm Quên, Khó, Được hay Dễ. Thuật toán tính ngày ôn tiếp theo: thẻ dễ giãn ra vài tuần, thẻ khó quay lại ngay trong buổi.",
  },
  {
    num: "03",
    title: "Nghe gần hiểu, rồi nói lại",
    term: "Comprehensible input · Shadowing",
    desc: "Nghe truyện VOA đọc chậm và câu mẫu ở mức hiểu được phần lớn, rồi nói lại từng câu. Máy đánh dấu từ bị nuốt để bạn sửa ngay.",
  },
];

export default function LandingMethodology() {
  return (
    <section id="method" className={shared.section}>
      <header className={shared.sectionHead}>
        <p className={shared.eyebrow}>Phương pháp</p>
        <h2 className={shared.sectionTitle}>Ba nguyên tắc, không hơn.</h2>
      </header>

      <ol className={styles.steps}>
        {PRINCIPLES.map((p) => (
          <li key={p.num} className={styles.step}>
            <span className={styles.stepNum}>{p.num}</span>
            <div>
              <h3 className={styles.stepTitle}>{p.title}</h3>
              <p className={styles.stepTerm}>{p.term}</p>
              <p className={styles.stepDesc}>{p.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
