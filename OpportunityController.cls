public with sharing class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunity(ID accountId) {
        return [ SELECT Id, Name, StageName, CreatedDate FROM Opportunity WHERE AccountId = :accountId ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getSelectedOpps(ID oppId) {
        return [ SELECT Id, Name, StageName, CreatedDate FROM Opportunity WHERE Id = :oppId ];
    }
}