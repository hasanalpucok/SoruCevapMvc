using Microsoft.AspNetCore.Mvc;

namespace SoruCevapMvc.Controllers
{
    public class SoruOlusturController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public ActionResult SoruOlustur()
        {
            return RedirectToAction("Index", "SoruOlustur");
         

        }
    }
}
