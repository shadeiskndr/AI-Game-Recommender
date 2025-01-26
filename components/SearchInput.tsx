"use client";

import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { searchAction } from "@/lib/actions";

function SearchInput() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const allSuggestions = [
    // Genres
    "Cyberpunk adventure",
    "Cozy farming",
    "Battle royale",
    "Puzzle platformer",
    "Open world RPG",
    "Horror survival",
    "Racing simulator",
    "Turn-based strategy",
    "Indie roguelike",
    "Multiplayer shooter",
    "Fantasy adventure",
    "Space exploration",
    "City builder",
    "Fighting game",
    "Stealth action",
    "Card game",
    "Rhythm game",
    "Tower defense",
    "Sandbox creative",
    "Post-apocalyptic",
    "Medieval strategy",
    "Anime visual novel",
    "Retro arcade",
    "Survival crafting",
    "Metroidvania",
    "Soulslike",
    "Tactical RPG",
    "Life simulation",
    "Dungeon crawler",
    "Real-time strategy",
    "Bullet hell",
    "Walking simulator",
    "Immersive sim",
    "Hack and slash",
    "Grand strategy",
    "Auto battler",
    "Extraction shooter",
    "Deck building",
    "Colony management",
    "Psychological horror",

    // Characters
    "Mario platformer",
    "Zelda adventure",
    "Sonic speed running",
    "Master Chief shooter",
    "Kratos action",
    "Lara Croft exploration",
    "Nathan Drake adventure",
    "Geralt of Rivia RPG",
    "Aloy robot hunting",
    "Arthur Morgan western",
    "Solid Snake stealth",
    "Samus Aran sci-fi",
    "Cloud Strife JRPG",
    "Gordon Freeman physics",
    "Doom Slayer demon hunting",
    "Ezio Auditore parkour",
    "Commander Shepard space opera",
    "Joel and Ellie survival",
    "Pikachu adventure",
    "Steve crafting",
    "Tracer hero shooter",
    "Ryu fighting",
    "Pac-Man arcade",
    "Mega Man platformer",
    "Dante devil hunting",

    // Themes & Settings
    "Underwater exploration",
    "Time travel puzzle",
    "Zombie apocalypse",
    "Pirate adventure",
    "Ninja stealth",
    "Mech combat",
    "Wild west gunslinger",
    "Vampire gothic",
    "Alien invasion",
    "Dinosaur survival",
    "School life simulator",
    "Detective mystery",
    "Cooking simulation",
    "Music creation",
    "Photography adventure",
    "Fishing relaxation",
    "Skateboarding tricks",
    "Superhero action",
    "Magical girl adventure",
    "Samurai combat",
  ];

  const getRandomSuggestions = (count: number = 4) => {
    const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setSuggestions(getRandomSuggestions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    if (searchInputRef.current) {
      searchInputRef.current.value = suggestion;
      searchInputRef.current.focus();
    }
  };

  const refreshSuggestions = () => {
    setSuggestions(getRandomSuggestions());
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form action={searchAction} className="relative group">
        <div className="relative glass-effect rounded-2xl p-2 search-glow transition-all duration-300 group-hover:bg-white/15">
          <div className="flex items-center space-x-4">
            {/* Home Button */}
            <Link href="/" className="flex-shrink-0">
              <div className="p-3 rounded-xl bg-primary-600/20 hover:bg-primary-600/30 transition-all duration-200 group/home">
                <HomeIcon className="h-6 w-6 text-primary-300 group-hover/home:text-primary-200 group-hover/home:scale-110 transition-colors duration-200" />
              </div>
            </Link>

            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                ref={searchInputRef}
                type="text"
                name="searchTerm"
                placeholder="Describe the game you want to search (any information, name, genre, character, etc.)"
                className="w-full bg-transparent text-white placeholder-dark-400 text-lg py-4 px-3 focus:outline-none focus:placeholder-dark-500 transition-all duration-200"
                autoComplete="off"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 transition-all duration-200 group/search shadow-lg hover:shadow-xl cursor-pointer"
            >
              <MagnifyingGlassIcon className="h-6 w-6 text-white group-hover/search:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Search Suggestions */}
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
          <span className="text-gray-400 pt-1">Try:</span>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1 bg-dark-800/30 hover:bg-primary-600/20 text-gray-300 hover:text-primary-300 rounded-full transition-all duration-200 border border-dark-700/50 hover:border-primary-500/50 animate-fade-in cursor-pointer"
            >
              {suggestion}
            </button>
          ))}
          <button
            type="button"
            onClick={refreshSuggestions}
            className="px-3 py-1 bg-dark-800/30 hover:bg-secondary-600/20 text-gray-400 hover:text-secondary-300 rounded-full transition-all duration-200 border border-dark-700/50 hover:border-secondary-500/50 text-xs hover:rotate-180 transform cursor-pointer"
            title="Get new suggestions"
          >
            🎲
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchInput;
