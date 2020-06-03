
const program = require("commander");
const chalk = require("chalk");
const path = require("path");
const { version } = require("./constants");



const mapActions = {

    create:{

        description: 'create a project',
        alias:'',
        examples: [
            'zznode create <project-name>'
        ]
    },
    config:{

        alias:'conf',
        description: 'config project variable',
        examples: [] 

    },
    '*':{

        alias:'',
        description: '没有该命令',
        examples:[],
    }
}

Reflect.ownKeys(mapActions).forEach((action) => {

  
    program
        .command(action)
        .alias(mapActions[action].alias)
        .description(mapActions[action].description)
        .action((cmd) => {

            if(action === "*"){

                console.log(`${chalk.yellow("非常遗憾")} 【${chalk.red(cmd)}】命令并不存在`);
            
            }else{

                require(path.resolve(__dirname,"action",action))(...process.argv.slice(3))

            }
            
        })
})


program.on('--help',()=>{

    console.log("\nExample");
    Reflect.ownKeys(mapActions).forEach((action) => {

        mapActions[action].examples.forEach((example) => {

            console.log(` ${example}`)

        })

    })

    

})

program.version(version).parse(process.argv);