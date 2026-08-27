# Rafay's Private Digital Birthday Archive

A single cinematic, dark-midnight experience with six chapters, gated by access code `2006`, real countdown to 28 Aug 2026 00:00 PKT (which is ~5.5 hours from now), and everything editable from one config file.

## Chapters

1. **01 Access** — near-black scene, "PRIVATE ARCHIVE" label, "I made something for you.", glass 4-digit code input. Correct code: glow + particle burst + lock/expand transition. Wrong: shake, faint red glow, "Nice try." Unlock state persists for the session; Replay clears it.
2. **02 Midnight** — "THE ARCHIVE OPENS AT MIDNIGHT" with large glass DAYS/HOURS/MINUTES/SECONDS panels and smooth rolling digits. Live tick against the real target; if the target has already passed, this chapter is skipped entirely. At zero it plays the unlock sequence in place (no refresh): numbers freeze, screen darkens, particles accelerate, central glow expands, type dissolves, restrained confetti, cut to reveal.
3. **03 Reveal** — "THE WAIT IS OVER", huge "HAPPY BIRTHDAY, RAFAY.", "28.08.2006", the chaos line, "Welcome to your archive.", and "ENTER THE MEMORIES ↓".
4. **04 Archive** — "01 / THE ARCHIVE", editorial asymmetric layout (full-bleed frames, tilted polaroids, film strips, overlapping cards, glass metadata panels, scrapbook notes) rather than a uniform grid. 20 placeholder memories, hover zoom/rise/glow with "OPEN MEMORY" cursor label, full-screen viewer with prev/next/close and keyboard support. 3 memories flagged `secret` with a hidden reveal message. Sticky year markers as you scroll. Sub-section "FRIENDSHIP WRAPPED / THE NUMBERS DON'T LIE" with animated counters and non-numeric values (∞, 100% CHAOS, TOO MANY, STILL HERE SOMEHOW).
5. **05 Letter** — "02 / THINGS I DON'T USUALLY SAY", "Okay, serious for a minute.", tactile dark sealed envelope with gold/violet edge light. Click: lift, flap opens, paper slides up, background dims, letter types in line by line. Letter body is one template string in config.
6. **06 Final** — "03 / ONE LAST THING". Starts near-black with a single glowing point; the three lines appear with pauses, then the huge birthday line, closing line, "— Hamid", then a restrained celebration (soft fireworks, glowing dust, star particles, bloom). "REPLAY THE EXPERIENCE" resets all state client-side back to Access. Tiny "See you in the next memory." at the very bottom.

## Look and feel

- Base `#050507 / #080A12 / #0D1020`, deep navy/violet/indigo; accents used sparingly as light: electric blue, violet glow, champagne gold, a whisper of pink.
- Living background: gradient base, huge blurred orbs, fine particles, stars, grain, occasional confetti, and a few very faint floating birthday symbols (never over the UI).
- Type: Manrope for UI plus one elegant serif for emotional moments; massive headlines, tiny uppercase labels, generous whitespace.
- Choreographed motion only: blur-to-focus, mask/clip-path reveals, staggered text, spring, parallax, slow drift. Each chapter has its own mood (mysterious → anticipation → celebration → nostalgia → intimacy → emotion).
- Custom glowing-dot cursor with expanding ring and contextual labels on desktop only.

## Images

No AI-generated photos. `public/memories/` gets a README and the config points at `memory-01.jpg … memory-20.jpg`. Until files exist, cards render an elegant dark placeholder frame with the memory number/label — no broken images. Drop real files in with matching names and they appear.

## Editing in one place

`src/config/archive.ts` holds: name, dob, birthday, accessCode, countdownTarget, hero copy, `birthdayLetter` template string, `memories[]` (id, image, date, title, caption, code, layout, featured, secret, secretMessage, year), `musicUrl`, `wrappedStats`, `finalMessage`, `madeBy`. Nothing personal lives in components.

## Music

Floating player styled as part of the system: "PLAY THE MEMORY", pause, progress, track name, subtle waveform. Never autoplays; source is `config.musicUrl` (`/audio/memory.mp3`). If the file is absent the player stays disabled rather than erroring.

## Technical notes

- TanStack Start route `src/routes/index.tsx` replaces the placeholder and owns the experience; chapter state in a single reducer/context, no route changes between chapters. Route `head()` gets an app-specific title/description/og.
- Framer Motion (`motion`) for animation; canvas-based particle layer with density scaled down on mobile and honoring `prefers-reduced-motion`.
- Components: SecretGate, MidnightCountdown, MidnightUnlock, BirthdayHero, ChapterIndicator, MemoryArchive, MemoryCard, MemoryViewer, FriendshipWrapped, LetterSection, Envelope, MusicPlayer, FinalReveal, ParticleBackground, FloatingBirthdayElements, CustomCursor.
- Colors/gradients/shadows added as semantic tokens in `src/styles.css` (no hardcoded color utilities).
- Mobile: stacked memory layout, reduced particles, simplified parallax, larger touch targets, no horizontal overflow; lazy-loaded images with correct `object-fit`.
- Countdown compares real `Date.now()` to the fixed `+05:00` timestamp, so it behaves correctly regardless of the viewer's timezone.
