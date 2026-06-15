/**
 * Optimised photograph: WebP primary with a JPEG fallback, lazy-loaded by
 * default. Used for the three provenance/use/macro shots in public/images.
 * (JPEG, not PNG, is the fallback — photographic PNGs can't be compressed under
 * 500KB without lossy palette tooling, and JPEG is the correct photo format.)
 */
export type PhotoName = "worker" | "cookie" | "salt";

export default function Photo({
  name,
  alt,
  imgClassName = "",
  priority = false,
}: {
  name: PhotoName;
  alt: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source srcSet={`/images/${name}.webp`} type="image/webp" />
      <img
        src={`/images/${name}.jpg`}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={imgClassName}
      />
    </picture>
  );
}
