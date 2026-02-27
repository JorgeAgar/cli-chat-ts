import { ConsolePosition, SelectRenderable, SelectRenderableEvents, createCliRenderer } from "@opentui/core"

const renderer = await createCliRenderer({consoleOptions: {
    position: ConsolePosition.RIGHT,
    sizePercent: 30,
  },});

const menu = new SelectRenderable(renderer, {
  id: "menu",
  width: 30,
  height: 8,
  showDescription: false,
  options: [
    { name: "Login with username/password", description: "Login with existing credentials" },
    { name: "Login with Google", description: "Login with Google account" },
    { name: "Continue as guest", description: "Continue without logging in" },
  ],
})

menu.on(SelectRenderableEvents.ITEM_SELECTED, (index, option) => {
  console.log("Selected:", option.name)
})

menu.focus()
renderer.root.add(menu)