const PageContainer = ({
  children,
  title,
}: Readonly<{ children: React.ReactNode; title: string }>) => (
  <div className="flex max-h-full flex-1 flex-col p-8 sm:px-6 lg:px-8">
    <div className="flex flex-wrap items-center justify-between">
      <h1 className="self-start text-4xl leading-6 font-semibold text-gray-900">{title}</h1>
    </div>
    {children}
  </div>
)

export default PageContainer
