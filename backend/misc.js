while (true){
    try{
        await fetch("http://192.168.128.118:8080")
        console.log("success")
    }catch{
        console.log("failed")
    }
}