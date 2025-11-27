'use client'
import React, { useState } from "react";
import styles from "../../css/addForm.module.css";

interface IFormData {
    sSubjectId: string;
    sName: string;
    nCredit: number;
}

export default function AddSubject() {

    const [formData, setFormData] = useState<IFormData>({
        sSubjectId: "",
        sName: "",
        nCredit: 0,
    });

    const [subjects, setSubjects] = useState<IFormData[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            //ถ้า input คือ nSubCredit แปลงค่า string เป็น number
            //ถ้า input คือ อื่น ๆ เก็บค่า string ตามเดิม
            [name]: name === "nSubCredit" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.sSubjectId || !formData.sName || !formData.nCredit) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน")
            return;
        }

        // รหัสวิชาแบบ 3 ตัวเลข - 3 ตัวเลข
        const subjectRegex = /^[0-9]{3}-[0-9]{3}$/;

        if (!subjectRegex.test(formData.sSubjectId)) {
            alert("รหัสวิชาต้องอยู่ในรูปแบบ 001-102");
            return;
        }

        try {
            const res = await fetch("https://localhost:7127/api/School/AddSubject", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, //บอกว่า่ข้อมูลที่ส่งไปเป็น json
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.message);
            } else {
                alert(result.message);
            }

            //เคลียร์ฟอร์ม
            setFormData({
                sSubjectId: "",
                sName: "",
                nCredit: 0,
            });
        } catch (err) {
            alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
        }
    };

    return (
        <div >
            <div className={styles.container}>
                <h2 className={styles.title}>
                    เพิ่มรายวิชา
                </h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <label >รหัสวิชา: </label>
                        <input
                            type="text"
                            name="sSubjectId"
                            value={formData.sSubjectId}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label >ชื่อวิชา: </label>
                        <input
                            type="text"
                            name="sName"
                            value={formData.sName}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label >หน่วยกิต: </label>
                        <input
                            type="text"
                            name="nCredit"
                            value={formData.nCredit}
                            onChange={handleChange}
                            className={styles.input}
                            pattern="\d*" //อนุญาตเฉพาะตัวเลข 0-9
                        />
                    </div>
                    <button type="submit" className={styles.button}>เพิ่มรายวิชา</button>
                </form>
            </div>
        </div>
    );
}