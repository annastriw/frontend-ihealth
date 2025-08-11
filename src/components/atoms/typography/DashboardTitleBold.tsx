interface DashboardTitleBoldProps {
  head: string;
}

export default function DashboardTitleBold({ head }: DashboardTitleBoldProps) {
  return (
    <div className="mb-7 w-full max-w-xl">
      <h1 className="font-paytone text-3xl capitalize">{head}</h1>
    </div>
  );
}
