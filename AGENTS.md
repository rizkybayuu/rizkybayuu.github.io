# rizkyby.web.github.io — Project Context

Portfolio statis (HTML/CSS/JS), dilayani lokal via `python http.server`.
Sebelum bind port, matikan listener lama di 8080/8081.

## Desain (wajib)
- Bahasa: **English-only**.
- Layout: fullscreen, **no scroll**.
- Palet: dark sunset (orange/purple/dark blue) — **tanpa hijau**.
- Animasi: `text2` ease-in-out; `text3` ease-out/in.
- Unit: `rem` scaling, **tanpa `clamp()`**.
- Hover: radial gradient fade-in/out mengikuti mouse.
- Preservasi wajib: efek meteor, `nav` `nowrap`.
- Work view: dikosongkan (atau container-nya saja kosong).

## Media assets
- **Zero file lokal** di `assets/media/` — semua media di-hosting di Google Drive.
- Semua referensi media di README.md pakai share link Google Drive.

## Git / rollback
- User minta **commit SHA eksak** untuk rollback (bukan reset sembarangan). Hindari reset yang salah.
- Revert eksplisit → gunakan `git restore <file>`, bukan tulis ulang manual.

## Testing
- Playwright (python, v1.63) terpasang di Python 3.14 Hermes; chromium di
  `/home/rizkybayuu_/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome`.
  Import dari `playwright.async_api` untuk headless test situs lokal.
- Provider deepseek aktif TIDAK mendukung vision (`vision_analyze` → 404). Verifikasi visual
  via analisis pixel PIL pada screenshot, bukan vision_analyze.

## Preferensi user
- Bahasa respons: Indonesia. Gaya: langsung, no-fluff.
