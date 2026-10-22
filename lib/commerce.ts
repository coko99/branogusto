import {
  categories,
  getProduct,
  products,
  productsByCategory,
  type CategorySlug,
  type Product,
} from "@/lib/site"

export const FREE_SHIPPING_RSD = 5000
export const BUNDLE_RATE = 0.08
export const BUNDLE_MIN_KINDS = 3

export const coupons: Record<string, { label: string; rate: number }> = {
  ZIMNICA10: { label: "ZIMNICA10 · 10%", rate: 0.1 },
}

export const packs = [
  {
    slug: "hladni-start",
    name: "Hladni start",
    line: "Tri tegle da vidiš da li ti ostava leži.",
    productSlugs: ["ajvar-blagi-375", "dzem-kajsija", "dzem-sipurak"],
  },
  {
    slug: "sto-za-dvoje",
    name: "Sto za dvoje",
    line: "Blagi, somborka i jagoda. Večera bez dogovora.",
    productSlugs: ["ajvar-blagi-700", "somborka", "dzem-jagoda"],
  },
  {
    slug: "ljuta-kuca",
    name: "Ljuta kuća",
    line: "Ljuti na sredinu stola, šljiva za one koji mere.",
    productSlugs: ["ajvar-ljuti-700", "somborka", "pekmez-sljiva"],
  },
  {
    slug: "slatka-ostava",
    name: "Slatka ostava",
    line: "Četiri voća. Doručak rešen do proleća.",
    productSlugs: ["dzem-sipurak", "pekmez-sljiva", "dzem-jagoda", "dzem-kajsija"],
  },
  {
    slug: "iz-baste",
    name: "Iz bašte",
    line: "Cvekla, kornišoni i filet. Tri tegle iz bašte.",
    productSlugs: ["cvekla-barena", "kornisoni-i", "paprika-fileti"],
  },
  {
    slug: "ostava-pre-mraza",
    name: "Ostava pre mraza",
    line: "Oba ajvara, šipurak, kajsija, somborka i borovnica.",
    productSlugs: [
      "ajvar-blagi-700",
      "ajvar-ljuti-700",
      "dzem-sipurak",
      "dzem-kajsija",
      "somborka",
      "sok-borovnica",
    ],
  },
] as const

export const pickupSpots = [
  {
    id: "krusevac",
    city: "Kruševac",
    note: "Tačno mesto preuzimanja dogovaramo kad potvrdimo porudžbinu.",
  },
  {
    id: "beograd",
    city: "Beograd",
    note: "Tačno mesto preuzimanja dogovaramo kad potvrdimo porudžbinu.",
  },
] as const

export type PickupId = (typeof pickupSpots)[number]["id"]

/** Ručno izabrani parovi. Kasnije mogu da dođu iz stvarnih porudžbina. */
const boughtTogether: Record<string, string[]> = {
  "ajvar-blagi-700": ["somborka", "sok-borovnica", "dzem-kajsija"],
  "ajvar-blagi-375": ["somborka", "dzem-sipurak", "sok-aronija"],
  "ajvar-ljuti-700": ["somborka", "sok-aronija", "pekmez-sljiva"],
  "ajvar-ljuti-375": ["somborka", "dzem-jagoda", "sok-borovnica"],
  "dzem-sipurak": ["ajvar-blagi-700", "sok-aronija"],
  "pekmez-sljiva": ["ajvar-blagi-375", "sok-borovnica"],
  "dzem-jagoda": ["ajvar-ljuti-375", "sok-borovnica"],
  "dzem-kajsija": ["ajvar-blagi-700", "somborka"],
  "sok-aronija": ["dzem-sipurak", "ajvar-ljuti-700"],
  "sok-borovnica": ["dzem-jagoda", "ajvar-blagi-700"],
  somborka: ["ajvar-blagi-700", "ajvar-ljuti-700", "dzem-kajsija"],
  "paprika-fileti": ["ajvar-blagi-700", "sok-paradajz"],
  "peckana-paprika": ["ajvar-ljuti-700", "somborka"],
  "cvekla-barena": ["kornisoni-i", "somborka"],
  "kornisoni-i": ["peckana-paprika", "cvekla-barena"],
  "kornisoni-ii": ["cvekla-barena", "somborka"],
  "sok-paradajz": ["cvekla-barena", "kornisoni-i"],
}

