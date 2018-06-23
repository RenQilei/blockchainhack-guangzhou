App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    return App.initWeb3();
  },

  initWeb3: function() {
    /*
     * Replace me...
     */
     // Is there an injected web3 instance?
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
    
      // Use our contract to retrieve and mark the adopted pets
      // return App.markAdopted();
    });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#btn-request-modify', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */

  },

  handleAdopt: function(event) {
    // event.preventDefault();

    var caseInstance;
    var patientAddress = $("#input-patient-address").val();
    console.log(patientAddress);
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log("1");
          console.log(error);
      }
      var account = accounts[0];
      console.log(account);

      App.contracts.Case.deployed().then(function(instance) {
          caseInstance = instance;

          // Execute adopt as a transaction by sending account
          return caseInstance.requestToModify(patientAddress);
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
