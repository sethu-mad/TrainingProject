import { LightningElement,api,track,wire} from 'lwc'; 
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateContact extends LightningElement {
    @api accountId;
    @api accId;
    stageOptions = [
        {label: 'Prospecting', value: 'Prospecting'},
        {label: 'Qualification', value: 'Qualification'},
        {label: 'Needs Analysis', value: 'Needs Analysis'},
        {label: 'Value Proposition', value: 'Value Proposition'},
        {label: 'Id. Decision Makers', value: 'Id. Decision Makers'},
        {label: 'Perception Analysis', value: 'Perception Analysis'},
        {label: 'Proposal/Price Quote', value: 'Proposal/Price Quote'},
        {label: 'Negotiation/Review', value: 'Negotiation/Review'},
        {label: 'Closed Won', value: 'Closed Won'},
        {label: 'Closed Lost', value: 'Closed Lost'}
    ];
    handleNameChange(event){
        this.opportunityName = event.target.value;
        console.log(this.opportunityName);
    }
    handleDateChange(event){
        this.closeDate = event.target.value;
        console.log(this.closeDate);
    }
    handleStageChange(event){
        this.stage = event.target.value;
        console.log(this.stage);
    }
    handleClick(){
        const recordInput = {
            apiName : 'Opportunity',
            fields:{
                Name: this.opportunityName,
                CloseDate: this.closeDate,
                StageName: this.stage,
                AccountId: this.accountId
            }
        };
        createRecord(recordInput).then((record)=>{
            console.log('Opportunity Created: ', record);
            const evt = new ShowToastEvent({
                title : 'Contact Created',
                message : 'Record Id: ',
                variant : 'success'
            });
            this.dispatchEvent(evt);
            window.location.reload();
        }).catch(error=>{
            console.error('Error Creating Opportunity: ', error)
        });
    }
   
}