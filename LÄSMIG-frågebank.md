# Permanent frågebank för PT Minneskort

## Två filer, olika uppdateringstakt

| Fil | Innehåll | Ändras |
|---|---|---|
| `minneskort-data-begrepp.js` | Din stabila "grundutgåva" — begrepp för hela högstadiet, taggade årskurs + arbetsområde | Sällan |
| `minneskort-data-mattematchen.js` | Läxuppgifterna (Mattematchen 1–20) | Varje vecka |

Båda är helt valfria var för sig — saknas en av dem laddas bara den andra.
Vill du dela upp ytterligare (t.ex. en fil per ämne) går det bra: lägg till
fler `<script src="...">`-rader i `PT-Minneskort.html` där de andra två
står, och låt filen anropa `registerMinneskortBank({...})` precis som de
befintliga. Ordningen mellan filerna spelar ingen roll.

## Så funkar synken

Varje gång sidan öppnas läses filerna in och slås ihop med det som redan
finns sparat i webbläsaren:

- **Nytt kort/samling/ämne** (nytt id) → läggs till
- **Befintligt id, ändrat innehåll** → uppdateras, men elevens sparade
  trafikljus-status rörs aldrig
- **Kort du tar bort ur filen** → påverkas inte lokalt automatiskt; ta bort
  dem i appen (Redigera kort) om de verkligen ska försvinna för eleverna också

**Id:n är permanenta.** Byt aldrig ett korts `id` bara för att uppdatera
fråga/svar/bild — då tolkas det som ett nytt kort och kopplingen till
elevens tidigare status tappas.

## Exportera en elevversion

Precis som i korsordsverktyget kan du plocka ut ett urval av dina samlingar
**och/eller kategorier** och exportera dem som en fristående `.html`-fil åt
eleverna — via **🛠 Hantera → 🎓 Exportera elevversion** i appen. De två
urvalssätten går att blanda (facit slås ihop): en kategori som "Bråkbegrepp"
kan t.ex. dra med sig kort från flera olika samlingar samtidigt.

- Eleven ser **bara** det urval du kryssar i — inga andra ämnesområden,
  ingen redigering, ingen import, ingen delningspanel.
- Alla kort börjar på "rent blad" (ingen status kopplad till dig följer med).
- Elevens egna trafikljus-markeringar sparas sedan lokalt i **deras** egen
  webbläsare, helt separat från din kortlek.
- **Bilder bäddas in automatiskt** när du exporterar från din hostade
  GitHub Pages-sida — filen blir då genuint fristående (en enda fil, inga
  andra mappar behövs). Exporterar du istället lokalt genom att öppna
  filen direkt (`file://`) kan webbläsaren inte hämta bilderna för
  inbäddning; appen varnar dig då tydligt och behåller relativ sökväg
  istället — dela i så fall den exporterade filen tillsammans med hela
  `assets`-mappen.

## Skriva ut fysiska kort

**🛠 Hantera → 🖨️ Skriv ut kortlek.** Välj samlingar och/eller kategorier
precis som vid elevexport, välj hur många kort som ska få plats per A4
(standard: 8 st, 2×4), och hur du tänker vända pappersbunten mellan
fram- och baksida:

- **I sidled** (som en boksida, vänster–höger) — matchar de flesta
  skrivares standardinställning för dubbelsidig utskrift.
- **Upp och ner** (kortsidan) — om du vänder bunten som ett helt block.

Utskriften sker i två separata steg (ingen automatisk duplex): **1) Skriv
ut framsidor**, vänd pappersbunten på det sätt du valde ovan och lägg
tillbaka den i skrivaren, **2) Skriv ut baksidor**. Layouten speglas
automatiskt så att rätt svar hamnar bakom rätt fråga när du klipper isär
korten längs de streckade linjerna.

Skriv gärna ut **ett enda A4 först** och kontrollera att fram- och
baksida verkligen stämmer överens innan du skriver ut en hel kortlek —
vilket håll som är "rätt" beror på hur just din skrivare (eller du
manuellt) hanterar dubbelsidig utskrift.

## Avstängda lägen

Quiz-läget och Självtest-läget (där eleven skrev in ett svar som
rättades automatiskt) är borttagna ur gränssnittet — inskrivna svar blev
för ofta en tolkningsfråga. Fram/bak-konceptet med trafikljus är nu det
enda sättet att öva i appen. Koden för de gamla lägena ligger kvar
oanvänd i bakgrunden om de någonsin skulle behövas igen.

## Delning med kollegor

Två olika behov, två olika lösningar:

- **En kollega vill äga och bygga vidare på sin egen bank** — instruera dem
  att skapa en egen kopia av hela mappstrukturen på sin egen GitHub (samma
  `PT-Minneskort.html` + egna bankfiler), så äger och underhåller de sin
  bank oberoende av din.
- **En kollega vill bara ha ett färdigt urval att dela med sina elever** —
  exportera en elevversion åt dem precis som du gör för dina egna klasser.
- **Kollegor som besöker din hostade GitHub Pages-länk** (istället för att
  ladda ner egna lokala kopior) får automatiskt dina senaste uppdateringar
  av bankfilerna varje gång de öppnar sidan — inget de behöver göra själva.

## Mappstruktur

```
Matte/verktyg/minneskort/
├── PT-Minneskort.html
├── minneskort-data-begrepp.js
├── minneskort-data-mattematchen.js
└── assets/
    └── img/
        ├── geometri/
        │   └── ratvinklig-triangel-hypotenusa.svg
        ├── mattematchen/
        │   ├── mm01-01.svg   ← platshållare, byt mot din skärmdump
        │   └── mm03-05.svg   ← platshållare, byt mot din skärmdump
        └── …
```

## Nomenklatur för Mattematchen-skärmdumpar

`mmNN-UU` — Mattematchen NN, Uppgift UU. Nollfyll båda talen (03 inte 3)
så sorteras filerna rätt i Utforskaren/VS Code — annars hamnar "10" före
"2". Låt bildfilens namn och kortets `id` vara identiska
(`mm03-05.png` ↔ `id: 'mm03-05'`) så slipper du hålla reda på en
översättning mellan de två.

**Arbetsflöde:**
1. Skärmdumpa läxans sida i Word/PDF.
2. Beskär till en uppgift i taget, spara som `mmNN-UU.png` i
   `assets/img/mattematchen/`.
3. Lägg till kortet i `minneskort-data-mattematchen.js` enligt mallen —
   kopiera en befintlig post och byt id, samling och bildsökväg.

## Övrigt värt att veta

- **SVG rekommenderas** för egenritade figurer (geometri m.m.) — skarpt i
  alla storlekar, litet i filstorlek, redigerbart som ren text.
  **PNG/JPG** för riktiga skärmdumpar av läxan, som i Mattematchen-exemplen.
- Bilder bäddas **inte** in i datafilerna — de ligger som separata filer
  och refereras med relativ sökväg, vilket håller filerna lätta att
  läsa/diffa i git.
- Har du redan pappersläxorna färdiga i t.ex. GeoGebra eller Word kan det
  ofta gå snabbare att exportera samma figur därifrån än att rita om den
  för hand.
