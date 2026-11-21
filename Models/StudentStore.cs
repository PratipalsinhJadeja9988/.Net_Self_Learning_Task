namespace CourseDesk.Models
{
    // Keeps all students in memory (a static list), so no database is needed.
    // The list is shared by every controller and is cleared when the app stops.
    public static class StudentStore
    {
        private static List<Student> students = new List<Student>();
        private static int lastId = 0;

        public static List<Student> GetAll()
        {
            return students;
        }

        public static void Add(Student student)
        {
            lastId++;
            student.Id = lastId;
            students.Add(student);
        }

        public static Student Find(int id)
        {
            return students.FirstOrDefault(s => s.Id == id);
        }

        public static bool EmailExists(string email)
        {
            return students.Any(s => s.Email.ToLower() == email.ToLower());
        }
    }
}
