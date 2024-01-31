sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.luxasia.salesorder.controller.TodayCustomer", {
        onInit: function() {
            var oRouter = this.getOwnerComponent().getRouter();   
            oRouter.getRoute("TodayCustomer").attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched : function (oEvent) {
            var that = this;
            var oArgs = oEvent.getParameter("arguments");
           this.loadTodayCustomers();
          },
          loadTodayCustomers: function(){
            var oModel = this.getOwnerComponent().getModel("mainModel");
            var SModel = this.getOwnerComponent().getModel("SalesEmployeeModel");
            var UserEmail = SModel.getProperty("/results/0/Email");
            var oStoreModel = this.getOwnerComponent().getModel("StoreModel");
            var selectedCountry = oStoreModel.getProperty("/selectedCountry")
            var oFilter = new sap.ui.model.Filter("CreatedByEmail", sap.ui.model.FilterOperator.EQ, UserEmail);
            var aFilter = new sap.ui.model.Filter("Country", sap.ui.model.FilterOperator.EQ, selectedCountry);
            var filters = new sap.ui.model.Filter([oFilter,aFilter,],true);
            this.getView().byId("salesTable").getBinding("items").filter(filters);
            // Read data from the model using the provided URL
          },
          onGoSalesCompletion: function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
             oRouter.navTo("mainmenu");
         }
      });
    }
  );
  