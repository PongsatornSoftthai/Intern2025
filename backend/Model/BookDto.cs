namespace backend2.Model
{
    public class BookDto
    {
        public int nBookID { get; set; }
        public string sNamebook { get; set; }
        public decimal nPrice { get; set; }
        public int nQuantity { get; set; }
        public string sAuthor { get; set; }
        public DateTime? dReleaseDate { get; set; }
    }
}
