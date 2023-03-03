using TrackContents.Models;

namespace TrackContents.Classes
{
    public class CalculateTotals
    {
        public CalculateTotals()
        {

        }

        public decimal GetCategoryTotal (Category category)
        {
            decimal total = 0;

            if (category.ContentItems == null)
            {
                return 0;
            }

            foreach (var item in category.ContentItems)
            {
                total += item.Amount;
            }

            return total;
        }
    }
}
