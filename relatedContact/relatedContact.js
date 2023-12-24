import { LightningElement, api, track, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { CurrentPageReference } from 'lightning/navigation';
export default class RelatedContact extends LightningElement {
    
    @api accountId = '';
    @track callContact = false;
    @track contacts = [];
    selectedContact;
    @track contactChosed = false;
    @wire(CurrentPageReference) pageRef;
    //declares whatever colums we need in datatable 
    columns = [
        {
            //the below lable is the eye icon
            label : 'View', type : 'button-icon', initialWidth : 50, typeAttributes : {
            iconName : 'action:preview',
            title : 'Preview',
            variant : 'border-filled',
            alternativeText : 'View'
        }},
        {label : 'Name', fieldName : 'Name', type : 'text', iconName : 'standard:person_name'},
        {label : 'Email', fieldName : 'Email', type : 'email', iconName : 'utility:email'},
        {label : 'Phone', fieldName : 'Phone', type : 'phone', iconName : 'utility:call'},
        {label : 'Title', fieldName : 'Title', type : 'text'}
    ];

    @wire(getContacts, {accountId : '$accountId'})
    wiredContacts({error, data}){
        if(data){
            this.contacts = data;
        }else if(error){
            this.error = error;
            this.contacts = [];
        }
    }
    handleRowAction(event){
        const dataRow = event.detail.row.Id;
        console.log(dataRow);
        this.selectedContact = dataRow;//stores the chosen contactId
        this.contactChosed = true;
    }
    closeModalAction(){
        this.contactChosed=false;
        this.callContact = false;
    }
    createContact(){
        this.callContact = true;
    }
}
