'use client'
import React, { useState } from "react";
import styles from  "../../css/addForm.module.css";;

interface IFormData {
    sTeaId: string;
    sTeaFname: string;
    sTeaLname: string;
    sTeaSex: "ชาย" | "หญิง";
    dTeaBdate: string; //กำหนดรับค่าเป็น string 
    sTeaAdd: string;
    sTeaTel: string;
    sFacName: string;
}

export default function AddTeacher() {

    const [formData, setFormData] = useState<IFormData>({
        sTeaId: "",
        sTeaFname: "",
        sTeaLname: "",
        sTeaSex: "ชาย",
        dTeaBdate: "",
        sTeaAdd: "",
        sTeaTel: "",
        sFacName:"",
    });

    const [teachers, setTeachers] = useState<IFormData[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.sTeaId || !formData.sTeaFname || !formData.sTeaLname || !formData.sTeaSex || !formData.dTeaBdate || !formData.sTeaAdd || !formData.sTeaTel||!formData.sFacName) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน")
            return;
        }

        setTeachers((prev) =>
            [...prev, formData].sort((a, b) => a.sTeaId.localeCompare(b.sTeaId))
        );

        setFormData({ sTeaId: "", sTeaFname: "", sTeaLname: "", sTeaSex: "ชาย", dTeaBdate: "", sTeaAdd: "", sTeaTel: "" ,sFacName:""});
    };

    return (
        <div>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    เพิ่มอาจารย์
                </h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <label >รหัสอาจารย์: </label>
                        <input
                            type="text"
                            name="sTeaId"
                            value={formData.sTeaId}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label >ชื่อ: </label>
                        <input
                            type="text"
                            name="sTeaFname"
                            value={formData.sTeaFname}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label >นามสกุล: </label>
                        <input
                            type="text"
                            name="sTeaLname"
                            value={formData.sTeaLname}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label >เพศ: </label>
                        <select
                            name="sTeaSex"
                            value={formData.sTeaSex}
                            onChange={handleChange}
                            className={styles.input}
                        >
                            <option value="ชาย">ชาย</option>
                            <option value="หญิง">หญิง</option>
                        </select>
                    </div>
                    <div>
                        <label >วันเกิด: </label>
                        <input
                            type="date"
                            name="dTeaBdate"
                            value={formData.dTeaBdate}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label >ที่อยู่: </label>
                        <input
                            type="string"
                            name="sTeaAdd"
                            value={formData.sTeaAdd}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label >เบอร์โทร: </label>
                        <input
                            type="string"
                            name="sTeaTel"
                            value={formData.sTeaTel}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label >สังกัดคณะ: </label>
                        <select
                            name="sFacName"
                            value={formData.sFacName}
                            onChange={handleChange}
                            className={styles.input}
                        >
                            <option value="วิทยาศาสตร์และเทคโนโลยี">วิทยาศาสตร์และเทคโนโลยี</option>
                            <option value="ศึกษาศาสตร์">ศึกษาศาสตร์</option>
                            <option value="รัฐศาสตร์">รัฐศาสตร์</option>
                        </select>
                    </div>
                    <button type="submit" className={styles.button}>เพิ่มอาจารย์</button>
                </form>
            </div>

            <div className={styles.container} style={{ maxWidth: "1200px" }}>
                <h3>รายชื่ออาจารย์ทั้งหมด</h3>
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
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((T, index) => (
                            <tr key={T.sTeaId}>
                                <td>{index + 1}</td>
                                <td>{T.sTeaId}</td>
                                <td>{T.sTeaFname}</td>
                                <td>{T.sTeaLname}</td>
                                <td>{T.sTeaSex}</td>
                                <td>
                                    {new Date(T.dTeaBdate).toLocaleDateString("th-TH", {
                                        day: "numeric",
                                        month: "numeric",
                                        year: "numeric",
                                    })}
                                </td>
                                <td>{T.sTeaAdd}</td>
                                <td>{T.sTeaTel}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}