"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../css/displayDetails.module.css";
import { MdEdit, MdDelete } from "react-icons/md";


// Interface ให้ตรงกับ JSON จริงจาก Backend
interface ITeacher {
    sTeacherId: string;
    sFirstName: string;
    sLastName: string;
    sGender: "ชาย" | "หญิง";
    dBirthDate: string; // เก็บเป็น string จาก backend
    sAddress: string;
    sPhoneNumber: string;
    isDeleted: boolean;
    sSubjectId: string;
}

export default function GetTeachers() {
    const [lstTeachers, setLstTeachers] = useState<ITeacher[]>([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await fetch("https://localhost:7127/api/School/GetAllTeachers");
                if (!res.ok) throw new Error("Network response was not ok");
                const data: ITeacher[] = await res.json();
                setLstTeachers(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchTeachers();
    }, []);

    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>รายชื่ออาจารย์ทั้งหมด</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>รหัสอาจารย์</th>
                            <th>ชื่อ</th>
                            <th>นามสกุล</th>
                            <th>เพศ</th>
                            <th>วัน/เดือน/ปีเกิด</th>
                            <th>ที่อยู่</th>
                            <th>เบอร์โทร</th>
                            <th>วิชาที่สอน</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lstTeachers
                            .filter(t => !t.isDeleted)
                            .sort((a, b) => a.sTeacherId.localeCompare(b.sTeacherId)) //เรียงข้อมูลตามตัวอักษร
                            .map((T, index) => {
                                return (
                                    // คิดว่าจะทำแต่ละเซลล์เป็น link เพื่อกดไปที่ข้อมุลเพิ่มเติมของรายวิชา
                                    <tr key={T.sTeacherId}>
                                        <td>{index + 1}</td>
                                        <td>{T.sTeacherId}</td>
                                        <td>{T.sFirstName}</td>
                                        <td>{T.sLastName}</td>
                                        <td>{T.sGender}</td>
                                        <td>{new Date(T.dBirthDate).toLocaleDateString("th-TH")}</td>
                                        <td>{T.sAddress}</td>
                                        <td>{T.sPhoneNumber}</td>
                                        <td>{T.sSubjectId}</td>
                                        <td>
                                            <div className={styles.manageButton}>
                                                <Link href={`/editTeacher/${T.sTeacherId}`} className={styles.editButton}>
                                                    <MdEdit /> {/* ขนาด 20px */}
                                                </Link>
                                                <Link href={`/deleteTeacher/${T.sTeacherId}`} className={styles.deleteButton} >
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
            <Link href="/addTeacher" className={styles.addButton}>
                เพิ่มอาจารย์
            </Link>
        </div>
    );
}