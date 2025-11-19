"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./teachers.module.css";
import { MdEdit, MdDelete } from "react-icons/md";


interface ITeacher {
    sTeaId: string;
    sTeaFname: string;
    sTeaLname: string;
    sTeaSex: "ชาย" | "หญิง";
    dTeaBdate: Date;
    sTeaAdd: string;
    sTeaTel: string;
    isDeleted: boolean;
}

export default function GetTeachers() {
    const [lstTeachers, setLstTeachers] = useState<ITeacher[]>([]);

    useEffect(() => {
        const lstMockData: ITeacher[] = [
            { sTeaId: "001", sTeaFname: "สมชาย", sTeaLname: "สุขใจ", sTeaSex: "ชาย", dTeaBdate: new Date("2000-05-10"), sTeaAdd: "123/45 หมู่ 3 ต.บ้านใหม่ อ.เมือง จ.นนทบุรี 11000", sTeaTel: "0812345678", isDeleted: false },
        ];
        setLstTeachers(lstMockData);
    }, []);

    return (
        <div className={styles.container}>
            <section>
                <h2>รายชื่ออาจารย์ทั้งหมด</h2>
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
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lstTeachers
                            .sort((a, b) => a.sTeaId.localeCompare(b.sTeaId)) //เรียงข้อมูลตามตัวอักษร
                            .map((T, index) => {
                                return (
                                    // คิดว่าจะทำแต่ละเซลล์เป็น link เพื่อกดไปที่ข้อมุลเพิ่มเติมของรายวิชา
                                    <tr key={T.sTeaId}>
                                        <td>{index + 1}</td>
                                        <td>{T.sTeaId}</td>
                                        <td>{T.sTeaFname}</td>
                                        <td>{T.sTeaLname}</td>
                                        <td>{T.sTeaSex}</td>
                                        <td>{T.dTeaBdate.toLocaleDateString("th-TH")}</td>
                                        <td>{T.sTeaAdd}</td>
                                        <td>{T.sTeaTel}</td>
                                        <td>
                                            <div className={styles.manageButton}>
                                                <Link href={`/editTeacher/${T.sTeaId}`} >
                                                    <MdEdit size={20} /> {/* ขนาด 20px */}
                                                </Link>
                                                <Link href={`/editTeacher/${T.sTeaId}`} >
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
            <Link href="/addTeacher" className={styles.addButton}>
                เพิ่มอาจารย์
            </Link>
        </div>
    );
}