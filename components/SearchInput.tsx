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
      <form
        action={searchAction}
        className="flex-1 flex items-center pl-5 rounded-full border-white border shadow-lg bg-white"
      >
        <Link href="/">
          <HomeIcon className="h-10 w-10 text-gray-400 transition-transform duration-200 ease-in-out transform hover:scale-110 mr-3" title="Go to Home"/>
        </Link>
        <input
          type="text"
          className="flex-1 p-5 focus:outline-none focus:bg-transparent bg-transparent rounded-full"
          name="searchTerm"
          placeholder="Type any video game information or meaning (name, description, genre). | e.g. 'A game where you play as a thief'"
        />
      </form>
    </div>
  );
}

export default SearchInput;
