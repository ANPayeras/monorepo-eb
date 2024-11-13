import { SignUp } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

const Page = () => {
  if (auth().sessionId) return
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <SignUp />
    </div>
  )
}

export default Page