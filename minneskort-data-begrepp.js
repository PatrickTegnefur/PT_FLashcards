/*
  ═══════════════════════════════════════════════════════════════
  MINNESKORT — Begreppsbank (grundutgåva)
  ═══════════════════════════════════════════════════════════════

  Detta är den stabila "läromedelsdelen": begrepp som sträcker sig
  över hela högstadiet, öronmärkta med årskurs + arbetsområde.
  Tänkt att ändras sällan — jämfört med minneskort-data-mattematchen.js
  som växer varje vecka.

  Kollegor som besöker din hostade sida får automatiskt den senaste
  versionen av den här filen (och dina uppdateringar i den) varje
  gång de öppnar appen — inget de behöver göra.

  Se LÄSMIG-frågebank.md för fullständig id- och synk-dokumentation.
  Kort sagt: id:n är permanenta — byt aldrig ett korts id bara för
  att uppdatera fråga/svar/bild, då tappar eleverna sin status-koppling.

  ═══════════════════════════════════════════════════════════════
*/

registerMinneskortBank({

  // ── ÄMNEN ─────────────────────────────────────────────────────
  subjects: [
    { id: 'taluppfattning', name: 'Taluppfattning & tals användning' },
    { id: 'algebra',        name: 'Algebra' },
    { id: 'geometri',       name: 'Geometri' },
    { id: 'samband',        name: 'Samband & förändring' },
    { id: 'statistik',      name: 'Statistik & dataanalys' },
    { id: 'sannolikhet',    name: 'Sannolikhet & kombinatorik' },

    // 👇 NYTT ÄMNE? Lägg till här ovanför den avslutande hakparentesen:
    // { id: 'unikt-id', name: 'Ämnesnamn' },
  ],

  // ── SAMLINGAR ─────────────────────────────────────────────────
  // grades: [] = gäller alla årskurser. Annars t.ex. ['9'] eller ['8','9'].
  collections: [
    { id: 'geo-trianglar',    name: 'Trianglar & vinklar',   subjectId: 'geometri',       grades: ['7','8','9'], section: 'amne' },
    { id: 'geo-omkrets-area', name: 'Omkrets & area',        subjectId: 'geometri',       grades: ['7','8'],     section: 'amne' },
    { id: 'alg-grundbegrepp', name: 'Algebraiska uttryck',   subjectId: 'algebra',        grades: ['7','8','9'], section: 'amne' },
    { id: 'tal-brak-procent', name: 'Bråk, decimal, procent',subjectId: 'taluppfattning', grades: ['7','8'],     section: 'amne' },
    { id: 'sh-grundbegrepp',  name: 'Sannolikhetsbegrepp',   subjectId: 'sannolikhet',    grades: ['9'],         section: 'amne' },
    { id: 'stat-grundbegrepp',name: 'Lägesmått & diagram',   subjectId: 'statistik',      grades: ['7','8','9'], section: 'amne' },

    // 👇 NY SAMLING? Lägg till här ovanför den avslutande hakparentesen:
    // { id: 'unikt-id', name: 'Namn', subjectId: 'ett-av-ämnena-ovan', grades: [], section: 'amne' },
  ],

  // ── KORT ──────────────────────────────────────────────────────
  // imgUrl pekar på en bildfil i assets/img/<ämne>/ (SVG rekommenderas
  // för egenritade figurer). Lämna bort imgUrl/imgAlt/imgSide om
  // kortet inte har någon bild.
  cards: [
    {
      id: 'geo-tri-hypotenusa-1',
      q: 'Vad heter den längsta sidan i en rätvinklig triangel — sidan mitt emot den räta vinkeln?',
      a: 'Hypotenusan',
      cats: ['Begrepp', 'Geometri'],
      collId: 'geo-trianglar',
      imgUrl: 'assets/img/geometri/ratvinklig-triangel-hypotenusa.svg',
      imgAlt: 'Rätvinklig triangel med hypotenusan markerad',
      imgSide: 'front',
    },
    {
      id: 'geo-tri-komplement-1',
      q: 'Vad kallas de två vinklarna som tillsammans blir 90°?',
      a: 'Komplementvinklar',
      cats: ['Begrepp', 'Geometri'],
      collId: 'geo-trianglar',
    },
    {
      id: 'geo-area-omkrets-1',
      q: 'Vad kallas måttet på hur stor en yta är?',
      a: 'Area',
      cats: ['Begrepp', 'Geometri'],
      collId: 'geo-omkrets-area',
    },
    {
      id: 'alg-uttryck-1',
      q: 'Vad kallas ett tal som multipliceras med en variabel, t.ex. 5 i 5x?',
      a: 'Koefficient',
      cats: ['Begrepp', 'Algebra'],
      collId: 'alg-grundbegrepp',
    },
    {
      id: 'tal-brak-taljare-1',
      q: 'Vad kallas talet över bråkstrecket?',
      a: 'Täljare',
      cats: ['Begrepp', 'Bråk'],
      collId: 'tal-brak-procent',
    },
    {
      id: 'tal-brak-namnare-1',
      q: 'Vad kallas talet under bråkstrecket?',
      a: 'Nämnare',
      cats: ['Begrepp', 'Bråk'],
      collId: 'tal-brak-procent',
    },
    {
      id: 'sh-grund-1',
      q: 'Vad kallas alla möjliga utfall av ett slumpförsök tillsammans?',
      a: 'Utfallsrummet',
      cats: ['Begrepp', 'Sannolikhet'],
      collId: 'sh-grundbegrepp',
    },
    {
      id: 'stat-lagesmatt-1',
      q: 'Vad kallas det värde som förekommer flest gånger i ett material?',
      a: 'Typvärde',
      cats: ['Begrepp', 'Statistik'],
      collId: 'stat-grundbegrepp',
    },

    // ═══════════════════════════════════════════════════════════
    // 👇 NYA BEGREPP LÄGGS TILL HÄR NEDANFÖR — kopiera mallen,
    //    klistra in ovanför den avslutande hakparentesen "]", och
    //    fyll i. Detta är den enda platsen du behöver röra för att
    //    bygga på banken framöver.
    //
    //    Checklista:
    //    • id — helt eget och PERMANENT. Byt det aldrig i efterhand,
    //      även om du redigerar fråga/svar senare (se filens topp).
    //    • collId — måste matcha ett id i samlingarna ovan.
    //    • imgUrl/imgAlt/imgSide — ta bort de tre raderna helt om
    //      kortet inte har någon bild.
    //
    //    {
    //      id: 'unikt-id-har',
    //      q: 'Din fråga eller begrepp...',
    //      a: 'Svaret / förklaringen...',
    //      cats: ['Begrepp', 'Ämnesnamn'],
    //      collId: 'en-samling-id-ovan',
    //      imgUrl: 'assets/img/<ämne>/filnamn.svg',
    //      imgAlt: 'Kort beskrivning av bilden',
    //      imgSide: 'front',
    //    },
    // ═══════════════════════════════════════════════════════════

  ],
});
