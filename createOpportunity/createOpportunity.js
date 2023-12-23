import { LightningElement,api,track,wire} from 'lwc';
 
import { createRecord } from 'lightning/uiRecordApi';
import OBJECT from '@salesforce/schema/Opportunity';
import NAME from '@salesforce/schema/Opportunity.Name';
import CLOSE_DATE from '@salesforce/schema/Opportunity.CloseDate';
import STAGE from '@salesforce/schema/Opportunity.StageName';
export default class CreateContact extends LightningElement {
    @api accountId;
    name;
    closeDate;
    stage;
    @api accId;
    handleChange(event){
        if(event.target.name === "name"){
            this.name = event.target.value;
            console.log(this.name);
        } else if(event.target.name === "closeDate"){
            this.closeDate = event.target.value;
            console.log(this.closeDate);
        } else if(event.target.name === "stage"){
            this.stage = event.target.value;
            console.log(this.stage);
        }
    }
    handleClick(){
        const fields = {};
        fields[NAME.fieldApiName] = this.name;
        fields[CLOSE_DATE.fieldApiName] = this.closeDate;
        fields[STAGE.fieldApiName] = this.stage;

        const recordInput = {
            apiName : OBJECT.objectApiName,
            fields : fields
        };
        createRecord(recordInput).then((record)=>{
            console.log(record);
        });
    }
   
}