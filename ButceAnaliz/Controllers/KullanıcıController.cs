﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ButceAnaliz.Models;

namespace ButceAnaliz.Controllers
{
    public class KullanıcıController : Controller
    {
        private readonly DataContext _context;

        public KullanıcıController(DataContext context)
        {
            _context = context;
        }

        // GET: Kullanıcı
        public async Task<IActionResult> Index()
        {
            return View(await _context.Kullanıcı.ToListAsync());
        }

        // GET: Kullanıcı/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var kullanıcı = await _context.Kullanıcı
                .FirstOrDefaultAsync(m => m.Id == id);
            if (kullanıcı == null)
            {
                return NotFound();
            }

            return View(kullanıcı);
        }

        // GET: Kullanıcı/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Kullanıcı/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,KullanıcıAd,KullanıcıSoyad,Parola,Email")] Kullanıcı kullanıcı)
        {
            if (ModelState.IsValid)
            {
                _context.Add(kullanıcı);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(kullanıcı);
        }

        // GET: Kullanıcı/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var kullanıcı = await _context.Kullanıcı.FindAsync(id);
            if (kullanıcı == null)
            {
                return NotFound();
            }
            return View(kullanıcı);
        }

        // POST: Kullanıcı/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,KullanıcıAd,KullanıcıSoyad,Parola,Email")] Kullanıcı kullanıcı)
        {
            if (id != kullanıcı.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(kullanıcı);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!KullanıcıExists(kullanıcı.Id))
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
            return View(kullanıcı);
        }

        // GET: Kullanıcı/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var kullanıcı = await _context.Kullanıcı
                .FirstOrDefaultAsync(m => m.Id == id);
            if (kullanıcı == null)
            {
                return NotFound();
            }

            return View(kullanıcı);
        }

        // POST: Kullanıcı/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var kullanıcı = await _context.Kullanıcı.FindAsync(id);
            _context.Kullanıcı.Remove(kullanıcı);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool KullanıcıExists(int id)
        {
            return _context.Kullanıcı.Any(e => e.Id == id);
        }
    }
}
