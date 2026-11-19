import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  aspectClass?: string;
  className?: string;
}

export function EditorialImage({
  src,
  alt,
  caption,
  aspectClass = 'aspect-[4/3]',
  className = '',
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={`flex flex-col ${className}`}>
      <div
        className={`relative w-full overflow-hidden rounded-lg border border-[#26312D] bg-[#131917] ${aspectClass}`}
      >
        {!failed ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover brightness-[0.94] contrast-[1.03] transition-transform duration-500 ease-out hover:scale-[1.015]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#131917] to-[#1A2420] p-6 text-center">
            <BookOpen className="h-7 w-7 text-[#34D399]" aria-hidden="true" />
            <p className="max-w-xs font-serif text-sm font-medium text-[#F3F1EC]">
              {alt}
            </p>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 font-serif text-xs italic leading-relaxed text-[#9A958C]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
