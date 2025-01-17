import { HomeIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { redirect } from "next/navigation";

function SearchInput() {
  async function searchAction(formData: FormData) {
    "use server";

    const searchTerm = formData.get("searchTerm") as string;

    redirect(`/search/${searchTerm}`);
  }

  return (
    <div className="mr-5 flex items-center w-full">
      <form
        action={searchAction}
        className="flex-1 pl-2 flex items-center rounded-full border-white border shadow-lg bg-white"
      >
        <Link href="/">
          <HomeIcon
            className="h-10 w-10 text-gray-400 transition-transform duration-200 ease-in-out transform hover:scale-110 ml-1 mr-1"
            title="Go to Home"
          />
        </Link>
        <input
          type="text"
          className="flex-1 p-5 focus:outline-none focus:bg-transparent bg-transparent rounded-full"
          name="searchTerm"
          placeholder="Type any video game information or meaning (name, description, genre). | e.g. 'Football' or 'Robots'"
        />
      </form>
    </div>
  );
}

export default SearchInput;
