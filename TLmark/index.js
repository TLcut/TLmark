const console = require('console');
const fs = require('fs');
let content;
let output="";

fs.readFile('TLME.tm',(err,data)=>{
    if (err) throw err;
    console.log(data.toString());
    content = data.toString().replace(/[\r\n]/g,"");;
    let arr = content.split(';');
    arr.length -= 1;
    const prifix = ['1','2','3','4','code','link','newLine','Dividing_line','0'].map(x => x+"(");
    let mathod = [];
    arr.forEach((e1,i1) => {
        prifix.forEach((e2,i2)=>{
            if(e1.substring(0,e2.length)===e2){
                mathod.push(e2);
            }
        })
    });
    mathod.forEach((e3,i3)=>{
        const work = arr[i3].substring(mathod[i3].length,arr[i3].length-1).split(',');
        console.log(work);
        switch(e3){
            case prifix[0]:
                output = output+ `# ${work[0]}`;
            break;
            case prifix[1]:
                output = output+ `## ${work[0]}`;
            break;
            case prifix[2]:
                output = output+ `### ${work[0]}`;
            break;
            case prifix[3]:
                output = output+ `#### ${work[0]}`;
            break;
            case prifix[4]:
                output = output+ "```"+work[0]+"```";
            break;
            case prifix[5]:
                if(work.length===4){
                    output += `${work[0]}[${work[1]}](${work[2]})${work[3]}`;
                }
            break;
            case prifix[6]:
                output += `   `
            break;
            case prifix[7]:
                output += `***`
            break;
            case prifix[8]:
                output += work[0];
            break;
        }
        if(prifix.indexOf(e3)!==-1&&i3!==mathod.length-1){
            output += "\n"
        }
    })
    console.log(output);
    fs.writeFile('./README.md',output,(err)=>{
        if(err)throw err;
        console.log('\nComplete!');
    })
});