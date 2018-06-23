pragma solidity ^0.4.0;

contract Case {
    
    // Report
    struct Report {
        
        // Personal Basic Information
        uint age;
        string gender;
        
        // Current Diagnose Result
        uint bodyTemperature;
        uint heartRate;
        bool isQunisy;
        string note;
        string prescription;
        
        // Doctor Who Attends
        address doctor;
        
        // Timestamp
        uint timestamp;
    }
    
    // Authorisation
    struct Authorisation {
        // operation weight
        // noneAuth: 0 
        // requestModify: 8 
        // authModify: 9 
        // requestPrescription: 18 
        // authPrescription: 19 
        uint authWeight;
    }
    
    // User
    address user;
    
    // All doctors updated
    address[] doctors;
    
    // All reports for users
    Report[] reports;
    
    constructor () public {
        user = msg.sender;
    }
    
    // All authorisations
    mapping(address => Authorisation) public authorisations;
    
    // Organisation requests to modify
    function requestToModify() public returns (address requester, uint authWeight) {
        authorisations[msg.sender].authWeight = 8;
        
        return (msg.sender, authorisations[msg.sender].authWeight);
    }
    
    // User authorises to modify
    function authToModify(address authUser) public returns (address requester, uint authWeight) {
        require(msg.sender == user && authorisations[authUser].authWeight == 8);
        authorisations[authUser].authWeight = 9;
        
        return (authUser, authorisations[authUser].authWeight);
    }
    
    // Organisation modify the reports
    function modifyReport(uint age, string gender, uint bodyTemperature, uint heartRate, bool isQunisy, string note, string prescription) public {
        require(authorisations[msg.sender].authWeight == 9);
        
        uint currentTime = now;
        
        reports[currentTime].age = age;
        reports[currentTime].gender = gender;
        reports[currentTime].bodyTemperature = bodyTemperature;
        reports[currentTime].heartRate = heartRate;
        reports[currentTime].isQunisy = isQunisy;
        reports[currentTime].note = note;
        reports[currentTime].prescription = prescription;
        reports[currentTime].doctor = msg.sender;
        reports[currentTime].timestamp = currentTime;
        
    }
    
}
