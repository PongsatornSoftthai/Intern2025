import { getConnection } from "@/lib/db";

export async function GET() {
  try {
    const pool = await getConnection();
    console.log("SQL connection OK");

    const result = await pool.request().query("SELECT * FROM TbStudents");
    console.log("Query result:", result);

    // ตรวจสอบว่ามี recordset จริง ๆ
    if (!result.recordset) {
      console.error("No recordset returned");
      return new Response(JSON.stringify([]), { headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify(result.recordset), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API Error:", err);
    return new Response(
      JSON.stringify({ error: err.message, stack: err.stack }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
