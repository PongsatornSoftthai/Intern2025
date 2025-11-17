"use client";
import Link from "next/link";
import "./page.css";

export default function HomePage() {
  return (
    <div>
      <div className="header-title">
        <h2>หน้าหลัก</h2>
        <Link href="/add" className="btn btn-add">
          เพิ่มหนังสือ
        </Link>
      </div>
    </div>
  );
}
