# PT Minneskort — projektsammanfattning
> Referensdokument för flashcards-verktyget. Skrivet för att snabbt fräscha upp
> minnet, och som utgångspunkt när begreppslistor ska vävas samman med andra
> byggen (t.ex. Matematikportalen, Räkneträning).
> Status: 2026-09-26

---

## 1. Syfte

Ett flashcards-verktyg som tränar **begreppsförmåga** (t.ex. "hypotenusa",
"täljare/nämnare") interleavat med **metodförmåga** och **huvudräkning**
(t.ex. "0,05 · 10 = ?"). Efter varje kort bedömer eleven sig själv med ett
trafikljus:

- 🟢 **Säker** — har koll
- 🟡 **Lite osäker**
- 🔴 **Osäker** — behöver träna mer

Byggt utifrån ett befintligt, funktionsrikt flashcards-skelett (inte skrivet
från grunden) och sedan omstöpt i **PT Ljus**-designsystemet från `brand.md`
samt utökat med en egen datamodell för årskurs, ämnesorganisering och en
permanent frågebank.

---

## 2. Vad som bevarades från skelettet

Allt nedan fanns redan i utgångsläget och är kvar, bara omstylat:

- Vändbara kort (flip), bildstöd sida-vid-sida med text, MathJax för matematisk notation
- Quiz-läge (skriv svar, rättas automatiskt) och självtest-läge
- Presentationsläge (helskärm för genomgång på projektor)
- Kategorier/taggar (fritext, flera per kort)
- Ämnen → Samlingar → Kort-hierarki
- Spaced repetition (repris-filter för förfallna kort)
- Excel/CSV-import och export, JSON-export av hel kortlek (dela via länk/QR/Teams)

---

## 3. Designändringar (PT Ljus)

| Del | Från | Till |
|---|---|---|
| Typsnitt | Plus Jakarta Sans / Fraunces / Bebas Neue | Sora (brödtext) + Montserrat (rubriker), enligt `brand.md` |
| Teman | 5 växlingsbara teman (ljust/mörkt/sepia/slate/forest) | **Ett** enhetligt PT Ljus-tema — konsekvent med övriga verktyg |
| Header | Vit yta, lila logotyp-gradient-text | Signaturgradienten (teal→orange→rosa) som bakgrund, vit text/ikoner, halvtransparenta "glas"-knappar |
| Kortets baksida | Full mättad lila/rosa gradient-fyllning | Svag tricolor-vask (9% opacitet) + tunn färgad topplist (kategorifärg fram, rosa bak) — mer återhållsamt, men gradienten "ekar" ändå igenom |
| Kategorifärger | Slumpmässig lila/blandad palett | 14 distinkta PT Ljus-familjefärger |
| Trafikljus, filterpills, statistik | Lila/grön/orange/röd (omixad) | `--correct` / `--amber` / `--wrong` konsekvent |

En layoutbugg uppstod och fixades under vägen: `position: relative` på
`.face.front`/`.face.back` bröt av misstag den absoluta positioneringen som
`.face` behöver för att korthöjden ska beräknas korrekt via den dolda
spacer-tekniken. Värt att komma ihåg om korthöjden någonsin ser konstig ut
igen efter framtida CSS-ändringar i just de klasserna.

---

## 4. Datamodell

```
Ämne (subjects)
 └─ Samling (collections)      ← grades: ['7','8','9'], section: 'amne'|'mattematchen'
     └─ Kort (cards)           ← id (stabilt!), q, a, cats[], collId, status,
                                  imgId (bibliotek) ELLER imgUrl (extern fil)
```

**Årskurs** är en egen, fristående dimension på samlingar (inte inbakad i
namnet) — en samling kan gälla en, flera eller alla årskurser samtidigt.
Motiveringen: Geometri är begreppstungt och återkommer i åk 7–9, medan t.ex.
Sannolikhet bara förekommer i vissa årskurser men ändå kräver stödbegrepp
(täljare/nämnare) som redan finns i andra samlingar.

**Mattematchen** är en egen huvudsektion i navigeringsträdet, skild från
ämnesträdet (`section:'mattematchen'`, `subjectId: null`). Tänkt för de 20
återkommande läxorna (12 uppgifter var). Filtreras av samma årskurs-pillar
som ämnesträdet.

Navigeringsträdet har högst upp klickbara pillar **Åk 7 / Åk 8 / Åk 9** som
filtrerar båda sektionerna samtidigt. En samling utan årskurs angiven visas
alltid, oavsett filter.

---

## 5. Excel/CSV-import

Kolumner: **A=Ämne, B=Samling, C=Kategori, D=Fråga, E=Svar, F=Årskurs**
(A–C och F valfria). Semikolon separerar flera kategorier eller flera
årskurser i F (t.ex. "7;8;9"). Skriver man **"Mattematchen"** i
Ämne-kolumnen hamnar raden automatiskt i Mattematchen-sektionen istället för
ämnesträdet. Mallen (nedladdningsbar i Inställningar) är omgjord med
exempelrader för båda mönstren plus en egen "Läs mig"-flik.