export type Recipe = {
  slug: string
  title: string
  minutes: number
  servings: string
  lead: string
  image: string
  imageAlt: string
  steps: string[]
  productSlugs: string[]
  category: CategorySlug
}

export const recipes: Recipe[] = [
  {
    slug: "kremasta-pasta-sa-ajvarom",
    title: "Kremasta pasta sa ajvarom",
    minutes: 25,
    servings: "2 osobe",
    category: "ajvari",
    image: "/images/recipes/pasta-ajvar.jpg",
    imageAlt: "Činija paste prelivene kremastim ajvarom",
    lead: "Ajvar umesto sosa: kratko se krčka sa pavlakom i ide preko tople paste.",
    steps: [
      "Skuvajte pastu u slanoj vodi, odvojite malo vode od kuvanja.",
      "Na tiganju zagrejte 4–5 kašika blagog ajvara.",
      "Umešajte 100 ml kiselog mleka ili pavlake i kašiku vode od paste.",
      "Prelijte pastu, posolite i, ako volite, dodajte malo ljutog ajvara.",
    ],
    productSlugs: ["ajvar-blagi-700"],
  },
  {
    slug: "tortilja-sa-ajvarom",
    title: "Tortilja sa ajvarom i somborkom",
    minutes: 15,
    servings: "2 osobe",
    category: "ajvari",
    image: "/images/recipes/tortilja-ajvar.jpg",
    imageAlt: "Tortilja presečena na pola, sa ajvarom, somborkom i salatom",
    lead: "Ljuti ajvar, somborka i nešto sveže zeleno. Večera bez šerpe.",
    steps: [
      "Zagrejte tortilju na suvom tiganju.",
      "Premažite je ljutim ajvarom.",
      "Poređajte filete somborke, kriške sira i list zelene salate.",
      "Uvijte je i presećite na pola.",
    ],
    productSlugs: ["ajvar-ljuti-375", "somborka"],
  },
  {
    slug: "palacinke-sa-pekmezom",
    title: "Palačinke sa pekmezom od šljive",
    minutes: 30,
    servings: "4 osobe",
    category: "dzemovi",
    image: "/images/recipes/palacinke-sljiva.jpg",
    imageAlt: "Složene palačinke prelivene pekmezom od šljive",
    lead: "Tanke palačinke i kašika gustog pekmeza. Doručak koji miriše na ostavu.",
    steps: [
      "Smutite testo od 2 jaja, 250 ml mleka, 120 g brašna i prstohvat soli.",
      "Ispržite tanke palačinke na malo ulja.",
      "Svaku premažite pekmezom od šljive dok je još topla.",
      "Presavijte i poslužite odmah.",
    ],
    productSlugs: ["pekmez-sljiva"],
  },
  {
    slug: "zimski-caj-od-sipurka",
    title: "Zimski napitak od šipurka",
    minutes: 10,
    servings: "2 šolje",
    category: "dzemovi",
    image: "/images/recipes/caj-sipurak.jpg",
    imageAlt: "Dve šolje vrućeg napitka od šipurka, sa limunom pored prozora",
    lead: "Kašika džema od šipurka u vrućoj vodi. Kad napolju steže, ovo greje.",
    steps: [
      "Prokuvajte vodu i sipajte je u šolje.",
      "Umešajte punu kašiku džema od šipurka.",
      "Po želji dodajte krišku limuna.",
      "Sačekajte minut da se džem rastvori.",
    ],
    productSlugs: ["dzem-sipurak"],
  },
  {
    slug: "kajsija-preko-sira",
    title: "Kajsija preko mladog sira",
    minutes: 5,
    servings: "2 osobe",
    category: "dzemovi",
    image: "/images/recipes/kajsija-sir.jpg",
    imageAlt: "Mlad sir sa džemom od kajsije i orasima",
    lead: "Slatko i slano na jednom tanjiru. Džem od kajsije ne traži kuvanje.",
    steps: [
      "Izrežite mladi sir na kriške.",
      "Preko stavite kašiku džema od kajsije.",
      "Dodajte malo oraha ako ih imate.",
      "Poslužite kao doručak ili uz čaj.",
    ],
    productSlugs: ["dzem-kajsija"],
  },
  {
    slug: "borovnica-u-jogurtu",
    title: "Borovnica u jogurtu",
    minutes: 5,
    servings: "1 osoba",
    category: "sokovi",
    image: "/images/recipes/borovnica-jogurt.jpg",
    imageAlt: "Činija jogurta sa borovnicom i džemom od jagode",
    lead: "Matični sok od divlje borovnice u gustom jogurtu. Mali dezert posle ručka.",
    steps: [
      "U činiju stavite gust jogurt.",
      "Prelijte ga kašikom matičnog soka od borovnice.",
      "Ako želite slađe, dodajte kašičicu džema od jagode.",
      "Izmešajte tek toliko da ostanu šare.",
    ],
    productSlugs: ["sok-borovnica", "dzem-jagoda"],
  },
  {
    slug: "ajvar-puter-na-kukuruzu",
    title: "Ajvar-puter na kukuruzu sa žara",
    minutes: 20,
    servings: "4 klipa",
    category: "ajvari",
    image: "/images/recipes/ajvar-kukuruz.jpg",
    imageAlt: "Kukuruz sa žara premazan crvenim ajvar-puterom",
    lead: "Puter, ljuti ajvar i kukuruz koji je video vatru. Letnji zalogaj koji zimi zvuči kao izazov.",
    steps: [
      "Omekšajte 80 g putera i umešajte 3 kašike ljutog ajvara i malo soli.",
      "Kukuruz pecite na žaru ili u tiganju dok ne pocrni po zrnu.",
      "Mažite vruć klip ajvar-puterom dok se ne otopi.",
      "Pospite malo limuna i, ako volite, susam.",
    ],
    productSlugs: ["ajvar-ljuti-375"],
  },
  {
    slug: "somborka-krudo",
    title: "Somborka krudo",
    minutes: 10,
    servings: "2 osobe",
    category: "somborka",
    image: "/images/recipes/somborka-krudo.jpg",
    imageAlt: "Fileti somborke složeni kao krudo, sa uljem i mirođijom",
    lead: "Fileti somborke, hladni, kao da su iz restorana koji nema meni na srpskom.",
    steps: [
      "Ocedite somborku i složite filete na hladan tanjir.",
      "Pokapajte maslinovim uljem i malo limunove korice.",
      "Dodajte mirođiju i krupan biber.",
      "Jedite odmah, viljuškom, bez hleba ako hoćete da bude ozbiljno.",
    ],
    productSlugs: ["somborka"],
  },
  {
    slug: "labneh-sa-ajvarom",
    title: "Labneh sa ajvarom i semenkama",
    minutes: 10,
    servings: "4 osobe",
    category: "ajvari",
    image: "/images/recipes/labneh-ajvar.jpg",
    imageAlt: "Gusti labneh sa crvenim ajvarom i semenkama",
    lead: "Jogurt koji je stajao, ajvar koji nije. Namažete, umočite, tegla se prazni.",
    steps: [
      "Jogurt procedite kroz gazu sat vremena, ili uzmite već gust.",
      "Stavite ga u plitku činiju i prstom povucite kružić.",
      "U sredinu stavite 3 kašike blagog ajvara i malo ulja.",
      "Pospite semenkama i jedite uz topli hleb.",
    ],
    productSlugs: ["ajvar-blagi-700"],
  },
  {
    slug: "karfiol-ajvar-aioli",
    title: "Karfiol odrezak i ajvar aioli",
    minutes: 35,
    servings: "2 osobe",
    category: "ajvari",
    image: "/images/recipes/karfiol-ajvar.jpg",
    imageAlt: "Pečeni odrezak karfiola uz ajvar aioli",
    lead: "Karfiol isečen kao odrezak, aioli koji je u stvari ajvar i beli luk. Ručak bez mesa.",
    steps: [
      "Karfiol secite uzdužno na dve debele kriške i pecite na 200 °C dok ne porumeni.",
      "Izmešajte 4 kašike blagog ajvara, kašiku jogurta i čen beliog luka.",
      "Posolite karfiol i prelijte aiolijem.",
      "Jedite dok je kontrast vrućeg i hladnog još tu.",
    ],
    productSlugs: ["ajvar-blagi-375"],
  },
  {
    slug: "sargarepa-sljiva-tahini",
    title: "Šargarepa, šljiva i tahini",
    minutes: 40,
    servings: "3 osobe",
    category: "dzemovi",
    image: "/images/recipes/sargarepa-sljiva.jpg",
    imageAlt: "Pečena šargarepa glazirana pekmezom od šljive i tahinijem",
    lead: "Pekmez od šljive na pečenoj šargarepi. Slatko, gorko, susam. Niko ovo ne naručuje slučajno.",
    steps: [
      "Šargarepu pecite na 200 °C dok ne omekša i ne potamni po ivici.",
      "Pomešajte 2 kašike pekmeza od šljive sa kašikom tahinija i malo vode.",
      "Prelijte vruću šargarepu.",
      "Pospite susamom.",
    ],
    productSlugs: ["pekmez-sljiva"],
  },
  {
    slug: "sipurak-spritz",
    title: "Šipurak spritz",
    minutes: 5,
    servings: "2 čaše",
    category: "dzemovi",
    image: "/images/recipes/sipurak-spritz.jpg",
    imageAlt: "Visoka čaša ružičastog šipurak spritza sa ruzmarinom",
    lead: "Džem od šipurka, soda i led. Izgleda kao bar, košta koliko jedna kašika iz tegle.",
    steps: [
      "U čašu stavite led i punu kašičicu džema od šipurka.",
      "Dodajte krišku limuna i grančicu ruzmarina.",
      "Nalijte jako hladnom sodom i promešajte.",
      "Pijte dok je još oštar.",
    ],
    productSlugs: ["dzem-sipurak"],
  },
  {
    slug: "slana-granita-od-borovnice",
    title: "Slana granita od borovnice",
    minutes: 180,
    servings: "4 čaše",
    category: "sokovi",
    image: "/images/recipes/borovnica-granita.jpg",
    imageAlt: "Tamna granita od borovnice sa maslinovim uljem i solju",
    lead: "Matični sok od borovnice, zamrznut, pa maslinovo ulje i so. Dezert koji zbunjuje, pa se naruči opet.",
    steps: [
      "Pomešajte 200 ml soka od borovnice sa 100 ml vode i kašičicom meda.",
      "Smrzavajte 3 sata i na svakih pola sata promešajte viljuškom.",
      "Stavite u hladne čaše.",
      "Pokapajte maslinovim uljem i prstohvatom soli.",
    ],
    productSlugs: ["sok-borovnica"],
  },
  {
    slug: "aronija-gastric-na-cvekli",
    title: "Aronija gastrič na cvekli",
    minutes: 50,
    servings: "3 osobe",
    category: "sokovi",
    image: "/images/recipes/aronija-cvekla.jpg",
    imageAlt: "Pečena cvekla sa tamnim prelivom od aronije i kozjim sirom",
    lead: "Sok od aronije skušen u sjaj, preko pečene cvekle. Tamno, slano, i tegla soka dobija razlog.",
    steps: [
      "Cveklu pecite dok ne omekša, oljuštite i secite.",
      "100 ml soka od aronije krčkajte sa kašikom meda i kašičicom sirćeta dok ne zgusne.",
      "Prelite cveklu i dodajte mrvljeni sir.",
      "Orah ako ga imate, ne ako nemate.",
    ],
    productSlugs: ["sok-aronija"],
  },
  {
    slug: "burrata-jagoda-biber",
    title: "Burrata, jagoda i biber",
    minutes: 8,
    servings: "2 osobe",
    category: "dzemovi",
    image: "/images/recipes/burrata-jagoda.jpg",
    imageAlt: "Raskinuta burrata sa džemom od jagode, biberom i bosiljkom",
    lead: "Džem od jagode na hladnom siru, pa biber. Slatko prestaje da bude samo za palačinku.",
    steps: [
      "Burratu stavite na tanjir i raskinite je.",
      "Kašiku džema od jagode stavite na sredinu.",
      "Pokapajte uljem, bosiljak, dosta bibera.",
      "Jedite kašikom, hleb sa strane.",
    ],
    productSlugs: ["dzem-jagoda"],
  },
  {
    slug: "kajsija-halva-pistaci",
    title: "Kajsija, halva i pistaći",
    minutes: 6,
    servings: "2 čaše",
    category: "dzemovi",
    image: "/images/recipes/kajsija-halva.jpg",
    imageAlt: "Jogurt sa džemom od kajsije, halvom i pistaćima",
    lead: "Džem od kajsije, izmrvljena halva, pistać. Tri sastojka koja se retko nađu u istoj činiji.",
    steps: [
      "U činiju stavite gust jogurt.",
      "Preko kašiku džema od kajsije, nemojte da mešate do kraja.",
      "Izmrvite halvu i pistaće.",
      "Jedite hladno.",
    ],
    productSlugs: ["dzem-kajsija"],
  },
  {
    slug: "jaje-ljuti-ajvar-hleb",
    title: "Jaje, ljuti ajvar i kvasni hleb",
    minutes: 12,
    servings: "1 osoba",
    category: "ajvari",
    image: "/images/recipes/ajvar-jaje.jpg",
    imageAlt: "Kvasni tost sa jajetom i ljutim ajvarom",
    lead: "Doručak koji izgleda kao iz lokala: hleb, jaje, ljuti ajvar, susam. Pet minuta i gladna ste bili uzalud.",
    steps: [
      "Tostirajte krišku kvasnog hleba.",
      "Pržite jaje na malo ulja, žumance ostavite meko.",
      "Hleb premažite ljutim ajvarom, stavite jaje.",
      "Susam i mladi luk preko.",
    ],
    productSlugs: ["ajvar-ljuti-375"],
  },
  {
    slug: "somborka-u-citrusu",
    title: "Somborka u citrusu",
    minutes: 15,
    servings: "2 osobe",
    category: "somborka",
    image: "/images/recipes/somborka-citrus.jpg",
    imageAlt: "Fileti somborke u limeti, sa crnim lukom i peršunom",
    lead: "Somborka u limeti i crnom luku, kao seviche koji nije video ribu. Hladno, kiselo, crveno.",
    steps: [
      "Filete somborke isecite na trake.",
      "Pomešajte sa sokom od limete, tankim crnim lukom i peršunom.",
      "Ostavite 10 minuta u frižideru.",
      "Posolite tek na kraju.",
    ],
    productSlugs: ["somborka"],
  },
  {
    slug: "leblebije-u-sljivi",
    title: "Leblebije glazirane šljivom",
    minutes: 25,
    servings: "3 osobe",
    category: "dzemovi",
    image: "/images/recipes/leblebije-sljiva.jpg",
    imageAlt: "Pečene leblebije sa tamnom glazurom od pekmeza šljive",
    lead: "Pekmez od šljive na leblebijama, pečen dok ne zablista. Grickalica koje nema na čaršiji.",
    steps: [
      "Leblebije promešajte sa kašikom ulja i pecite 15 minuta na 200 °C.",
      "Pomešajte 2 kašike pekmeza od šljive sa malo sosa od soje i čilija.",
      "Vratite leblebije u tiganj i glazirajte dok se ne zalepi sjaj.",
      "Jedite mlake.",
    ],
    productSlugs: ["pekmez-sljiva"],
  },
  {
    slug: "sipurak-tonik",
    title: "Šipurak tonik",
    minutes: 5,
    servings: "1 čaša",
    category: "dzemovi",
    image: "/images/recipes/sipurak-tonik.jpg",
    imageAlt: "Kratka čaša šipurak tonika sa ruzmarinom i korom pomorandže",
    lead: "Kašika džema od šipurka u toniku. Gorko, ružičasto, i izgleda kao da ste naručili nešto što nema ime.",
    steps: [
      "U čašu stavite led i kašičicu džema od šipurka.",
      "Dodajte koru pomorandže i ruzmarin.",
      "Nalijte tonikom.",
      "Promešajte jednom.",
    ],
    productSlugs: ["dzem-sipurak"],
  },
  {
    slug: "panakota-sa-aronijom",
    title: "Panakota sa aronijom",
    minutes: 20,
    servings: "4 čaše",
    category: "sokovi",
    image: "/images/recipes/aronija-panakota.jpg",
    imageAlt: "Bela panakota prelivena tamnim sosom od aronije",
    lead: "Bela panakota, tamna aronija preko nje. Dezert koji izgleda skuplje nego što jeste.",
    steps: [
      "Zagrijte 300 ml pavlake sa 2 kašike šećera, sklonite sa vatre.",
      "Umešajte 2 lista želatina otočena u malo vode, sipajte u čaše i ohladite.",
      "100 ml soka od aronije krčkajte sa kašičicom meda dok ne zgusne.",
      "Prelite ohlađenu panakotu.",
    ],
    productSlugs: ["sok-aronija"],
  },
  {
    slug: "tikvice-feta-borovnica",
    title: "Tikvice, feta i borovnica",
    minutes: 20,
    servings: "2 osobe",
    category: "sokovi",
    image: "/images/recipes/tikvica-borovnica.jpg",
    imageAlt: "Grilovane tikvice sa fetom i tamnim prelivom od borovnice",
    lead: "Borovnica na tikvici i feti. Slatko tamo gde niko ne očekuje, i zato se pojede.",
    steps: [
      "Tikvice ispecite na tiganju dok ne dobiju šare.",
      "3 kašike soka od borovnice krčkajte minut sa kapom meda.",
      "Tikvice posolite, stavite fetu i prelijte.",
      "Nana ako je imate.",
    ],
    productSlugs: ["sok-borovnica"],
  },
  {
    slug: "humus-sa-ajvarom",
    title: "Humus sa bunarom od ajvara",
    minutes: 15,
    servings: "4 osobe",
    category: "ajvari",
    image: "/images/recipes/ajvar-humus.jpg",
    imageAlt: "Humus sa crvenim bunarom od ajvara i uljem",
    lead: "Humus kakav znate, ajvar kakav treba da kupite. Bunar u sredini radi sav posao.",
    steps: [
      "Leblebije, tahini, beli luk, limun i so izmiksajte u glatki humus.",
      "Ravnom kašikom povucite kružić.",
      "U sredinu stavite 4 kašike ljutog ajvara i malo ulja.",
      "Jedite toplim hlebom, ne krekerom.",
    ],
    productSlugs: ["ajvar-ljuti-700"],
  },
  {
    slug: "topli-kamember-kajsija",
    title: "Topli kamember i kajsija",
    minutes: 18,
    servings: "3 osobe",
    category: "dzemovi",
    image: "/images/recipes/kamember-kajsija.jpg",
    imageAlt: "Pečeni kamember sa džemom od kajsije i hlebom",
    lead: "Kamember iz rerne, džem od kajsije na vrhu. Sir se topi, tegla se opravdava.",
    steps: [
      "Kamember zarežite po vrhu i pecite 12 minuta na 180 °C.",
      "Stavite 2 kašike džema od kajsije i mrvicu ljutog ako volite oštrije.",
      "Vratite na minut da se džem slegne.",
      "Umačite topli hleb.",
    ],
    productSlugs: ["dzem-kajsija", "ajvar-ljuti-375"],
  },
  {
    slug: "gazpacho-od-jagode",
    title: "Hladni gazpačo od jagode",
    minutes: 15,
    servings: "3 čaše",
    category: "dzemovi",
    image: "/images/recipes/jagoda-gazpacho.jpg",
    imageAlt: "Hladna ružičasta čorba od jagode sa krastavcem i jogurtom",
    lead: "Džem od jagode, krastavac i jogurt, izblendano i ledeno. Supa koja nije supa, i zato ostaje u glavi.",
    steps: [
      "Izmešajte 4 kašike džema od jagode, pola krastavca, 150 ml jogurta i malo vode.",
      "Blendajte dok ne bude glatko, pa ohladite.",
      "Posolite samo prstohvat.",
      "Poslužite sa kockicama krastavca i kapom ulja.",
    ],
    productSlugs: ["dzem-jagoda"],
  },
  {
    slug: "ban-mi-sa-somborkom",
    title: "Ban mi sa somborkom",
    minutes: 20,
    servings: "2 sendviča",
    category: "somborka",
    image: "/images/recipes/somborka-banhmi.jpg",
    imageAlt: "Presečen baget sa somborkom, začinskim biljem i kiselim povrćem",
    lead: "Baget, somborka, kisela šargarepa i blagi ajvar umesto paštete. Sendvič koji komšiluk još nije video.",
    steps: [
      "Šargarepu isecite na štapiće i kratko držite u sirćetu, šećeru i soli.",
      "Baget zasecite, premažite blagim ajvarom.",
      "Složite somborku, šargarepu, krastavac i dosta peršuna ili korijandera.",
      "Stisnite i jedite odmah.",
    ],
    productSlugs: ["somborka", "ajvar-blagi-375"],
  },
]

