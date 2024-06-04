using Microsoft.AspNetCore.Mvc;

namespace SoruCevapMvc.Controllers
{
    public class SorularimController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public ActionResult Sorularim()
        {
            return RedirectToAction("Index", "Sorularim");
          

        }
    }
}
