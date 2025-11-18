"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./subjects.module.css";
import { MdEdit } from "react-icons/md";


// --------------------------
// Interface ตั้งชื่อตามกฎ
// --------------------------
interface ISubject {
  sSubId: string;
  sSubName: string;
  nSubCredit: number;
  isDeleted: boolean;

}

export default function GetSubjects() {

  const [lstsubjects, setLstSubjects] = useState<ISubject[]>([]);

  useEffect(() => {
    const lstMockData: ISubject[] = [
      { sSubId:"001-196",sSubName:"หน้าที่พลเมือง",nSubCredit:1 ,isDeleted:false},
      { sSubId:"001-456",sSubName:"ภาษาไทย ภาษาเธอ",nSubCredit:1 ,isDeleted:false},
      { sSubId:"001-896",sSubName:"อังกฤษ",nSubCredit:1 ,isDeleted:false},
    ];
    setLstSubjects(lstMockData);
  }, []);


  return (
    <div className={styles.container}>
      {/* <div className={styles.cardsContainer}>
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
      </div> */}

        {/* สิ้นสุดตรงนี้ 18/11/68 */}
      <section>
        <h2>รายวิชาทั้งหมด</h2>
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
