

const printer = require("@darkobits/lolcatjs");
const shelljs = require("shelljs");
const chalk = require("chalk");
const inquirer = require("inquirer");
let download = require("download-git-repo");
var fs= require("fs")
const path = require("path");
const ora = require("ora");
const { promisify } = require("util");
const { greet } = require("../prompt.js");

download = promisify(download); //把回调函数改成异步promise

const RepoList =  {
   
    "webpack-mpa":"direct:https://github.com/yitiaoxianyu0927/webpack-mpa.git"

}

const waitFnloading =  (fn,message) => async (...args) => {
   
    const spinner = ora(message);
    spinner.start();
    const result = await fn(...args);
    spinner.succeed();
  
    return result;
}


const downloadTemplate = async (template,url) => {

    shelljs.rm("-rf",url);

    await download(template, url , { clone:true })

    return url;
}

module.exports = async (projectName) => {

    let { exists } = fs;

    exists = promisify(exists)

    if(fs.existsSync(path.resolve(projectName))){

        const { cover } = await inquirer.prompt({
            name:"cover",
            type: "confirm",
            prefix:"⛔",
            message: "  当前目录有已存在改文件夹,是否覆盖？"
        });    

        if(!cover){ console.log(`${chalk.yellow("已取消")}【${projectName}】初始化`);  return;  }
     
    }

    
    console.log(printer.default.fromString(`${greet}\n`));

    const { repo } = await inquirer.prompt({
        name:"repo",
        type:"list",
        prefix:">",
        message:"请选择一个模板",
        choices:Reflect.ownKeys(RepoList)
    });
    
    ///下载模板
    await waitFnloading( downloadTemplate,"⛪  下载初始化模板...")
                             (RepoList[repo],path.resolve(projectName));

    console.log(`⛳  项目【${chalk.yellow(`${projectName}`)}】 初始化完成`);


}