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
    <div>
    </div>
  );
}
