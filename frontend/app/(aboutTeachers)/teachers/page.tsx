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
    sFaculty: string;
}

export default function GetTeachers() {
    const [lstTeachers, setLstTeachers] = useState<ITeacher[]>([]);
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

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

    const handleDelete = async (id: string) => {
        if (!confirm("คุณต้องการลบข้อมูลวิชานี้ใช่หรือไม่?"))
            return;
        try {
            const res = await fetch(`https://localhost:7127/api/School/DeleteTeacher/${id}`, {
                method: "DELETE",
            });

            const result = await res.json();
            alert(result.message);

            setLstTeachers(prev => prev.filter(s => s.sTeacherId !== id));
        } catch {
            alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
        }
    };

    //Pagination การแบ่งหน้า
    const filtered = lstTeachers.filter(t => !t.isDeleted);
    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const startIndex = (page - 1) * rowsPerPage;
    const pageData = filtered.slice(startIndex, startIndex + rowsPerPage);

    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>รายชื่ออาจารย์ทั้งหมด</h2>
                <div className={styles.tableWrapper}>
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
                                <th>สังกัดคณะ</th>
                                <th>วิชาที่สอน</th>
                                <th>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageData.map((T, index) => (
                                <tr key={T.sTeacherId}>
                                    <td>{startIndex + index + 1}</td>
                                    <td>{T.sTeacherId}</td>
                                    <td>{T.sFirstName}</td>
                                    <td>{T.sLastName}</td>
                                    <td>{T.sGender}</td>
                                    <td>{new Date(T.dBirthDate).toLocaleDateString("th-TH")}</td>
                                    <td>{T.sAddress}</td>
                                    <td>{T.sPhoneNumber}</td>
                                    <td>{T.sFaculty}</td>
                                    <td>{T.sSubjectId}</td>
                                    <td>
                                        <div className={styles.manageButton}>
                                            <Link href={`/editTeacher/${T.sTeacherId}`} className={styles.editButton}>
                                                <MdEdit /> 
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(T.sTeacherId)}
                                                className={styles.deleteButton}
                                            >
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.rowButton}>
                    <div className={styles.addButton}>
                        <Link href="/addTeacher" >
                            เพิ่มอาจารย์
                        </Link>
                    </div>
                    {/* Pagination */}
                    <div className={styles.paginationContainer}>
                        <button
                            disabled={page === 1}
                            className={styles.pageButton}
                            onClick={() => setPage(page - 1)}
                        >
                            ‹
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                className={`${styles.pageNumber} ${page === i + 1 ? styles.active : ""}`}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            disabled={page === totalPages}
                            className={styles.pageButton}
                            onClick={() => setPage(page + 1)}
                        >
                            ›
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}