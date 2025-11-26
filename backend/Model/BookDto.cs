namespace backend2.Model
{
    public class BookDto
    {
        public int nBookID { get; set; }
        public required string sNamebook { get; set; } // ต้องกำหนดค่าเมื่อสร้าง object
        public decimal nPrice { get; set; }
        public int nQuantity { get; set; }
        public required string sAuthor { get; set; }
        public DateTime? dReleaseDate { get; set; }
    }
}
