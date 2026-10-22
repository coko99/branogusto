# BraNo Gusto

Informativni sajt za BraNo Gusto — domaći ajvar, džemovi i matični sokovi. Isti sadržaj, logo i fotografije kao na [branogusto.rs](https://www.branogusto.rs/), u modernijem izdanju.

## Pokretanje

```bash
npm install
npm run dev
```

Podrazumevani port je 3000. Za drugi port:

```bash
npx next dev --port 4317
```

## Provera

```bash
npm run lint
npm run build
```

## Objavljivanje na Vercel

Projekat je Next.js aplikacija i ne traži env promenljive.

1. Uvezite repozitorijum na [Vercel](https://vercel.com/new).
2. Framework ostavite na Next.js.
3. Deploy.

Ili iz terminala, posle `npx vercel login`:

```bash
npx vercel
```

Ulaz traži pin `1706` dok je sajt na dolasku. Tačan pin se pamti u kolačiću 30 dana. U meniju je „Najčešća pitanja” (`/pitanja`). Isti deo stoji i na početnoj i na kontaktu: porudžbina, dostava, poštarina, popust, paketi, asortiman. Kontakt forma otvara program za email posetioca ka `info@branogusto.rs`. Korpa ne šalje porudžbinu dok slanje ne bude povezano: slaže je na ekranu, sa kuponom, adresom i izborom pošte ili preuzimanja u Kruševcu i Beogradu. Besplatna dostava je preko 5.000 RSD. Kupon za probu: `ZIMNICA10`. Plutajuće dugme nudi poruku, SMS, poziv, WhatsApp i Viber.
