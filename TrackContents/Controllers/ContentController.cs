
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
    public class ContentController : ControllerBase
    {
        private readonly CategoriesModel model;
        private readonly ContentsModel contentsModel;

        public ContentController()
        {
            this.model = new CategoriesModel();
            this.contentsModel = new ContentsModel();
        }

        [HttpPost]
        public async Task<ActionResult<int>> AddContent(ContentItem content)
        {
            var results = await contentsModel.AddContentItem(content);
            return CreatedAtAction(nameof(AddContent), new { id = results });
        }

        [HttpDelete("{contentId:int}")]
        public async Task<ActionResult<ContentItem>> DeleteContent(int contentId)
        {
            var results = await contentsModel.DeleteContentItem(contentId);
            return CreatedAtAction(nameof(DeleteContent), results);
        }
    }
}
