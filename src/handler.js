'use strict';
const Messages = require('./Messages');
const { pingPong } = require('./function/pingPong.js');
const {
  startCollect,
  stopCollect,
  showCollected,
} = require('./function/collector.js');

class Distributor{
  constructor(defaultFn, switchObj){
      this.defaultFn = defaultFn;
      this.switchObj = switchObj;
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

}

class Handler{
  constructor(defaultDistrubutor){
      this.distributors = [];
      this.defaultDistrubutor = defaultDistrubutor;
  }

  static create(defaultDistrubutor){
      return new Handler(defaultDistrubutor);
  }

  add(key, value){// key === flag of the distributor, will be the system of connection keys-distributors
      this.distributors.push({key : key, value : value});
      return this;
  }

  controller(wrappedMessage){
      const content = wrappedMessage.message.content;
      for(let key in wrappedMessage.flagStorage){
          if(wrappedMessage.flagStorage[key]) // if some flag is up this will happen
              
              for(let i = 0; i < this.distributors.length; i++){
                  if(this.distributors[i].key===key){
                      return this.distributors[i].value.controller(wrappedMessage);
                  }
              }

      }
      return this.defaultDistrubutor.controller(wrappedMessage);
  }
}

class Wrapper{
  constructor(){
    this.client = null;
    this.message = null;
    this.storedFlags = [];
    this.storedMessages = [];
  }

  static create(){
    return new Wrapper();
  }

  setClient(client){
    this.client = client;
  }

  setMessage(message){
    this.message = message;
  }

  setFlag(key, value){
    this.storedFlags.push({key : key, value : value});
  }

  addMessages(message){
    this.storedMessages.push(message);
  }

  getClient(){
    return this.client;
  }

  getMessage(){
    return this.message;
  }

  getFlag(key){
    for(let i = 0; i < this.storedFlags.length; i++){
      if(this.storedFlags[i].key === key){
        return this.storedFlags[i].value;
      }
    }
  }

  getMessages(){
    return this.storedMessages;
  }

  getWrappedMessage(){
    const wrappedMessage = {
      message : this.message,
      client : this.client,
      storedFlags : this.storedFlags,
      storedMessages : this.storedMessages,
    };
    return wrappedMessage;
  }

}

class Controller{
  constructor(){

  }

  init(client){}
}



/*
const messageWrap = {

};

const collecterDistributor = messageWrap => {
  const content = messageWrap.message.content;
  return ({
    '/stopCollect': stopCollect,
  }[content] ||
    (() => messageWrap.collectedMessages.append(messageWrap.message)))(
    messageWrap,
  );
};

const defaultDistributor = messageWrap => {
  const content = messageWrap.message.content;
  return ({
    ping: pingPong,
    '/startCollect': startCollect,
    '/showCollected': showCollected,
  }[content] || (() => console.log('no such command: ' + content)))(
    messageWrap,
  );
};

const flagCheck = messageWrap => {
  for (const key in messageWrap.flagsCollection) {
    if (messageWrap.flagsCollection[key]) {
      console.log('true in ' + key);
      return collecterDistributor(messageWrap);
    }
  }
  return defaultDistributor(messageWrap);
};

const wrap = (message, client) => {
  console.log(message.content);
  messageWrap.message = message;
  messageWrap.client = client;
  flagCheck(messageWrap);
};

module.exports = {
  wrap,
};
*/