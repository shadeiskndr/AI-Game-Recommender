import SearchInput from "./SearchInput";

function Header() {
  return (
    <header className="p-10 pb-0 flex flex-col items-center top-0 z-50">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold">AI Game Recommender</h1>
        <p className="text-xl mt-2">Over 1500 video game titles recognized by AI for vector search.</p>
        <p className="text-md mt-1">
          Powered by{" "}
          <a
            href="https://mistral.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white-500 underline"
          >
            Mistral AI
          </a>
          ,{" "}
          <a
            href="https://www.datastax.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white-500 underline"
          >
            DataStax
          </a>{" "}
          &{" "}
          <a
            href="https://rawg.io/apidocs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white-500 underline"
          >
            RAWG
          </a>{" "}
          | Developed by{" "}
          <a
            href="https://shahathir.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white-500 underline"
          >
            Shahathir Iskandar
          </a>
        </p>
      </div>
      <SearchInput />
    </header>
  );
}

export default Header;

