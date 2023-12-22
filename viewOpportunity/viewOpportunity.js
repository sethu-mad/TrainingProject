import { LightningElement, api, wire, track } from 'lwc';
import getSelectedOpps from '@salesforce/apex/OpportunityController.getSelectedOpps';
export default class ViewContact extends LightningElement {
    @api oppId = '';
    @api contacts = [];
    oppRecords = [];
    @track contactChosed = false;
    @api Name;
    @api Stage;
    @api Phone;
    @api Title;

    connectedCallback(){
        console.log('This message is dislayed in connectedCall back' + this.oppId);
    }

    @wire(getSelectedOpps, {oppId : '$oppId'})
    wiredContacts({error, data}){
        if(data){
            this.oppRecords = data;
            this.Name = this.oppRecords[0].Name;
            this.Stage = this.oppRecords[0].StageName;
    
            console.log('displayed inside wire' + this.oppId);
            console.log(this.oppRecords);
            console.log('Name: '+this.Name);
        }else if(error){
            this.error = error;
            this.contactRecords = '';  
            console.log(error);
        }
    };
}