"use client";
import Link from "next/link";
import { useState } from "react";
import style from "./style.module.css"; 

// ใช้ interface แทน type
interface Item {
  sID: string;
  nNo: number;
  sName: string;
  nPrice: number;
  nQuantity: number;
  sAuthor: string;     
  dReleaseDate: Date;
}

export default function ListPage() {
  // กำหนด useState เป็น Item[]
  const [items, setItems] = useState<Item[]>([
    { sID:"1",nNo: 1, sName: "เจ้าชายน้อย", nPrice: 199, nQuantity: 12 , sAuthor: "Antoine de Saint-Exupéry", dReleaseDate: new Date("2022-02-11")},
    { sID:"2",nNo: 2, sName: "ปีศาจตัวนั้น คือฉันเอง", nPrice: 360, nQuantity: 9, sAuthor: "MAY-I (เม-ไอ)", dReleaseDate: new Date("2025-09-25")},
    { sID:"3",nNo: 3, sName: "ใครรู้ คนนั้นรอด", nPrice: 225, nQuantity: 99, sAuthor: "ดร.ตฤณห์ โพธิ์รักษา", dReleaseDate: new Date("2024-09-17")},
    { sID:"4",nNo: 4, sName: "จดหมายจากดาวแมว", nPrice: 209, nQuantity: 365, sAuthor: "นทธี ศศิวิมล", dReleaseDate: new Date("2025-07-15")},
    { sID:"5",nNo: 5, sName: "จิตวิทยาสายดาร์ก", nPrice: 250, nQuantity: 63, sAuthor: "Dr. Hiro", dReleaseDate: new Date("2024-10-25")},
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
              <th>ผู้แต่ง</th>
              <th>วันที่วางจำหน่าย</th>
              <th>การแก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.nNo}>
                <td>{item.nNo}</td>
                <td>{item.sName}</td>
                <td>{item.nPrice.toFixed(2)}</td>
                <td>{item.nQuantity}</td>
                <td>{item.sAuthor}</td>
                <td>{item.dReleaseDate.toLocaleDateString()}</td>
                <td>
                  <Link href={`/edit/${item.nNo}`} className={`${style.btn} ${style.btnEdit}`}>
                    🖊
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
