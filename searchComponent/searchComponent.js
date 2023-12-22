import { LightningElement, track, api } from 'lwc';

export default class SearchComponent extends LightningElement {
    //@track showSearchResult = false;
    @track accountName = '';
    @track selectedRecordName = '';
    recordName;
    //@api selectedAccount = '';
    @track selectedAccountId;
    @api AccountId;

    showSearchResult = false;
    // = false;
    handleInputChange(event){
        //alert(event.keyCode);
        //console.log(event);
        this.accountName = event.target.value;
        if(event.keyCode === 13){
            this.showSearchResult = true;   
            //this.showtable = true;
            console.log('Enter Key is pressed', this.accountName);
            console.log('value passed to searchResult');
        }
        if(event.keyCode === 8){
            this.showSearchResult = false;
            this.recordName= '';
        }
    }
    handleRecordSelect(event){
        this.recordName = event.detail.selectedRecordName;
        this.selectedAccountId = event.detail.selectedAccount;
        //this.selectedRecordName = accountName.Name;
        const selectEvent = new CustomEvent('displaycontact', {
            detail : {
                AccountId : this.selectedAccountId
            }
        });
        this.dispatchEvent(selectEvent);
        console.log('passed from child to parent' +this.recordName);
        console.log('passed from search to related component' +this.selectedAccountId);
    }
    // handleContact(event){
    //     this.selectedAccountId = event.detail.selectedAccount;
    //     console.log('Passed ID value: ' +this.selectedAccountId);
    // }
}