"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./EditPage.module.css"; // เปลี่ยนจาก AddPage.module.css เป็น EditPage.module.css

interface FormData {
  name: string;
  [subject: string]: string;
}

interface EditPageProps {
  params: {
    id: string;
  };
}

const subjects = ["math", "science", "english", "social", "thai"];

export default function EditStudent({ params }: EditPageProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    math: "",
    science: "",
    english: "",
    social: "",
    thai: "",
  });

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch(`/api/students/${params.id}`);
        if (!res.ok) throw new Error("ไม่สามารถโหลดข้อมูลนักเรียนได้");
        const data = await res.json();

        const initialData: FormData = { name: data.name || "" };
        subjects.forEach((subj) => {
          initialData[subj] = data[subj]?.toString() || "";
        });

        setFormData(initialData);
      } catch (error) {
        console.error(error);
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      }
    }
    fetchStudent();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const total = subjects.reduce(
      (sum, subj) => sum + Number(formData[subj] || 0),
      0
    );

    try {
      await fetch(`/api/students/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      alert(`แก้ไขข้อมูลสำเร็จ! รวมคะแนนทั้งหมด: ${total}`);
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>แก้ไขข้อมูลนักเรียน</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="ชื่อ-นามสกุล"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />

        {subjects.map((subj) => (
          <input
            key={subj}
            type="number"
            name={subj}
            placeholder={subj.charAt(0).toUpperCase() + subj.slice(1)}
            value={formData[subj]}
            onChange={handleChange}
            className={styles.input}
            required
          />
        ))}

        <button type="submit" className={styles.button}>
          บันทึกการแก้ไข
        </button>
      </form>
    </div>
  );
}
