"use client";
import { useState, useEffect } from "react"; 
import { useRouter, useParams } from "next/navigation"; 
import styles from "../../form.module.css"; 

interface Book { 
  nBookID: number; 
  sNamebook: string; 
  nPrice: number; 
  nQuantity: number; 
  sAuthor: string; 
  dReleaseDate: string; 
} 

export default function EditPage() { 
  const params = useParams(); 
  const router = useRouter(); 
  const [name, setName] = useState(""); 
  const [price, setPrice] = useState(0); 
  const [quantity, setQuantity] = useState(0); 
  const [author, setAuthor] = useState(""); 
  const [releaseDate, setReleaseDate] = useState(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    async function fetchBook() {
      try {
        console.log("Fetching book ID:", params.id);
        const res = await fetch(`http://localhost:5256/api/Book/GetBook?nBookID=${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch book"); 
        const data: Book = await res.json(); 
        
        setName(data.sNamebook);
        setPrice(data.nPrice);
        setQuantity(data.nQuantity);
        setAuthor(data.sAuthor);
        setReleaseDate(data.dReleaseDate?.split("T")[0] || "");
      } catch (err) { 
        console.error(err); 
        alert("ไม่สามารถดึงข้อมูลหนังสือได้"); 
      } finally {
        setLoading(false); 
      } 
    } 
    fetchBook(); 
  }, [params.id]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await 
     fetch("http://localhost:5256/api/Book/UpdateBook", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            nBookID: Number(params.id),
            sNamebook: name,
            nPrice: price,
            nQuantity: quantity,
            sAuthor: author,
            dReleaseDate: releaseDate
        })
      });
      if (!res.ok) throw new Error("Failed to update book"); 
      alert("แก้ไขสำเร็จ!"); 
      router.push("/book"); 
    } catch (err) { 
      console.error(err); 
      alert("แก้ไขไม่สำเร็จ"); 
    } 
  }; 

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;

  return ( 
    <div className={styles.formContainer}> 
      <h2 className={styles.formTitle}>
        แก้ไขข้อมูลหนังสือ
      </h2>
      <form onSubmit={handleSubmit}> 
        <div className={styles.formGroup}> 
          <label>ชื่อหนังสือ</label> 
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> 
        </div>
        <div className={styles.formGroup}> 
          <label>ราคา (บาท)</label> 
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /> 
        </div> 
        <div className={styles.formGroup}> 
          <label>จำนวน (เล่ม)</label> 
          <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} /> 
        </div> 
        <div className={styles.formGroup}> 
          <label>ผู้แต่ง</label> 
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} /> 
        </div>
        <div className={styles.formGroup}> 
          <label>วันที่วางจำหน่าย</label>
          <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} /> 
        </div>
        <button type="submit" className={styles.formButton}> บันทึกการแก้ไข </button>
      </form>
    </div> 
  ); 
}
