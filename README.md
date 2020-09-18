# Polly  

Poll bot for discord.

## Set up:

0. Add bot to your server by using this link:

> https://discord.com/oauth2/authorize?client_id=728868950322184212&scope=bot&permissions=0

1. `npm i`

2. Create dotenv file (.env), make input  
`TOKEN=%BOT_TOKEN%`

3. Launch:  
`node index.js`

## Commands available.

To ask Polly to do something use specified commands below.

### To start a new poll use this command

> Polly startNewPoll PollName

There must be a name for the poll and it must be spelled together.
After this command Polly will remember every message you send to the chat.

### To finish creating the poll.

If there are enough of options you use:

> Polly endNewPoll

After that the poll is ready to go.

### To publish the poll.

To publish the poll use

> Polly showNewPoll

After that Polly will send all the messages and will start gathering emojis.  
  
**NOTE**  
  
Anyone who has access to the chat can vote. One person = one vote.  
If you want to change your mind - simply remove emoji from an old option to a new one.  

### To publish the solution

To know which option win use

> Polly solution

If there will be several options with equal amount of votes - Polly will randomly choose one of them
