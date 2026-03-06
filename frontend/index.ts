import { BoxRenderable, ConsolePosition, SelectRenderable, SelectRenderableEvents, TextAttributes, TextRenderable, createCliRenderer } from "@opentui/core"

const renderer = await createCliRenderer({consoleOptions: {
    position: ConsolePosition.RIGHT,
    sizePercent: 30,
  },});

const loginMenu = new SelectRenderable(renderer, {
  id: "loginMenu",
  width: 80,
  height: 24,
  showDescription: false,
  options: [
    { name: "Login with username/password", description: "Login with existing credentials" },
    { name: "Login with Google", description: "Login with Google account" },
    { name: "Continue as guest", description: "Continue without logging in" },
  ],
});

loginMenu.on(SelectRenderableEvents.ITEM_SELECTED, (index, option) => {
  console.log("Selected:", option.name);
  renderer.root.remove("loginMenu");
  loginMenu.destroy();
  renderer.root.add(roomSelectMenu);
  roomSelectMenuSelect.focus();
});

loginMenu.focus();
renderer.root.add(loginMenu);

const roomSelectMenu = new BoxRenderable(renderer, {
  id: "roomSelectMenu",
  width: "100%",
  height: 24,
});

const loggedInAsText = new TextRenderable(renderer, {
  id: "loggedInAsText",
  width: "100%",
  height: 1,
  content: "Logged in as Guest",
  fg: "#00f900",
  marginBottom: 1,
  attributes: TextAttributes.BOLD | TextAttributes.UNDERLINE,
});
roomSelectMenu.add(loggedInAsText);

const roomSelectMenuSelect = new SelectRenderable(renderer, {
  id: "roomSelectMenuSelect",
  width: "100%",
  height: 4,
  backgroundColor: "#000000",
  showDescription: false,
  options: [
    { name: "Go Back", description: "Return to login menu" },
    { name: "Join Room", description: "Join an existing room" },
    { name: "Create Room", description: "Create a new room" },
    { name: "Browse Rooms", description: "Browse available rooms" },
  ],
});

roomSelectMenu.add(roomSelectMenuSelect);

roomSelectMenuSelect.on(SelectRenderableEvents.ITEM_SELECTED, (index, option) => {
  console.log("Selected:", option.name);
});