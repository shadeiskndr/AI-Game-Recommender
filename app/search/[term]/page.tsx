import GamePoster from "@/components/GamePoster";
import db from "@/db";
import { Game } from "@/types";

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
  const games = db.collection("test_games");

  const similarGames = (await games
    .find(
      {},
      {
        sort: { $vectorize: term },
        limit: 9,
        projection: { $vector: 0 },
      }
    )
    .toArray()) as Game[];

  return (
    <div className="flex flex-col items-center justify-center pb-24 pt-16 pl-10 pr-12">
      <h1 className="mb-10 text-xl text-white-500">
        Suggested results based on your search: {decodeURIComponent(term)}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
        {similarGames.map((game, i) => (
          <div key={game._id} className="flex space-x-2 relative">
            <p className="absolute flex items-center justify-center left-4 top-2 text-white font-extrabold text-xl z-40 rounded-full bg-indigo-500/80 w-10 h-10">
              {i + 1}
            </p>

            <GamePoster key={game._id} game={game} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchTerm;
