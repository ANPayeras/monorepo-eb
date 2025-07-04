import { SignUp } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Page = async () => {
  const { sessionId } = await auth();
  if (sessionId) {
    redirect('/sign-in')
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <SignUp />
    </div>
  )
}

export default Page