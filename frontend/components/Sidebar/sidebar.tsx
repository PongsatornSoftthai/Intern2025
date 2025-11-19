import styles from "./sidebar.module.css";
import { FaHome, FaBook, FaUser, FaPlus } from "react-icons/fa";

export default function Sidebar() {
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <a href="/"><FaHome />หน้าแรก</a>
                        </li>
                        <li>
                            <a href="/subjects"><FaBook />รายวิชาทั้งหมด</a>
                        </li>
                        <li>
                            <a href="/teachers"><FaUser />รายชื่ออาจารย์ทั้งหมด</a>
                        </li>
                        <li>
                            <a href="/addSubject"><FaPlus />เพิ่มรายวิชา</a>
                        </li>
                        <li>
                            <a href="/addTeacher"><FaPlus />เพิ่มอาจารย์</a>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
}