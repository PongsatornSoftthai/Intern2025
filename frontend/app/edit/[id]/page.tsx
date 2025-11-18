"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "../../form.module.css"; 

export default function EditPage() {
  const params = useParams();
  const router = useRouter();

  const [name, setName] = useState("Example Item");
  const [price, setPrice] = useState(10);
  const [quantity, setQuantity] = useState(10);
  const [author, setAuthor] = useState("Example Author");
  const [releaseDate, setReleaseDate] = useState("2023-01-01");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, price, quantity, author, releaseDate });
    alert("แก้ไขสำเร็จ!");
    router.push("/book"); // กลับหน้า List
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>
        แก้ไขข้อมูลหนังสือเล่มที่ {params.id}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>ชื่อหนังสือ</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>ราคา (บาท)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <div className={styles.formGroup}>
          <label>จำนวน (เล่ม)</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <div className={styles.formGroup}>
          <label>ผู้แต่ง</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>วันที่ผลิต</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.formButton}>
          บันทึกการแก้ไข
        </button>
      </form>
    </div>
  );
}
