import { LightningElement, api, wire, track } from 'lwc';

import NAME from '@salesforce/schema/Contact.Name';
import ACCOUNTID from '@salesforce/schema/Contact.AccountId';
import PHONE from '@salesforce/schema/Contact.Phone';
import EMAIL from '@salesforce/schema/Contact.Email';
import TITLE from '@salesforce/schema/Contact.Title';
import MOBILE from '@salesforce/schema/Contact.MobilePhone';
import MAILING from '@salesforce/schema/Contact.MailingAddress';
import OTHER from '@salesforce/schema/Contact.OtherAddress';
import LANGUAGE from '@salesforce/schema/Contact.Languages__c';
import LEVEL from '@salesforce/schema/Contact.Level__c';

export default class ViewContact extends LightningElement {
    @api contactId = '';//holds the contactId passed from relatedContact
    @api contacts = [];
    contactRecords = [];
    //storing the fields to display in the form
    fields = [NAME, ACCOUNTID, PHONE, EMAIL, TITLE, MOBILE, MAILING, OTHER, LANGUAGE, LEVEL];

    @api Name;
    @api Email;
    @api Phone;
    @api Title;

    connectedCallback(){
        //checking for the contactId
        console.log('This message is dislayed in connectedCall back' + this.contactId);
    }

}
