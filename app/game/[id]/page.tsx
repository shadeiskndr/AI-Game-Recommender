import GamePoster from "@/components/GamePoster";
import db from "@/db";
import { Game, SimilarGame } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

// refresh cache every 24 hours
export const revalidate = 60 * 60 * 24;

async function GamePage({ params }: { params: { id: string } }) {
  const { id } = await params;
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
        limit: 6,
        includeSimilarity: true,
      }
    )
    .toArray()) as SimilarGame[];

  // cut the first game because it is the same as the game we are looking for
  similarGames.shift();

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-y-10 p-10 pb-0">
        <Image
          src={game.background_image}
          alt={game.name}
          width={500}
          height={400}
          className="shrink-0 rounded-lg "
        />
        <div className="px-2 md:px-10 flex flex-col gap-y-2">
          <h1 className="text-6xl font-bold">{game.name}</h1>
          <p className="text-gray-900">{game.genres}</p>
          <p className="font-light">
            {game.description
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
              : "No description data available and similarity rating section might not be working, error on the back-end side. Sorry! Though you can use the search to find similar video games."}
          </p>

          <div className="mt-auto grid grid-cols-2">
            <div className="font-semibold">
              <p>Date Released:</p>
              <p>User Rating:</p>
              <p>Critic Rating:</p>
              <p>Average Time to Complete:</p>
              <p>Platforms:</p>
            </div>
            <div>
              <p>{game.datereleased}</p>
              <p>{game.rating}/5</p>
              <p>{game.metacritic}%</p>
              <p>{game.playtime} hours</p>
              <p>{game.platforms}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="text-3xl pt-10 pl-10 font-bold ">
          Similar video games you may like
        </h2>
        <div className="flex justify-between items-center lg:flex-row gap-x-20 gap-y-10 pl-20 pr-10 py-10 overflow-x-scroll">
          {similarGames.map((game, i) => (
            <GamePoster
              key={game._id}
              index={i + 1}
              similarityRating={
                Number((game.$similarity || 0).toFixed(2)) * 100
              }
              game={game}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GamePage;
