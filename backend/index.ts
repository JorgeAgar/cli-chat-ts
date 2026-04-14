import z from "zod";
import { createRoom, updateRoom, deleteRoom, getRooms, signUpUser, signInUser, checkSignedIn } from "./src/model";
import type { newRoom } from "./src/model";
import { NewRoom } from "./src/model";

const server = Bun.serve({
  // `routes` requires Bun v1.2.3+
  routes: {
    // Static routes
    "/status": new Response("OK"),

    "/signup": async req => {
        const userSchema = z.object({
        email: z.email(),
        name: z.string().max(24),
        password: z.string().max(32)
        });
        const body = userSchema.parse(await req.json());
        const user = await signUpUser(body);
        return Response.json({ token: user });
    },

    "/signin": async req => {
        const userSchema = z.object({
        email: z.email(),
        password: z.string().max(32)
        });
        const body = userSchema.parse(await req.json());
        const user = await signInUser(body);
        return Response.json({ token: user });
    },

    "/amisignedin": async req => {
        const token = req.headers.get("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return new Response("Unauthorized", { status: 401 });
        }
        try {
            await checkSignedIn(token);
            return new Response("Authorized", { status: 200 });
        } catch (error) {
            return new Response("Unauthorized", { status: 401 });
        }
    },

    "/rooms": {
        GET: () => Response.json(getRooms()),
        POST: async req => {
            try {
                const body = NewRoom.parse(await req.json());
                const newRoom = createRoom(body);
                return Response.json(newRoom, { status: 201 });
            } catch (error) {
                return Response.json({ error: "Invalid room data" }, { status: 400 });
            }
        },
        PATCH: async req => {
            const body = await req.json();
            const updatedRoom = updateRoom(body);
            return Response.json(updatedRoom);
        },
        DELETE: async req => {
            const body = await req.json();
            deleteRoom(body.id);
            return new Response(null, { status: 204 });
        }
    },

    // Dynamic routes
    "/connect/:room": req => {
        const { roomId } = req.params.room;
        // connect to room
        return null;
    },

    // Wildcard route for all routes that start with "/api/" and aren't otherwise matched
    "/connect/*": Response.json({ message: "Room not found" }, { status: 404 }),

    // Redirect from /blog/hello to /blog/hello/world
    // "/blog/hello": Response.redirect("/blog/hello/world"),

    // Serve a file by lazily loading it into memory
    // "/favicon.ico": Bun.file("./favicon.ico"),
  },

  // (optional) fallback for unmatched routes:
  // Required if Bun's version < 1.2.3
  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at ${server.url}`);