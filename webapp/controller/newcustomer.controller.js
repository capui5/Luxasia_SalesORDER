sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox",
  "sap/ui/core/routing/History",
], function (Controller, MessageToast, JSONModel, History, MessageBox) {
  "use strict";


  return Controller.extend("com.luxasia.salesorder.controller.newcustomer", {
    onInit: function () {

      var aModel = this.getOwnerComponent().getModel("CustomerNoModel")
      this.getView().setModel(aModel, "CustomerNoModel");
      var oDatePicker = this.byId("datePickerId");
      var oOwnerComponent = this.getOwnerComponent();
      if (oOwnerComponent) {
        // Your logic using the component reference goes here
      } else {
        console.error("Owner component not found.");
      }
      // Create a model for the date value and set the format options
      var oModel = new sap.ui.model.json.JSONModel({
        dateValue: new Date("1/1/2000")  // Initialize with current date or your desired initial date
      });
      oDatePicker.setModel(oModel);

      // Define the binding path for the DatePicker value property
      oDatePicker.bindProperty("value", {
        path: "/dateValue",
        type: new sap.ui.model.type.Date({
          pattern: "dd-MM-yyyy"
        })
      });
      this.oRouter = this.getOwnerComponent().getRouter();
      var oOwnerComponent = this.getOwnerComponent();
      var oStoreModel = oOwnerComponent.getModel("StoreModel");
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      var oCountrySelect = this.byId("country");

      var oModel = this.getOwnerComponent().getModel("mainModel");
  
   
      var oStoreModel = this.getOwnerComponent().getModel("StoreModel");
    
      if (oStoreModel) {

        var selectedCountry = oStoreModel.getProperty("/selectedCountry");

        if (selectedCountry) {

          var oCountrySelect = this.byId("country");
          var oCountryCodeSelect = this.byId("countrycode")
          oCountrySelect.setSelectedKey(selectedCountry);
          oCountryCodeSelect.setSelectedKey(selectedCountry)
        } else {
          console.warn("Selected country not found in StoreModel.");
        }
      } else {
        console.error("StoreModel not found.");
      }
    },

    getRouter: function () {
      return UIComponent.getRouterFor(this);
    },
    onNavBacktoBrand:function(){
   
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("mainmenu");
  },
 
    Onroutetotranspage: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      var oCustomerNoModel = this.getView().getModel("CustomerNoModel");

      if (!oCustomerNoModel || !oCustomerNoModel.getProperty("/Firstnames") || oCustomerNoModel.getProperty("/Firstnames").length === 0) {
        // CustomerNo not found or empty array, display a message or take necessary action
        // For example, show a message and prevent navigation
        sap.m.MessageBox.error("Customer No not found. Please create a new customer and try again.", {
          onClose: function () {
            // Handle the action when the message box is closed
            // For example, stay on the current page or navigate elsewhere
          }
        });
      } else {
        // CustomerNo found in the model, proceed with navigation
        oRouter.navTo("transaction");
      }
    },

    onCreateProfile: function () {
      var that = this;
      var datePicker = this.getView().byId("datePickerId");


      var selectedDate = datePicker.getDateValue();
      var SModel = this.getOwnerComponent().getModel("SalesEmployeeModel");
      var UserEmail = SModel.getProperty("/results/0/Email");
    

      var currentDate = new Date();
      var age = currentDate.getFullYear() - selectedDate.getFullYear();

      // if (!this.validateRequiredFields()) {
      //   return;
      // }
      if (age < 18) {
        sap.m.MessageBox.error("You must be at least 18 years old to create a profile.");
        return;
      }
      var datePicker = this.getView().byId("datePickerId");
      var selectedDate = datePicker.getDateValue();
      var milliseconds = selectedDate.getTime();
      var formattedDat = '/Date(' + milliseconds + ')/';
      var postalCode = this.getView().byId("pcode").getValue();
      var oModel = that.getOwnerComponent().getModel("SalesEmployeeModel")

      var oData = oModel.getProperty("/");
      if (oData && oData.results && oData.results.length > 0) {
        var EmployeeId = oModel.getProperty("/results/0/Pernr");
        // Use the value of 'yourProperty' as needed

      } else {
        console.error("No data available in the model or at the specified index.");
      }
      var oStoreModel = this.getOwnerComponent().getModel("StoreModel");
      var sStoreId = oStoreModel.getProperty("/selectedStoreId");

      var selectedCountryKey = this.getView().byId("country").getSelectedKey();
      var selectedCountryCodeText = this.getView().byId("countrycode").getSelectedItem().getText();
      var payload = {
        "Gender": "1",
        "SalesOrg": "",
        "TitleP": this.getView().byId("title").getSelectedKey() ? this.getView().byId("title").getSelectedItem().getText() : "",
        "Firstname": this.getView().byId("fname").getValue(),
        "Lastname": this.getView().byId("lname").getValue(),
        "Middlename": "",  // Assuming Middle Name is same as Last Name
        "Secondname": "Second name",
        "City": this.getView().byId("city").getValue(),
        "District": "",
        "PostlCod1": postalCode,
        "PostlCod2": "",
        "PoBox": "",
        "PoBoxCit": "",
        "Street": this.getView().byId("street1").getValue(),
        "HouseNo": "10",
        "Building": "12A",
        "Floor": "1",
        "RoomNo": "",
        "Country": selectedCountryKey,
        "Countryiso": "",
        "Region": "",
        "Tel1Numbr": this.getView().byId("phoneno").getValue(),
        "Tel1Ext": selectedCountryCodeText,
        "FaxNumber": "",
        "FaxExtens": "",
        "EMail": this.getView().byId("email").getValue(),
        "LanguP": "EN",
        "LangupIso": "",
        "Currency": "SGD",
        "CurrencyIso": "",
        "TitleKey": "",
        "OnlyChangeComaddress": true,
        "Katr1": "",
        "Katr2": "",
        "Katr3": "",
        "Katr4": "",
        "Katr5": "",
        "Katr6": "",
        "Katr7": "",
        "Katr8": "Y",
        "CustomerNo": "",
        "Dob": formattedDat,
        "SalesEmp": EmployeeId,
        "StoreId": sStoreId,
        "CreatedByEmail": UserEmail,
      };
      var oBusyDialog = new sap.m.BusyDialog({
        title: "Creating New Customer",
        text: "Please wait...."
      });
      oBusyDialog.open();
      this.getOwnerComponent().getModel("mainModel").create("/CustomerSet", payload, {

        success: function (data) {
          var custno = data.CustomerNo;

          var oCustomerNoModel = that.getView().getModel("CustomerNoModel");

          // Check if the model exists; if not, create a new JSON model and set it to the view
          if (!oCustomerNoModel) {
            oCustomerNoModel = new sap.ui.model.json.JSONModel();
            that.getView().setModel(oCustomerNoModel, "CustomerNoModel");
          }

          // Get existing array or initialize it if it doesn't exist
          var aCustomerFirstnames = oCustomerNoModel.getProperty("/Firstnames") || [];

          // Add the retrieved customerNo directly to the Firstnames array
          if (custno) {
            aCustomerFirstnames.push(custno); // Pushing CustomerNo into the array
          }

          // Set the modified array back to the model under /Firstnames property
          oCustomerNoModel.setProperty("/Firstnames", aCustomerFirstnames);


          // Set the modified array back to the model under /Firstnames property
          oCustomerNoModel.setProperty("/Firstnames", aCustomerFirstnames);
          // Show a MessageBox with customer number
          sap.m.MessageBox.success("Record successfully created\nCustomer No: " + custno, {
            onClose: function () {
              oBusyDialog.close();
              // Clear the input fields
              that.getView().byId("datePickerId").setValue("");
              that.getView().byId("title").setSelectedKey("");
              that.getView().byId("fname").setValue("");
              that.getView().byId("lname").setValue("");
              that.getView().byId("email").setValue("");
              that.getView().byId("phoneno").setValue("");
              that.getView().byId("street1").setValue("");
              that.getView().byId("city").setValue("");
              that.getView().byId("pcode").setValue("");
              if (oCustomerNoModel) {
                oCustomerNoModel.setProperty(pathToSet, customerNumber); // Set the property at the specified path
              } else {
                console.error("CustomerNoModel not found.");
              }
            }

          });
        },




        error: function (error) {
          oBusyDialog.close();
          var errorDetails = error.responseText ? JSON.parse(error.responseText).error.innererror.errordetails : [];

          var errorMessage = "An error occurred. Details:\n";
          errorDetails.forEach(function (detail) {
            errorMessage += "- " + detail.message + "\n";
          });

          // Show the error message in a message box or dialog
          sap.m.MessageBox.error(errorMessage, {
            title: "Error"
          });
        }
      });
    },
    validateRequiredFields: function () {
      var that = this;
      var valid = true;
      var missingFields = [];


      var requiredFields = [
        { id: "title", label: "Title" },
        { id: "fname", label: "First Name" },
        { id: "lname", label: "Last Name" },
        { id: "email", label: "Email" },
        { id: "countrycode", label: "Mobile No" },
        { id: "phoneno", label: "Mobile No" },
        { id: "street1", label: "Street/City" },
        { id: "city", label: "Street/City" },
        { id: "pcode", label: "Pincode" },
        { id: "country", label: "Country" },
        { id: "datePickerId", label: "Date of Birth" },
      ];

      requiredFields.forEach(function (field) {
        var control = that.getView().byId(field.id);

        if (!control) {
          console.error("Control with ID '" + field.id + "' not found.");
          valid = false;
          return;
        }

        var value;
        if (typeof control.getValue === 'function') {
          value = control.getValue();
        } else if (typeof control.getSelectedKey === 'function') {
          value = control.getSelectedKey();
        } else {
          console.error("Control with ID '" + field.id + "' does not have a getValue or getSelectedKey method.");
          valid = false;
          return;
        }

        if (!value) {
          control.setValueState("Error");
          control.setValueStateText("This field is required");
          valid = false;
          missingFields.push(field.label);
        } else {
          control.setValueState("None");
        }
      });

      if (!valid) {

        sap.m.MessageBox.error("Please fill in the required fields:\n" + missingFields.join(", "));
      }

      return valid;
    },
  });
});
