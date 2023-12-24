import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ACCOUNT_NAME from '@salesforce/schema/Opportunity.Name';
import CONTACT from '@salesforce/schema/Opportunity.Contact__c';
import AMOUNT from '@salesforce/schema/Opportunity.Amount';
import CLOSE_DATE from '@salesforce/schema/Opportunity.CloseDate';

export default class ViewOpportunity extends LightningElement {
    @api oppId = '';//holds the chosen opportunity ID
    @wire(getRecord, {
        recordId : '$oppId',//assign it to the recordId
        fields: [ACCOUNT_NAME, CONTACT, AMOUNT, CLOSE_DATE]
    })
    opportunity;
    //storing the values for the chosen oppId and passing to HTML
    get accountName(){
        return getFieldValue(this.opportunity.data, ACCOUNT_NAME);
    }
    get contact(){
        return getFieldValue(this.opportunity.data, CONTACT);
    }
    get amount(){
        return getFieldValue(this.opportunity.data, AMOUNT);
    }
    get closeDate(){
        return getFieldValue(this.opportunity.data, CLOSE_DATE);
    }
}
