"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../css/displayDetails.module.css";
import { MdEdit, MdDelete } from "react-icons/md";


// --------------------------
// Interface ตั้งชื่อตามกฎ
// --------------------------
interface ISubject {
  sSubjectId: string;
  sName: string;
  nCredit: number;
  isDeleted: boolean;
}

export default function GetSubjects() {

  const [lstSubjects, setLstSubjects] = useState<ISubject[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("https://localhost:7127/api/School/GetAllSubjects");
        if (!res.ok) throw new Error("Network response was not ok");
        const data: ISubject[] = await res.json();
        setLstSubjects(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("คุณต้องการลบข้อมูลวิชานี้ใช่หรือไม่?"))
      return;

    try {
      const res = await fetch(`https://localhost:7127/api/School/DeleteSubject/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();
      alert(result.message);

      setLstSubjects(prev => prev.filter(s => s.sSubjectId !== id));
    } catch {
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    }
  };

  const filtered = lstSubjects.filter(t => !t.isDeleted);
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const pageData = filtered.slice(startIndex, startIndex + rowsPerPage);


  return (
    <div className={styles.container}>
      <section>
        <h2 className={styles.title}>รายวิชาทั้งหมด</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>รหัสวิชา</th>
                <th>ชื่อวิชา</th>
                <th>หน่วยกิต</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((S, index) => (
                <tr key={S.sSubjectId}>
                  <td>{startIndex + index + 1}</td>
                  <td>{S.sSubjectId}</td>
                  <td>{S.sName}</td>
                  <td>{S.nCredit}</td>
                  <td>
                    <div className={styles.manageButton}>
                      <Link href={`/editSubject/${S.sSubjectId}`} className={styles.editButton}>
                        <MdEdit />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(S.sSubjectId)}
                        className={styles.deleteButton}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.rowButton}>
          <div className={styles.addButton}>
            <Link href="/addSubject" >
              เพิ่มรายวิชา
            </Link>
          </div>
          {/* Pagination */}
          <div className={styles.paginationContainer}>
            <button
              disabled={page === 1}
              className={styles.pageButton}
              onClick={() => setPage(page - 1)}
            >
              ‹
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`${styles.pageNumber} ${page === i + 1 ? styles.active : ""}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              className={styles.pageButton}
              onClick={() => setPage(page + 1)}
            >
              ›
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
