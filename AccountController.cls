public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String accountName) {
        return [SELECT Id, Name, Industry, Type FROM Account WHERE Name LIKE :('%' + accountName + '%')];
    }
}
