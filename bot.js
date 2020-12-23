const Discord = require('discord.js');
const bot = new Discord.Client();
const {
    prefix,
    token
} = require('./config.json')
const ms = require('ms')


bot.on('ready', () => {
    console.log(`${bot.user.username} is online.`)
    let statuses = [
        `Over ${bot.guilds.cache.size} Servers`,
        `Over ${bot.users.cache.size} Users`,
        `$help`
    ]
    setInterval(function () {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {
            type: "WATCHING"
        })
    }, 2000)
});

bot.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        message.channel.send(`The bot's current ping/ms is ${bot.ws.ping}`)
    } else if (command === 'addchannel') {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You do not have permission to use this command.")
        const name = message.content.replace('$addchannel', '')
        message.guild.channels
            .create(name, {
                type: "text"
            })
            .then(message.channel.send(`Successfully added new channel`))
    } else if (command === 'renamechannel') {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You do not have permission to use this command.")
        const name = message.content.replace('$renamechannel', '')
        message.channel.setName(name)
        message.channel.send(`Successfully renamed channel to${name}`)
    } else if (command === 'deletechannel') {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You do not have permission to use this command.")
        message.channel.delete()
    } else if (command === 'slowmode') {
        const slowmodenumber = message.content.replace('$slowmode', '')
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You do not have permission to use this command.")
        message.channel.setRateLimitPerUser(slowmodenumber)
        message.channel.send(`Successfuly added a${slowmodenumber} second slowmode`)
    } else if (command === 'addwebhook') {
        if (!message.member.hasPermission("MANAGE_WEBHOOKS")) return message.channel.send("You do not have permission to use this command")
        const name = message.content.replace('$addwebhook', '')
        message.channel.createWebhook(name)
        message.channel.send(`Successfully created webhook`);

    }
    if (command === 'channelmanagement') {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You do not have permission to use this commnad')
        const channelmanagement = new Discord.MessageEmbed()
            .setColor('#00000')
            .setTitle("Channel Management Commands")
            .setDescription("Prefix: $")
            .addFields({
                name: "addchannel",
                value: "Creates a channel",
                value: "Example: $addchannel channelname"
            }, {
                name: "renamechannel",
                value: "Renames current channel",
                value: "Example: $renamechannel newchannelname"
            }, {
                name: "deletechannel",
                value: "Deletes current channel",
                value: "Example: $deletechannel"
            }, {
                name: "slowmode",
                value: "Sets a slowmode",
                value: "Example: $slowmode 5"
            })
        message.channel.send(channelmanagement)
    } else if (command === 'botinvite') {
        const inviteembed = new Discord.MessageEmbed()
            .setColor('#00000')
            .setAuthor("Invite the bot to your server")
            .setURL('https://discord.com/oauth2/authorize?client_id=790621865689350185&permissions=8&scope=bot')
            .setTitle("Invite the bot here")
            .setImage('https://emoji.gg/assets/emoji/9171_security.png')
        message.channel.send(inviteembed);
    } else if (command === 'addrole') {
        const name = message.content.replace('$addrole', '')
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have permission to use this command")

        message.guild.roles.create()
    } else if (command === 'renameguild') {
        const name = message.content.replace('$renameguild', '')
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You do not have permission to use this commnad")

        message.guild.setName(name)
        message.channel.send(`Successfully renamed guild to${name}`)
    } else if (command === 'ban') {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You need the Ban Members permission.")
        const target = message.mentions.users.first();
        message.member.ban(target)

        message.channel.send(`Successfully banned ${target.tag}`)
        console.error()
        if(console.error) return message.channel.send("There was an error banning the member")


    }
})
bot.login(token)