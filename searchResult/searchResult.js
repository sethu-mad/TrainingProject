import { LightningElement, api, wire, track} from 'lwc';
import pubsub from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
import NAME from '@salesforce/schema/Account.Name';
import INDUSTRY from '@salesforce/schema/Account.Industry';
import TYPE from '@salesforce/schema/Account.Type';
import ID from '@salesforce/schema/Account.Id';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const columns = [
    {label: 'Name', fieldName: 'Name', type: 'text', editable: true},
    {label: 'Industry', fieldName: 'Industry', type: 'text', editable: true},
    {label: 'Type', fieldName: 'Type', type: 'text', editable: true}
];
export default class SearchResult extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @api accountName = '';//this gets value from search component
    error;
    name;
    industry;
    type;
    id;  
    accountRecords = [];
    @api selectedRecordName;
    @api selectedAccount;
    @track selectedRow = '';//used to store the accountName
    @track getAccId;//used to store the accountId
    @track draftValues = [];//used to store the changes made in the account to save the edit
    @track isLoadingData = false;
    columns = columns;
    saveDraftValues = [];
    @wire(getAccounts, {accountName : '$accountName'})
    wiredAccounts({data, error}){
        if(data){
            this.accountRecords = data;//this retrieves the records matching the accountName
            console.log(this.accountRecords);
        }else if(error){
            this.error = error;
        }
    }
    
    handleRowSelection(event){
        var selectRows = event.detail.selectedRows;//this assign the selected row array values 
        this.selectedRow = selectRows[0].Name;//this store only the selected account Name
        this.getAccId = selectRows[0].Id;//this store only the selected account Id
        console.log('selected Row: ' +this.selectedRow);
//using this below custom event we are passing the chosen account name to search component to display over there
            const selectEvent = new CustomEvent('recordselect', {
                detail : {
                    selectedRecordName : this.selectedRow,
                    selectedAccount : this.getAccId
                }
            });
            this.dispatchEvent(selectEvent);
            
            console.log('Selected Account Id: ' + this.getAccId);
            //using the below pubsub we're passing the accountId to related Component
            pubsub.fireEvent(this.pageRef, 'messageevent', this.getAccId);
    }
    //using the below function we're storing the changes made in the column
    handleChange(event){
        this.id = event.detail.draftValues[0].Id;
        console.log('On change', this.id);
        this.name = event.detail.draftValues[0].Name;
        console.log('On Change: ', this.name);
        this.industry = event.detail.draftValues[0].Industry;
        console.log('On Change: ', this.industry);
        this.type = event.detail.draftValues[0].Type;
        console.log('On Change: ', this.type);
    }
    //using the below function we're saving the changes stored in the above function
    async handleSave(event){
        console.log('Displayed inside save',event.detail.draftValues[0].Name);
        console.log('Displayed inside save',event.detail.draftValues[0].Industry);
        console.log('Displayed inside save',event.detail.draftValues[0].Type);
        //storing all the changes to this fields variable
        const fields = {};
        fields[NAME.fieldApiName] = this.name;
        fields[INDUSTRY.fieldApiName] = this.industry;
        fields[TYPE.fieldApiName] = this.type;
        fields[ID.fieldApiName] = this.id;
        console.log('fields'+JSON.stringify(fields));

        const recordInput = {fields};//storing that fields to this recordInput
        console.log('values in recordInput', recordInput);
        //now updating the values using the updateRecord function
         updateRecord(recordInput).then((record) => {
             console.log('Inside Update'+JSON.stringify(record));
             //this event gets fired on successful edit
             this.dispatchEvent(new ShowToastEvent({
                title : 'Succes',
                message : 'Succesfully Updated',
                variant : 'success'
             }),
             );
             this.draftValues = [];//this nulls the drafvalues on successfull edit/save
        });
    await refreshApex(this.accountRecords);//this removes the save button after successfull save
    }
}
