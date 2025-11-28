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
  sCategory: string;
  dReleaseDate: string; 
} 

export default function EditPage() { 
  const params = useParams(); 
  const router = useRouter(); 
  const [name, setName] = useState(""); 
  const [price, setPrice] = useState(0); 
  const [quantity, setQuantity] = useState(0); 
  const [author, setAuthor] = useState(""); 
  const [category, setCategory] = useState("");
  const [releaseDate, setReleaseDate] = useState(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    async function fetchBook() {
      try {
        console.log("Fetching book ID:", params.id);
        const res = await fetch(`https://localhost:7073/api/Book/GetBook?nBookID=${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch book"); 
        const data: Book = await res.json(); 
        
        setName(data.sNamebook);
        setPrice(data.nPrice);
        setQuantity(data.nQuantity);
        setAuthor(data.sAuthor);
        setCategory(data.sCategory);
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
     fetch("https://localhost:7073/api/Book/UpdateBook", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            nBookID: Number(params.id),
            sNamebook: name,
            nPrice: price,
            nQuantity: quantity,
            sAuthor: author,
            sCategory: category,
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
            <label>หมวดหมู่หนังสือ</label>
            <select
              className={styles.categorySelect}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">-- เลือกหมวดหมู่ --</option>
              <option value="นิยาย">นิยาย</option>
              <option value="สารคดี">สารคดี</option>
              <option value="ธุรกิจและการเงิน">ธุรกิจและการเงิน</option>
              <option value="พัฒนาตนเอง">พัฒนาตนเอง</option>
              <option value="การศึกษา / ตำราเรียน">การศึกษา / ตำราเรียน</option>
              <option value="การ์ตูนและนิยายภาพ">การ์ตูนและนิยายภาพ</option>
              <option value="ไลฟ์สไตล์">ไลฟ์สไตล์</option>
              <option value="เทคโนโลยี">เทคโนโลยี</option>
              <option value="ศิลปะและการออกแบบ">ศิลปะและการออกแบบ</option>
              <option value="เด็กและเยาวชน">เด็กและเยาวชน</option>
            </select>
          </div>
        <div className={styles.formGroup}> 
          <label>วันที่วางจำหน่าย</label>
          <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} /> 
        </div>
                  <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.formButton}>
              บันทึกการแก้ไข
            </button>
          </div>
      </form>
    </div> 
  ); 
}
