import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut , Info, Newspaper} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/whispp.png" alt="logo" width={144} height={30} className="h-20"/>
        </Link>

        <div className="flex items-center gap-5 text-black">
          <Link href="/news" className="hover:text-gray-600 transition-colors">
            <span className="max-sm:hidden">News</span>
            <Newspaper className="size-6 sm:hidden" />
          </Link>
          <Link href="/about" className="hover:text-gray-600 transition-colors">
            <span className="max-sm:hidden">About</span>
            <Info className="size-6 sm:hidden" />
          </Link>

          {session && session?.user ? (
            <>
              <Link href="/stories/create" className="hover:text-gray-600 transition-colors">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="hover:text-gray-600 transition-colors">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit" className="hover:text-gray-600 transition-colors">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;