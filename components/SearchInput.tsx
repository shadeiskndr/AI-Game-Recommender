import { HomeIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import catalogdLogo from "../public/Catalogd red logo.jpeg";

function SearchInput() {
  async function searchAction(formData: FormData) {
    "use server";

    const searchTerm = formData.get("searchTerm") as string;

    redirect(`/search/${searchTerm}`);
  }

  return (
    <div className="flex items-center w-full">
      <Link href="https://catalogd-fyp.vercel.app" title="Go back to Catalogd">
        <Image
          src={catalogdLogo}
          alt="Catalogd Logo"
          width={65}
          height={65}
          className="rounded-full transition-transform duration-200 ease-in-out transform hover:scale-110"
        />
      </Link>
      <div className="mx-4"></div> {/* Add whitespace between Image and form */}
      <form
        action={searchAction}
        className="flex-1 flex items-center px-5 rounded-full border-white bg-white border shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105"
      >
        <Link href="/">
          <HomeIcon className="h-10 w-10 text-gray-500 transition-transform duration-200 ease-in-out transform hover:scale-110" title="Go to Home"/>
        </Link>
        <input
          type="text"
          className="flex-1 p-5 outline-none"
          name="searchTerm"
          placeholder="Type any video game information or meaning (name, description, genre). | e.g. 'A game where you play as a thief'"
        />
      </form>
    </div>
  );
}

export default SearchInput;
