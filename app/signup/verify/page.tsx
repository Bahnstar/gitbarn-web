export default function Verify({ searchParams }: Readonly<{ searchParams: { message: string } }>) {
  return (
    <div className="mx-auto mt-[30%] max-w-sm flex-1 space-y-10 px-4 md:mt-[10%] md:px-0">
      Thank you for joining GitBarn! Please check your email to verify your account.
    </div>
  )
}
