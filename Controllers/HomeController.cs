using CourseDesk.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseDesk.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            List<Student> all = StudentStore.GetAll();

            ViewBag.Total = all.Count;
            ViewBag.Latest = all.Count > 0 ? all[all.Count - 1] : null;

            return View();
        }
    }
}