*Ej testat ännu: en full export → redigera i Excel → återimport-cykel för
dataintegritet. Värt att göra innan större mängder innehåll matas in.*

---

## 6. Permanent frågebank — arkitekturen

**Problemet den löser:** en engångsimport (Excel/JSON) räcker inte för ett
läromedel som växer kontinuerligt — varje ny import riskerar att krocka med
eller nollställa elevernas sparade framsteg.

**Principen:** frågebanksfilerna äger **innehållet** (fråga/svar/bild/ämne/
samling/kategori/årskurs). Webbläsarens lokala lagring äger **framsteget**
(trafikljus-status). Vid varje sidladdning synkas filerna in:

- Nytt kort/samling/ämne (nytt `id`) → läggs till
- Befintligt `id`, ändrat innehåll → uppdateras, status rörs **aldrig**
- Borttaget ur filen → påverkas **inte** lokalt automatiskt (manuell borttagning i appen om det verkligen ska bort)

**Tekniskt:** varje kort fick ett stabilt `id`-fält (migrering för äldre
kort utan id). Bankfilerna är vanliga `<script src="...">`-inkluderingar —
**inte** `fetch()` av JSON — just för att det ska fungera även när man
dubbelklickar och öppnar HTML-filen direkt (`file://`), inte bara när den
ligger hostad på GitHub Pages.

Filerna anropar en delad, additiv funktion:

```js
registerMinneskortBank({ subjects: [...], collections: [...], cards: [...] });
```

vilket gör att hur många bankfiler som helst kan inkluderas parallellt utan
att krocka — man lägger bara till fler `<script>`-rader i HTML:n.

**Två filer just nu, med olika uppdateringstakt:**

| Fil | Innehåll | Ändras |
|---|---|---|
| `minneskort-data-begrepp.js` | Stabil "grundutgåva" — begrepp för hela högstadiet, taggade årskurs + arbetsområde | Sällan |
| `minneskort-data-mattematchen.js` | Läxuppgifterna (Mattematchen 1–20) | Varje vecka |

**Bilder:** refereras som externa filer via `imgUrl` (relativ sökväg), inte
inbäddade som base64 — håller datafilerna lätta att läsa/diffa i git. SVG
rekommenderat för egenritade figurer (geometri m.m.), PNG/JPG för riktiga
skärmdumpar av läxor.

**Delning med kollegor:** om kollegor besöker en hostad GitHub Pages-länk
(istället för att ladda ner egna lokala kopior) får de automatiskt senaste
versionen av bankfilerna — och därmed Patricks pågående uppdateringar —
varje gång de öppnar sidan. *Detta är ett antagande som aldrig bekräftades
fullt ut — meningen om hur delningen faktiskt går till klipptes av två
gånger i konversationen. Värt att stämma av om arbetsflödet någonsin känns
fel.*

---

## 7. Nomenklatur

- **Kort/samling-id:** beskrivande slugs, t.ex. `geo-tri-hypotenusa-1`,
  `tal-brak-taljare-1`, `mm-3` (samling), `mm03-05` (kort)
- **Mattematchen-skärmdumpar:** `mmNN-UU` (Mattematch NN, Uppgift UU) —
  **nollfyll** båda talen (03 inte 3) så sorteringen blir rätt i
  Utforskaren/VS Code. Bildfilens namn = kortets id (`mm03-05.png` ↔
  `id: 'mm03-05'`) för att slippa en mental översättningstabell.

---

## 8. Filstruktur (tänkt GitHub Pages-placering)

```
Matte/verktyg/minneskort/
├── PT-Minneskort.html
├── minneskort-data-begrepp.js
├── minneskort-data-mattematchen.js
├── LÄSMIG-frågebank.md
└── assets/
    └── img/
        ├── geometri/
        │   └── ratvinklig-triangel-hypotenusa.svg
        ├── mattematchen/
        │   ├── mm01-01.svg   ← platshållare, ej riktig skärmdump än
        │   └── mm03-05.svg   ← platshållare, ej riktig skärmdump än
        └── …
```

---

## 9. Kvarstående / nästa steg

- [ ] Full import→export→återimport-cykel för Excel, för dataintegritet
- [ ] Bekräfta hur kollegor faktiskt kommer åt verktyget (hostad länk vs. lokala kopior) — påverkar om de får uppdateringar automatiskt
- [ ] Den riktiga begreppsbanken (hela högstadiet) är bara skissad med ett fåtal exempelkort per arbetsområde — själva innehållsförfattandet återstår
- [ ] Mattematchen-bilderna är fortfarande platshållare — riktiga skärmdumpar från Word-dokumentet är inte inlagda än
- [ ] Möjlig framtida utökning: årskurs på enskilda kort (inte bara samlingar), om ett kort någonsin behöver synas i flera årskurser inom samma samling men inte alla

---

## 10. Kopplingar till andra byggen

Delar `brand.md`/PT Ljus-designsystemet med Matematikportalen och övriga
verktyg. Tänkt att begreppslistorna som byggs upp här (`minneskort-data-
begrepp.js`) på sikt kan bli en gemensam källa att återanvända eller väva
samman med andra tools, t.ex. Räkneträning/arbetsblad-generatorn.
