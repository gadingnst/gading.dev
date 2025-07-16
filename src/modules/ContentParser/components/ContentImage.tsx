import ImageWithTools from '@/packages/components/base/Displays/ImageWithTools';

interface ContentImageProps {
  width: number;
  height: number;
  src: string;
  alt: string;
  carousel?: string;
}

function ContentImage(props: ContentImageProps) {
  const { src, alt } = props;
  return (
    <ImageWithTools
      figureClassName="flex flex-col items-center min-h-[300px] w-full justify-center my-4 rounded-lg"
      enableZoom
      enableDownload
      src={src}
      alt={alt}
      width={1200}
      height={720}
      className="min-h-full min-w-full max-h-full max-w-full cursor-pointer mb-0 bg-black/70 rounded-lg"
      wrapperClassName="min-h-full min-w-full max-h-full max-w-full rounded-lg overflow-hidden"
      toolsWrapperClassName="bottom-8"
      loading="lazy"
    >
      <figcaption className="block text-center italic text-xs mt-2 text-base-content">
        [Image] {alt}
      </figcaption>
    </ImageWithTools>
  );
};

export default ContentImage;
