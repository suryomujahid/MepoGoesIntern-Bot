module.exports = {
    name: 'bug-report',
    description: 'mengirimkan laporan bug ke developer bot',
    usage:'&&bug-report <bug-to-report>',
    example: '&&bug-report bot lu jelek bang',
    execute(client, Discord, message, args){
        if(args.join(" ") == '') return message.channel.send("Lapor apaan?");

        let reportEmbed = new Discord.MessageEmbed()
        .setTitle('Bug Report')
        .setColor('RANDOM')
        .setAuthor('MepoGoesIntern', 'https://static.wikia.nocookie.net/meme-yeet/images/2/2e/Roll_safe.png/revision/latest?cb=20190630031720')
        .setDescription('Sir! New bug report!')
        .addField('Problem', ` \`\`\` ${args.join(" ")} \`\`\` `, false)
        .setTimestamp()
        .setFooter(`Dikirim oleh ${message.author.username}`);


        let replyEmbed = new Discord.MessageEmbed()
        .setTitle('Bug Report')
        .setColor('RANDOM')
        .setAuthor('MepoGoesIntern', 'https://static.wikia.nocookie.net/meme-yeet/images/2/2e/Roll_safe.png/revision/latest?cb=20190630031720')
        .setDescription('Laporan anda sudah terkirim!')
        .addField('Bug: ', ` \`\`\` ${args.join(" ")} \`\`\` `, false)
        .setTimestamp()
        .setFooter('Mohon maaf gan');

        client.channels.cache.get(process.env.CHANNEL_ID).send(reportEmbed);
        message.channel.send(replyEmbed);
    }
}