import "./layout.css";
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
        <header className="header">คลังหนังสือ📚</header>

        <nav className="navbar">
          <span className="label">ค้นหาหนังสือ🔍</span>
          <input type="text" placeholder="พิมพ์ชื่อหนังสือ..." />
        </nav>

        <div className="content">
          <aside className="sidebar">
            <ul>
              <li><Link href="/">หน้าหลัก</Link></li>
              <li><Link href="#S">เกี่ยวกับ</Link></li>
            </ul>
          </aside>

          <main className="main">{children}</main>
        </div>

        <footer className="footer">© ณ หอสมุดแห่งหนึ่ง</footer>
      </body>
    </html>
  );
}
