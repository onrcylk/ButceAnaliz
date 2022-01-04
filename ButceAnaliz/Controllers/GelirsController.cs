using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ButceAnaliz.Models;


namespace ButceAnaliz.Controllers
{
    public class GelirsController : Controller
    {
        private readonly DataContext _context;

        public GelirsController(DataContext context)
        {
            _context = context;
        }

        // GET: Gelirs
        public async Task<IActionResult> Index()
        {
            var gelirUser = _context.Users.FirstOrDefault(x => x.Email == User.Identity.Name);
            return View(await _context.Gelir.Where(x=>x.User==gelirUser).ToListAsync());
        }

        // GET: Gelirs/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var gelir = await _context.Gelir
                .FirstOrDefaultAsync(m => m.Id == id);
            if (gelir == null)
            {
                return NotFound();
            }

            return View(gelir);
        }

        // GET: Gelirs/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Gelirs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Maas,YatırımKar,User.UserName")] Gelir gelir)
        {
            if (ModelState.IsValid)
            {
                var gelirUser=_context.Users.FirstOrDefault(x=>x.Email==User.Identity.Name);
                gelir.User = gelirUser;
                _context.Add(gelir);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(gelir);
        }

        // GET: Gelirs/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var gelir = await _context.Gelir.FindAsync(id);
            if (gelir == null)
            {
                return NotFound();
            }
            return View(gelir);
        }

        // POST: Gelirs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Maas,YatırımKar")] Gelir gelir)
        {
            if (id != gelir.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(gelir);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!GelirExists(gelir.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(gelir);
        }

        // GET: Gelirs/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var gelir = await _context.Gelir
                .FirstOrDefaultAsync(m => m.Id == id);
            if (gelir == null)
            {
                return NotFound();
            }

            return View(gelir);
        }

        // POST: Gelirs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var gelir = await _context.Gelir.FindAsync(id);
            _context.Gelir.Remove(gelir);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool GelirExists(int id)
        {
            return _context.Gelir.Any(e => e.Id == id);
        }
    }
}
