"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPage() {
  const params = useParams();
  const router = useRouter();

  const [name, setName] = useState("Example Item");
  const [price, setPrice] = useState(10);
  const [quantity, setQuantity] = useState(10);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ id: params.id, name, price, quantity });
    setSuccess(true);
    setTimeout(() => router.push("/"), 1200); // กลับหน้า List หลังแจ้งเตือน
  };

  return (
    <div className="form-container">
      <h2 className="form-title">แก้ไขข้อมูลหนังสือเล่มที่ {params.id}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ชื่อหนังสือ</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>ราคา (บาท)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>จำนวน (เล่ม)</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <button type="submit" className="form-button">
          บันทึกการแก้ไข
        </button>
      </form>

      {success && <p className="form-success">✅ แก้ไขสำเร็จ!</p>}
    </div>
  );
}
