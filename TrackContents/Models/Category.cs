namespace TrackContents.Models
{
    public class Category
    {
        public int? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public decimal CategoryAmount { get; set; }
        public List<ContentItem>? ContentItems { get; set; }

        public Category(int categoryId, string categoryName)
        {
            CategoryId = categoryId;
            CategoryName = categoryName;
            CategoryAmount= 0M;
            ContentItems = new List<ContentItem>();
        }
    }
}
