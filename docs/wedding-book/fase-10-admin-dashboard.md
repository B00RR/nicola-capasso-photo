# Fase 10 — Admin shell & dashboard

⏱ **3 giorni** · ⛓ Fase 4 · ⚪ **stato: todo**

## Obiettivo

Schermate ① ② ③ Nicola.

## Task

- **10.1** Pagina `/admin/login` (① Nicola):
  - Form email + password.
  - `signInWithPassword` Supabase.
  - Redirect a `/admin` se admin, errore se non admin.
- **10.2** Wrapper `<AdminLayout>`: header con avatar Nicola + dropdown logout/settings.
- **10.3** Setup wizard ② Nicola: solo al primo login (salva flag in `app_metadata.onboarded=true`).
- **10.4** Pagina `/admin` (③ Nicola):
  - Storage gauge in cima (calcolato via Edge Function `get_storage_usage` o stored procedure).
  - Banner archiviazione se `archive_due_at < now()`.
  - CTA "Nuovo matrimonio".
  - 3 sezioni: in corso / in arrivo / archiviati.
  - Card singola wedding: cover thumb + stats + link.
- **10.5** Edge Function `get_storage_usage(wedding_id)`: restituisce bytes + count per wedding.
- **10.6** Stati alternativi: nessun matrimonio, storage > 90%.

## ✅ Definition of Done

Nicola entra, vede la dashboard pulita.
