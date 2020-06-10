class classHandler{
    constructor(){
        this.onProcess = null;
        this.onSuccess = null; 
        this.result = null;
    }

    static get(){
        return new classHandler();
    }

    load(promise){
        this.result = this.onProcess(promise);
        return this.result;
    }

    process(fn){
        this.onProcess = fn; 
        return this;
    }

    success(fn){
        this.onSuccess = fn;
        return this;
    }
}

//Usage

const messageSender = (message) => {
    console.log('message is on its way');
    const messageProm = new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(message);
    }, 1000);
        setTimeout(() => {
        reject(new Error('message send failed'));
    }, 5000);
    });
    return messageProm;
}

const messageReciever = async(prom) => {
    console.log('message recieving');
    try{
    const message = await prom;
    const answer = new Promise((resolve, reject) => {
        setTimeout(() => resolve(('new message: ' + message)), 1000);
        setTimeout(() => reject(new Error('message recieve failed')), 5000);
    });
    return answer;
    } catch(err){
        const answer = new Promise((resolve, reject) => {
            setTimeout(() => reject('Message recieve failed: ' + err), 1000);
        });
        return answer;
    }
}

const messageFn = async(prom) =>{
    try{
    const message = await prom;
    console.log(message);
    } catch(err){
        console.log(err);
    }
}

const handler = classHandler.get()
    .process(messageReciever);

messageFn(handler.load(messageSender('hi Dania =)')));