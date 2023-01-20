using System;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Raw.Models;

namespace Raw.Controllers
{
    public class ExperienceController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            try
            {
                ViewBag.Title = "Tecrübe";
                return View();
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return View();
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
