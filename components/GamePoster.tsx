import { Game, SimilarGame } from "@/types";
import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";

function GamePoster({
  index,
  similarityRating,
  game,
}: {
  index?: number;
  similarityRating?: number;
  game: Game | SimilarGame;
}) {
  return (
    <Link key={game._id} href={`/game/${game._id}`} className="">
      <div className="relative">
        <ImageWithFallback
          className="w-[30rem] h-64 object-cover rounded-lg shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105"
          src={game.background_image}
          alt={game.name}
        />

        {similarityRating && (
          <div title = "Similarity Rating" className="absolute w-14 h-14 flex items-center justify-center bottom-0 right-0 bg-orange-500 bg-opacity-90 p-2 rounded-full m-5 font-bold">
            {similarityRating}%
          </div>
        )}

        {index && (
          <div className="absolute text-gray-100 top-32 -left-10 text-9xl font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {index}
          </div>
        )}
      </div>

      <div className="py-2">
        <p className="text-lg font-semibold line-clamp-1 w-64">{game.name}</p>
        <p className="text-gray-700 line-clamp-1">{game.genres}</p>
      </div>
    </Link>
  );
}

export default GamePoster;
