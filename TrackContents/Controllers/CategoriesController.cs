
using TrackContents.Classes;
using TrackContents.Models;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace TrackContents.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly CategoriesModel model;
        private readonly ContentsModel contentsModel;

        public CategoriesController()
        {
            this.model = new CategoriesModel();
            this.contentsModel = new ContentsModel();
        }

        [HttpGet]
        public async Task<IEnumerable<Category>> Get()
        {
            List<Category> categories = await model.GetCategories();
            var calcTotal = new CalculateTotals();
            
            foreach (var category in categories)
            {
                category.CategoryAmount = calcTotal.GetCategoryTotal(category);
            }
            return categories;
        }
    }
}
