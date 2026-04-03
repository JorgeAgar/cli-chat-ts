import { eq, isNull } from "drizzle-orm";
import { db } from "../db/db";
import { room, user, type insertRoom, type insertUser } from "../db/schema";
import z from "zod";
import { password, randomUUIDv7 } from "bun";

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

export function deleteRoom(roomId: string) {
    db.delete(room).where(eq(room.id, roomId)).then(() => {
        return new Response(null, { status: 204 });
    }, err => {
        console.error(err);
        return new Response("Internal Server Error", { status: 500 });
    });
}

export async function getRooms() {
    const rooms = await db.select().from(room).where(isNull(room.password));
    return rooms;
}

export function receiveMessage() {}

export function sendMessage() {}

export async function signUpUser(newUser: {name: string, email: string, password: string}) {
    const id = randomUUIDv7();
    const hashedPassword = await password.hash(newUser.password);
    const userToAdd: insertUser = { id, name: newUser.name, email: newUser.email, password: hashedPassword };
    db.insert(user).values(userToAdd);
    //TODO: generate JWT and return it
}

export function signInUser() {}
