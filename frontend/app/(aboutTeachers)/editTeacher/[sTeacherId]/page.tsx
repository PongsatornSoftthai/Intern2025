"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "../../../css/addForm.module.css";

interface IFormData {
  sTeacherId: string;
  sFirstName: string;
  sLastName: string;
  sGender: string;
  dBirthDate: string; // เก็บเป็น string จาก backend
  sAddress: string;
  sPhoneNumber: string;
  sSubjectId: string;
}

export default function EditTeacher() {
  const params = useParams();
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
  });

  useEffect(() => {
    fetch(`https://localhost:7127/api/School/GetTeacher/${params.sTeacherId}`)
      .then(res => res.json())
      .then(data => setFormData({
        sTeacherId: data.sTeacherId,
        sFirstName: data.sFirstName,
        sLastName: data.sLastName,
        sGender: data.sGender,
        dBirthDate: data.dBirthDate,
        sAddress: data.sAddress,
        sPhoneNumber: data.sPhoneNumber,
        sSubjectId: data.sSubjectId,
      }))
      .catch(err => console.error(err));
  }, [params.sTeacherId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.sTeacherId || !formData.sFirstName || !formData.sLastName || !formData.sGender || !formData.dBirthDate || !formData.sAddress || !formData.sPhoneNumber || !formData.sSubjectId) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const res = await fetch(`https://localhost:7127/api/School/UpdateTeacher/${params.sTeacherId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sTeacherId: formData.sTeacherId,
          sFirstName: formData.sFirstName,
          sLastName: formData.sLastName,
          sGender: formData.sGender,
          dBirthDate: formData.dBirthDate,
          sAddress: formData.sAddress,
          sPhoneNumber: formData.sPhoneNumber,
          sSubjectId: formData.sSubjectId,
        })
      });

      const result = await res.json();
      alert(result.message);

      router.push("/teachers");
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.title}>
          แก้ไขรายวิชา
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label >รหัสอาจารย์: </label>
            <input
              type="text"
              name="sTeacherId"
              value={formData.sTeacherId}
              className={styles.input}
              readOnly
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
            <select
              name="sGender"
              value={formData.sGender}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="">--เลือกเพศ--</option>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
            </select>
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
            <label >รหัสวิชาที่สอน: </label>
            <input
              type="text"
              name="sSubjectId"
              value={formData.sSubjectId}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>บันทึกการแก้ไข</button>
        </form>
      </div>
    </div>
  )
}