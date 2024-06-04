using Microsoft.AspNetCore.Mvc;

namespace SoruCevapMvc.Controllers
{
    public class GirisYapController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        // Yeni action, direkt olarak GirişYap sayfasına yönlendiriyor.
        public ActionResult GirisYap()
        {
            return RedirectToAction("Index", "GirisYap");
        }

        [HttpPost]
        public ActionResult Giris(string KullaniciAdi, string Sifre)
        {
            return RedirectToAction("Index", "GirisYap");
            Console.Write(Sifre);
            
        }
    }
}
