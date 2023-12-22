public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(ID accountId) {
        return [ SELECT Id, Name, Email, Phone, Title FROM Contact WHERE AccountId = :accountId ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getSelectedContacts(ID contactId) {
        return [ SELECT Id, Name, Email, Phone, Title FROM Contact WHERE Id = :contactId ];
    }
}