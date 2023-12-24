import { LightningElement, track, api } from 'lwc';

export default class SearchComponent extends LightningElement {

    @track accountName = ''; //this stores the input from user and pass it to searchResult
    @track selectedRecordName = '';//this is the values to gets the accountName from searchResult
    recordName; //used store the record name from searchResult to display the selected Account Name
    @track selectedAccountId; //this holds the AccountId

    showSearchResult = false;
        handleInputChange(event){
        this.accountName = event.target.value;
        if(event.keyCode === 13){
            this.showSearchResult = true;
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
        console.log('passed from child to parent' +this.recordName);
        console.log('passed from search to related component' +this.selectedAccountId);
    }

}
