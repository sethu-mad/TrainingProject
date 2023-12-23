import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class createRecordForm extends LightningElement {
    @api accountId;
    contactId;
    //hierarchy of functions is if onclick is mentioned in submit button that is executed first, then submit -> success or error
    handleSuccess(event) {
        const recordId = event.detail.id;
        const evt = new ShowToastEvent({
            title : 'Contact Created',
            message : 'Record Id: ' + recordId,
            variant : 'success'
        });
        this.dispatchEvent(evt);
    }

}
