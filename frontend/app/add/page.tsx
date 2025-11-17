"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../form.css";


export default function AddPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(10);
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, price, quantity });
    alert("เพิ่มสำเร็จ!");
    router.push("/"); // กลับหน้า List
  };

  return (
    <div className="form-container">
      <h2 className="form-title">เพิ่มหนังสือใหม่</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ชื่อหนังสือ</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>ราคา (บาท)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>จำนวน (เล่ม)</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="0"
            required
          />
        </div>

        <button type="submit" className="form-button">
          เพิ่มหนังสือ
        </button>
      </form>
    </div>
  );
}
