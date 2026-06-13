import Reveal from "./reveal";
import SmoothScroll from "./smooth-scroll";
import SiteNav from "./site-nav";
import CinematicStage from "./cinematic-stage";
import Waitlist from "./waitlist";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Reveal />
      <SiteNav />

      {/* ---- Cinematic journey: ocean loop -> push-in -> product ---- */}
      <CinematicStage />
      {/* marker: nav flips from film-white to editorial-ink past this point */}
      <div id="cine-end" aria-hidden />

      {/* ---- Opening statement — asymmetric editorial --------------- */}
      <section className="mx-auto max-w-[1400px] px-7 sm:px-8 md:px-14 py-[clamp(5rem,18vh,12rem)]">
        <div className="reveal grid md:grid-cols-12 gap-y-7 md:gap-x-12">
          <p className="label md:col-span-3 md:pt-4">Purity</p>
          <p className="serif text-[clamp(1.9rem,4vw,3.3rem)] text-ink leading-[1.16] md:col-span-9 max-w-[22ch]">
            Only sea water, sun, and time. The summer heat draws the Aegean down
            to salt; that salt is all we take.
          </p>
        </div>
      </section>

      {/* ---- The Salt — editorial product moment -------------------- */}
      <section id="salt" className="bg-salt-wash">
        <div className="mx-auto max-w-[1400px] px-7 sm:px-8 md:px-14 py-[clamp(4.5rem,14vh,10rem)] grid md:grid-cols-2 gap-10 md:gap-24 items-center">
          {/* real product film, framed editorially */}
          <div className="reveal order-2 md:order-1 flex justify-center">
            <figure className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-ultramarine ring-1 ring-line shadow-[0_22px_50px_-44px_rgba(22,38,63,0.35)]">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                poster="/videos/clip-c-poster.jpg"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                aria-hidden
              >
                <source media="(max-width: 767px)" type="video/webm" src="/videos/clip-c-720.webm" />
                <source media="(max-width: 767px)" type="video/mp4" src="/videos/clip-c-720.mp4" />
                <source type="video/webm" src="/videos/clip-c-1080.webm" />
                <source type="video/mp4" src="/videos/clip-c-1080.mp4" />
              </video>
            </figure>
          </div>

          <div className="reveal order-1 md:order-2 max-w-md">
            <p className="label mb-6">The Salt</p>
            <h2 className="serif text-[clamp(2.2rem,5vw,3.4rem)] text-ink mb-8 leading-[1.04] text-balance">
              The first crystals to form, lifted by hand.
            </h2>
            <p className="text-ink-soft mb-5">
              Fleur de sel rises as a fragile bloom on the surface of the salt
              pans at dusk. It is raked once, gently, and never touched by
              machine. The crystals stay light, flaked, faintly briny.
            </p>
            <p className="text-ink-soft">
              Finish a tomato, a fillet, a square of dark chocolate. A pinch is
              the whole point.
            </p>

            <dl className="mt-10 border-t border-line text-[0.9rem]">
              {[
                ["Origin", "Aegean coast, Greece"],
                ["Harvest", "By hand, at dusk"],
                ["Composition", "Sea salt — nothing added"],
                ["Use", "A final pinch, off the heat"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-3.5"
                >
                  <dt className="label">{k}</dt>
                  <dd className="text-ink text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---- Ritual — left-aligned editorial index ------------------ */}
      <section id="ritual" className="mx-auto max-w-[1400px] px-7 sm:px-8 md:px-14 py-[clamp(4.5rem,16vh,12rem)]">
        <div className="reveal grid md:grid-cols-12 gap-y-6 md:gap-x-12 mb-12 sm:mb-16">
          <p className="label md:col-span-3 md:pt-3">Ritual</p>
          <h2 className="serif text-[clamp(2rem,4.2vw,3rem)] text-ink leading-[1.08] md:col-span-9 max-w-[14ch]">
            Three things, done slowly.
          </h2>
        </div>

        <div className="reveal border-t border-line">
          {[
            {
              n: "01",
              t: "Harvested at dusk",
              d: "When the wind drops and the surface stills, the first bloom is raked by hand into shallow baskets.",
            },
            {
              n: "02",
              t: "Dried by sun alone",
              d: "No kilns, no additives. Mediterranean light and time are the only steps between sea and jar.",
            },
            {
              n: "03",
              t: "Sealed, untouched",
              d: "Whole crystals, never ground. What reaches your table is exactly what the pan gave up.",
            },
          ].map((item) => (
            <div
              key={item.n}
              className="grid md:grid-cols-12 gap-y-3 md:gap-x-12 items-baseline border-b border-line py-8 sm:py-11"
            >
              <span className="label !text-ink-faint md:col-span-2">{item.n}</span>
              <h3 className="serif text-[clamp(1.5rem,2.4vw,2rem)] text-ink leading-[1.1] md:col-span-4">
                {item.t}
              </h3>
              <p className="text-ink-soft text-[0.95rem] md:col-span-6 max-w-[44ch]">
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Reserve — asymmetric close ----------------------------- */}
      <section id="shop" className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-7 sm:px-8 md:px-14 py-[clamp(5rem,16vh,11rem)]">
          <div className="reveal grid md:grid-cols-12 gap-y-12 md:gap-x-16 items-start">
            <div className="md:col-span-6">
              <p className="label mb-6">The First Harvest</p>
              <h2 className="serif text-[clamp(2.1rem,4.4vw,3.4rem)] text-ink leading-[1.05] max-w-[13ch] mb-7">
                Reserved before the first jars are sealed.
              </h2>
              <p className="text-ink-soft max-w-[40ch]">
                Fleur de sel is the fragile first bloom of crystals lifted from
                the surface of the pans — the most prized, the most scarce. The
                first harvest is small. Reserve a jar and we&rsquo;ll set one
                aside.
              </p>
            </div>

            <div id="reserve" className="md:col-span-6 md:col-start-8 md:pt-3">
              <p className="label !text-ink-soft mb-8">Fleur de sel · 125g · €28</p>
              <Waitlist />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Footer ------------------------------------------------- */}
      <footer className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-7 sm:px-8 md:px-14 py-11 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-7 md:gap-8">
          <span className="serif text-2xl text-ink">Halen</span>
          <ul className="flex gap-8 sm:gap-10 label">
            <li><a href="#salt" className="nav-link tap">The Salt</a></li>
            <li><a href="#ritual" className="nav-link tap">Ritual</a></li>
            <li><a href="#shop" className="nav-link tap">Reserve</a></li>
          </ul>
          <span className="label">Hand-harvested in Greece</span>
        </div>
      </footer>
    </>
  );
}
