"use client";
import Link from "next/link";
import { useState } from "react";
import style from "./style.module.css"; 

// ใช้ interface แทน type
interface Item {
  nNo: number;
  sName: string;
  nPrice: number;
  nQuantity: number;
}

export default function ListPage() {
  // กำหนด useState เป็น Item[]
  const [items, setItems] = useState<Item[]>([
    { nNo: 1, sName: "เจ้าชายน้อย", nPrice: 199, nQuantity: 12 },
    { nNo: 2, sName: "ปีศาจตัวนั้น คือฉันเอง", nPrice: 360, nQuantity: 9 },
    { nNo: 3, sName: "ใครรู้ คนนั้นรอด", nPrice: 225, nQuantity: 99 },
    { nNo: 4, sName: "จดหมายจากดาวแมว", nPrice: 209, nQuantity: 365 },
    { nNo: 5, sName: "จิตวิทยาสายดาร์ก", nPrice: 250, nQuantity: 63 },
  ]);

  return (
    <div>
      {/* Header / Title + Add Button */}
      <div className= {style.headerTitle}>
        <h2>รายการหนังสือ</h2>
        <Link href="/add" className={`${style.btn} ${style.btnAdd}`}>
          เพิ่มหนังสือ
        </Link>
      </div>

      {/* Table */}
      <div className={style.tablecontainer}>
        <table className={style.table}>
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
              <tr key={item.nNo}>
                <td>{item.nNo}</td>
                <td>{item.sName}</td>
                <td>{item.nPrice}</td>
                <td>{item.nQuantity}</td>
                <td>
                  <Link href={`/edit/${item.nNo}`} className={`${style.btn} ${style.btnEdit}`}>
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
