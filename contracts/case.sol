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

    uint[] reportIndexes;
    
    // All authorisations
    mapping(address => Authorisation) public authorisations;
    
    // Organisation requests to modify
    function requestToModifyFake(address patient) public constant returns (address requester, uint authWeight) {
        
        authorisations[msg.sender].authWeight = 8;
        
        return (msg.sender, authorisations[msg.sender].authWeight);
    }
    function requestToModify(address patient) public returns (address requester, uint authWeight) {
        
        authorisations[msg.sender].authWeight = 8;
        
        return (msg.sender, authorisations[msg.sender].authWeight);
    }
    
    // User authorises to modify
    function authToModifyFake(address authUser) public constant returns (address requester, uint authWeight) {
        // require(authorisations[authUser].authWeight == 8);
        // authorisations[authUser].authWeight = 9;
        return (authUser, authorisations[authUser].authWeight);
    }
    function authToModify(address authUser) public returns (address requester, uint authWeight) {
        require(authorisations[authUser].authWeight == 8);
        authorisations[authUser].authWeight = 9;
        
        return (authUser, authorisations[authUser].authWeight);
    }
    
    // Organisation modifies the reports
    function modifyReport(uint age, string gender, uint bodyTemperature, uint heartRate, bool isQunisy, string note, string prescription) public {
        // require(authorisations[msg.sender].authWeight == 9);
        
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
        
        reportIndexes[reportIndexes.length] = currentTime;
    }
    function readReport() public constant returns (
        uint age, string gender, uint bodyTemperature, uint heartRate, bool isQunisy, string note, string prescription, address doctor, uint timestamp
    ) {
        require(authorisations[msg.sender].authWeight == 9);
        if (reportIndexes.length == 0) {
            return (0, "", 0, 0, false, "", "", address(0), 0);
        } else {
            uint latest = reportIndexes[reportIndexes.length-1];
            return (reports[latest].age, reports[latest].gender, reports[latest].bodyTemperature, reports[latest].heartRate, reports[latest].isQunisy, reports[latest].note,reports[latest].prescription,reports[latest].doctor,reports[latest].timestamp);
        }
    }
}

