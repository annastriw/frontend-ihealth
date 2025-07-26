interface DashboardTitleProps {
  head: string;
  body: string;
}

export default function DashboardTitle({ head, body }: DashboardTitleProps) {
  return (
    <div className="mb-7 w-full max-w-4xl mx-auto flex flex-col items-center text-center md:items-start md:text-left md:mx-0">
      <h1 className="font-paytone text-3xl text-black">{head}</h1>
      <p className="mt-2 text-sm leading-relaxed text-black/80">
        {body}
      </p>
    </div>
  );
}
