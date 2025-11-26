"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "../form.module.css";

export default function AddPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [author, setAuthor] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5256/api/Book/AddBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sNamebook: name,
          nPrice: price === "" ? 0 : price,
          nQuantity: quantity === "" ? 0 : quantity,
          sAuthor: author,
          dReleaseDate: releaseDate
        })
      });

      if (!res.ok) throw new Error("Failed to add book");

      alert("เพิ่มหนังสือสำเร็จ!");
      router.push("/book");
    } catch (err) {
      console.error(err);
      alert("เพิ่มหนังสือไม่สำเร็จ");
    }
  };

  return (
    <div className={style.formContainer}>
      <h2 className={style.formTitle}>เพิ่มหนังสือใหม่</h2>

      {/* เพิ่มการ์ด wrapper ให้เด่นขึ้น โดยไม่แตะ CSS */}
      <div className={style.formCard}>
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label>ชื่อหนังสือ</label>
            <input
              type="text"
              value={name}
              placeholder="กรอกชื่อหนังสือ"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>ราคา (บาท)</label>
            <input
              type="number"
              value={price}
              placeholder="กรอกราคาหนังสือ"
              onChange={(e) => {
                const value = e.target.value;
                setPrice(value === "" ? "" : Number(value));
              }}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>จำนวน (เล่ม)</label>
            <input
              type="number"
              value={quantity}
              placeholder="จำนวนหนังสือ"
              onChange={(e) => {
                const value = e.target.value;
                setQuantity(value === "" ? "" : Number(value));
              }}
              min="0"
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>ผู้แต่ง</label>
            <input
              type="text"
              value={author}
              placeholder="ชื่อผู้แต่ง"
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>วันที่วางจำหน่าย</label>
            <input
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={style.formButton}>
            เพิ่มหนังสือ
          </button>
        </form>
      </div>
    </div>
  );
}
