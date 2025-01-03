import StoriesForm from "@/app/components/StoriesForm"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
const Page = async () => {
    const session = await auth()

    if(!session) redirect('/')
  return (
    <>
    <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit your story</h1>
       
    </section>
    <StoriesForm />
    </>
  )
}

export default Page