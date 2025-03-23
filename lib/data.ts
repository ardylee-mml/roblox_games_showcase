export interface Game {
  id: number
  title: string
  description: string
  images: string[]
  videoPreview?: string
  gameLink: string
}

// Mock data - in a real application, this would come from a database
const games: Game[] = [
  {
    id: 1,
    title: "Adopt Me!",
    description:
      "Raise pets, trade items, and build your dream home in this popular role-playing experience. Explore a magical world with friends and collect rare pets! The game features regular updates with new pets, items, and areas to explore. Players can hatch eggs, raise their pets, and trade with other players to collect rare and legendary creatures.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    videoPreview: "https://www.youtube.com/watch?v=example1",
    gameLink: "https://www.roblox.com/games/920587237/Adopt-Me",
  },
  {
    id: 2,
    title: "Brookhaven RP",
    description:
      "Live the life you've always wanted in Brookhaven! Choose your house, drive amazing vehicles, and roleplay with friends in this open-world experience. Brookhaven offers a vast city to explore with various jobs, houses, and activities. Players can own pets, drive vehicles, and interact with other players in this immersive roleplaying world.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    videoPreview: "https://www.youtube.com/watch?v=example2",
    gameLink: "https://www.roblox.com/games/4924922222/Brookhaven-RP",
  },
  {
    id: 3,
    title: "Blox Fruits",
    description:
      "Become a master swordsman or a powerful fruit user in this One Piece inspired adventure. Explore islands, defeat bosses, and become the strongest player! Players can choose between being a pirate or marine, learn fighting styles, and collect rare fruits that grant special abilities. The game features PvP combat and challenging boss fights.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    videoPreview: "https://www.youtube.com/watch?v=example3",
    gameLink: "https://www.roblox.com/games/2753915549/Blox-Fruits",
  },
  {
    id: 4,
    title: "Tower of Hell",
    description:
      "Test your parkour skills in this challenging tower climbing game. With randomly generated levels and no checkpoints, can you make it to the top? Each tower features unique obstacles and traps that players must navigate to reach the top before time runs out. The game offers different difficulty modes and special events.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    videoPreview: "https://www.youtube.com/watch?v=example4",
    gameLink: "https://www.roblox.com/games/1962086868/Tower-of-Hell",
  },
  {
    id: 5,
    title: "Royale High",
    description:
      "Attend magical classes, dress up in beautiful outfits, and make friends in this enchanting role-playing experience. Live your best royal life! Players can attend classes at a magical school, participate in seasonal events, and collect rare items and accessories. The game features a detailed character customization system and various realms to explore.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    videoPreview: "https://www.youtube.com/watch?v=example5",
    gameLink: "https://www.roblox.com/games/735030788/Royale-High",
  },
]

export function getGames(): Game[] {
  return games
}

export function getGameById(id: number): Game | undefined {
  return games.find((game) => game.id === id)
}

