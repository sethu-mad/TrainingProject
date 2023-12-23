import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FIRSTNAME from '@salesforce/schema/Contact.FirstName';
import LASTNAME from '@salesforce/schema/Contact.LastName';
import EMAIL from '@salesforce/schema/Contact.Email';
import CONTACT from '@salesforce/schema/Contact';
export default class CreateContact extends LightningElement {
    @api accountId;
    objectName = CONTACT;
    firstName = FIRSTNAME;
    lastName = LASTNAME;
    email = EMAIL;
    // handleSubmit(event){
    //     event.preventDefault();
    //     const fields = event.detail.fields;
    //     if(!fields.Name || !fields.Email || !fields.Phone){
    //         console.error('Required Fields are missing');
    //         return;
    //     }
    //     this.template.querySelector('lightning-record-edit-form').submit(fields);
    // }
    //     const evt = new ShowToastEvent({
    //         title : 'Contact Created',
    //         message : 'Record Id: ' + event.detail.Id,
    //         variant : 'success'
    //     });
    //     this.dispatchEvent(evt);
    // }
    // handleSuccess(event){
    //     console.log(event.type);
    //     console.log(event.detail);
    //     }

        handleSubmit(event){
            console.log(event.type);
            console.log(event.detail);
            }
        // console.log('onsuccess event recordEditForm:', event.detail.id);
        // const contactId = event.detail.Id;
        // console.log(this.contactId);
        // const evt = new ShowToastEvent({
        //     title : 'Contact Created',
        //     message : 'Record Id: ' + contactId,
        //     variant : 'success'
        // });
        // this.dispatchEvent(evt);
    handleLoad(event){
        console.log(event.type);
        console.log(event.detail);
    }
    handleError(event){
        console.log(event.type);
        console.log(event.detail);
    }
}