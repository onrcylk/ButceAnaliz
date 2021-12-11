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
    public class GidersController : Controller
    {
        private readonly DataContext _context;

        public GidersController(DataContext context)
        {
            _context = context;
        }

        // GET: Giders
        public async Task<IActionResult> Index()
        {
            return View(await _context.Gider.ToListAsync());
        }

        // GET: Giders/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var gider = await _context.Gider
                .FirstOrDefaultAsync(m => m.Id == id);
            if (gider == null)
            {
                return NotFound();
            }

            return View(gider);
        }

        // GET: Giders/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Giders/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ElektirikFatura,SuFatura,DoğalgazFatura,InternetFatura,TelefonFatura,KrediTutar")] Gider gider)
        {
            if (ModelState.IsValid)
            {
                _context.Add(gider);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(gider);
        }

        // GET: Giders/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var gider = await _context.Gider.FindAsync(id);
            if (gider == null)
            {
                return NotFound();
            }
            return View(gider);
        }

        // POST: Giders/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,ElektirikFatura,SuFatura,DoğalgazFatura,InternetFatura,TelefonFatura,KrediTutar")] Gider gider)
        {
            if (id != gider.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(gider);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!GiderExists(gider.Id))
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
            return View(gider);
        }

        // GET: Giders/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var gider = await _context.Gider
                .FirstOrDefaultAsync(m => m.Id == id);
            if (gider == null)
            {
                return NotFound();
            }

            return View(gider);
        }

        // POST: Giders/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var gider = await _context.Gider.FindAsync(id);
            _context.Gider.Remove(gider);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool GiderExists(int id)
        {
            return _context.Gider.Any(e => e.Id == id);
        }
    }
}
