#!/usr/bin/env node

'use strict'

const windowsPartition = `/Volumes/Untitled` 
const parallelsVM = `/Users/twoode/CODE/VMs/Parallels/My Boot Camp.pvm/My Boot Camp.app`
const spawn = require( 'child_process' ).spawn

function checkForOpenFiles(callback) {
  console.log( `checking you've not left anything open on ${windowsPartition}...`)
  const ls = spawn( 'lsof', [ windowsPartition  ] )

  ls.stdout.on( 'data', data => console.log( `\nOOPS!!!! These are still open:\n ${data}` ) )
  ls.stderr.on( 'data', data => console.log( `\nSome error happened:\n ${data}` ) )

  /*
   * strangely for lsof, return code 1 means "i didn't find anything". To not find anything is an error
   * https://stackoverflow.com/a/29843137/3536094
   */ 
  ls.on( 'close', exitCode => callback(exitCode))
}

function flow() {

  checkForOpenFiles( exitCode => (
    exitCode === 1? (
        console.log(`\nNothing is open, starting up...`)
      , spawn( 'open', ['-a',  parallelsVM ] )
    ):(
        console.log("\nClose the files, checking again....\n")
      , flow()
    )

  ))

}

flow()
