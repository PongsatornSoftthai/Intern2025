"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./subjects.module.css";
import { MdEdit, MdDelete } from "react-icons/md";


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

  const [lstSubjects, setLstSubjects] = useState<ISubject[]>([]);

  useEffect(() => {
    const lstMockData: ISubject[] = [
      { sSubId: "001-196", sSubName: "หน้าที่พลเมือง", nSubCredit: 1, isDeleted: false },
      { sSubId: "001-456", sSubName: "ภาษาไทย ภาษาเธอ", nSubCredit: 1, isDeleted: false },
      { sSubId: "001-896", sSubName: "อังกฤษ", nSubCredit: 1, isDeleted: false },
    ];
    setLstSubjects(lstMockData);
  }, []);


  return (
    <div className={styles.container}>
      <section>
        <h2>รายวิชาทั้งหมด</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>รหัสวิชา</th>
              <th>ชื่อวิชา</th>
              <th>หน่วยกิต</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {lstSubjects
              .sort((a, b) => a.sSubId.localeCompare(b.sSubId)) //เรียงข้อมูลตามตัวอักษร
              .map((sub, index) => {
                return (
                  // คิดว่าจะทำแต่ละเซลล์เป็น link เพื่อกดไปที่ข้อมุลเพิ่มเติมของรายวิชา
                  <tr key={sub.sSubId}>
                    <td>{index + 1}</td>
                    <td>{sub.sSubId}</td>
                    <td>{sub.sSubName}</td>
                    <td>{sub.nSubCredit}</td>
                    <td>
                      <div className={styles.manageButton}>
                        <Link href={`/editSubject/${sub.sSubId}`} >
                          <MdEdit size={20} /> {/* ขนาด 20px */}
                        </Link>
                        <Link href={`/editSubject/${sub.sSubId}`} >
                          <MdDelete size={20} /> {/* ขนาด 20px */}
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
      <Link href="/addSubject" className={styles.addButton}>
        เพิ่มรายวิชา
      </Link>
    </div>
  );
}
