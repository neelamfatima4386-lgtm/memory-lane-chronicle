/* =========================================================================
 *  EDIT EVERYTHING HERE
 *  -----------------------------------------------------------------------
 *  This is the ONLY file you need to touch to personalise the archive.
 *  Photos go in:  public/memories/memory-01.jpg ... memory-20.jpg
 *  Music goes in: public/audio/memory.mp3
 * ========================================================================= */

export type MemoryLayout =
  | "wide" // full-bleed cinematic frame
  | "tall" // vertical portrait card
  | "card" // medium card
  | "small" // small card
  | "polaroid" // tilted polaroid
  | "strip"; // film strip frame

export interface Memory {
  id: string;
  image: string;
  date: string;
  title: string;
  caption: string;
  code: string;
  year: string;
  layout: MemoryLayout;
  featured?: boolean;
  /** mark true to hide the caption behind a "SECRET" reveal */
  secret?: boolean;
  secretMessage?: string;
}

export interface WrappedStat {
  value: string;
  /** set when `value` should count up to a number (e.g. 7) */
  countTo?: number;
  suffix?: string;
  label: string;
}

/* ---------------------------------------------------------------- basics */

export const archive = {
  name: "Rafay",
  fullName: "Rafay Pathii",
  madeBy: "Hamid",

  /** displayed date of birth */
  dob: "28.08.2006",

  /** THE REAL TARGET — 28 Aug 2026, 00:00, Pakistan Standard Time (UTC+05:00) */
  countdownTarget: "2026-08-28T00:00:00+05:00",

  /** 4 digits */
  accessCode: "2006",

  /* ------------------------------------------------------------- chapter 1 */
  gate: {
    label: "PRIVATE ARCHIVE",
    heading: "I made something for you.",
    subheading: "But you're going to have to unlock it.",
    prompt: "ENTER ACCESS CODE",
    button: "UNLOCK ARCHIVE",
    error: "Nice try.",
  },

  /* ------------------------------------------------------------- chapter 2 */
  countdown: {
    heading: "THE ARCHIVE OPENS AT MIDNIGHT",
    subheading: "Some things are better opened when the day actually begins.",
  },

  /* ------------------------------------------------------------- chapter 3 */
  hero: {
    kicker: "THE WAIT IS OVER",
    title: ["HAPPY BIRTHDAY,", "RAFAY."],
    date: "28.08.2006",
    line: ["Another year.", "Still the same chaos."],
    welcome: "Welcome to your archive.",
    cta: "ENTER THE MEMORIES",
    aside: "Yeah, I actually made you a website. Don't get used to this.",
  },

  /* ------------------------------------------------------------- chapter 4 */
  archiveSection: {
    label: "01 / THE ARCHIVE",
    heading: "Way too many memories.",
    subheading: "So I gave them a place to live.",
    aside: "Let's look at the evidence.",
  },

  wrapped: {
    label: "FRIENDSHIP WRAPPED",
    heading: "The numbers don't lie.",
    subheading: "Some of these are estimates. Most of them are worse.",
  },

  /* ------------------------------------------------------------- chapter 5 */
  letter: {
    label: "02 / THINGS I DON'T USUALLY SAY",
    heading: "Okay, serious for a minute.",
    envelopeText: "There's something I wanted to say.",
    cta: "OPEN IT",
  },

  /* ------------------------------------------------------------- chapter 6 */
  final: {
    label: "03 / ONE LAST THING",
    lines: [
      "Some people become memories.",
      "Some become part of your story.",
      "You became part of mine.",
    ],
    title: ["HAPPY BIRTHDAY,", "RAFAY."],
    closing: "Here's to the memories we haven't made yet.",
    signature: "— Hamid",
    replay: "REPLAY THE EXPERIENCE",
    whisper: "See you in the next memory.",
  },

  /* --------------------------------------------------------------- music */
  music: {
    /** drop your file at public/audio/memory.mp3 */
    url: "/audio/memory.mp3",
    trackName: "the memory",
    artist: "for Rafay",
    playLabel: "PLAY THE MEMORY",
  },
};

/* =========================================================================
 *  THE LETTER — replace everything between the backticks.
 * ========================================================================= */

export const birthdayLetter = `Rafay,

I don't usually write things like this, so obviously I ended up making a whole website instead.

We've collected a ridiculous amount of memories, random conversations, stupid moments, and stories that probably make absolutely no sense to anyone else.

And honestly, that's what makes all of it special.

Some friendships just happen.

You look back one day and realize how many moments you've shared with someone.

I'm genuinely grateful for all of it.

So yeah, happy birthday bro.

Here's to another year of stupid ideas, random plans, good memories, and somehow surviving all of it.

— Hamid`;

/* =========================================================================
 *  FRIENDSHIP WRAPPED — edit freely.
 * ========================================================================= */

export const wrappedStats: WrappedStat[] = [
  { value: "EDIT", countTo: 7, label: "YEARS OF FRIENDSHIP" },
  { value: "∞", label: "MEMORIES" },
  { value: "EDIT", countTo: 100, suffix: "%", label: "UNNECESSARY CHAOS" },
  { value: "TOO MANY", label: "INSIDE JOKES" },
  { value: "LOST COUNT", label: "LATE NIGHT TALKS" },
  { value: "STILL HERE", label: "SOMEHOW" },
];

/* =========================================================================
 *  MEMORIES — 20 slots ready for your photos.
 *  Replace date / title / caption / code. Keep `image` names or change them.
 * ========================================================================= */

/** helper so each entry below stays short — override anything you like */
function memory(
  n: number,
  layout: MemoryLayout,
  year: string,
  extra: Partial<Omit<Memory, "id">> = {},
): Memory {
  const id = String(n).padStart(2, "0");
  return {
    id,
    image: `/memories/memory-${id}.jpg`,
    date: "EDIT DATE",
    title: "EDIT TITLE",
    caption: "EDIT CAPTION",
    code: `R + H // ${id}`,
    year,
    layout,
    ...extra,
  };
}

export const memories: Memory[] = [
  memory(1, "wide", "2024", { featured: true }),
  memory(2, "polaroid", "2024"),
  memory(3, "tall", "2024"),
  memory(4, "card", "2024", {
    secret: true,
    secretMessage: "You definitely remember this one.",
  }),
  memory(5, "strip", "2024"),
  memory(6, "small", "2024"),
  memory(7, "card", "2024"),
  memory(8, "tall", "2025"),
  memory(9, "wide", "2025", { featured: true }),
  memory(10, "polaroid", "2025", {
    secret: true,
    secretMessage: "We are never explaining this.",
  }),
  memory(11, "card", "2025"),
  memory(12, "small", "2025"),
  memory(13, "strip", "2025"),
  memory(14, "tall", "2025"),
  memory(15, "card", "2025", {
    secret: true,
    secretMessage: "Yeah... that happened.",
  }),
  memory(16, "polaroid", "2026"),
  memory(17, "wide", "2026", { featured: true }),
  memory(18, "small", "2026"),
  memory(19, "card", "2026"),
  memory(20, "tall", "2026"),
];


export const timelineYears = ["2024", "2025", "2026"];
