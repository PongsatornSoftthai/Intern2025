"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./EditPage.module.css";

// --------------------------
// Interface ตั้งชื่อตามกฎ
// --------------------------
interface IFormData {
  sName: string;
  nMath: number;
  nScience: number;
  nEnglish: number;
  nSocial: number;
  nThai: number;
}

interface IEditPageProps {
  params: {
    sId: string; // จาก URL (string)
  };
}

// --------------------------
// Array ขึ้นต้นด้วย lst
// --------------------------
const lstScoreSubjects: (keyof IFormData)[] = [
  "nMath",
  "nScience",
  "nEnglish",
  "nSocial",
  "nThai",
];

export default function EditStudent({ params }: IEditPageProps) {
  const router = useRouter();

  // --------------------------
  // useState ตั้งชื่อตามค่าที่เก็บ
  // --------------------------
  const [formData, setFormData] = useState<IFormData>({
    sName: "",
    nMath: 0,
    nScience: 0,
    nEnglish: 0,
    nSocial: 0,
    nThai: 0,
  });

  // --------------------------
  // useEffect โหลดข้อมูลนักเรียน
  // --------------------------
  useEffect(() => {
    async function fetchStudent() {
      try {
        const nId = Number(params.sId); // แปลง string → number
        const res = await fetch(`/api/students/${nId}`);
        if (!res.ok) throw new Error("ไม่สามารถโหลดข้อมูลนักเรียนได้");

        const objData = await res.json(); // object → objData

        const objInitialData: IFormData = {
          sName: objData.sName || "",
          nMath: Number(objData.nMath || 0),
          nScience: Number(objData.nScience || 0),
          nEnglish: Number(objData.nEnglish || 0),
          nSocial: Number(objData.nSocial || 0),
          nThai: Number(objData.nThai || 0),
        };

        setFormData(objInitialData);
      } catch (error) {
        console.error(error);
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      }
    }
    fetchStudent();
  }, [params.sId]);

  // --------------------------
  // handleChange ปลอดภัยสำหรับ TypeScript
  // --------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sFieldName = e.target.name as keyof IFormData;
    const nValue = lstScoreSubjects.includes(sFieldName)
      ? Number(e.target.value)
      : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [sFieldName]: nValue,
    }));
  };

  // --------------------------
  // handleSubmit
  // --------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nTotal = lstScoreSubjects.reduce(
      (sum, subj) => sum + Number(formData[subj]),
      0
    );

    try {
      const nId = Number(params.sId);
      await fetch(`/api/students/${nId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      alert(`แก้ไขข้อมูลสำเร็จ! รวมคะแนนทั้งหมด: ${nTotal}`);
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  // --------------------------
  // JSX
  // --------------------------
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>แก้ไขข้อมูลนักเรียน</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="sName"
          placeholder="ชื่อ-นามสกุล"
          value={formData.sName}
          onChange={handleChange}
          className={styles.input}
          required
        />

        {lstScoreSubjects.map((subj) => (
          <input
            key={subj}
            type="number"
            name={subj}
            placeholder={subj.replace(/^n/, "")}
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
