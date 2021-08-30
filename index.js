require('dotenv').config();

const Discord = require("discord.js");
require('discord-reply');
const fs = require("fs");
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);

const client = new Discord.Client();
const prefix = "&&";

client.commands = new Discord.Collection();
const commandFiles  = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

console.log(commandFiles);

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once("ready", () => {
    console.log("Sup")
    client.user.setPresence({
        activity: {
            name: "&&help for documentation",
            type: "LISTENING"
        }
    })
})


client.on("message", async (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    switch(command){
        case("ping"):
            client.commands.get('ping').execute(message);
            break;
        case("introduce"):
            client.commands.get('introduce').execute(message, args);
            break;
        case("absen-pkl"):
            client.commands.get('absen-pkl').execute(Discord, message, args);
            break;
        case("jurnal-mingguan-pkl"):
            client.commands.get('jurnal-mingguan-pkl').execute(Discord, message, args);
            break;
        case("data-pkl"):
            client.commands.get('data-pkl').execute(Discord, message, args);
            break;
        case("set-data-pkl"):
            client.commands.get('set-data-pkl').execute(Discord, message, args);
            break;
        case("edit-data-pkl"):
            client.commands.get('edit-data-pkl').execute(Discord, message, args);
            break;
        case("help"):
            client.commands.get('help').execute(Discord, message, args);
            break;
        case("bug-report"):
            client.commands.get('bug-report').execute(client, Discord, message, args);
            break;
    }    
    
})




client.login(process.env.BOT_TOKEN);