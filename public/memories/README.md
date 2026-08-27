# Photos go here

Drop your images in this folder named exactly:

```
memory-01.jpg
memory-02.jpg
...
memory-20.jpg
```

They map 1:1 to the 20 slots in `src/config/archive.ts`. Any slot without a file
shows a styled "ADD PHOTO" placeholder instead of a broken image, so you can add
them a few at a time.

Tips:
- JPG or WebP, ideally under ~500 KB each (rename the `image` path in the config
  if you use `.webp`).
- `wide` / `strip` slots look best with landscape photos, `tall` / `polaroid`
  with portrait ones.
- Edit `date`, `title`, `caption`, and `code` for each memory in
  `src/config/archive.ts`.
- Background music goes in `public/audio/memory.mp3`.
