import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-svh flex flex-col items-center justify-center text-center px-7">
      <p className="label mb-7">Lost at sea</p>
      <h1 className="serif text-[clamp(3rem,9vw,6rem)] text-ink leading-[1.0] mb-8">
        Nothing here but water.
      </h1>
      <Link
        href="/"
        className="label !text-salt bg-ink px-9 py-4 rounded-[4px] !tracking-[0.24em] transition-transform active:scale-[0.98]"
      >
        Back to shore
      </Link>
    </main>
  );
}
