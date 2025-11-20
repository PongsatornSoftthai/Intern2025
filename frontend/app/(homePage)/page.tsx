import { FaHome, FaBook, FaUser, FaPlus } from "react-icons/fa";
import styles from "./homepage.module.css";
import SubjectsByFacultyChart from "./SubjectsByFacultyChart/subjectByFacultyChart";

const menuItems = [
  { label: "รายวิชาทั้งหมด", icon: <FaBook />, href: "/subjects" },
  { label: "รายชื่ออาจารย์ทั้งหมด", icon: <FaUser />, href: "/teachers" },
  { label: "เพิ่มรายวิชา", icon: <FaPlus />, href: "/addSubject" },
  { label: "เพิ่มอาจารย์", icon: <FaPlus />, href: "/addTeacher" },
];

export default function MenuCards() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ยินดีต้อนรับเข้าสู่ระบบจัดการการสอน</h1>
      <div className={styles.cardsContainer}>
        {menuItems.map((item, index) => (
          <a key={index} href={item.href} className={styles.card}>
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </div>
      <SubjectsByFacultyChart />
    </div>
  );
}
