import "./layout.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        {/* Header */}
        <header className="header">คลังหนังสือ📚</header>

        {/* Navbar / Search */}
        <nav className="navbar">
          <span className="label">ค้นหาหนังสือ🔍</span>
          <input type="text" placeholder="พิมพ์ชื่อหนังสือ..." />
        </nav>

        {/* Content Area */}
        <div className="content">
          {/* Sidebar */}
          <aside className="sidebar">
            <ul>
              <li><Link href="/">หน้าหลัก</Link></li>
              <li><a href="#">เกี่ยวกับ</a></li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="main">{children}</main>
        </div>

        {/* Footer */}
        <footer className="footer">© ณ หอสมุดแห่งหนึ่ง</footer>
      </body>
    </html>
  );
}
