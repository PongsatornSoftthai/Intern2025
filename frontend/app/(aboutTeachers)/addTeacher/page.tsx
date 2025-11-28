'use client'
import React, { useState } from "react";
import styles from "../../css/addForm.module.css";
import { useRouter } from "next/navigation";
import { CustomSelect } from "@/app/components/customSelect";

interface IFormData {
    sTeacherId: string;
    sFirstName: string;
    sLastName: string;
    sGender: string;
    dBirthDate: string; // เก็บเป็น string จาก backend
    sAddress: string;
    sPhoneNumber: string;
    sSubjectId: string;
    sFaculty: string;
}

const faculties = [
    { value: "วิทยาศาสตร์", label: "วิทยาศาสตร์" },
    { value: "ศึกษาศาสตร์", label: "ศึกษาศาสตร์" },
    { value: "รัฐศาสตร์", label: "รัฐศาสตร์" },
    { value: "สาธารณสุข", label: "สาธารณสุข" },
];

const genderOptions = [
    { value: "ชาย", label: "ชาย" },
    { value: "หญิง", label: "หญิง" },
];

export default function AddTeacher() {

    const router = useRouter();
    const [formData, setFormData] = useState<IFormData>({
        sTeacherId: "",
        sFirstName: "",
        sLastName: "",
        sGender: "",
        dBirthDate: "",// เก็บเป็น string จาก backend
        sAddress: "",
        sPhoneNumber: "",
        sSubjectId: "",
        sFaculty: "",
    });

    const [teachers, setTeachers] = useState<IFormData[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //เช็คว่ามีค่าบ้าง
        if (!formData.sTeacherId || !formData.sFirstName || !formData.sLastName || !formData.sGender || !formData.dBirthDate || !formData.sAddress || !formData.sPhoneNumber || !formData.sFaculty || !formData.sSubjectId) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        //รหัสอาจารย์ต้องมีรูปแบบ เช่น T200001
        const teacherIdRegex = /^T\d{6}$/;

        // ตัวเลข 10 หลัก
        const phoneRegex = /^\d{10}$/;

        // รหัสวิชาแบบ 3 ตัวเลข - 3 ตัวเลข
        const subjectRegex = /^[0-9]{3}-[0-9]{3}$/;

        if (!teacherIdRegex.test(formData.sTeacherId)) {
            alert("รหัสอาจารย์ต้องขึ้นต้นด้วย T ตามด้วยตัวเลข 6 หลัก เช่น T200001");
            return;
        }

        if (!phoneRegex.test(formData.sPhoneNumber)) {
            alert("เบอร์โทรต้องเป็นตัวเลข 10 หลัก");
            return;
        }

        if (!subjectRegex.test(formData.sSubjectId)) {
            alert("รหัสวิชาต้องอยู่ในรูปแบบ 001-102");
            return;
        }

        try {//ส่งข้อมูลไป API
            const res = await fetch("https://localhost:7127/api/School/AddTeacher", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, //บอกว่า่ข้อมูลที่ส่งไปเป็น json
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.message);
            } else {
                alert(result.message);
                //เคลียร์ฟอร์ม
                setFormData({
                    sTeacherId: "",
                    sFirstName: "",
                    sLastName: "",
                    sGender: "",
                    dBirthDate: "",// เก็บเป็น string จาก backend
                    sAddress: "",
                    sPhoneNumber: "",
                    sFaculty: "",
                    sSubjectId: "",
                });

                router.push("/teachers");
            }
        } catch (err) {
            alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
        }

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
                            name="sTeacherId"
                            value={formData.sTeacherId}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label >ชื่อ: </label>
                        <input
                            type="text"
                            name="sFirstName"
                            value={formData.sFirstName}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label >นามสกุล: </label>
                        <input
                            type="text"
                            name="sLastName"
                            value={formData.sLastName}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label >เพศ: </label>
                        <CustomSelect
                            options={genderOptions}
                            value={formData.sGender}
                            onChange={(val) => setFormData(prev => ({ ...prev, sGender: val }))}
                            placeholder="--เลือกเพศ--"

                        />
                    </div>
                    <div>
                        <label >วันเกิด: </label>
                        <input
                            type="date"
                            name="dBirthDate"
                            value={formData.dBirthDate}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label >ที่อยู่: </label>
                        <input
                            type="text"
                            name="sAddress"
                            value={formData.sAddress}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label >เบอร์โทร: </label>
                        <input
                            type="text"
                            name="sPhoneNumber"
                            value={formData.sPhoneNumber}
                            onChange={handleChange}
                            className={styles.input}
                            maxLength={10}
                            pattern="\d{10}"
                        />
                    </div>
                    <div>
                        <label >สังกัดคณะ: </label>
                        <CustomSelect
                            options={faculties}
                            value={formData.sFaculty}
                            onChange={(val) => setFormData(prev => ({ ...prev, sFaculty: val }))}
                            placeholder="--เลือกคณะ--"
                        />
                    </div>
                    <div>
                        <label >รหัสวิชาที่สอน: </label>
                        <input
                            type="text"
                            name="sSubjectId"
                            value={formData.sSubjectId}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.button}>เพิ่มอาจารย์</button>
                </form>
            </div>
        </div>
    );
}