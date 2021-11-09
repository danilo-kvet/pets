import redis, { RedisClient } from "redis";

export default async function getRedisClient() {
  const client: RedisClient = redis.createClient({
    port: 6379,
    host: "localhost",
  });

  return client;
}