export type CartLine = {
  slug: string
  qty: number
}

export type QuoteLine = {
  product: Product
  qty: number
  amount: number
}

export type Quote = {
  lines: QuoteLine[]
  kinds: number
  subtotal: number
  bundle: number
  couponCode: string
  couponOff: number
  total: number
  gap: number
  progress: number
  freeShipping: boolean
}

export function quote(items: CartLine[], couponCode: string): Quote {
  const lines = items.flatMap((item) => {
    const product = getProduct(item.slug)
    if (!product) return []
    const qty = Math.min(99, Math.max(1, Math.floor(item.qty)))
    return [{ product, qty, amount: product.price * qty }]
  })
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0)
  const kinds = lines.length
  const bundle = kinds >= BUNDLE_MIN_KINDS ? Math.round(subtotal * BUNDLE_RATE) : 0
  const code = couponCode.trim().toUpperCase()
  const coupon = coupons[code]
  const couponOff = coupon ? Math.round((subtotal - bundle) * coupon.rate) : 0
  const total = Math.max(0, subtotal - bundle - couponOff)
  const gap = Math.max(0, FREE_SHIPPING_RSD - total)
  const progress = subtotal === 0 ? 0 : Math.min(1, total / FREE_SHIPPING_RSD)
  return {
    lines,
    kinds,
    subtotal,
    bundle,
    couponCode: coupon ? code : "",
    couponOff,
    total,
    gap,
    progress,
    freeShipping: total >= FREE_SHIPPING_RSD && total > 0,
  }
}

