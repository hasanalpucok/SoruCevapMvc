using Microsoft.AspNetCore.Mvc;

namespace SoruCevapMvc.Controllers
{
    public class SorulariGoruntuleController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public ActionResult SorulariGoruntule()
        {
            return RedirectToAction("Index", "SorulariGoruntule");


        }
    }
}
