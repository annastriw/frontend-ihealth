interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="text-center">
      <h1 className="from-primary to-secondary font-paytone inline-block bg-gradient-to-r bg-clip-text text-center text-3xl leading-tight text-transparent md:text-4xl md:leading-snug">
        {title}
      </h1>
    </div>
  );
}
