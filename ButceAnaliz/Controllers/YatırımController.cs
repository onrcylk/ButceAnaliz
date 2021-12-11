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
    public class YatırımController : Controller
    {
        private readonly DataContext _context;

        public YatırımController(DataContext context)
        {
            _context = context;
        }

        // GET: Yatırım
        public async Task<IActionResult> Index()
        {
            return View(await _context.Yatırım.ToListAsync());
        }

        // GET: Yatırım/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var yatırım = await _context.Yatırım
                .FirstOrDefaultAsync(m => m.Id == id);
            if (yatırım == null)
            {
                return NotFound();
            }

            return View(yatırım);
        }

        // GET: Yatırım/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Yatırım/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,YatırımTürü")] Yatırım yatırım)
        {
            if (ModelState.IsValid)
            {
                _context.Add(yatırım);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(yatırım);
        }

        // GET: Yatırım/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var yatırım = await _context.Yatırım.FindAsync(id);
            if (yatırım == null)
            {
                return NotFound();
            }
            return View(yatırım);
        }

        // POST: Yatırım/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,YatırımTürü")] Yatırım yatırım)
        {
            if (id != yatırım.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(yatırım);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!YatırımExists(yatırım.Id))
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
            return View(yatırım);
        }

        // GET: Yatırım/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var yatırım = await _context.Yatırım
                .FirstOrDefaultAsync(m => m.Id == id);
            if (yatırım == null)
            {
                return NotFound();
            }

            return View(yatırım);
        }

        // POST: Yatırım/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var yatırım = await _context.Yatırım.FindAsync(id);
            _context.Yatırım.Remove(yatırım);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool YatırımExists(int id)
        {
            return _context.Yatırım.Any(e => e.Id == id);
        }
    }
}
