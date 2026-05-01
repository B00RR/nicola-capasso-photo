# Fase 2 — Database & RLS

⏱ **3 giorni** · ⛓ Fase 0, Fase 1 · ⚪ **stato: todo**

## Obiettivo

Schema completo, RLS attive, migrazioni versionate.

## Task

- **2.1** `supabase init` nella root del repo → crea cartella `supabase/`.
- **2.2** `supabase link --project-ref <id>` → collega al progetto cloud.
- **2.3** Creare migrazione `0001_types.sql` con gli ENUM definiti nello schema (`wedding_status`, `contribution_type`, `contribution_status`).
- **2.4** Creare migrazione `0002_helpers.sql` con `is_admin()`, `is_guest_of()`, `wedding_accepts_uploads()`.
- **2.5** Creare migrazioni `0003_..0011_*.sql` una per tabella, **in ordine di dipendenza**: `weddings → wedding_moments → guests → contributions → pro_photos → hearts → book_drafts → preview_tokens → scaletta_templates → audit_log`.
- **2.6** Creare migrazione `0012_indexes.sql` con tutti gli indici.
- **2.7** Creare migrazione `0013_triggers.sql` con `set_updated_at`, `sync_hearts_count`, `audit_*`.
- **2.8** Creare migrazione `0014_rls_enable.sql` che abilita RLS su tutte le tabelle.
- **2.9** Creare migrazione `0015_rls_policies.sql` con tutte le policies row-level.
- **2.10** Creare migrazione `0016_storage.sql` che crea i 4 bucket (`covers`, `media`, `pro`, `public-thumbs`).
- **2.11** Creare migrazione `0017_storage_policies.sql` con le policies su `storage.objects`.
- **2.12** Eseguire `supabase db push` → applicare al cloud.
- **2.13** Creare un seed manuale per Nicola: la sua row in `auth.users` esiste, niente da seedare in tabelle dominio.
- **2.14** Configurare workflow GitHub Actions `db-migrate.yml`: su merge a main, applica migrazioni mancanti via Supabase CLI (con `SUPABASE_ACCESS_TOKEN`).

## Verifica manuale critica

- **2.15** In Studio, prova INSERT con utente non-admin in `weddings` → deve fallire (RLS).
- **2.16** Prova SELECT su `weddings` con `status='draft'` da utente non-admin → 0 righe.
- **2.17** Crea manualmente in Studio un wedding `live`, poi crea un guest con `signInAnonymously()` da console JS, prova a scrivere un contributo → deve riuscire.
- **2.18** Prova hide+select dello stesso contributo da un altro guest → non deve apparirgli.

## ✅ Definition of Done

Tutti e 4 i test manuali passano + le migrazioni girano da CI.

## 💡 Miglioramenti suggeriti

- Aggiungi una migrazione `9999_seed_dev.sql` opzionale (gated da env) che crea un wedding di test "DEV-WEDDING-LOCAL" + 5 guest finti + 20 contributi. Durante lo sviluppo locale lo applichi a un Supabase locale via Docker, e hai sempre dati di esempio.
