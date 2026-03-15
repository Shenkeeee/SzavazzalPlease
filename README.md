# Valasztasi Mozgosito PWA

## Projekt osszefoglalo

Ez a mobilra optimalizalt webalkalmazas a peer-to-peer (P2P) mozgositas erejevel noveli a valasztasi reszvetelt. A szoftver minimalis frikciora es a pszichologiai elkotelezodesre epul: regisztracio nelkul teszi lehetove a szemelyes szavazasi terv elkesziteset es harom ismeros mozgositasi folyamatba valo bevonasat.

## Fobb funkciok

- **Commitment Tracker:** Harom ismeros nevesitese, akiket a felhasznalo szemelyesen vallal emlekeztetni a valasztas napjan.
- **Voting Plan:** Konkret szavazasi idopont es mod kivalasztasa a reszveteli hajlando-sag novelesere.
- **Viral Loop:** Egyedi, szemelyre szabott mozgosito linkek es social media kartyak generalasa.
- **Impact Dashboard:** Valos ideju, anonim kozossegi statisztikak (napi, heti es osszesitett adatok) a tarsadalmi bizonyitek (social proof) megteremtesehez.
- **Admin Insights:** Kampanyszintu meresek, beleertve a virusszorzot (K-faktor), a kattintasszamokat es a teruleti aktivalast.

## Technologiai stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **Icons:** Lucide-react
- **Architecture:** PWA (Progressive Web App) a telepites nelkuli elereshez es offline tamogatashoz.

## Telepites es futtatas

1. Repo klonozasa: git clone [url]
2. Fuggosegek telepitese: npm install
3. Fejlesztoi kornyezet inditasa: npm run dev

## Adatvedelmi iranyelvek (GDPR)

Az alkalmazas Privacy-by-Design elven mukodik. A rendszer nem gyujt es nem tarol szemelyes adatokat (telefonszam, e-mail cim, teljes nev). A mozgositasi lista csak a felhasznalo eszkozen, lokalisan vagy anonimizalt modon ertelmezheto, igy a szoftver teljes mertekben megfelel a GDPR eloirasainak.

## Meres es analitika

A siker merese anonim esemenykövetesen alapul, amely a kovetkezo metrikakat figyeli:

- Generalt egyedi linkek szama.
- Referral kattintasok aranya.
- Checklist alapu visszaigazolasok a valasztas napjan.
