import { isNull } from "drizzle-orm";
import { db } from "../db/db";
import { room } from "../db/schema";

export function createRoom() {}

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
