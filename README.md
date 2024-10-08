# echo-server

Server repo for the Echo App. It processes all the events and raises some to make the Echo App echo!

## Server Events

- Recieves
  1. init -> recieve name and roomId, and join the room
  2. \*echo -> sent whenever text is typed, with the text, then sends the text back to the other clients
  3. leave -> a client left a room, that's it
- Emits
  1. \*reverb -> send the data received from a client back to all other clients
  2. joined -> notification to all other clients that someone joined
  3. 3. left -> notification to all other clients that someone left

NOTE: \* marked events are the main heroes

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.20. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
