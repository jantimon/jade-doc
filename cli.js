#!/usr/bin/env node
'use strict';

var meow = require('meow');
var jadeDoc = require('./index');
var JSONStream = require('JSONStream');


var cli = meow({
  help: [
    'Usage',
    '  $ jade-doc input.jade --output output.json',
    '',
    'Options',
    '  --output    Set output json file',
  ]
});

var jd = new jadeDoc({
  input: cli.input[0],
  output: cli.flags.output
});

process.stdin.pipe(jd).pipe(JSONStream.stringify()).pipe(process.stdout);

jd.on('complete', function(){
  process.exit();
});

if(!cli.flags.output){
  jd.on('end', function(){
    process.exit();
  });
}