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
    public class Dashboards1Controller : Controller
    {
        private readonly DataContext _context;

        public Dashboards1Controller(DataContext context)
        {
            _context = context;
        }

        // GET: Dashboards1
        public async Task<IActionResult> Index()
        {
            return View(await _context.Dashboards.ToListAsync());
        }

        // GET: Dashboards1/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dashboard = await _context.Dashboards
                .FirstOrDefaultAsync(m => m.Id == id);
            if (dashboard == null)
            {
                return NotFound();
            }

            return View(dashboard);
        }

        // GET: Dashboards1/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Dashboards1/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,GelenToplamTutar,GidenToplamTutar,ToplamTutar,KayitTarihi")] Dashboard dashboard)
        {
            if (ModelState.IsValid)
            {
                _context.Add(dashboard);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(dashboard);
        }

        // GET: Dashboards1/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dashboard = await _context.Dashboards.FindAsync(id);
            if (dashboard == null)
            {
                return NotFound();
            }
            return View(dashboard);
        }

        // POST: Dashboards1/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,GelenToplamTutar,GidenToplamTutar,ToplamTutar,KayitTarihi")] Dashboard dashboard)
        {
            if (id != dashboard.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(dashboard);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DashboardExists(dashboard.Id))
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
            return View(dashboard);
        }

        // GET: Dashboards1/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dashboard = await _context.Dashboards
                .FirstOrDefaultAsync(m => m.Id == id);
            if (dashboard == null)
            {
                return NotFound();
            }

            return View(dashboard);
        }

        // POST: Dashboards1/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var dashboard = await _context.Dashboards.FindAsync(id);
            _context.Dashboards.Remove(dashboard);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DashboardExists(int id)
        {
            return _context.Dashboards.Any(e => e.Id == id);
        }
    }
}
