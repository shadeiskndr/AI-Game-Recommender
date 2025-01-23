import SearchInput from "./SearchInput";

function Header() {
  return (
    <header className="relative p-8 pb-2">
      {/* Hero Section */}
      <div className="text-center mb-8 space-y-4">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold gradient-text leading-tight">
            AI Game Recommender
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-3 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            Discover your next favorite game with AI-powered recommendations
          </p>
          <p className="text-lg text-gray-400">
            Over 3,000 video game titles recognized by AI for intelligent vector
            search
          </p>
        </div>

        {/* Tech Stack Credits */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-400">
          <span className="text-gray-400 font-medium">Powered by</span>
          <a
            href="https://platform.openai.com/docs/guides/embeddings"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-dark-800/50 rounded-full hover:bg-primary-600/20 hover:text-primary-300 transition-all duration-200 border border-dark-700 hover:border-primary-500/50"
          >
            OpenAI
          </a>
          <a
            href="https://www.datastax.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-dark-800/50 rounded-full hover:bg-secondary-600/20 hover:text-secondary-300 transition-all duration-200 border border-dark-700 hover:border-secondary-500/50"
          >
            DataStax
          </a>
          <a
            href="https://rawg.io/apidocs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-dark-800/50 rounded-full hover:bg-accent-600/20 hover:text-accent-300 transition-all duration-200 border border-dark-700 hover:border-accent-500/50"
          >
            RAWG
          </a>
        </div>
      </div>

      <SearchInput />
    </header>
  );
}

export default Header;
