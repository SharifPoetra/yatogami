module.exports = async client => {
  //setTimeout(async () => {
    
      let guildsEval = await client.shard.broadcastEval('this.guilds.size')
      let channelsEval = await client.shard.broadcastEval('this.channels.size')
      let usersEval = await client.shard.broadcastEval('this.users.size')

     var botGuilds = guildsEval.reduce((prev, val) => prev + val)
     var botChannels = channelsEval.reduce((prev, val) => prev + val)
     var botUsers = usersEval.reduce((prev, val) => prev + val)
    
         var clientonmessage = `
| > Logging in...                       |
|                                       |
| Logged in as ${client.user.tag}      |
| Working on ${botGuilds} servers!                |
| ${botChannels} channels and ${botUsers} users cached!   |
|                                       |
|     LET'S GO!                         |
|                                       |
| Bot created by Sharif#2769 & OwO#8287 |
        
-----------------Bot's commands logs------------------`
      
  console.log(clientonmessage) 
  function randStatus() {
    let status = [
      `with ${botUsers} users`,
      `y!help for help`,
      `in ${botGuilds} guilds`, 
      `Hye, Hallo, Hehe`
     ];
    let rstatus = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[rstatus], { type: 'PLAYING' });
  };
  // update stats
  setInterval(() => client.updateStats(), 1000 * 60);
  
  //random status 
setInterval(randStatus, 20000);
  setInterval(() => client.updateStats(), 1000 * 60);
  
//}, 10000)
}
