"use client";
import Link from "next/link";
import { useState } from "react";
import "./page.css"; 

// ใช้ interface แทน type
interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function ListPage() {
  // กำหนด useState เป็น Item[]
  const [items] = useState<Item[]>([
    { id: 1, name: "เจ้าชายน้อย", price: 199, quantity: 12 },
    { id: 2, name: "ปีศาจตัวนั้น คือฉันเอง", price: 360, quantity: 9 },
    { id: 3, name: "ใครรู้ คนนั้นรอด", price: 225, quantity: 99 },
    { id: 4, name: "จดหมายจากดาวแมว", price: 209, quantity: 365 },
    { id: 5, name: "จิตวิทยาสายดาร์ก", price: 250, quantity: 63 },
  ]);

  return (
    <div>
      {/* Header / Title + Add Button */}
      <div className="header-title">
        <h2>รายการหนังสือ</h2>
        <Link href="/add" className="btn btn-add">
          เพิ่มหนังสือ
        </Link>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>เล่มที่</th>
              <th>ชื่อหนังสือ</th>
              <th>ราคา (บาท)</th>
              <th>จำนวน (เล่ม)</th>
              <th>การแก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <Link href={`/edit/${item.id}`} className="btn btn-edit">
                    แก้ไข
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
