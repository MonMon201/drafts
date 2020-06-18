class Distributor{
    constructor(defaultFn){
        this.defaultFn = defaultFn;
        this.funcColl = [];
    }
    
    static create(defaultFn){
        return new Distributor(defaultFn);
    }

    add(key, value){
        this.funcColl.push({key : key, value : value});
        return this;
    }

    controller(wrappedMessage){
        for(let i = 0; i < this.funcColl.length; i++){
            if(this.funcColl[i].key === wrappedMessage.message.content){
                return this.funcColl[i].value(wrappedMessage);
            }
        }
        return this.defaultFn(wrappedMessage);
    }

};

module.exports = {
    Distributor,
}