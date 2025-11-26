"use client";

import Link from "next/link";
import styles from "./page.module.css";

interface BookItem {
  id: number;
  title: string;
  tag: string;
}

export default function HomePage() {
  const newBooks: BookItem[] = [
    { id: 1, title: "คิวเร็ว พูดฉลาด", tag: "ใหม่❗" },
    { id: 2, title: "แสงดาวพราย", tag: "ใหม่❗" },
    { id: 3, title: "มนุษย์พร้อมกิน", tag: "ใหม่❗" },
  ];

  const medalIcons = ["🥇", "🥈", "🥉"];

  const popularBooks: BookItem[] = [
    { id: 4, title: "นครคนนอก", tag: "ยอดนิยม" },
    { id: 5, title: "ใบไม้ที่หายไป", tag: "ยอดนิยม" },
    { id: 6, title: "ช่างสำราญ", tag: "ยอดนิยม" },
  ].map((book, index) => ({
    ...book,
    tag: `ยอดนิยม ${medalIcons[index]}`,
  }));

  return (
    <div className={styles.homeContainer}>
      {/* Header */}
      <div className={styles.headerTitle}>
        <h2>📚 หน้าหลัก</h2>
        <p className={styles.subText}>แนะนำหนังสือที่น่าสนใจสำหรับคุณ</p>
      </div>

      {/* หนังสือเข้าใหม่ */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>✨ หนังสือเข้าใหม่</h3>
        </div>

        <div className={styles.bookList}>
          {newBooks.map((book) => (
            <div key={book.id} className={styles.bookCard}>
              <span className={styles.tagNew}>{book.tag}</span>
              <p className={styles.bookTitle}>{book.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* หนังสือยอดนิยม */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>🔥 หนังสือยอดนิยม</h3>
        </div>

        <div className={styles.bookList}>
          {popularBooks.map((book) => (
            <div key={book.id} className={styles.bookCard}>
              <span className={styles.tagHot}>{book.tag}</span>
              <p className={styles.bookTitle}>{book.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
