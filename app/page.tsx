import GamePoster from "@/components/GamePoster";
import db from "@/lib/db";
import { Game } from "@/lib/types";

// refresh cache every 24 hours
export const revalidate = 86400;

export default async function Home() {
  const games = db.collection("test_games");

  const allGames = (await games
    .find(
      {
        $or: [{ platforms: "PlayStation" }, { genres: "Action, Adventure" }],
      },
      {
        limit: 9,
        // this is how you exclude out the vector fields from the results
        // projection: { $vector: 0 },
      }
    )
    .toArray()) as Game[];

  return (
    <div className="min-h-screen pb-20">
      {/* Featured Games Section */}
      <div className="px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-300 mb-4">
              Featured Games
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover popular action and adventure games, handpicked for you
            </p>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allGames.map((game, index) => (
              <div key={game._id} className="relative">
                <GamePoster game={game} />

                {/* Featured Badge for first 3 games */}
                {index < 3 && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      FEATURED
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Looking for something specific?
              </h3>
              <p className="text-dark-300 mb-6">
                Use our AI-powered search to find games that match your exact
                preferences
              </p>
              <div className="flex justify-center">
                <div className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl text-white font-medium">
                  Try searching above ↑
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
