'use client'
import React, { useState } from "react";
import styles from "./addSubjects.module.css";

interface IFormData {
    sSubId: string;
    sSubName: string;
    nSubCredit: number;
}

export default function AddSubject() {

    const [formData, setFormData] = useState<IFormData>({
        sSubId: "",
        sSubName: "",
        nSubCredit: 0,
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.sSubId || !formData.sSubName || !formData.nSubCredit) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน")
            return;
        }

        setSubjects((prev) =>
            [...prev, formData].sort((a, b) => a.sSubId.localeCompare(b.sSubId))
        );

        setFormData({ sSubId: "", sSubName: "", nSubCredit: 0 });
    };

    return (
        <div >
            <div  className={styles.container}>
                <h2 className={styles.title}>
                    เพิ่มรายวิชา
                </h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <label >รหัสวิชา: </label>
                        <input
                            type="text"
                            name="sSubId"
                            value={formData.sSubId}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label >ชื่อวิชา: </label>
                        <input
                            type="text"
                            name="sSubName"
                            value={formData.sSubName}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label >หน่วยกิต: </label>
                        <input
                            type="text"
                            name="nSubCredit"
                            value={formData.nSubCredit}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.button}>เพิ่มรายวิชา</button>
                </form>
            </div>

            <div  className={styles.container}>
                <h3>รายการวิชา</h3>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>รหัสวิชา</th>
                            <th>ชื่อวิชา</th>
                            <th>หน่วยกิต</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((sub, index) => (
                            <tr key={sub.sSubId}>
                                <td>{index + 1}</td>
                                <td>{sub.sSubId}</td>
                                <td>{sub.sSubName}</td>
                                <td>{sub.nSubCredit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}