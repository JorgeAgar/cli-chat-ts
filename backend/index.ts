const server = Bun.serve({
  // `routes` requires Bun v1.2.3+
  routes: {
    // Static routes
    "/status": new Response("OK"),

    "/rooms": {
        GET: () => Response.json(getRooms()),
        POST: async req => {
            const body = await req.json();
            const newRoom = createRoom(body);
            return Response.json(newRoom, { status: 201 });
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