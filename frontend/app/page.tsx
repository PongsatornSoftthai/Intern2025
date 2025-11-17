"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./HomePage.module.css";
import { MdEdit } from "react-icons/md";


// --------------------------
// Interface ตั้งชื่อตามกฎ
// --------------------------
interface IStudent {
  nId: number;
  sName: string;
  nMath: number;
  nScience: number;
  nEnglish: number;
  nSocial: number;
  nThai: number;
}

export default function Home() {
  // --------------------------
  // useState ตั้งชื่อตามค่าที่เก็บ
  // --------------------------
  const [lstStudents, setLstStudents] = useState<IStudent[]>([]);

  // --------------------------
  // useEffect โหลดข้อมูล
  // --------------------------
  useEffect(() => {
    const lstMockData: IStudent[] = [
      { nId: 1, sName: "สมชาย ใจดี", nMath: 85, nScience: 90, nEnglish: 88, nSocial: 92, nThai: 87 },
      { nId: 2, sName: "สมหญิง แสนสวย", nMath: 78, nScience: 82, nEnglish: 80, nSocial: 85, nThai: 90 },
      { nId: 3, sName: "วิทยา ฉลาดหลักแหลม", nMath: 92, nScience: 95, nEnglish: 94, nSocial: 90, nThai: 93 },
    ];
    setLstStudents(lstMockData);
  }, []);

  // --------------------------
  // คำนวณสถิติ
  // --------------------------
  const nTotalStudents = lstStudents.length;

  const lstTotalScores = lstStudents.map(
    (s) => s.nMath + s.nScience + s.nEnglish + s.nSocial + s.nThai
  );

  const nAvgScore =
    lstTotalScores.length > 0
      ? (lstTotalScores.reduce((sum, val) => sum + val, 0) / lstTotalScores.length).toFixed(2)
      : "0";

  const nMaxScore = lstTotalScores.length > 0 ? Math.max(...lstTotalScores) : 0;
  const nMinScore = lstTotalScores.length > 0 ? Math.min(...lstTotalScores) : 0;

  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h3>จำนวนนักเรียนทั้งหมด</h3>
          <p>{nTotalStudents} คน</p>
        </div>
        <div className={styles.card}>
          <h3>คะแนนรวมเฉลี่ย</h3>
          <p>{nAvgScore} คะแนน</p>
        </div>
        <div className={styles.card}>
          <h3>คะแนนรวมมากที่สุด</h3>
          <p>{nMaxScore} คะแนน</p>
        </div>
        <div className={styles.card}>
          <h3>คะแนนรวมน้อยที่สุด</h3>
          <p>{nMinScore} คะแนน</p>
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
            {lstStudents.map((s) => {
              const nTotal = s.nMath + s.nScience + s.nEnglish + s.nSocial + s.nThai;
              return (
                <tr key={s.nId}>
                  <td>{s.nId}</td>
                  <td>{s.sName}</td>
                  <td>{s.nMath}</td>
                  <td>{s.nScience}</td>
                  <td>{s.nEnglish}</td>
                  <td>{s.nSocial}</td>
                  <td>{s.nThai}</td>
                  <td>{nTotal}</td>
                  <td>
                    <Link href={`/edit/${s.nId}`} className={styles.editButton}>
                      <MdEdit size={20} /> {/* ขนาด 20px */}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <Link href="/add" className={styles.addButton}>
        เพิ่มข้อมูลนักเรียน
      </Link>
    </div>
  );
}
