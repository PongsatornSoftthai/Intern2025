"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./HomePage.module.css";
import Link from "next/link";

//กำหนดรูปแบบหรือโครงสร้างของข้อมูลนักเรียน
interface Student {
  id: number;
  name: string;
  math: number;
  science: number;
  english: number;
  social: number;
  thai: number;
}

export default function Home() {

  const [students, setStudents] = useState<Student[]>([]); //สถานะเก็บข้อมูลนักเรียน

  //ใช้ useEffect เพื่อโหลดข้อมูลนักเรียนเมื่อ component ถูกสร้างขึ้น
  useEffect(() => {

    //จำลองข้อมูล (ภายหลังจะ fetch จาก API หรือฐานข้อมูล)
    const mockData: Student[] = [
      { id: 1, name: "สมชาย ใจดี", math: 85, science: 90, english: 88, social: 92, thai: 87 },
      { id: 2, name: "สมหญิง แสนสวย", math: 78, science: 82, english: 80, social: 85, thai: 90 },
      { id: 3, name: "วิทยา ฉลาดหลักแหลม", math: 92, science: 95, english: 94, social: 90, thai: 93 },
    ];
    setStudents(mockData); //ตั้งค่าสถานะด้วยข้อมูลจำลอง
  }, []);

  //จำนวนนักเรียนทั้งหมด
  const totalStudents = students.length;

  //คำนวณคะแนนรวมเฉลี่ย
  const totalScores = students.map(s => s.math + s.science + s.english + s.social + s.thai);
  const avgScore = totalScores.length > 0 ?
    (totalScores.reduce((sum, val) => sum + val, 0) / totalScores.length).toFixed(2) : 0;

  //คะแนนรวมมากที่สุด
  const maxScore = totalScores.length > 0 ? Math.max(...totalScores) : 0;

  //คะแนนรวมน้อยที่สุด
  const minScore = totalScores.length > 0 ? Math.min(...totalScores) : 0;

  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h3>จำนวนนักเรียนทั้งหมด</h3>
          <p>{totalStudents} คน </p>
        </div>
        <div className={styles.card}>
          <h3>คะแนนรวมเฉลี่ย</h3>
          <p>{avgScore} คะแนน</p>
        </div>
        <div className={styles.card}>
          <h3>คะแนนรวมมากที่สุด</h3>
          <p>{maxScore} คะแนน</p>
        </div>
        <div className={styles.card}>
          <h3>คะแนนรวมน้อยที่สุด</h3>
          <p>{minScore} คะแนน</p>
        </div>
      </div>
      <section>
        <h2>ตารางคะแนนนักเรียน</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>ชื่อ-นามสกุล</th>
              <th>คณิตศาสตร์</th>
              <th>วิทยาศาสตร์</th>
              <th>ภาษาอังกฤษ</th>
              <th>สังคมศึกษา</th>
              <th>ภาษาไทย</th>
              <th>รวม</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              //แสดงข้อมูลนักเรียนแต่ละคนในแถวของตาราง
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.math}</td>
                <td>{s.science}</td>
                <td>{s.english}</td>
                <td>{s.social}</td>
                <td>{s.thai}</td>
                <td>{s.math + s.science + s.english + s.social + s.thai}</td>
                <td><Link href={`/edit/${s.id}`} className={styles.editButton}>
                    แก้ไข
                  </Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Link href="/add" className={styles.addButton}>
        เพิ่มข้อมูลนักเรียน
      </Link>
    </div>
  );
}
