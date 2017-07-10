#!/usr/bin/env node

'use strict'

const windowsPartition = `/Volumes/Untitled` 
const parallelsVM = `/Users/twoode/CODE/VMs/Parallels/My Boot Camp.pvm/My Boot Camp.app`
const spawn = require( 'child_process' ).spawn

function checkForOpenFiles(callback) {
  console.log( `checking you've not left anything open on ${windowsPartition}...`)
  const ls = spawn( 'lsof', [ windowsPartition  ] )

  ls.stdout.on( 'data', data => console.log( `OOPS!!!! These are still open:\n ${data}` ) )
  ls.stderr.on( 'data', data => console.log( `Some error happened:\n ${data}` ) )

  /*
   * strangely for lsof, return code 1 means "i didn't find anything". To not find anything is an error
   * https://stackoverflow.com/a/29843137/3536094
   */ 
  ls.on( 'close', exitCode => callback(exitCode))
}

function doneChecking() {

  checkForOpenFiles( exitCode => {
    if (exitCode === 1) {
      console.log(`Nothing is open, starting up...`)
      spawn( 'open', ['-a',  parallelsVM ] )
    }

    if (exitCode === 0) {
      console.log("Close the files, checking again....")
      doneChecking()
    }

  })

}

doneChecking()
