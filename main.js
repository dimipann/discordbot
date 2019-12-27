const { Client } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client({ disableEveryone: true });

client.on("ready", () => {
  console.log("A votre service et à celui de votre famille !");
});

client.on("message", msg => {
  if (msg.content.startsWith(`${PREFIX}ping`)) {
    msg.channel.send("Pong !");
  }
});

client.login(TOKEN);
