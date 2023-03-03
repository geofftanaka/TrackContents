using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Resources;

namespace TrackContents.Models
{

    public class CategoriesModel
    {
        string connectionString = String.Empty;

        public CategoriesModel()
        {
            ResourceManager rm = new ResourceManager("TrackContents.Resources.Data", Assembly.GetExecutingAssembly());
            connectionString = rm.GetString("ConnectionString");
        }
               
        public async Task<List<Category>> GetCategories()
        {
            using SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();

            string sqlString = @"SELECT Categories.CategoryId, Categories.CategoryName, ContentItems.ItemId, ContentItems.ItemName, ContentItems.Amount
                FROM Categories
                LEFT JOIN ContentItems ON Categories.CategoryId = ContentItems.CategoryId";

            using SqlCommand command = connection.CreateCommand();
            command.CommandText = sqlString;
            SqlDataReader categoryReader = await command.ExecuteReaderAsync(CommandBehavior.CloseConnection);
            int idOrd = categoryReader.GetOrdinal("CategoryId");
            int nameOrd = categoryReader.GetOrdinal("CategoryName");
            int itemIdOrd = categoryReader.GetOrdinal("ItemId");
            int itemNameOrd = categoryReader.GetOrdinal("ItemName");
            int amountOrd = categoryReader.GetOrdinal("Amount");

            var categories = new List<Category>();
            Category category = null;
            while (categoryReader.Read())
            {
                int nextId = categoryReader.GetInt32(idOrd);
                if (category == null || category.CategoryId != nextId)
                {
                    category = new Category(nextId, categoryReader.GetString(nameOrd));
                    categories.Add(category);
                }

                if (!categoryReader.IsDBNull(itemIdOrd))
                {
                    category.ContentItems.Add(new ContentItem(categoryReader.GetInt32(itemIdOrd), categoryReader.GetString(itemNameOrd),
                        categoryReader.GetDecimal(amountOrd), nextId));
                }
            }

            categoryReader.Close();
            return categories;
        }

        public decimal GetTotal()
        {
            using SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();

            string sqlString = @"SELECT Total = SUM(Amount)
                FROM ContentItems";

            using SqlCommand command = connection.CreateCommand();
            command.CommandText = sqlString;
            SqlDataReader categoryReader = command.ExecuteReader(CommandBehavior.CloseConnection);

            return 0;
        }
    }
}
