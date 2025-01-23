import GamePoster from "@/components/GamePoster";
import db from "@/lib/db";
import { Game } from "@/lib/types";
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export const revalidate = 86400;

type SearchTermProps = {
  params: Promise<{
    term: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

async function SearchTerm({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: SearchTermProps) {
  const params = await paramsPromise;
  const searchParams = await searchParamsPromise;
  const { term } = params;
  const decodedTerm = decodeURIComponent(term);

  const games = db.collection("test_games");

  const similarGames = (await games
    .find(
      {},
      {
        sort: { $vectorize: term },
        limit: 12,
        projection: { $vector: 0 },
      }
    )
    .toArray()) as Game[];

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Search Results Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-primary-600/20 rounded-full">
                <MagnifyingGlassIcon className="h-8 w-8 text-primary-400" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Search Results
            </h1>

            <div className="glass-effect rounded-2xl p-6 max-w-3xl mx-auto">
              <p className="text-lg text-gray-200 mb-2">
                AI-powered recommendations for:
              </p>
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-primary-600/30 to-secondary-600/30 rounded-xl border border-primary-500/30">
                <span className="text-xl font-semibold text-primary-300">
                  "{decodedTerm}"
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                Found {similarGames.length} games using vector similarity search
              </p>
            </div>
          </div>

          {/* Results Grid */}
          {similarGames.length > 0 ? (
            <>
              {/* Results Counter and Sort Info */}
              <div className="flex justify-between items-center mb-8 px-4">
                <div className="text-gray-300">
                  <span className="text-white font-semibold">
                    {similarGames.length}
                  </span>{" "}
                  games found
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <ArrowPathIcon className="h-4 w-4" />
                  <span>Sorted by AI relevance</span>
                </div>
              </div>

              {/* Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {similarGames.map((game, index) => (
                  <div key={game._id} className="relative group">
                    <GamePoster game={game} index={index + 1} />

                    {/* Top 3 Results Badge */}
                    {index < 3 && (
                      <div className="absolute -top-2 -left-2 z-10">
                        <div
                          className={`text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-200 ${
                            index === 0
                              ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                              : index === 1
                              ? "bg-gradient-to-r from-gray-400 to-gray-500"
                              : "bg-gradient-to-r from-amber-600 to-amber-700"
                          }`}
                        >
                          {index === 0
                            ? "🥇 BEST"
                            : index === 1
                            ? "🥈 GREAT"
                            : "🥉 GOOD"}
                        </div>
                      </div>
                    )}

                    {/* Rank Number for Mobile */}
                    <div className="absolute top-2 right-2 sm:hidden">
                      <div className="w-8 h-8 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary-500/30">
                        <span className="text-primary-300 font-bold text-sm">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Hint */}
              <div className="text-center mt-12">
                <div className="glass-effect rounded-xl p-6 max-w-2xl mx-auto">
                  <p className="text-gray-300 mb-4">
                    Want more results? Try refining your search with more
                    specific terms.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 text-sm">
                    <span className="text-gray-400 pt-1">Suggestions:</span>
                    <span className="px-2 py-1 bg-primary-600/20 text-primary-300 rounded">
                      Add genre
                    </span>
                    <span className="px-2 py-1 bg-secondary-600/20 text-secondary-300 rounded">
                      Specify platform
                    </span>
                    <span className="px-2 py-1 bg-accent-600/20 text-accent-400 rounded">
                      Describe gameplay
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* No Results State */
            <div className="text-center py-20">
              <div className="glass-effect rounded-2xl p-12 max-w-2xl mx-auto">
                <div className="text-6xl mb-6">🎮</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  No games found
                </h3>
                <p className="text-gray-300 mb-8">
                  Try adjusting your search terms or browse our featured games
                  instead.
                </p>
                <div className="space-y-4">
                  <a
                    href="/"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl text-white font-medium hover:from-primary-500 hover:to-secondary-500 transition-all duration-200"
                  >
                    Browse Featured Games
                  </a>
                  <div className="text-sm text-gray-400">
                    or try searching for: "action adventure", "puzzle games",
                    "multiplayer"
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search Tips */}
          <div className="mt-16">
            <div className="glass-effect rounded-2xl max-w-4xl mx-auto p-6">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                💡 Pro Search Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-primary-300">
                        Be descriptive:
                      </strong>
                      <br />
                      <span className="text-gray-400">
                        "Open world RPG with magic system"
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-secondary-300">
                        Use genres:
                      </strong>
                      <br />
                      <span className="text-gray-400">
                        "Battle royale", "Puzzle platformer"
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-accent-400">
                        Describe gameplay:
                      </strong>
                      <br />
                      <span className="text-gray-400">
                        "Cooperative multiplayer survival"
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-primary-300">
                        Set the mood:
                      </strong>
                      <br />
                      <span className="text-gray-400">
                        "Dark atmospheric horror game"
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchTerm;
