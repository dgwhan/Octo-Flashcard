import styles from "./landing.module.css";

const PRINCIPLES = [
  {
    num: "01",
    title: "Tự nhớ trước khi lật",
    term: "Active recall",
    desc: "Mặt sau của thẻ bị che. Bạn phải tự gọi nghĩa ra trước khi lật, và chính lúc cố nhớ là lúc trí nhớ được củng cố.",
  },
  {
    num: "02",
    title: "Ôn đúng chỗ còn yếu",
    term: "Đã thuộc / Cần ôn",
    desc: "Thẻ nào đã thuộc thì đánh dấu và để sang một bên. Lần học sau chỉ còn những thẻ bạn chưa chắc.",
  },
  {
    num: "03",
    title: "Nghe thứ mình gần hiểu",
    term: "Comprehensible input · S. Krashen",
    desc: "Truyện VOA đọc chậm và sách nói có văn bản đi kèm: hiểu được phần lớn, đoán được phần còn lại từ ngữ cảnh.",
  },
];

export default function LandingMethodology() {
  return (
    <section id="method" className={styles.section}>
      <header className={styles.sectionHead}>
        <p className={styles.eyebrow}>Phương pháp</p>
        <h2 className={styles.sectionTitle}>Ba nguyên tắc, không hơn.</h2>
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
