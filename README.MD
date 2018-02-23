Commands to setup the project:

(INIT NPM)
/1 npm init

(FETCH DEPENDENCIES)
/2 yarn add -D typesctipt

(INSTALL DEPENDENCIES)
/3 yarn install

(CREATE TSCONFIG)
/4 node_modules/.bin/tsc --init

/5 In TSCONFIG uncomment line 'outdir' and point it to folder ./build

/6 In package.json add scripts:
    "build": "tsc -w -pretty"
    "exec": "node build/sen.js"

Now, to build and run the TypeScript project open a shell window and run
    yarn run build
and in another shell window run
    yarn run exec

This will execute the written and compiled TypeScript