require('dotenv').config();

const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const { getPokemon } = require('./utils/pokemon');
const keepAlive = require('./server');
const convert = require('convert-units');


client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('p!d')) {
        const pokemon = message.content.toLowerCase().split(" ")[2];
        try {
            const pokeData = await getPokemon(pokemon);
            const { 
                sprites, 
                stats, 
                weight, 
                name, 
                id, 
                base_experience,
                height,
                types,
                abilities,
            } = pokeData;
            const number = name[0].toUpperCase() + name.slice(1);
            const hello = height / 10;
            const mass = weight / 10;
            const rahul = `**HP:** ${stats[0].base_stat} \n**Attack:** ${stats[1].base_stat} \n**Defense:** ${stats[2].base_stat} \n**Sp. Atk:** ${stats[3].base_stat} \n**Sp. Def:** ${stats[4].base_stat} \n**Speed:** ${stats[5].base_stat}`;
            
            const embed = new MessageEmbed();
            embed.setTitle(`#${id} — ${number}`)
            embed.setURL(`https://www.pokemon.com/us/pokedex/${name}`);
            embed.setImage(`https://assets.poketwo.net/images/${id}.png`);
            embed.setAuthor('Professor Oak', 'https://pbs.twimg.com/profile_images/2927846251/bf8cef29642aceb034d4b01ab29a4ca7_normal.png', 'https://bulbapedia.bulbagarden.net/wiki/Professor_Oak');
            embed.setColor(`1d9e85`);
            embed.addField('Types',`${types[0].type.name[0].toUpperCase() + types[0].type.name.slice(1)}`, true);
            embed.addField('Catchable', 'Yes', true);
            embed.addField('Location','Everywhere',true)
            embed.addField('Base Stats', rahul, true);
            embed.addField('Names',`
            \n:flag_jp: ${number} \n:flag_gb: ${number} \n:flag_us: ${number} \n:flag_in: ${number}`,true)
            embed.addField('Appearence', `Height: ${hello} m \nWeight: ${mass} kg`, true);
            embed.addField('Abilities',`${abilities[0].ability.name[0].toUpperCase() + abilities[0].ability.name.slice(1)}`, true);
            message.channel.send(embed);  
            
        }
      catch(err) {
            console.log(err);
            message.channel.send(`Could not find a pokemon matching ${pokemon}.`); 
        }
    }
});

keepAlive();
client.login(process.env.BOT_TOKEN);
