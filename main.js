const { Client } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client({ disableEveryone: true });

client.on("message", msg => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content.indexOf(PREFIX) !== 0) {
    return;
  }
  const args = msg.content.slice(PREFIX.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd === "ping") {
    msg.channel.send("Pong !");
  }
  if (cmd === "repeat") {
    msg.channel.send(args.join(" "));
    msg.delete({ timeout: 3000 }).then(msg => console.log(`Un message de ${msg.author.username} a été supprimé : ${msg.content}`));
  }
  if (cmd === "role") {
    const role = msg.guild.roles.find(r => r.name === args[0]);
    const channel_logs = client.channels.find(r => r.name === "logs");
    if (!role) {
      return msg.channel.send("Ce rôle n'existe pas !");
    }
    if (msg.member.roles.find(r => r.name === args[0])) {
      msg.member.roles.remove(role);
      channel_logs.send(`J'ai supprimé le rôle ${role} à ${msg.author}.`);
      msg.delete({ timeout: 3000 });
    } else {
      msg.member.roles.add(role);
      channel_logs.send(`J'ai ajouté le rôle ${role} à ${msg.author}.`);
      msg.delete({ timeout: 3000 });
    }
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
