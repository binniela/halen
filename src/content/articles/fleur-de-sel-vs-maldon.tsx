import Link from "next/link";

export default function FleurDeSelVsMaldon() {
  return (
    <>
      <p className="lede">
        Ask a chef for a finishing salt and two names come up more than any other:
        fleur de sel and Maldon. Both are excellent. Both are kept by the stove
        for the last touch, not the cooking. The difference between them is older
        and quieter than the marketing on either tin — it is the difference
        between a crystal grown by the sun and one coaxed by heat.
      </p>

      <h2>Two routes to a flake</h2>
      <p>
        <strong>Maldon</strong> is made on the Essex coast of England, where
        seawater from the Blackwater estuary is filtered and then gently heated in
        wide, shallow pans. As the brine reaches the point of crystallising, the
        salters draw hollow, pyramid-shaped flakes from the surface by hand. It is
        a craft, and a very old one — but heat is part of it, and the dramatic
        pyramid crystal is a product of that controlled process.
      </p>
      <p>
        <strong>Fleur de sel</strong> takes no heat at all. In a hot, dry climate
        — the Aegean, the Guérande, the Camargue — seawater is led into clay pans
        and left to the sun. On still evenings a fragile lace of crystals forms on
        the very surface of the brine, and that surface bloom is skimmed by hand
        before it sinks. It is the first salt the water gives up, and only the
        surface layer is taken. If you want the longer version, see our{" "}
        <Link href="/journal/fleur-de-sel">field guide to fleur de sel</Link>.
      </p>

      <h2>Side by side</h2>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Fleur de Sel</th>
            <th>Maldon</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Origin</td>
            <td>Solar salt pans (e.g. Aegean, Guérande)</td>
            <td>Maldon, Essex, England</td>
          </tr>
          <tr>
            <td>How it&rsquo;s made</td>
            <td>Sun evaporation; surface bloom skimmed by hand</td>
            <td>Brine gently heated in open pans</td>
          </tr>
          <tr>
            <td>Crystal</td>
            <td>Fine, irregular, moist flakes</td>
            <td>Large, dry, hollow pyramids</td>
          </tr>
          <tr>
            <td>On the tongue</td>
            <td>Soft crackle, slow dissolve, briny</td>
            <td>Bold crunch, quick dissolve, clean</td>
          </tr>
          <tr>
            <td>Additives</td>
            <td>None (unrefined)</td>
            <td>None (unrefined)</td>
          </tr>
          <tr>
            <td>Best for</td>
            <td>Tomatoes, fish, eggs, caramel, the table</td>
            <td>Steak, bread, chocolate, big crunch</td>
          </tr>
        </tbody>
      </table>

      <h2>How they behave on food</h2>
      <p>
        Maldon&rsquo;s pyramids are large and dry, so they sit up on a surface and
        give a loud, satisfying crunch before melting quickly. That makes Maldon
        superb where you want drama — pressed onto a chocolate cookie, scattered
        over a seared steak, crushed between the fingers over warm bread.
      </p>
      <p>
        Fleur de sel is finer and faintly damp, so the flakes are smaller and
        dissolve more slowly, releasing salinity in softer, more sustained bursts.
        It is the more delicate of the two — better suited to a sliced tomato, a
        piece of grilled fish, a soft egg, a spoon of caramel, where you want a
        whisper of brine and a little mineral length rather than a crunch.
      </p>

      <h2>So which should you reach for?</h2>
      <p>
        Honestly: keep both if you cook a lot. They do different jobs. Choose{" "}
        <strong>Maldon</strong> when you want bold texture, easy availability, and
        a salt that performs the same every time. Choose{" "}
        <strong>fleur de sel</strong> when you want a finer, more mineral finish,
        and when provenance matters to you — a salt that tastes of one coastline
        and one season rather than a consistent industrial output.
      </p>
      <p>
        That last point is the whole reason Halen exists. It is fleur de sel from
        a single stretch of the{" "}
        <Link href="/journal/aegean-salt-pans">Aegean coast</Link>, raked by hand
        and dried by sun alone — and if you&rsquo;ve ever wondered whether that
        kind of salt earns its price, we made the honest case in{" "}
        <Link href="/journal/is-expensive-salt-worth-it">
          Is Expensive Salt Worth It?
        </Link>
      </p>
      <p>
        The first harvest is small.{" "}
        <Link href="/#reserve">Reserve a jar</Link> and taste the difference for
        yourself.
      </p>
    </>
  );
}
