interface VideoProps {
    title: string,
    url:string
}

export function Video({ title, url }:VideoProps) {
  return (
    <div className="video-wrapper">
      <h3>{title}</h3>
      <iframe
        src={url}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
