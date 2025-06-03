# Code Convention

This project follows the following conventions:

- All variables are written in **English**, unless the data is inherently Indonesian (e.g., 'nik', 'tanggal')
- File structure uses lowercase with dash/hyphen separator (e.g. `date-utils.ts`)
- Modules are grouped by domain (currency, date, identity, holiday)
- TypeScript strict mode is enforced
- Public-facing APIs must include JSDoc

Naming:

- Functions use `camelCase`
- Type aliases use `PascalCase`
- Constants use `UPPER_SNAKE_CASE` if exported
