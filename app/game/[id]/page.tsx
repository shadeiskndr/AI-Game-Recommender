import GamePoster from "@/components/GamePoster";
import ImageWithFallback from "@/components/ImageWithFallback";
import db from "@/lib/db";
import { Game, SimilarGame } from "@/lib/types";
import {
  CalendarIcon,
  StarIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 86400;

type GamePageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

async function GamePage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: GamePageProps) {
  const params = await paramsPromise;
  const searchParams = await searchParamsPromise;
  const { id } = params;

  const games = db.collection("test_games");

  const search = await games.find({ $and: [{ _id: id }] });

  if (!(await search.hasNext())) {
    return notFound();
  }

  const game = (await search.next()) as Game;

  const similarGames = (await games
    .find(
      {},
      {
        sort: { $vectorize: game.description },
        limit: 7,
        includeSimilarity: true,
      }
    )
    .toArray()) as SimilarGame[];

  // Remove the current game from similar games
  similarGames.shift();

  const cleanDescription = game.description
    ? game.description
        .replace(/<br \/>/g, "")
        .replace(/<br\/>/g, "")
        .replace(/<li>/g, "")
        .replace(/<\/li>/g, "")
        .replace(/<\/strong>/g, "")
        .replace(/<strong>/g, "")
        .replace(/<\/ul>/g, "")
        .replace(/<ul>/g, "")
        .replace(/<\/p>/g, "")
        .replace(/<p>/g, "")
        .replace(/�/g, " ")
        .replace(/&quot;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, ",")
        .replace(/<h3>/g, "")
        .replace(/<\/h3>/g, "")
    : "No description available. This might affect similarity ratings, but you can still use search to find similar games.";

  // Function to get star color based on rating
  const getStarColor = (rating: number) => {
    if (rating >= 4.0) return "text-green-400"; // Excellent
    if (rating >= 3.5) return "text-yellow-400"; // Very Good
    if (rating >= 3.0) return "text-orange-400"; // Good
    if (rating >= 2.5) return "text-red-400"; // Average
    return "text-red-800"; // Below Average
  };

  return (
    <div className="min-h-screen">
      {/* Game Hero Section */}
      <div className="px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Game Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <ImageWithFallback
                  src={game.background_image}
                  alt={game.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                  width={600}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent"></div>
              </div>
            </div>

            {/* Game Info */}
            <div className="space-y-8">
              {/* Title and Genre */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  {game.name}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {game.genres?.split(", ").map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-600/20 text-primary-300 rounded-full text-sm border border-primary-500/30"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Game Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="glass-effect rounded-xl p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="h-5 w-5 text-primary-400" />
                    <span className="text-gray-300 text-sm">Release Date</span>
                  </div>
                  <p className="text-white font-semibold">
                    {game.datereleased || "Unknown"}
                  </p>
                </div>

                <div className="glass-effect rounded-xl p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <StarIcon className="h-5 w-5 text-secondary-400" />
                    <span className="text-gray-300 text-sm">User Rating</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <p className="text-white font-semibold">
                      {game.rating || "N/A"}/5
                    </p>
                    {game.rating && (
                      <div className="flex flex-wrap gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIconSolid
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(parseFloat(game.rating))
                                ? getStarColor(parseFloat(game.rating))
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="glass-effect rounded-xl p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <ChartBarIcon className="h-5 w-5 text-secondary-400" />
                    <span className="text-gray-300 text-sm">Critic Score</span>
                  </div>
                  <p className="text-white font-semibold">
                    {game.metacritic ? `${game.metacritic}%` : "N/A"}
                  </p>
                </div>

                <div className="glass-effect rounded-xl p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <ClockIcon className="h-5 w-5 text-primary-400" />
                    <span className="text-gray-300 text-sm">Playtime</span>
                  </div>
                  <p className="text-white font-semibold">
                    {game.playtime ? `${game.playtime} hours` : "Unknown"}
                  </p>
                </div>
              </div>

              {/* Platforms */}
              <div className="glass-effect rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <DevicePhoneMobileIcon className="h-5 w-5 text-secondary-400" />
                  <span className="text-gray-300">Available Platforms</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {game.platforms?.split(", ").map((platform, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-secondary-600/20 text-secondary-300 rounded-lg text-sm border border-secondary-500/30"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Game Description */}
          <div className="mt-8">
            <div className="glass-effect rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                About This Game
              </h2>
              <p className="text-gray-200 leading-relaxed text-lg">
                {cleanDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Games Section */}
      {similarGames.length > 0 && (
        <div className="px-1">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Similar Games You Might Like
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mb-6"></div>
              <p className="text-gray-300 text-lg">
                AI-powered recommendations based on game similarity
              </p>
            </div>

            {/* Horizontal Scrolling Container */}
            <div className="relative">
              {/* Scroll Indicators */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-dark-900 to-transparent z-10 pointer-events-nonel"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-dark-900 to-transparent z-10 pointer-events-none"></div>

              {/* Scrollable Games Container */}
              <div className="horizontal-scroll overflow-x-auto pb-4">
                <div
                  className="flex space-x-6 px-4 py-4"
                  style={{ width: "max-content" }}
                >
                  {similarGames.map((similarGame, index) => (
                    <div key={similarGame._id} className="flex-shrink-0 w-80">
                      <GamePoster
                        game={similarGame}
                        index={index + 1}
                        similarityRating={Math.round(
                          (similarGame.$similarity || 0) * 100
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Scroll Hint */}
              <div className="text-center mt-4">
                <p className="text-gray-500 text-sm flex items-center justify-center space-x-2">
                  <span>←</span>
                  <span>Scroll horizontally to see more games</span>
                  <span>→</span>
                </p>
              </div>
            </div>

            {/* AI Explanation */}
            <div className="mt-12 text-center">
              <div className="glass-effect rounded-xl p-6 max-w-3xl mx-auto">
                <h3 className="text-lg font-semibold text-white mb-3">
                  🤖 How AI Recommendations Work
                </h3>
                <p className="text-gray-300 text-sm">
                  Our AI analyzes game descriptions, genres, and gameplay
                  elements using vector embeddings to find games with similar
                  characteristics. The similarity percentage shows how closely
                  each game matches the current one based on these factors.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePage;
