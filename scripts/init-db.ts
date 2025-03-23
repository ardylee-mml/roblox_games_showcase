import { createGame } from '../lib/db';

const sampleGames = [
  {
    title: "Roblox Adventure Quest",
    description: "Embark on an epic journey through mystical lands, solve puzzles, and collect treasures in this exciting adventure game.",
    images: [
      {
        url: "/placeholder.jpg",
        publicId: "placeholder_1"
      }
    ],
    videos: [],
    robloxGameUrl: "https://www.roblox.com/games/123456789"
  },
  {
    title: "Tycoon Empire",
    description: "Build your own business empire in this tycoon game. Manage resources, expand your operations, and become the ultimate tycoon!",
    images: [
      {
        url: "/placeholder.jpg",
        publicId: "placeholder_2"
      }
    ],
    videos: [],
    robloxGameUrl: "https://www.roblox.com/games/987654321"
  },
  {
    title: "Racing Champions",
    description: "Experience high-speed racing action with customizable cars, multiple tracks, and competitive multiplayer racing.",
    images: [
      {
        url: "/placeholder.jpg",
        publicId: "placeholder_3"
      }
    ],
    videos: [],
    robloxGameUrl: "https://www.roblox.com/games/456789123"
  },
  {
    title: "Zombie Survival",
    description: "Survive in a post-apocalyptic world filled with zombies. Gather resources, build defenses, and work together with other players.",
    images: [
      {
        url: "/placeholder.jpg",
        publicId: "placeholder_4"
      }
    ],
    videos: [],
    robloxGameUrl: "https://www.roblox.com/games/789123456"
  },
  {
    title: "Pet Simulator X",
    description: "Collect, train, and evolve your pets in this exciting simulator game. Trade with other players and become the ultimate pet master!",
    images: [
      {
        url: "/placeholder.jpg",
        publicId: "placeholder_5"
      }
    ],
    videos: [],
    robloxGameUrl: "https://www.roblox.com/games/321654987"
  }
];

// Initialize the database with sample games
sampleGames.forEach(game => {
  createGame(game);
});

console.log('Database initialized with sample games!'); 