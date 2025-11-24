import styles from "./layout.module.css"; 
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "คลังหนังสือ📚",
  description: "ระบบค้นหาและอ่านหนังสือออนไลน์",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        {/* Header */}
        <header className={styles.header}>คลังหนังสือ📚</header>

        {/* Navbar / Search */}
        <nav className={styles.navbar}>
          <span className={styles.label}>ค้นหาหนังสือ🔍</span>
          <input type="text" placeholder="พิมพ์ชื่อหนังสือ..." />
        </nav> 

        {/* Content */}
        <div className={styles.content}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <ul>
              <li>
                <Link href="/">หน้าหลัก</Link>
              </li>
              <li>
                <Link href="/book">รายการหนังสือ</Link>
              </li>
              <li>
                <Link href="/chart">ตัวอย่างกราฟ</Link>
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className={styles.main}>{children}</main>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>© ณ หอสมุดแห่งหนึ่ง</footer>
      </body>
    </html>
  );
}