function uniqueProducts(slugs: string[], skip: Set<string>) {
  const seen = new Set<string>()
  const list: Product[] = []
  for (const slug of slugs) {
    if (skip.has(slug) || seen.has(slug)) continue
    const product = getProduct(slug)
    if (!product) continue
    seen.add(slug)
    list.push(product)
  }
  return list
}

export function oftenTogether(slugs: string[], limit = 3) {
  const skip = new Set(slugs)
  const paired = slugs.flatMap((slug) => boughtTogether[slug] ?? [])
  return uniqueProducts(paired, skip).slice(0, limit)
}

export function togetherForCategory(slug: CategorySlug, limit = 3) {
  const own = productsByCategory(slug).map((product) => product.slug)
  const skip = new Set(own)
  const paired = own.flatMap((item) => boughtTogether[item] ?? [])
  return uniqueProducts(paired, skip)
    .filter((product) => product.category !== slug)
    .slice(0, limit)
}

export function bundleSuggestion(slugs: string[]) {
  if (slugs.length < 2 || slugs.length >= BUNDLE_MIN_KINDS) return null
  const paired = oftenTogether(slugs, 1)[0]
  if (paired) return paired
  const skip = new Set(slugs)
  return products.find((product) => !skip.has(product.slug)) ?? null
}

export function gapSuggestions(gap: number, slugs: string[], limit = 3) {
  if (gap <= 0) return []
  const skip = new Set(slugs)
  return products
    .filter((product) => !skip.has(product.slug))
    .map((product) => ({
      product,
      distance: Math.abs(product.price - gap),
      closes: product.price <= gap * 1.15,
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
}

export function recipesForCategory(slug: CategorySlug) {
  return recipes.filter(
    (recipe) =>
      recipe.category === slug ||
      recipe.productSlugs.some((item) => getProduct(item)?.category === slug)
  )
}

export function getRecipe(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug)
}

export function freshCategory(seen: CategorySlug[]) {
  if (seen.length === 0) return null
  return categories.find((category) => !seen.includes(category.slug)) ?? null
}
