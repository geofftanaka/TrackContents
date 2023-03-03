using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Resources;

namespace TrackContents.Models
{

    public class ContentsModel
    {
        string connectionString = String.Empty;

        public ContentsModel()
        {
            ResourceManager rm = new ResourceManager("TrackContents.Resources.Data", Assembly.GetExecutingAssembly());
            connectionString = rm.GetString("ConnectionString");
        }


        public List<ContentItem> GetContentItems()
        {
            using SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();

            string sqlString = @"SELECT ItemId, ItemName, Amount, CategoryId
                FROM ContentItems
                ORDER BY CategoryId, ItemId";

            using SqlCommand command = connection.CreateCommand();
            command.CommandText = sqlString;
            SqlDataReader itemReader = command.ExecuteReader(CommandBehavior.CloseConnection);
            int idOrd = itemReader.GetOrdinal("ItemId");
            int nameOrd = itemReader.GetOrdinal("ItemName");
            int amountOrd = itemReader.GetOrdinal("Amount");
            int categoryOrd = itemReader.GetOrdinal("CategoryId");

            var contentItems = new List<ContentItem>();

            while (itemReader.Read())
            {
                contentItems.Add(new ContentItem(itemReader.GetInt32(idOrd), itemReader.GetString(nameOrd), itemReader.GetDecimal(amountOrd), itemReader.GetInt32(categoryOrd)));
            }

            itemReader.Close();
            return contentItems;
        }

       
        public async Task<int> AddContentItem(ContentItem contentItem)
        {
            using SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();

            try
            {
                string sqlString = @"INSERT INTO ContentItems (ItemName, Amount, CategoryId)
                OUTPUT Inserted.ItemId
                VALUES (@ItemName, @Amount, @CategoryId)";
                using SqlCommand command = connection.CreateCommand();
                command.CommandText = sqlString;

                command.Parameters.Add(new SqlParameter("@ItemName", SqlDbType.VarChar) { Value = contentItem.ItemName });
                command.Parameters.Add(new SqlParameter("@Amount", SqlDbType.Decimal) { Value = contentItem.Amount });
                command.Parameters.Add(new SqlParameter("@CategoryId", SqlDbType.Int) { Value = contentItem.CategoryId });

                var result = await command.ExecuteScalarAsync();

                if (result != null)
                {
                    return (int)result;
                }
                return 0;
            }
            catch (Exception ex)
            {
                return 0;
            }
            finally
            {
                connection.Close();
            }
        }

        public async Task<int> DeleteContentItem(int contentId)
        {
            using SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();

            try
            {
                string sqlString = @"DELETE FROM ContentItems 
                WHERE ContentItems.ItemId = @ItemId";
                using SqlCommand command = connection.CreateCommand();
                command.CommandText = sqlString;

                command.Parameters.Add(new SqlParameter("@ItemId", SqlDbType.Int) { Value = contentId });

                return await command.ExecuteNonQueryAsync();
            }
            catch (Exception ex)
            {
                return 0;
            }
            finally
            {
                connection.Close();
            }
        }
    }
}
