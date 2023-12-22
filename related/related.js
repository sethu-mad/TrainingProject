import { LightningElement, api, track, wire } from 'lwc';
import pubsub from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
export default class Related extends LightningElement {
    @track selectedAccountId;
    @api accountId = '';
    @track showContacts = false;
    @wire(CurrentPageReference) pageRef;
    connectedCallback(){
        pubsub.registerListener('messageevent', this.handleEvent, this);
    }
    handleEvent(messageFromEvt){
        this.accountId = messageFromEvt ? messageFromEvt : 'No Message'; 
        console.log(this.accountId);
    }
}