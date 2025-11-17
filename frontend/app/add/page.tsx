"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./AddPage.module.css";

interface FormData {
  name: string;
  math: string;
  science: string;
  english: string;
  social: string;
  thai: string;
}

interface EditPageProps {
  params: {
    id: string;
  };
}

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

  // ดึงข้อมูลนักเรียนเก่าตาม id
  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch(`/api/students/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch student");
        const data = await res.json();
        setFormData({
          name: data.name || "",
          math: data.math?.toString() || "",
          science: data.science?.toString() || "",
          english: data.english?.toString() || "",
          social: data.social?.toString() || "",
          thai: data.thai?.toString() || "",
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchStudent();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const total =
      Number(formData.math) +
      Number(formData.science) +
      Number(formData.english) +
      Number(formData.social) +
      Number(formData.thai);

    try {
      // ส่งข้อมูลแก้ไขไป API
      await fetch(`/api/students/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      alert(`แก้ไขข้อมูลสำเร็จ! รวมคะแนนทั้งหมด: ${total}`);
      router.push("/");
    } catch (error) {
      console.error(error);
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
        <input
          type="number"
          name="math"
          placeholder="คณิตศาสตร์"
          value={formData.math}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="number"
          name="science"
          placeholder="วิทยาศาสตร์"
          value={formData.science}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="number"
          name="english"
          placeholder="ภาษาอังกฤษ"
          value={formData.english}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="number"
          name="social"
          placeholder="สังคมศึกษา"
          value={formData.social}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="number"
          name="thai"
          placeholder="ภาษาไทย"
          value={formData.thai}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          บันทึกการแก้ไข
        </button>
      </form>
    </div>
  );
}
