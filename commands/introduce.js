const Discord = require("../node_modules/discord.js");

module.exports = {
    name: 'introduce',
    description: 'let the bot introduce itself',
    usage:'&&introduce',
    example: '&&introduce',
    execute(message){
        if(message.author.id !== "439976892343517184") return message.channel.send("Nope, you're not my master");
        const embed = new Discord.MessageEmbed()
        .setTitle('Let Me Introduce Myself')
        .addField(`I am MepoGoesIntern`, `Jika itu menyebalkan pasti ada jalan`, false)
        .setFooter(`aquila non captat muscas`)
        .setColor('RANDOM')

        message.channel.send(embed)
    }
}