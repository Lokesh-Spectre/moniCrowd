async function main(){
    var data;
    try{
        for(var i=0;i<100;i++){
            data = {
                LABEL:"AB1-202",
                L1:i%4==0?false:true,
                L2:i%4==1?false:true,
                L3:i%4==2?false:true,
                L4:i%4==3?false:true,
                peopleCount:10
            };
            await fetch("http://localhost:3000/sensors",{
                method:"POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body:JSON.stringify(data)
            });
            console.log(data)
            await new Promise((resolve)=>setTimeout(resolve,500)); // 500ms delay
        }
        console.log("success")
    }catch(e){
        console.log("failed",e)
    }
}
main();