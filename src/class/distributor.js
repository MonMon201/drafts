class Distributor{
    constructor(defaultFn, switchObj){
        this.defaultFn = defaultFn;
        this.switchObj = switchObj;
        this.storedFn = [];
    }
    
    static create(defaultFn){
        return new Distributor(defaultFn);
    }
  
    add(key, value){
        this.storedFn.push({key : key, value : value});
        return this;
    }
  
    controller(channel){
        const message = channel.getMessage();
        for(let i = 0; i < this.storedFn.length; i++){
            if(this.storedFn[i].key === message.content){
                return this.storedFn[i].value(channel);
            }
        }
        return this.defaultFn(channel);
    }
  
}

module.exports = {
    Distributor,
}