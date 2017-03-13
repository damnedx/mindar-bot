#Mindar data grabbing

> Assuming that $mbot contains mindar-bot

## First clone

* Install packages

```sh
cd $mbot && npm install
```

* Create data/actors directory

```sh
mkdir $mbot/data
mkdir $mbot/data/actors
```

## Execute

Simply run this command :
```sh
cd $mbot && node .
```

Cool trick to better show logs, especially errors

* Add this function to your .bashrc 

`color()(set -o pipefail;"$@" 2>&1>&3|sed $'s,.*,\e[31m&\e[m,'>&2)3>&1`

* Then execute the bot with this command
```sh
cd $mbot && color node .
```
