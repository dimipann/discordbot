const { Client } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client({ disableEveryone: true });

client.on("message", msg => {
  if (msg.author.bot) {
    return;
  }
  const args = msg.content.split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd === `${PREFIX}ping`) {
    msg.channel.send("Pong !");
  }
  if (cmd === `${PREFIX}repeat`) {
    msg.channel.send(args.join(" "));
    msg.delete({ timeout: 3000 }).then(msg => console.log(`Un message de ${msg.author.username} a été supprimé : ${msg.content}`));
  }
});

client.on("guildMemberAdd", member => {
  member.send("Salut à toi !");
  const channel_general = client.channels.find(r => r.name === "général");
  channel_general.send(`Bienvenue ${member} sur notre serveur !`);
});

client.login(TOKEN);

client.on("ready", () => console.log("A votre service et à celui de votre famille !"));
client.on("error", () => console.error);
client.on("warn", () => console.warn);
client.on("debug", () => console.log);
