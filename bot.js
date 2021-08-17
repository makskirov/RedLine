const Discord = require('discord.js');
const bot = new Discord.Client();

const dreams = [
  "!m - Отправляет сообщение участнику в лс. Использование: !m @member сообщение",
  "Climb a really tall mountain",
  "Wash the dishes"];
const express = require('express');
const app = express();
app.use(express.static("public"));
bot.commands = new Discord.Collection();
const fs = require('fs');
const ms = require('ms');
let config = require('./botconfig.json');
let token = config.token;
let prefix = config.prefix;
 
fs.readdir('./cmds-util/',(err,files)=>{
    if(err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0) console.log("No skripts for load!!");
    console.log(`${jsfiles.length} Skripts started`);
    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds-util/${f}`);
        bot.commands.set(props.help.name,props);
    }); 
});
fs.readdir('./cmds-adm/',(err,files)=>{
    if(err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0) console.log("No skripts for load!!");
    console.log(`${jsfiles.length} Skripts started`);
    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds-adm/${f}`);
        bot.commands.set(props.help.name,props);
    }); 
});
fs.readdir('./cmds-test/',(err,files)=>{
    if(err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0) console.log("No skripts for load!!");
    console.log(`${jsfiles.length} Skripts started`);
    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds-test/${f}`);
        bot.commands.set(props.help, props);
    });
});
fs.readdir('./cmds-games/',(err,files)=>{
    if(err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0) console.log("No skripts for load!!");
    console.log(`${jsfiles.length} Skripts started`);
    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds-games/${f}`);
        bot.commands.set(props.help.name,props);
    });
});

bot.on('ready', () => {
    bot.channels.cache.get("873937768542249050").send("<@!694965601948663819> DONE");
//873243066658590760 - новости
//873937768542249050 - chat-bot
//873248499897098281 - чат-основной
//873272372042543104 - идеи и предложения
    //bot.channels.cache.get("873243066658590760").send("@everyone\nВыдача ролей в дискорде начнётся после того как запустим сервер!\n\nДа,да знаем что мого тегов)))");
    console.log(`${bot.user.username} BOT Запущен`);
    console.log(`Bot By vk.com/maks_kirov`);
})

const activities_list = [
    "Эта строка не видна",
    "ip: mc.redline.pw",
    "prefix ! | !help"
];

bot.on('ready', () => {
    bot.user.setStatus('dnd')
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length -1) + 1);
        bot.user.setActivity(activities_list[index], { type: 0 });
    }, 10000)});


/*bot.on('guildMemberAdd', async (guildMember) => {
        await guildMember.roles.add('873244265352937502');
    });
bot.on('guildMemberAdd', member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
	if (!channel) return;
	channel.send(`Welcome to the server, ${member}\nРоль выдана!`);
	console.log(`Игрок зашёл, роль выдана`);
});*/
  bot.login(token)