interface GeneralTitleProps {
  title: string;
}

export default function GeneralTitle({ title }: GeneralTitleProps) {
  return (
    <div className="mb-7 w-full max-w-xl">
      <h1 className="font-paytone text-3xl capitalize md:text-4xl">{title}</h1>
    </div>
  );
}
