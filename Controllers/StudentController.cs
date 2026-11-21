using CourseDesk.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseDesk.Controllers
{
    public class StudentController : Controller
    {
        // GET: /Student
        public IActionResult Index()
        {
            return View(StudentStore.GetAll());
        }

        // GET: /Student/Create
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // POST: /Student/Create (model binding fills the Student object)
        [HttpPost]
        public IActionResult Create(Student student)
        {
            // extra rule: one email can be registered only once
            if (!string.IsNullOrEmpty(student.Email) && StudentStore.EmailExists(student.Email))
            {
                ModelState.AddModelError("Email", "This email address is already registered.");
            }

            if (!ModelState.IsValid)
            {
                return View(student);
            }

            StudentStore.Add(student);
            TempData["Message"] = student.Name + " was registered successfully.";

            return RedirectToAction("Index");
        }

        // GET: /Student/Details/3
        public IActionResult Details(int id)
        {
            Student student = StudentStore.Find(id);

            if (student == null)
            {
                return NotFound();
            }

            return View(student);
        }
    }
}
