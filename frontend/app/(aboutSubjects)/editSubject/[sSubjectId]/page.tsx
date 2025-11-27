"use client";
import { useState, useEffect, use } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "../../../css/addForm.module.css";

interface IFormData {
  sSubjectId: string;
  sName: string;
  nCredit: number | null;
}

export default function EditSubject() {
  const params = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<IFormData>({
    sSubjectId: "",
    sName: "",
    nCredit: null,
  });

  //ดึงข้อมูลวิชาเติมมาใน prefill form
  useEffect(() => {
    fetch(`https://localhost:7127/api/School/GetSubject/${params.sSubjectId}`)
      .then(res => res.json())
      .then(data => setFormData({
        sSubjectId: data.sSubjectId,
        sName: data.sName,
        nCredit: data.nCredit,
      }))
      .catch(err => console.error(err));
  }, [params.sSubjectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "nCredit") {
      if (value === "" || /^[0-9]+$/.test(value)) {
        setFormData(prev => ({
          ...prev,
          [name]: value === "" ? null : Number(value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  //handel submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.sName || formData.nCredit === null) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    try {
      const res = await fetch(`https://localhost:7127/api/School/UpdateSubject/${params.sSubjectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          SSubjectId:formData.sSubjectId,
          SName: formData.sName,
          NCredit: formData.nCredit
        })
      });

      const result = await res.json();
      alert(result.message);

      //redirect ไปที่ หน้า subjects
      router.push("/subjects");
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    }

  };

  return (
    <div >
      <div className={styles.container}>
        <h2 className={styles.title}>
          แก้ไขรายวิชา
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label >รหัสวิชา: </label>
            <input
              type="text"
              name="sSubjectId"
              value={formData.sSubjectId}
              className={styles.input}
              readOnly
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
              value={formData.nCredit ?? ""}
              onChange={handleChange}
              className={styles.input}
              pattern="\d*" //อนุญาตเฉพาะตัวเลข 0-9
            />
          </div>
          <button type="submit" className={styles.button}>บันทึกการแก้ไข</button>
        </form>
      </div>
    </div>
  )
}
