"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // ต้อง import ก่อนเรียกใช้
import { FaHome, FaBook, FaUser, FaPlus } from "react-icons/fa";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  const pathname = usePathname(); // เรียกหลัง import

  const menuItems = [
    { href: "/", label: "หน้าแรก", icon: <FaHome /> },
    { href: "/subjects", label: "รายวิชาทั้งหมด", icon: <FaBook /> },
    { href: "/teachers", label: "รายชื่ออาจารย์ทั้งหมด", icon: <FaUser /> },
    { href: "/addSubject", label: "เพิ่มรายวิชา", icon: <FaPlus /> },
    { href: "/addTeacher", label: "เพิ่มอาจารย์", icon: <FaPlus /> },
  ];

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.href}
                className={pathname === item.href ? styles.active : ""}
              >
                <Link href={item.href}>
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
