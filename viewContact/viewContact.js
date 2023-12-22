import { LightningElement, api, wire, track } from 'lwc';
import getSelectedContacts from '@salesforce/apex/ContactController.getSelectedContacts';
export default class ViewContact extends LightningElement {
    @api contactId = '';
    @api contacts = [];
    contactRecords = [];
    @track contactChosed = false;
    @api Name;
    @api Email;
    @api Phone;
    @api Title;

    connectedCallback(){
        console.log('This message is dislayed in connectedCall back' + this.contactId);
    }

    closeModalAction(){
        this.contactChosed=false;
    }

    @wire(getSelectedContacts, {contactId : '$contactId'})
    wiredContacts({error, data}){
        if(data){
            this.contactRecords = data;
            this.Name = this.contactRecords[0].Name;
            this.Email = this.contactRecords[0].Email;
            this.Phone = this.contactRecords[0].Phone;
            this.Title = this.contactRecords[0].Title;
            console.log('displayed inside wire' + this.contactId);
            console.log(this.contactRecords);
            console.log('Name: '+this.Name);
        }else if(error){
            this.error = error;
            this.contactRecords = '';  
            console.log(error);
        }
    };
}