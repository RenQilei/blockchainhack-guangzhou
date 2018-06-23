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
    $(document).on('click', '#btn-request-modify', App.handleRequest);
    $(document).on('click', '#btn-accept-auth', App.handleAuthRequest);
    $(document).on('click', '#btn-request-diagnose', App.handleDiagnose);
    // $('#case-display').ready(App.handleReadReport);
    $(document).on('click', '#btn-request-read', App.handleReadReport);
    $(document).on('click', '#btn-input-submit', App.handleModifyReport);
  },

  handleModifyReport: function() {
    var caseInstance;
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
          return caseInstance.modifyReport(
            $('#input-age').val(),
            $('#input-gender').val(),
            $('#input-temperature').val(),
            $('#input-heart-rate').val(),
            $('#input-qunisy').val(),
            $('#input-note').val(),
            $('#input-medicine').val(),
            {from: account}
          );
      })
      .then((res) => {
        console.log(res);
      })
      .catch(function(err) {
          console.log(err.message);
      });
    });
  },
  handleReadReport: function() {
    var caseInstance;
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
          return caseInstance.readReport();
      })
      .then((res) => {
        console.log(res);
      })
      .catch(function(err) {
          console.log(err.message);
      });
    });
  },
  handleAuthRequest: function(event) {
    event.preventDefault();
    var caseInstance;
    var doctorAddress = $("#input-doctor-address").val();
    console.log(doctorAddress);
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
          return caseInstance.authToModify(doctorAddress);
      })
      .then((res) => {
        return caseInstance.authToModifyFake(doctorAddress);
      })
      .then((res) => {
        console.log(res);
      })
      .catch(function(err) {
          console.log(err.message);
      });
    });
  },

  handleRequest: function(event) {
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
      })
      .then((res) => {
        return caseInstance.requestToModifyFake(patientAddress);
      })
      .then((res) => {
        console.log(res);
        $('#display-address').html(res[0] + '<br />' + res[1]['c'][0]);
      })
      .catch(function(err) {
          console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
