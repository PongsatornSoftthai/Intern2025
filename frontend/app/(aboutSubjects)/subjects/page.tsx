"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../css/displayDetails.module.css";
import { MdEdit, MdDelete } from "react-icons/md";


// --------------------------
// Interface ตั้งชื่อตามกฎ
// --------------------------
interface ISubject {
  sSubjectId: string;
  sName: string;
  nCredit: number;
  isDeleted: boolean;
}

export default function GetSubjects() {

  const [lstSubjects, setLstSubjects] = useState<ISubject[]>([]);
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("https://localhost:7127/api/School/GetAllSubjects");
        if (!res.ok) throw new Error("Network response was not ok");
        const data: ISubject[] = await res.json();
        setLstSubjects(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchSubjects();
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
              .filter(s => !s.isDeleted)
              .sort((a, b) => a.sSubjectId.localeCompare(b.sSubjectId)) //เรียงข้อมูลตามตัวอักษร
              .map((sub, index) => {
                return (
                  // คิดว่าจะทำแต่ละเซลล์เป็น link เพื่อกดไปที่ข้อมุลเพิ่มเติมของรายวิชา
                  <tr key={sub.sSubjectId}>
                    <td>{index + 1}</td>
                    <td>{sub.sSubjectId}</td>
                    <td>{sub.sName}</td>
                    <td>{sub.nCredit}</td>
                    <td>
                      <div className={styles.manageButton}>
                        <Link href={`/editSubject/${sub.sSubjectId}`} className={styles.editButton}>
                          <MdEdit /> {/* ขนาด 20px */}
                        </Link>
                        <Link href={`/deleteSubject/${sub.sSubjectId}`} className={styles.deleteButton}>
                          <MdDelete /> {/* ขนาด 20px */}
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
