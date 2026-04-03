import { isNull } from "drizzle-orm";
import { db } from "../db/db";
import { room, type insertRoom } from "../db/schema";
import z from "zod";

const NewRoom = z.object({
  name: z.string().max(100),
  password: z.string().max(32).optional(),
  owner: z.uuid()
});

export type newRoom = z.infer<typeof NewRoom>;

export function createRoom(newRoom: newRoom) {
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    const roomToAdd: insertRoom = { id, ...newRoom };
    db.insert(room).values(roomToAdd);
    return roomToAdd;
}

export function updateRoom() {}

export function deleteRoom() {}

export async function getRooms() {
    const rooms = await db.select().from(room).where(isNull(room.password));
    return rooms;
}

export function receiveMessage() {}

export function sendMessage() {}

export function signUpUser() {}

export function signInUser() {}
