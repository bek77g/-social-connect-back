export default {
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    },
  },
  io: {
    enabled: true,
    config: {
      IOServerOptions: {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"],
          credentials: true,
        },
      },
      contentTypes: {
        order: ["create"],
      },
      events: [
        {
          name: "connection",
          handler: ({ strapi }, socket) => {
            strapi.log.info(`[io] new connection with id ${socket.id}`);
            socket.on("client-message", (messageData) => {
              console.log("Server: " + messageData);

              strapi.$io.raw("client-message", messageData);
            });
          },
        },
      ],
    },
  },
};
