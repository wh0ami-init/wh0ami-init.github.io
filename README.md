# My Portfolio (React + GSAP)

A modern portfolio website with scroll animations. No backend needed.

## 1. Run it on your computer

You need Node.js installed. Then, in this folder:

```bash
npm install
npm run dev
```

Open the link it shows (usually http://localhost:5173).

## 2. Add YOUR picture

Save your photo inside the `public` folder as `PF.jpg` (or use `photo.jpg`,
`photo.jpeg`, `photo.png` or `photo.webp`):

```
public/PF.jpg
```

A photo with your face in the upper half looks best. Portrait (tall) photos are ideal.

## 3. Change the words to your own

Open **`src/data.js`**. Change these things:

- `name` and `initials`
- `email`
- `whatsapp` (country code + number, no `+` and no spaces, e.g. `919812345678`)
- `github`, `linkedin`, `instagram` links
- the "About" text, services and projects

Everything on the website reads from this one file.

## 4. Put it online (free)

1. Push this folder to GitHub.
2. Go to vercel.com, click **Add New → Project**, and pick the repository.
3. Vercel finds Vite by itself. Click **Deploy**. Done!

Build command: `npm run build`  ·  Output folder: `dist`

## What is inside

| Part | File |
|---|---|
| Intro counter | `src/components/Preloader.jsx` |
| Top section with photo | `src/components/Hero.jsx` |
| About (words light up on scroll) | `src/components/About.jsx` |
| Services cards | `src/components/Services.jsx` |
| Projects (sideways scroll) | `src/components/Projects.jsx` |
| Steps (line draws on scroll) | `src/components/Process.jsx` |
| Contact (opens WhatsApp / email) | `src/components/Contact.jsx` |
| All colours and sizes | `src/styles.css` (top of the file) |

To change the orange colour, edit `--accent` at the top of `src/styles.css`.
