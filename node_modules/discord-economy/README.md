<div align="center">
  <br />
  <br />
  <p>
    <a href="https://discord.gg/Hc9rC8X"><img src="https://discordapp.com/api/guilds/379277541229330432/widget.png" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/discord-economy"><img src="https://img.shields.io/npm/v/discord-economy.svg" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/discord-economy"><img src="https://img.shields.io/npm/dt/discord-economy.svg" alt="NPM downloads" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/discord-economy/"><img src="https://nodei.co/npm/discord-economy.png?downloads=true&stars=true" alt="NPM info" /></a>
  </p>
</div>

## Installation
```js
$ npm install --save discord-economy
```

Checkout my package for xp systems on discord bots!
[discord-leveling](https://www.npmjs.com/package/discord-leveling)

## Contact
- [Discord Help Server](https://discord.gg/Hc9rC8X)

### Required packages
- [sequelize](https://www.npmjs.com/package/sequelize) the DB wrapper of sqlite3 of this project (`npm install --save sequelize`)
- [sqlite3](https://www.npmjs.com/package/sqlite3) Core DB (`npm install --save sqlite3`)

### Optional
- [discord.js](https://www.npmjs.com/package/discord.js) Package to make discord bots with (`npm install --save discord.js`)

## ChangeLog
- [1.0.12](https://www.npmjs.com/package/discord-economy/v/1.0.12) Added a function queue so that the database never corrupts; Leaderboard now outputs objects instead of arrays!
- [1.0.13](https://www.npmjs.com/package/discord-economy/v/1.0.13) Fixed small typo's in: Dice and Coinflip functions.
- [1.0.14](https://www.npmjs.com/package/discord-economy/v/1.0.14) Now you can set the balance to 0 which first was not possible because a small mistake.

- [1.1.1](https://www.npmjs.com/package/discord-economy/v/1.1.1) Added an example bot of discord.js at the bottom of this page! Also fixed Dice function now works again properly!
- [1.1.3](https://www.npmjs.com/package/discord-economy/v/1.1.2) Added a delete function.
- [1.1.4](https://www.npmjs.com/package/discord-economy/v/1.1.4) Added timetowait in daily function. So you can tell the user how long to wait for next daily. (see bot example at bottom of this page)

## Functions

**SetBalance**
```js
eco.SetBalance(UserID, toSet)
```

**AddToBalance**
```js
eco.AddToBalance(UserID, toAdd).then(l => console.log(l))
//Expected Output
//{userid, oldbalance, newbalance}
//oldbalance & newbalance = integer
```

**SubstractFromBalance**
```js
eco.SubstractFromBalance(UserID, toSubstract).then(l => console.log(l))
//Expected Output
//{userid, oldbalance, newbalance}
//oldbalance & newbalance = integer
```

**FetchBalance**
```js
eco.FetchBalance(UserID).then(l => console.log(l))
//Expected Output
//{userid, balance}
//balance = integer
```

**Leaderboard**
```js
eco.Leaderboard({limit: NUMBER, search: 'UserID'}).then(l => console.log(l))
//limit And search are optional!//
//limit specifies how much records you want to fetch for the Leaderboard DEFAULT: unlimited
//If you add search it will search the userposition in the Leaderboard

//Expected Output without search
//Array of objects where balance is higher than 0!
//[ {userid: 153, balance: 100}, {userid: 170, balance: 94}, {userid: 92640, balance: 3} ]
//Sorted from user with highest to lowest balance.

//Expected Output with search
//Place of the user in the Leaderboard
//For example: If the user is first place it will output 1 (Integer)
```

**Daily**
```js
eco.Daily(UserID).then(l => console.log(l))
//Expected Output
//{userid, updated, timetowait(only appears when updated == false)}
//updated = false Or true
```

**Transfer**
```js
eco.Transfer(FromUser, ToUser, Amount).then(l => console.log(l))
//Expected Output
//{FromUser, ToUser}
//FromUser & ToUser == the balance of the users
```

**Coinflip**
```js
//Flip should be heads or tails
eco.Coinflip(UserID, Flip, Input).then(l => console.log(l))
})
//Expected Output
//{userid, oldbalance, newbalance, output}
//output = won or lost
```

**Dice**
```js
//Dice should be between 1-6
eco.Dice(UserID, Dice, Input).then(l => console.log(l))
//Expected Output
//{userid, oldbalance, newbalance, guess, dice, output}
//guess = UserGuess
//dice = Diceroll
//output = won or lost
```

**Delete**
```js
//Dice should be between 1-6
eco.Delete(UserID).then(l => console.log(l))
//Expected Output
//{deleted}
//deleted = either true or false
//true means the user got deleted, false means the user was not in the database so couldn't get deleted.
```

## Example Bot (discord.js)
```js
/*
If you want to make discord-economy guild based you have to use message.author.id + message.guild.id as ID for example:
eco.Daily(message.author.id + message.guild.id)

This will create an unique ID for each guild member
*/


//Requiring Packages
const discord = require('discord.js');//This can also be discord.js-commando or other node based packages!
const eco = require('discord-economy');

//Create the bot client
const client = new Discord.Client();

//Whenever someone types a message this gets activated.
client.on('message', message => {

//Set the prefix of the bot.
  const settings = {
    prefix: '!',
  }

//This reads the first part of your message behind your prefix to see which command you want to use.
  var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];
//These are the arguments behind the commands.
  var args = message.content.split(' ').slice(1)[0];

//If the message does not start with your prefix return.
//If the user that types a message is a bot account return.
    if (!message.content.startsWith(tokens.prefix) || msg.author.bot) return;

        if (command === 'balance') {

            eco.FetchBalance(message.author.id).then(l => {
                message.channel.send(`Hey ${message.author.tag}! You own ${l.balance} coins.`);
            })

        }

        if (command === 'daily') {

            eco.Daily(message.author.id).then(l => {
//l.updated tells you if the user already claimed his/her daily yes or no.
                if (l.updated) {

                  eco.FetchBalance(message.author.id).then(x => {
                      message.reply(`You claimed your daily coins succesfully! You now own ${x.balance} coins.`);
                  })

                } else {
                  message.channel.send(`Sorry, you already claimed your daily coins!\nBut no worries, over ${l.timetowait} you can daily again!`)
                }
            })

        }

        if (command === 'leaderboard') {

//If you put a mention behind the command it searches for the mentioned user in database and tells the position.
            if (message.mentions.users.first()) {

eco.Leaderboard({search: message.mentions.users.first().id}).then(l => {
    message.channel.send(`The user ${message.mentions.users.first().tag} is number ${l} on my leaderboard!`);
})

//Searches for the top 3 and outputs it to the user.
            } else {

eco.Leaderboard({limit: 3}).then(users => {

  client.fetchUser(users[0].userid).then(number1 => {
  client.fetchUser(users[1].userid).then(number2 => {
  client.fetchUser(users[2].userid).then(number3 => {

msg.channel.send(`My leaderboard:

1 - ${number1.tag} : ${users[0].balance}
2 - ${number2.tag} : ${users[1].balance}
3 - ${number3.tag} : ${users[2].balance}`)

})
})
})

})

        }
      }

        if (command === 'transfer') {

          var user = message.mentions.users.first()
          var amount = args[0]

          if (!user) return message.reply('Reply the user you want to send money to!')
          if (!amount) return message.reply('Specify the amount you want to pay!')

            eco.fetchBalance(message.author.id).then((i) => {
              if (i.balance < amount) return message.reply('You have less coins than the amount you want to transfer!')
            })

            eco.Transfer(message.author.id, user.id, amount).then(l => {
              message.reply(`Transfering coins succesfully done!\nBalance from ${user.tag}: ${l.FromUser}\nBalance from ${message.author.tag}: ${l.ToUser}`);
            })
        }

        if (command === 'coinflip') {

          var flip = args[0] //Heads or Tails
          var amount = args[1] //Coins to gamble

          if (!flip || !['heads', 'tails'].includes(flip)) return message.reply('Pls specify the flip, either heads or tails!')
          if (!amount) return message.reply('Specify the amount you want to gamble!')

            eco.fetchBalance(message.author.id).then((i) => {
              if (i.balance < amount) return message.reply('You have less coins than the amount you want to gamble!')
            })

            eco.Coinflip(message.author.id, flip, amount).then(l => {

              message.reply(`You ${l.output}! New balance: ${l.newbalance}`)

            }).catch(console.error)

        }

        if (command === 'dice') {

          var roll = args[0] //Should be number between 1 and 6
          var amount = args[1] //Coins to gamble

          if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('Specify the roll, it should be a number between 1-6')
          if (!amount) return message.reply('Specify the amount you want to gamble!')

            eco.fetchBalance(message.author.id).then((i) => {
              if (i.balance < amount) return message.reply('You have less coins than the amount you want to gamble!')
            })

            eco.Dice(message.author.id, roll, amount).then(l => {

              message.reply(`The dice rolled ${dice}. So you ${l.output}! New balance: ${l.newbalance}`)

            }).catch(console.error)

        }

        if (command == 'delete') {

        var user = message.mentions.users.first()
        if (!user) return message.reply('Pls, Specify a user I have to delete in my database!')

        if (!message.guild.me.hasPermission(`ADMINISTRATION`)) return message.reply('You need to be admin to execute this command!')

        eco.Delete(user.id).then(l => {

          if (l.deleted == true) return message.reply('Succesfully deleted the user out of the database!')
          message.reply('Error: Could not find the user in database.')

        })

        }


    });

//Your secret token to log the bot in. (never show this to anyone!)
        client.login('token')
```
