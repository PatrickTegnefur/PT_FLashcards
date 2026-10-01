/*
  ═══════════════════════════════════════════════════════════════
  MINNESKORT — Mattematchen (läxuppgifter)
  ═══════════════════════════════════════════════════════════════

  Den här filen växer varje vecka — till skillnad från
  minneskort-data-begrepp.js som är den stabila grundutgåvan.
  Samma synk-princip gäller: filen äger innehållet, webbläsaren
  äger elevens status. Byt aldrig ett korts id i efterhand.

  NAMNGIVNING (rekommenderat mönster)
  -------------------------------------
  mmNN-UU  →  Mattematchen NN, Uppgift UU  (båda två siffror,
              nollfyllda — annars sorteras "10" före "2")

  Exempel: mm03-05  =  Mattematch 3, Uppgift 5

  Låt bildfilens namn vara IDENTISKT med kortets id, så slipper du
  hålla reda på en översättning mellan de två:
    assets/img/mattematchen/mm03-05.png  ↔  id: 'mm03-05'

  ARBETSFLÖDE FÖR SKÄRMDUMPAR
  ------------------------------
  1. Skärmdumpa läxans sida i Word/PDF.
  2. Beskär till en uppgift i taget, spara med rätt id som filnamn
     (mm03-05.png osv.) i assets/img/mattematchen/.
  3. Lägg till en kort-post nedan som pekar på bilden. Själva frågan
     (q) kan vara kort, t.ex. "Uppgift 5" — bilden bär det mesta av
     innehållet.

  ═══════════════════════════════════════════════════════════════
*/

registerMinneskortBank({

  subjects: [],  // Mattematchen har inga egna ämnen — kort kan taggas
                 // med kategorier (cats) om du vill koppla till ett
                 // arbetsområde ändå, se mm03-05 nedan.

  // section: 'mattematchen' → hamnar i Mattematchen-sektionen,
  // skild från ämnesträdet. subjectId lämnas tom.
  collections: [
    { id: 'mm-1', name: 'Mattematchen 1', subjectId: null, grades: ['8'], section: 'mattematchen' },
    { id: 'mm-2', name: 'Mattematchen 2', subjectId: null, grades: ['8'], section: 'mattematchen' },
    { id: 'mm-3', name: 'Mattematchen 3', subjectId: null, grades: ['8'], section: 'mattematchen' },

    // 👇 NY MATTEMATCH? Lägg till här ovanför den avslutande hakparentesen:
    // { id: 'mm-4', name: 'Mattematchen 4', subjectId: null, grades: ['8'], section: 'mattematchen' },
  ],

  cards: [
    {
      id: 'mm01-01',
      q: 'Mattematchen 1 — uppgift 1',
      a: '(svaret till uppgiften)',
      cats: ['Procent'],
      collId: 'mm-1',
      imgUrl: 'assets/img/mattematchen/mm01-01.svg', // byt till .png när du klistrar in din riktiga skärmdump
      imgAlt: 'Mattematchen 1, uppgift 1',
      imgSide: 'front',
    },
    {
      id: 'mm03-05',
      q: 'Mattematchen 3 — uppgift 5',
      a: '(svaret till uppgiften)',
      cats: ['Geometri'],
      collId: 'mm-3',
      imgUrl: 'assets/img/mattematchen/mm03-05.svg', // byt till .png när du klistrar in din riktiga skärmdump
      imgAlt: 'Mattematchen 3, uppgift 5',
      imgSide: 'front',
    },

    // ═══════════════════════════════════════════════════════════
    // 👇 NYA UPPGIFTER LÄGGS TILL HÄR NEDANFÖR — kopiera mallen,
    //    klistra in ovanför den avslutande hakparentesen "]".
    //
    //    {
    //      id: 'mmNN-UU',                 ← t.ex. mm04-01 (nollfyllt!)
    //      q: 'Mattematchen NN — uppgift UU',
    //      a: '(svaret till uppgiften)',
    //      cats: ['Ämnesnamn'],
    //      collId: 'mm-NN',               ← måste finnas bland samlingarna ovan
    //      imgUrl: 'assets/img/mattematchen/mmNN-UU.png',
    //      imgAlt: 'Mattematchen NN, uppgift UU',
    //      imgSide: 'front',
    //    },
    // ═══════════════════════════════════════════════════════════

  ],
});
