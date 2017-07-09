#!/usr/bin/env node

'use strict'

const windowsPartition = `/Volumes/Untitled` 
const parallelsVM = `/Users/twoode/CODE/VMs/Parallels/My Boot Camp.pvm/My Boot Camp.app`


const spawn = require( 'child_process' ).spawn
console.log( `checking you've not left anything open on ${windowsPartition}...`)
const ls = spawn( 'lsof', [ windowsPartition  ] )

ls.stdout.on( 'data', data => console.log( `stdout: ${data}` ) )
ls.stderr.on( 'data', data => console.log( `stderr: ${data}` ) )

/*
 * strangely for lsof, return code 1 means "i didn't find anything". To not find anything is an error
 * https://stackoverflow.com/a/29843137/3536094
 */ 
ls.on( 'close', code => {
    console.log( `child process exited with code ${code}` )
    if (code===1) {
      console.log(`Nothing is open, starting up...`)
      spawn( 'open', ['-a',  parallelsVM ] ) 
    }
})
