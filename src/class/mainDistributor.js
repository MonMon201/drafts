class MainDistributor{
    constructor(defaultDistrubutor){
        this.distributorsFlags = [];
        this.distributors = [];
        this.defaultDistrubutor = defaultDistrubutor;
    }
  
    static create(defaultDistrubutor){
        return new MainDistributor(defaultDistrubutor);
    }
  
    add(key, value){// key === flag of the distributor, will be the system of connection keys-distributors
        this.distributors.push({key : key, value : value});
        this.distributorsFlags.push(key);
        return this;
    }

    getDistributorsFlags(){
        return this.distributorsFlags;
    }
  
    controller(channel){
        const storedFlags = channel.getFlags();
        for(let i = 0; i < storedFlags.length; i++){
            if(storedFlags[i].value){
                // if some flag is up this will happen
                for(let i = 0; i < this.distributors.length; i++){
                    if(this.distributors[i].key===storedFlags[i].key){
                        return this.distributors[i].value.controller(channel);
                    }
                }
            } 
  
        }
        return this.defaultDistrubutor.controller(channel);
    }
}

module.exports = {
    MainDistributor,
}