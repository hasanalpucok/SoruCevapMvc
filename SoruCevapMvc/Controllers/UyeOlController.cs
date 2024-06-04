using Microsoft.AspNetCore.Mvc;

namespace SoruCevapMvc.Controllers
{
    public class UyeOlController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public ActionResult GirisYap()
        {
            return RedirectToAction("Index", "UyeOl");
        }
    }
}
