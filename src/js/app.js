App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    /*
     * Replace me...
     */

    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */

    $.getJSON('Case.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var CaseArtifact = data;
      App.contracts.Case = TruffleContract(CaseArtifact);
    
      // Set the provider for our contract
      App.contracts.Case.setProvider(App.web3Provider);
    
      // // Use our contract to retrieve and mark the adopted pets
      // return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#btn-init-case', App.handleInitCase);
    $(document).on('click', '#btn-request-modify', App.handleRequest);
  },

  handleInitCase: function(event) {

    let caseInstance;
    
    web3.eth.getAccounts(function(error, accounts) {
      let user = accounts[0];

      App.contracts.Case.deployed().then(function(instance) {
        caseInstance = instance;

      });
    });
  },

  handleRequest: function(event) {
    event.preventDefault();

    let caseInstance;
    let patientAddress = $("#input-patient-address").val();

    console.log(patientAddress);

    // App.contracts.Case.deployed().then(function(instance) {
    //   caseInstance = instance;

    //   // Execute adopt as a transaction by sending account
    //   return caseInstance.requestToModify(account);
    // }).then(function(result) {
    //     console.log("success: " + result);
    // }).catch(function(err) {
    //     console.log("falied: " + err.message);
    // });

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
          console.log(error);
      }
      var account = accounts[0];
      console.log(account);

      App.contracts.Case.deployed().then(function(instance) {
          caseInstance = instance;

          // Execute adopt as a transaction by sending account
          return caseInstance.requestToModify(account);
      }).then(function(result) {
          console.log(result);
      }).catch(function(err) {
          console.log(err.message);
      });
    });

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
