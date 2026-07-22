import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex flex-col items-start gap-6 py-24 md:py-40">
      <p className="t-spec text-ink-soft">404</p>
      <h1 className="t-head text-5xl md:text-8xl">
        That page
        <br />
        isn&rsquo;t here
      </h1>
      <p className="max-w-md text-ink-soft">
        The link may be old, or the style may have sold through. The catalogue is
        the fastest way back.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/shop" className="btn btn-solid">
          Browse the catalogue
        </Link>
        <Link href="/" className="btn btn-line">
          Back home
        </Link>
      </div>
    </div>
  );
}
