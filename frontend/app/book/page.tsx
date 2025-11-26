"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import style from "./style.module.css";

// ➤ Interface ของข้อมูล
interface Item {
  nBookID: number;
  sNamebook: string;
  nPrice: number;
  nQuantity: number;
  sAuthor: string;
  dReleaseDate: string; // ดึงจาก API เป็น string
}

export default function ListPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // ➤ ดึงข้อมูลจาก Backend API
  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("http://localhost:5256/api/Book/GetAllBooks", { mode: "cors" });
        if (!res.ok) throw new Error("Failed to fetch books");
        const data: Item[] = await res.json();
        console.log("Fetched data:", data);
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  // ➤ ฟังก์ชันลบเฉพาะฝั่ง Frontend
    const handleDelete = async (nBookID: number) => {
      const confirmDelete = window.confirm("ต้องการลบรายการนี้หรือไม่?");
      if (!confirmDelete) return;

      try {
        const res = await fetch(`http://localhost:5256/api/Book/DeleteBook/DeleteBook/${nBookID}`, {
          method: "PUT", // soft delete ใช้ PUT
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Delete failed");

        // ถ้า delete สำเร็จ ลบออกจาก state
        setItems((prev) => prev.filter((item) => item.nBookID !== nBookID));

        alert("ลบสำเร็จ!");
      } catch (err) {
        console.error(err);
        alert("ลบไม่สำเร็จ");
      }
    };


  if (loading) return <div>กำลังโหลดข้อมูล...</div>;

  return (
    <div>
      <div className={style.headerTitle}>
        <h2>รายการหนังสือ</h2>
        <Link href="/add" className={`${style.btn} ${style.btnAdd}`}>
          เพิ่มหนังสือ
        </Link>
      </div>

      <div className={style.tablecontainer}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>เล่มที่</th>
              <th>ชื่อหนังสือ</th>
              <th>ราคา (บาท)</th>
              <th>จำนวน (เล่ม)</th>
              <th>ผู้แต่ง</th>
              <th>วันที่วางจำหน่าย</th>
              <th>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.nBookID}>
                <td>{index + 1}</td>
                <td>{item.sNamebook}</td>
                <td>{item.nPrice.toFixed(2)}</td>
                <td>{item.nQuantity}</td>
                <td>{item.sAuthor}</td>
                <td>{new Date(item.dReleaseDate).toLocaleDateString()}</td>
                <td>
                  <Link
                    href={`/edit/${item.nBookID}`}
                    className={`${style.btn} ${style.btnEdit}`}
                  >
                    🖊
                  </Link>

                  <button
                    onClick={() => handleDelete(item.nBookID)}
                    className={`${style.btn} ${style.btnDelete}`}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
