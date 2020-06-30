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
        const request = channel.getRequest();
        for(let i = 0; i < this.storedFn.length; i++){
            if(this.storedFn[i].key === request.command){
                return this.storedFn[i].value(channel);
            }
        }
        return this.defaultFn(channel);
    }
  
}

module.exports = {
    Distributor,
}