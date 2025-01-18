import GamePoster from "@/components/GamePoster";
import db from "@/db";
import { Game } from "@/types";

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
    <div className="flex items-center justify-center pb-24 pt-16 pl-10 pr-10">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
        {allGames.map((game) => (
          <GamePoster key={game._id} game={game} />
        ))}
      </div>
    </div>
  );
}
