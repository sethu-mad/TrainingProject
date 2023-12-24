import { LightningElement, api, track, wire } from 'lwc';
import getOpportunity from '@salesforce/apex/OpportunityController.getOpportunity';


export default class RelatedOpportunity extends LightningElement {
    @api accountId = '';
   opportunities;
   @track callOpp = false;
   @track opportunityChosed = false;
    selectedOppId;
    
    columns = [
        {label : 'View', type : 'button-icon', initialWidth : 50, typeAttributes : {
            iconName : 'action:preview',
            title : 'Preview',
            variant : 'border-filled',
            alternativeText : 'View'
        }},
        {label : 'Name', fieldName : 'Name', type : 'text', iconName : 'standard:person_name'},
        {label : 'Stage', fieldName : 'StageName', type : 'text', cellAttributes : {
            iconName : {fieldName : 'icon'},
            iconPosition : 'left',
            variant : 'bare',
        },
    }
    ];
    @wire(getOpportunity, {accountId : '$accountId'})
    wiredContacts({error, data}){
        if(data){
            this.opportunities = data;
            this.opportunities = data.map(opportunity => {
                //in the below method we're checking for some condition and displaying icon
                let icon;
                const createdDate = new Date(opportunity.CreatedDate);
                const currentDate = new Date();
                const timeDiff = Math.abs(currentDate - createdDate);
                const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                if(opportunity.StageName === 'Closed Won'){
                    icon = "utility:success";
                } else if(opportunity.StageName === 'Closed Lost'){
                    icon = "utility:error";
                } else if(daysDiff > 7){
                    icon = "utility:warning";
                }
                else {
                    icon = "utillity:world";
                }
                
                return{ ...opportunity, icon};
            });
        } else if(error){
            this.error = error;
            this.opportunities = [];
        }
    }
    handleRowSelection(event){
        //storing the selected opportunity Id
        const dataRow = event.detail.row.Id;
        this.selectedOppId = dataRow;
        this.opportunityChosed = true;
    }
    closeModalAction(){
        this.opportunityChosed=false;
        this.callOpp = false;
    }
    createOpp(){
        this.callOpp = true;
    }
}
