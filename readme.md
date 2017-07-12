# Parallels Loader Tool

## Why?
If you try and start a parallels windows partition whilst that partition has files open in eg: terminal, you immediately waste several minutes of your time whilst parallels fails to start the vm, then vm needs to be hard reset in order to be shut down, both happen in a very clunky way. In comparison, knowing what files are open first and closing them is orders of magnitude quicker and less frustrating!

## How did you make the app?
With [Platypus](https://github.com/sveinbjornt/Platypus), though an odd thing with node scripts with platypus: Platypus correctly read the shebang I put in and said it would run `/usr/bin/env node MyParallelsTool.js` (ie: it chose `node` as an arg to send to the interpreter `env`) but all this resulted in was `Error: env: node: No such file or directory`. I had to lose env and the arg and point an 'other' script type to `/usr/local/bin/node`. 

