# 🗒️ Catatan Perubahan

## Versi ${version} (${date})

### [0.1.5](https://github.com/liu-purnomo/indo-format/compare/v0.1.4...v0.1.5) (2025-06-03)

### [0.1.4](https://github.com/liu-purnomo/indo-format/compare/v0.1.3...v0.1.4) (2025-06-03)

## [0.1.1] - 2025-06-03
### Added
- `formatRupiah()` and `parseRupiah()` for currency formatting
- `terbilang()` in general numeric converter
- `validateNIK()` and `parseNIK()` for NIK handling
- `formatTanggal()` and `parseTanggal()` with Bahasa Indonesia output
- `relativeTime()` and `formatWaktuRelative()` for readable time differences
- `diffTanggal()` for difference in days, months, or years
- `isHariLiburNasional()` dynamic from JSON by year
- Documentation files: `README.md`, `LICENSE`, `CODE_OF_CONDUCT.md`, `CONTRIBUTE.md`, `CONVENTION.md`

### Fixed
- Corrected `seribu` logic in `terbilang()` when handling 1000
- Removed `dist/` from Git tracking and added to `.gitignore`

### Changed
- Switched all variable names to English for consistency
- Improved structure of modules into: `currency`, `date`, `identity`, `holiday`, `terbilang`

### Notes
This is the first formal version of `indo-format`, structured with modular utilities for Indonesian formatting needs.
