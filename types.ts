export type Game = {
  _id: string;
  name: string;
  released: string;
  background_image: string;
  rating: string;
  metacritic: string;
  playtime: string;
  platforms: string;
  genres: string;
  description: string;
  $vectorize: string;
  $vector: Array<number>;
};

export type SimilarGame = {
  $similarity: number;
} & Game;
