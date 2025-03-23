'use server';

import { createClient } from "redis";

if (!process.env.REDIS_URL) {
  throw new Error('Please define the REDIS_URL environment variable inside .env.local');
}

const getClient = async () => {
  const client = createClient({
    url: process.env.REDIS_URL,
  });

  client.on("error", function(err) {
    console.error('Redis Client Error:', err);
  });

  if (!client.isOpen) {
    await client.connect();
  }

  return client;
};

export async function setRedisKey(key: string, value: string) {
  const client = await getClient();
  try {
    await client.set(key, value);
  } finally {
    await client.quit();
  }
}

export async function getRedisKey(key: string) {
  const client = await getClient();
  try {
    return await client.get(key);
  } finally {
    await client.quit();
  }
}

export async function deleteRedisKey(key: string) {
  const client = await getClient();
  try {
    await client.del(key);
  } finally {
    await client.quit();
  }
} 