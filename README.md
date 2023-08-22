# pavlov-rcon

A simple RCON client for Pavlov VR.

## Installation

```bash
npm install pavlov-rcon
```

## Usage

```javascript
const PavlovRCON = require('./index');
const rcon = new PavlovRCON('0.0.0.0', 9100, 'password');

rcon.connect().then(() => {
    rcon.on('Authenticated', () => {
        console.log('Authenticated!');
        rcon.send('ServerInfo');
    });
    rcon.on('ServerInfo', (data) => {
        console.log("Map Label: " + data.MapLabel);
        console.log("Game Mode: " + data.GameMode);
        console.log("Server Name: " + data.ServerName);
        console.log("Teams: " + data.Teams);
        console.log("Round State: " + data.RoundState);
        console.log("Player Count: " + data.PlayerCount);
        rcon.close();
    });
});
```

The above code connects to the server, authenticates, and then sends the `ServerInfo` command. The response is then printed to the console.

## Commands & Events

For every command, the event has the same name, just use:

```javascript
rcon.on('CommandName', (data) => {
    // Do something with data
});
```

The `data` variable will always be JSON, but you can see the full response by using:

```javascript
JSON.stringify(data);
```

### Commands

You can find a list of commands [here](http://pavlovwiki.com/index.php/Rcon_Overview_and_Commands#Commands) on Pavlov's official wiki.

For this example, we'll teleport Player1 to Player2:

```javascript
rcon.send('Teleport Player1 Player2'); 
// Use the player's unique ID's
// You can get these from the PlayerList
// By using this:
rconn.send('RefreshList');
```

I hope this helps you get started with your own RCON client!