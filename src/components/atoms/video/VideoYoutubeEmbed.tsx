import { Skeleton } from "@/components/ui/skeleton";

interface VideoYoutubeEmbedProps {
  url: string;
  isLoading: boolean;
}

export default function VideoYoutubeEmbed({
  url,
  isLoading,
}: VideoYoutubeEmbedProps) {
  if (isLoading) {
    <Skeleton className="h-full w-full rounded-3xl" />;
  }

  return (
    <div className="relative w-full md:h-[600px]">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${url}?si=pZc8ezYw3T0GtEh2`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className={`h-[400px] w-full rounded-3xl transition-opacity duration-300 md:h-full ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      ></iframe>
    </div>
  );
}
