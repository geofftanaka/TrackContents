namespace TrackContents.Models
{
    public class ContentItem
    {
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public decimal Amount { get; set; }
        public int CategoryId { get; set; }

        public ContentItem(int itemId, string itemName, decimal amount, int categoryId)
        {
            ItemId = itemId;
            ItemName = itemName;
            Amount = amount;
            CategoryId = categoryId;
        }


    }
}
