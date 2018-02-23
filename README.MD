Commands to setup the project.
=============
  
/1 Initialise NPM  
&nbsp;&nbsp;&nbsp;&nbsp;`npm init`  
  
/2 Fetch all dependencies  
&nbsp;&nbsp;&nbsp;&nbsp;`yarn add -D typesctipt`  
  
/3 Install all dependencies  
&nbsp;&nbsp;&nbsp;&nbsp;`yarn install`

/4 Create a Tsconfig file  
&nbsp;&nbsp;&nbsp;&nbsp;`node_modules/.bin/tsc --init`  
  
/5 In TSCONFIG uncomment line `outdir` and point it to folder `./build`  
  
/6 In package.json add scripts:  
``` bash
    "build": "tsc -w -pretty"  
    "exec": "node build/sen.js"  
```
  
Now, to build and run the TypeScript project open a shell window and run:  
&nbsp;&nbsp;&nbsp;&nbsp;`yarn run build`  
and in another shell window run:  
&nbsp;&nbsp;&nbsp;&nbsp;`yarn run exec`  
  
This will execute the written and compiled TypeScript  
