using Microsoft.AspNetCore.Mvc;
using Raw.Models;
using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace Raw.Controllers
{
    public class HomeController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string defaultPath;
        public HomeController()
        {
            _configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            defaultPath = Environment.CurrentDirectory + "\\wwwroot\\" +_configuration.GetValue<string>("Raw:DefaultPath");
        }

        [HttpGet]
        public IActionResult Index(string SelectedPath = "", string SelectedType = "Folder")
        {
            try
            {
                var selectedPath = defaultPath + "\\" + SelectedPath;
                ViewBag.DefaultPath = _configuration.GetValue<string>("Raw:DefaultPath");
                ViewBag.SelectedPath = SelectedPath;
                ViewBag.OlderPath = string.Join("\\", SelectedPath?.Split("\\")[..^1] ?? new string[0]);
                if (SelectedType == "Folder")
                {
                    var folderStringList = Directory.GetDirectories(selectedPath);
                    var folderList = new List<PathType>();
                    foreach (var folderString in folderStringList)
                    {
                        folderList.Add(new PathType
                        {
                            Path = Path.GetFileName(folderString),
                            Type = "Folder"
                        });
                    }
                    string[] fileStringList = Directory.GetFiles(selectedPath, "*", SearchOption.TopDirectoryOnly);
                    var fileList = new List<PathType>();
                    foreach (var fileString in fileStringList)
                    {
                        fileList.Add(new PathType
                        {
                            Path = Path.GetFileName(fileString),
                            Type = "File"
                        });
                    }

                    if (SelectedPath?.Split("\\")[..^1]?.Length == 1 && (SelectedPath?.Split("\\")[..^1][0])?.Length == 0)
                    {
                        ViewBag.DescriptionContent = System.IO.File.ReadAllLines(selectedPath + "\\" + _configuration.GetValue<string>("Raw:DescriptionFile"));
                    }
                    ViewBag.FolderList = folderList;
                    ViewBag.FileList = fileList;
                }
                else if (SelectedType == "File")
                {
                    ViewBag.FileContent = System.IO.File.ReadAllLines(selectedPath);
                    return View("File");
                }

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
