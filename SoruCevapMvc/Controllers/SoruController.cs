using Microsoft.AspNetCore.Mvc;

namespace SoruCevapMvc.Controllers
{
    public class SoruController : Controller
    {
        public IActionResult Index(int id)
        {
            ViewData["PostId"] = id; // Post Id'sini View'e gönderiyoruz
            return View();
        }
    }
}
