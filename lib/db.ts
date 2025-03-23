'use server';

import { getRedisKey, setRedisKey, deleteRedisKey } from './redis';

export interface GameImage {
  url: string;
  publicId: string;
  caption?: string;
}

export interface GameVideo {
  url: string;
  title?: string;
}

export interface Game {
  id?: string;
  title: string;
  description: string;
  images: GameImage[];
  videos: GameVideo[];
  robloxGameUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

const GAMES_KEY = 'games';
const GAME_PREFIX = 'game:';

// Get all games
export async function getAllGames(): Promise<Game[]> {
  const gamesJson = await getRedisKey(GAMES_KEY);
  if (!gamesJson) return [];
  return JSON.parse(gamesJson);
}

// Get a single game by ID
export async function getGame(id: string): Promise<Game | null> {
  try {
    const games = await getAllGames();
    return games.find(game => game.id === id) || null;
  } catch (error) {
    console.error('Failed to get game:', error);
    throw error;
  }
}

// Create a new game
export async function createGame(game: Omit<Game, 'id' | 'createdAt' | 'updatedAt'>): Promise<Game> {
  const id = Math.random().toString(36).substring(2, 15);
  const now = new Date().toISOString();
  
  const newGame: Game = {
    ...game,
    id,
    createdAt: now,
    updatedAt: now,
  };

  // Store the game
  await setRedisKey(`${GAME_PREFIX}${id}`, JSON.stringify(newGame));
  
  // Add to games list
  const games = await getAllGames();
  games.push(newGame);
  await setRedisKey(GAMES_KEY, JSON.stringify(games));

  return newGame;
}

// Update a game
export async function updateGame(id: string, updates: Partial<Game>): Promise<Game | null> {
  const existingGame = await getGame(id);
  if (!existingGame) return null;

  const updatedGame: Game = {
    ...existingGame,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  // Update the game
  await setRedisKey(`${GAME_PREFIX}${id}`, JSON.stringify(updatedGame));
  
  // Update in games list
  const games = await getAllGames();
  const gameIndex = games.findIndex(g => g.id === id);
  if (gameIndex !== -1) {
    games[gameIndex] = updatedGame;
    await setRedisKey(GAMES_KEY, JSON.stringify(games));
  }

  return updatedGame;
}

// Delete a game
export async function deleteGame(id: string): Promise<boolean> {
  const existingGame = await getGame(id);
  if (!existingGame) return false;

  // Delete the game
  await deleteRedisKey(`${GAME_PREFIX}${id}`);
  
  // Remove from games list
  const games = await getAllGames();
  const filteredGames = games.filter(g => g.id !== id);
  await setRedisKey(GAMES_KEY, JSON.stringify(filteredGames));

  return true;
} 