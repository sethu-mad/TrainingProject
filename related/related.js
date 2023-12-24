import { LightningElement, api, track, wire } from 'lwc';
import pubsub from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';//pubsub operator needs a pageRef
export default class Related extends LightningElement {
    @api accountId = '';
    @track showContacts = false;
    @wire(CurrentPageReference) pageRef;
    connectedCallback(){
        //using the below pubsub we're receiving the values passed from searchResult
        pubsub.registerListener('messageevent', this.handleEvent, this);
    }
    //the below function is called from the above pubsub, you can see this function mentioned in that pubsub
    //this assigns the accountId passed from searchResult to the accountId variable
    handleEvent(messageFromEvt){
        this.accountId = messageFromEvt ? messageFromEvt : 'No Message'; //if no id is passed from searchResult displayes No Message
        console.log(this.accountId);
    }
}
