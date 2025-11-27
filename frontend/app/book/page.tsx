"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import style from "./style.module.css";

interface Item {
  nBookID: number;
  sNamebook: string;
  nPrice: number;
  nQuantity: number;
  sAuthor: string;
  sCategory: string;
  dReleaseDate: string;
}

export default function ListPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // ➤ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("https://localhost:7073/api/Book/GetAllBooks", { mode: "cors" });
        if (!res.ok) throw new Error("Failed to fetch books");
        const data: Item[] = await res.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  const handleDelete = async (nBookID: number) => {
    const confirmDelete = window.confirm("ต้องการลบรายการนี้หรือไม่?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://localhost:7073/api/Book/DeleteBook/DeleteBook/${nBookID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Delete failed");

      setItems((prev) => prev.filter((item) => item.nBookID !== nBookID));
      alert("ลบสำเร็จ!");
    } catch (err) {
      console.error(err);
      alert("ลบไม่สำเร็จ");
    }
  };

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;

  // ➤ คำนวณรายการที่จะแสดงตามหน้า
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

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
              <th>หมวดหมู่</th>
              <th>วันที่วางจำหน่าย</th>
              <th>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.nBookID}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.sNamebook}</td>
                <td>{item.nPrice.toFixed(2)}</td>
                <td>{item.nQuantity}</td>
                <td>{item.sAuthor}</td>
                <td>{item.sCategory}</td>
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
        
        {/* ➤ Pagination controls */}
        <div className={style.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={style.pageBtn}
          >
            &#8592; {/* ← */}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`${style.pageBtn} ${currentPage === num ? style.activePage : ""}`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={style.pageBtn}
          >
            &#8594; {/* → */}
          </button>
        </div>
      </div>
    </div>
  );
}
