import { ExternalLink } from "lucide-react";
import shared from "../../landing.module.css";
import styles from "./LandingSources.module.css";

const SOURCES = [
  { name: "VOA Learning English", license: "Public domain", use: "Truyện ngắn đọc chậm và transcript", link: "https://learningenglish.voanews.com" },
  { name: "Internet Archive", license: "Thư viện mở", use: "Lưu trữ file âm thanh truyện VOA", link: "https://archive.org" },
  { name: "Free Dictionary API · Datamuse", license: "API mở", use: "Định nghĩa, phiên âm, từ đồng nghĩa", link: "https://dictionaryapi.dev" },
  { name: "Wikimedia Commons", license: "CC BY-SA", use: "Bản thu âm của 44 âm IPA", link: "https://commons.wikimedia.org" },
  { name: "NGSL · AWL · CEFR-J", license: "Nghiên cứu mở", use: "Danh sách và cấp độ từ vựng", link: "https://www.newgeneralservicelist.com" },
];

export default function LandingSources() {
  return (
    <section id="sources" className={`${shared.section} ${styles.sourcesSection}`}>
      <header className={styles.splitHead}>
        <div>
          <p className={shared.eyebrow}>Học liệu</p>
          <h2 className={shared.sectionTitle}>Lấy từ đâu, ghi rõ ở đây.</h2>
        </div>
        <p className={styles.splitLead}>
          Nội dung học đến từ các dự án mở bên dưới. Mỗi dòng ghi giấy phép và việc Octo dùng nguồn đó để làm gì.
        </p>
      </header>

      <table className={styles.ledger}>
        <thead>
          <tr>
            <th scope="col">Nguồn</th>
            <th scope="col">Dùng cho</th>
            <th scope="col">Giấy phép</th>
            <th scope="col">
              <span className="sr-only">Liên kết</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {SOURCES.map((s) => (
            <tr key={s.name}>
              <th scope="row">{s.name}</th>
              <td>{s.use}</td>
              <td className={styles.license}>{s.license}</td>
              <td>
                <a href={s.link} target="_blank" rel="noreferrer" className={styles.ledgerLink} aria-label={`Mở trang ${s.name}`}>
                  <ExternalLink size={16} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
