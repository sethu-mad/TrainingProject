import { LightningElement, api, wire, track} from 'lwc';
import pubsub from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const columns = [
    {label: 'Name', fieldName: 'Name', type: 'text', editable: true},
    {label: 'Industry', fieldName: 'Industry', type: 'text', editable: true},
    {label: 'Type', fieldName: 'Type', type: 'text', editable: true}
];s
export default class SearchResult extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @api accountName = '';
    error;
    wiredAccountRecords;    
    accountRecords = [];
    @api selectedRecordName;
    @api selectedAccount;
    @track selectedRow = '';
    @track getAccId;
    columns = columns;
    fieldsItemValues = [];
    
    @wire(getAccounts, {accountName : '$accountName'})
    wiredAccounts(result){
        this.wiredAccountRecords = result;
        if(result.data){
            this.accountRecords = result.data.map(account => ({...account})); 
            console.log(this.accountRecords);
        }else if(result.error){
            this.error = error;
            this.wiredAccountRecords = [];
        }
    }
    handleRowSelection(event){
        var selectRows = event.detail.selectedRows;
        this.selectedRow = selectRows[0].Name;
        this.getAccId = selectRows[0].Id;
        console.log('selected Row: ' +this.selectedRow);
            const selectEvent = new CustomEvent('recordselect', {
                detail : {
                    selectedRecordName : this.selectedRow,
                    selectedAccount : this.getAccId
                }
            });
            this.dispatchEvent(selectEvent);
            
            console.log('Selected Account Id: ' + this.getAccId);
            pubsub.fireEvent(this.pageRef, 'messageevent', this.getAccId);
    }
    saveAction(event) {
        const recordInputs = event.detail.draftValues.map(draft => {
            const fields = Object.assign({}, draft);
            return {fields};
        });
 
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Records Updated Successfully!!',
                    variant: 'success'
                })
            );
            return refreshApex(this.wiredAccountRecords);
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'An Error Occured!!',
                    variant: 'error'
                })
            );
        })
    }
    
    async refresh() {
        await refreshApex(this.wiredAccountRecords);
    }
}