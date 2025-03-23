import { createGame } from '../lib/db';

const sampleGames = [
  {
    title: "Roblox Adventure Quest",
    description: "Embark on an epic journey through mystical lands, solve puzzles, and collect treasures in this exciting adventure game.",
    imageUrl: "/placeholder.jpg",
    playUrl: "https://www.roblox.com/games/123456789",
    rating: 4.5,
    votes: 120
  },
  {
    title: "Tycoon Empire",
    description: "Build your own business empire in this tycoon game. Manage resources, expand your operations, and become the ultimate tycoon!",
    imageUrl: "/placeholder.jpg",
    playUrl: "https://www.roblox.com/games/987654321",
    rating: 4.2,
    votes: 85
  },
  {
    title: "Racing Champions",
    description: "Experience high-speed racing action with customizable cars, multiple tracks, and competitive multiplayer racing.",
    imageUrl: "/placeholder.jpg",
    playUrl: "https://www.roblox.com/games/456789123",
    rating: 4.8,
    votes: 150
  },
  {
    title: "Zombie Survival",
    description: "Survive in a post-apocalyptic world filled with zombies. Gather resources, build defenses, and work together with other players.",
    imageUrl: "/placeholder.jpg",
    playUrl: "https://www.roblox.com/games/789123456",
    rating: 4.3,
    votes: 95
  },
  {
    title: "Pet Simulator X",
    description: "Collect, train, and evolve your pets in this exciting simulator game. Trade with other players and become the ultimate pet master!",
    imageUrl: "/placeholder.jpg",
    playUrl: "https://www.roblox.com/games/321654987",
    rating: 4.7,
    votes: 200
  }
];

// Initialize the database with sample games
sampleGames.forEach(game => {
  createGame(game);
});

console.log('Database initialized with sample games!'); 