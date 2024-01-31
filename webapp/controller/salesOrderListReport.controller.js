sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "com/luxasia/salesorder/util/formatter"
  ],
  function (BaseController, formatter) {
    "use strict";

    return BaseController.extend("com.luxasia.salesorder.controller.salesOrderListReport", {
      formatter: formatter,
      onInit: function () {
        sap.ui.core.UIComponent.getRouterFor(this).getRoute("salesOrderListReport").attachPatternMatched(this._onRouteMatched, this);
      },
      _onRouteMatched: function (oEvent) {
        this.getView().byId("salesOrderListReport").setVisible(true);
        this.getView().byId("tableForSalesOrderListReport").setVisible(false);
        this.clearFields();
      },
      clearFields: function () {
        //Sales Organization
        this.getView().byId("salesOrgMultiInput").setValue();
        this.getView().byId("salesOrgSingleInput").setValue();
        //Sales Document
        this.getView().byId("salesDocMultiInput").setValue();
        this.getView().byId("salesDocSingleInput").setValue();
        //Sales Document Type
        this.getView().byId("salesDocTypeMultiInput").setValue();
        this.getView().byId("salesDocTypeSingleInput").setValue();
        //Document Date
        this.getView().byId("documentBeginDate").setValue();
        this.getView().byId("documentEndDate").setValue();
        //Requested Deliv. Date
        this.getView().byId("requestedDeliBeginDate").setValue();
        this.getView().byId("requestedDeliEndDate").setValue();
        //Billing Date
        this.getView().byId("billingDateBeginDate").setValue();
        this.getView().byId("billingDateEndDate").setValue();
        //SoldToParty
        this.getView().byId("soldToPartyMultiInput").setValue();
        this.getView().byId("soldToPartySingleInput").setValue();
        //Article
        this.getView().byId("articleMultiInput").setValue();
        this.getView().byId("articleSingleInput").setValue();
        //Brand
        this.getView().byId("brandMultiInput").setValue();
        this.getView().byId("brandSingleInput").setValue();
        //CompaignId
        this.getView().byId("compaignIdMultiInput").setValue();
        this.getView().byId("compaignIdSingleInput").setValue();
        //Site
        this.getView().byId("siteFirstInput").setSelectedKey();
        this.getView().byId("siteSecondInput").setSelectedKey();
        //PersonalNo
        this.getView().byId("personalNoFirstInput").setValue();
        this.getView().byId("personalNoSecondInput").setValue();
      },
      onBeforeRebindTable: function (oEvent) {
        var binding = oEvent.getParameter("bindingParams");
        // var materialFilter1 = new sap.ui.model.Filter("Vkorg", "EQ", "1899");
        // var formattedBeginDate = new Date(new Date("2017-01-01").toString().split("GMT ")[0] + " UTC ").toISOString();
        // var formattedEndDate = new Date(new Date("2017-02-28").toString().split("GMT ")[0] + " UTC ").toISOString();
        // var materialFilter2 = new sap.ui.model.Filter("Audat", "BT", formattedBeginDate,formattedEndDate);
        // var filter1 = new sap.ui.model.Filter("BrandId", "EQ", "FGF");
        // var filter2 = new sap.ui.model.Filter("Werks", "EQ", "6801");
        // var oFilter = new sap.ui.model.Filter([materialFilter1,materialFilter2,filter1,filter2],true);
        var oFilter = this.onFilterConstruction();
        binding.filters.push(oFilter);
      },
      onFilterConstruction: function () {
        var filters = []
        //Sales Organization   Vkorg
        if (this.getView().byId("salesOrgMultiInput").getValue().length > 0 && this.getView().byId("salesOrgSingleInput").getValue().length > 1) {
          filters.push(new sap.ui.model.Filter("Vkorg", "BT", this.getView().byId("salesOrgMultiInput").getValue(),
            this.getView().byId("salesOrgSingleInput").getValue()));
        }
        else if (this.getView().byId("salesOrgMultiInput").getValue().length > 0 && this.getView().byId("salesOrgMultiInput").getValue().split(",").length > 0) {
          var salesOrgMultiInput = this.getView().byId("salesOrgMultiInput").getValue().split(","),
            salesOrgValueFilters = [];
          for (var m = 0; m < salesOrgMultiInput.length; m++) {
            salesOrgValueFilters.push(new sap.ui.model.Filter("Vkorg", "EQ", salesOrgMultiInput[m]));
          }
          filters.push(new sap.ui.model.Filter(salesOrgValueFilters, false));
        } else if (this.getView().byId("salesOrgMultiInput").getValue().length > 0 && this.getView().byId("salesOrgSingleInput").getValue().length == 0) {
          filters.push(new sap.ui.model.Filter("Vkorg", "EQ", this.getView().byId("salesOrgMultiInput").getValue()));
        } else if (this.getView().byId("salesOrgMultiInput").getValue().length == 0 && this.getView().byId("salesOrgSingleInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Vkorg", "EQ", this.getView().byId("salesOrgSingleInput").getValue()));
        }


        //Sales Document   Vbeln
        if (this.getView().byId("salesDocMultiInput").getValue().length > 0 && this.getView().byId("salesDocSingleInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Vbeln", "BT", this.getView().byId("salesDocMultiInput").getValue(),
            this.getView().byId("salesDocSingleInput").getValue()));
        }
        else if (this.getView().byId("salesDocMultiInput").getValue().length > 0 && this.getView().byId("salesDocMultiInput").getValue().split(",").length > 1) {
          var salesDocMultiInput = this.getView().byId("salesDocMultiInput").getValue().split(","),
            salesDocValueFilters = [];
          for (var m = 0; m < salesDocMultiInput.length; m++) {
            salesDocValueFilters.push(new sap.ui.model.Filter("Vbeln", "EQ", salesDocMultiInput[m]));
          }
          filters.push(new sap.ui.model.Filter(salesDocValueFilters, false));
        } else if (this.getView().byId("salesDocMultiInput").getValue().length > 0 && this.getView().byId("salesDocSingleInput").getValue().length == 0) {
          filters.push(new sap.ui.model.Filter("Vbeln", "EQ", this.getView().byId("salesDocMultiInput").getValue()));
        } else if (this.getView().byId("salesDocMultiInput").getValue().length == 0 && this.getView().byId("salesDocSingleInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Vbeln", "EQ", this.getView().byId("salesDocSingleInput").getValue()));
        }


        //Sales Document Type   Auart
        if (this.getView().byId("salesDocTypeMultiInput").getValue().length > 0 && this.getView().byId("salesDocTypeSingleInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Auart", "BT", this.getView().byId("salesDocTypeMultiInput").getValue(),
            this.getView().byId("salesDocTypeSingleInput").getValue()));
        }
        else if (this.getView().byId("salesDocTypeMultiInput").getValue().length > 0 && this.getView().byId("salesDocTypeMultiInput").getValue().split(",").length > 1) {
          var salesDocTypeMultiInput = this.getView().byId("salesDocTypeMultiInput").getValue().split(","),
          salesDocTypeValueFilters = [];
          for (var m = 0; m < salesDocTypeMultiInput.length; m++) {
            salesDocTypeValueFilters.push(new sap.ui.model.Filter("Auart", "EQ", salesDocTypeMultiInput[m]));
          }
          filters.push(new sap.ui.model.Filter(salesDocTypeValueFilters, false));
        } else if (this.getView().byId("salesDocTypeMultiInput").getValue().length > 0 && this.getView().byId("salesDocTypeSingleInput").getValue().length == 0) {
          filters.push(new sap.ui.model.Filter("Auart", "EQ", this.getView().byId("salesDocTypeMultiInput").getValue()));
        } else if (this.getView().byId("salesDocTypeMultiInput").getValue().length == 0 && this.getView().byId("salesDocTypeSingleInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Auart", "EQ", this.getView().byId("salesDocTypeSingleInput").getValue()));
        }


        //Document Date   Audat
        if(this.getView().byId("documentBeginDate").getValue().length > 0 && this.getView().byId("documentEndDate").getValue().length > 0){
          var formattedBeginDate = new Date(new Date(this.getView().byId("documentBeginDate").getValue()).toString().split("GMT ")[0] + " UTC ").toISOString();
          var formattedEndDate = new Date(new Date(this.getView().byId("documentEndDate").getValue()).toString().split("GMT ")[0] + " UTC ").toISOString();
          filters.push(new sap.ui.model.Filter("Audat", "BT", formattedBeginDate, formattedEndDate));
        }else if(this.getView().byId("documentBeginDate").getValue().length > 0 && this.getView().byId("documentEndDate").getValue().length == 0){
          var formattedBeginDate = new Date(new Date(this.getView().byId("documentBeginDate").getValue()).toString().split("GMT ")[0] + " UTC ").toISOString();
          filters.push(new sap.ui.model.Filter("Audat","EQ",formattedBeginDate));
        }else if(this.getView().byId("documentBeginDate").getValue().length == 0 && this.getView().byId("documentEndDate").getValue().length > 0){
          var formattedEndDate = new Date(new Date(this.getView().byId("documentEndDate").getValue()).toString().split("GMT ")[0] + " UTC ").toISOString();
          filters.push(new sap.ui.model.Filter("Audat","EQ",formattedEndDate));
        }

        //Requested Deliv. Date   Vdatu
        if(this.getView().byId("requestedDeliBeginDate").getValue().length > 0 && this.getView().byId("requestedDeliEndDate").getValue().length > 0){
          var requestedDeliBeginDate = new Date(new Date(this.getView().byId("requestedDeliBeginDate").getValue()).toString().split("GMT ")[0] + " UTC ").toISOString();
          var requestedDeliEndDate = new Date(new Date(this.getView().byId("requestedDeliEndDate").getValue()).toString().split("GMT ")[0] + " UTC ").toISOString();
          filters.push(new sap.ui.model.Filter("Vdatu", "BT", requestedDeliBeginDate, requestedDeliEndDate));
        }else if(this.getView().byId("requestedDeliBeginDate").getValue().length > 0 && this.getView().byId("requestedDeliEndDate").getValue().length == 0){
          var requestedDeliBeginDate = new Date(new Date(this.getView().byId("requestedDeliBeginDate").getValue()).toString().split("GMT ")[0] + " UTC ").toISOString();
          filters.push(new sap.ui.model.Filter("Vdatu","EQ",requestedDeliBeginDate));
        }else if(this.getView().byId("requestedDeliBeginDate").getValue().length == 0 && this.getView().byId("requestedDeliEndDate").getValue().length > 0){
          var requestedDeliEndDate = new Date(new Date(this.getView().byId("requestedDeliEndDate").getValue()).toString().split("GMT ")[0] + " UTC ").toISOString();
          filters.push(new sap.ui.model.Filter("Vdatu","EQ",requestedDeliEndDate));
        }

        //Billing Date  Fkdat
        if(this.getView().byId("billingDateBeginDate").getValue().length > 0 && this.getView().byId("billingDateEndDate").getValue().length > 0){
          var billingDateBeginDate = new Date(new Date(this.getView().byId("billingDateBeginDate").getValue()).toString().split("GMT ")[0] + " UTC ").toISOString();
          var billingDateEndDate = new Date(new Date(this.getView().byId("billingDateEndDate").getValue()).toString().split("GMT ")[0] + " UTC ").toISOString();
          filters.push(new sap.ui.model.Filter("Fkdat", "BT", billingDateBeginDate, billingDateEndDate));
        }else if(this.getView().byId("billingDateBeginDate").getValue().length > 0 && this.getView().byId("billingDateEndDate").getValue().length == 0){
          var billingDateBeginDate = new Date(new Date(this.getView().byId("billingDateBeginDate").getValue()).toString().split("GMT ")[0] + " UTC ").toISOString();
          filters.push(new sap.ui.model.Filter("Fkdat","EQ",billingDateBeginDate));
        }else if(this.getView().byId("billingDateBeginDate").getValue().length == 0 && this.getView().byId("billingDateEndDate").getValue().length > 0){
          var billingDateEndDate = new Date(new Date(this.getView().byId("billingDateEndDate").getValue()).toString().split("GMT ")[0] + " UTC ").toISOString();
          filters.push(new sap.ui.model.Filter("Fkdat","EQ",billingDateEndDate));
        }


        //SoldToParty   Kunnr
        if (this.getView().byId("soldToPartyMultiInput").getValue().length > 0 && this.getView().byId("soldToPartySingleInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Kunnr", "BT", this.getView().byId("soldToPartyMultiInput").getValue(),
            this.getView().byId("soldToPartyMultiInput").getValue()));
        }
        else if (this.getView().byId("soldToPartyMultiInput").getValue().length > 0 && this.getView().byId("soldToPartyMultiInput").getValue().split(",").length > 1) {
          var soldToPartyMultiInput = this.getView().byId("soldToPartyMultiInput").getValue().split(","),
            soldToPartyValueFilters = [];
          for (var m = 0; m < soldToPartyMultiInput.length; m++) {
            soldToPartyValueFilters.push(new sap.ui.model.Filter("Kunnr", "EQ", soldToPartyMultiInput[m]));
          }
          filters.push(new sap.ui.model.Filter(soldToPartyValueFilters, false));
        } else if (this.getView().byId("soldToPartyMultiInput").getValue().length > 0 && this.getView().byId("soldToPartySingleInput").getValue().length == 0) {
          filters.push(new sap.ui.model.Filter("Kunnr", "EQ", this.getView().byId("soldToPartyMultiInput").getValue()));
        } else if (this.getView().byId("soldToPartyMultiInput").getValue().length == 0 && this.getView().byId("soldToPartySingleInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Kunnr", "EQ", this.getView().byId("soldToPartySingleInput").getValue()));
        }

        //Article ValueHelp
        if(this.getView().byId("articleMultiInput").getValue().length > 0 && this.getView().byId("articleSingleInput").getValue().length > 0){
            filters.push(new sap.ui.model.Filter("Matnr","BT",this.getView().byId("articleMultiInput").getValue(),
            this.getView().byId("articleSingleInput").getValue()));
        }
        //else if(this.getView().byId("articleMultiInput").getValue().length > 0 && !(this.getView().byId("articleSingleInput").getEnabled())){
          else if(this.getView().byId("articleMultiInput").getValue().length > 0 && this.getView().byId("articleMultiInput").getValue().split(",").length > 1){    
        var articleMultiInput = this.getView().byId("articleMultiInput").getValue().split(","),
              articleValueFilters = [];
          for(var m =0;m<articleMultiInput.length;m++){
            articleValueFilters.push(new sap.ui.model.Filter("Matnr","EQ",articleMultiInput[m]));
          }
            filters.push(new sap.ui.model.Filter(articleValueFilters,false));
        }else if(this.getView().byId("articleMultiInput").getValue().length > 0 && this.getView().byId("articleSingleInput").getValue().length == 0){
          filters.push(new sap.ui.model.Filter("Matnr","EQ",this.getView().byId("articleMultiInput").getValue()));
        }else if(this.getView().byId("articleMultiInput").getValue().length == 0 && this.getView().byId("articleSingleInput").getValue().length > 0){
          filters.push(new sap.ui.model.Filter("Matnr","EQ",this.getView().byId("articleSingleInput").getValue()));
        }

        //Brand  BrandId
        if(this.getView().byId("brandMultiInput").getValue().length > 0 && this.getView().byId("brandSingleInput").getValue().length > 0){
          filters.push(new sap.ui.model.Filter("BrandId","BT",this.getView().byId("brandMultiInput").getValue(),
          this.getView().byId("brandSingleInput").getValue()));
      }
      //else if(this.getView().byId("brandMultiInput").getValue().length > 0 && !(this.getView().byId("brandSingleInput").getEnabled())){
        else if(this.getView().byId("brandMultiInput").getValue().length > 0 && this.getView().byId("brandSingleInput").getValue().split(",").length > 1){  
      var brandMultiInput = this.getView().byId("brandMultiInput").getValue().split(","),
        brandValueFilters = [];
        for(var m =0;m<brandMultiInput.length;m++){
          brandValueFilters.push(new sap.ui.model.Filter("BrandId","EQ",brandMultiInput[m]));
        }
          filters.push(new sap.ui.model.Filter(brandValueFilters,false));
      }else if(this.getView().byId("brandMultiInput").getValue().length > 0 && this.getView().byId("brandSingleInput").getValue().length == 0){
        filters.push(new sap.ui.model.Filter("BrandId","EQ",this.getView().byId("brandMultiInput").getValue()));
      }else if(this.getView().byId("brandMultiInput").getValue().length == 0 && this.getView().byId("brandSingleInput").getValue().length > 0){
        filters.push(new sap.ui.model.Filter("BrandId","EQ",this.getView().byId("brandSingleInput").getValue()));
      }
        //CompaignId
        if (this.getView().byId("compaignIdMultiInput").getValue().length > 0 && this.getView().byId("compaignIdSingleInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Matnr", "BT", this.getView().byId("compaignIdMultiInput").getValue(),
            this.getView().byId("compaignIdSingleInput").getValue()));
        }
        else if (this.getView().byId("compaignIdMultiInput").getValue().length > 0 && this.getView().byId("compaignIdSingleInput").getValue().split(",").length) {
          var compaignIdMultiInput = this.getView().byId("compaignIdMultiInput").getValue().split(","),
          compaignIdValueFilters = [];
          for (var m = 0; m < compaignIdMultiInput.length; m++) {
            compaignIdValueFilters.push(new sap.ui.model.Filter("Kunnr", "EQ", compaignIdMultiInput[m]));
          }
          filters.push(new sap.ui.model.Filter(compaignIdValueFilters, false));
        } else if (this.getView().byId("compaignIdMultiInput").getValue().length > 0 && this.getView().byId("compaignIdSingleInput").getValue().length == 0) {
          filters.push(new sap.ui.model.Filter("Kunnr", "EQ", this.getView().byId("compaignIdMultiInput").getValue()));
        } else if (this.getView().byId("compaignIdMultiInput").getValue().length == 0 && this.getView().byId("compaignIdSingleInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Kunnr", "EQ", this.getView().byId("compaignIdSingleInput").getValue()));
        }
        //Site   Werks
        if (this.getView().byId("siteFirstInput").getSelectedKey().length > 0 && this.getView().byId("siteSecondInput").getSelectedKey().length > 0) {
          filters.push(new sap.ui.model.Filter("Werks", "BT", this.getView().byId("siteFirstInput").getSelectedKey(),
            this.getView().byId("siteSecondInput").getSelectedKey()));
        } else if (this.getView().byId("siteFirstInput").getSelectedKey().length > 0 && this.getView().byId("siteSecondInput").getSelectedKey().length == 0) {
          filters.push(new sap.ui.model.Filter("Werks", "EQ", this.getView().byId("siteFirstInput").getSelectedKey()));
        } else if (this.getView().byId("siteFirstInput").getSelectedKey().length == 0 && this.getView().byId("siteSecondInput").getSelectedKey().length > 0) {
          filters.push(new sap.ui.model.Filter("Werks", "EQ", this.getView().byId("siteSecondInput").getSelectedKey()));
        }
        //PersonalNo   Pernr
        if (this.getView().byId("personalNoFirstInput").getValue().length > 0 && this.getView().byId("personalNoSecondInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Pernr", "BT", this.getView().byId("personalNoSecondInput").getValue(),
            this.getView().byId("personalNoSecondInput").getValue()));
        }
        else if (this.getView().byId("personalNoFirstInput").getValue().length > 0 && this.getView().byId("personalNoSecondInput").getValue().split(",").length > 1) {
          var personalNoFirstInput = this.getView().byId("personalNoFirstInput").getValue().split(","),
          personalNoValueFilters = [];
          for (var m = 0; m < personalNoFirstInput.length; m++) {
            personalNoValueFilters.push(new sap.ui.model.Filter("Pernr", "EQ", personalNoFirstInput[m]));
          }
          filters.push(new sap.ui.model.Filter(personalNoValueFilters, false));
        } else if (this.getView().byId("personalNoFirstInput").getValue().length > 0 && this.getView().byId("personalNoSecondInput").getValue().length == 0) {
          filters.push(new sap.ui.model.Filter("Pernr", "EQ", this.getView().byId("personalNoFirstInput").getValue()));
        } else if (this.getView().byId("personalNoFirstInput").getValue().length == 0 && this.getView().byId("personalNoSecondInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Pernr", "EQ", this.getView().byId("personalNoSecondInput").getValue()));
        }
        

        if (filters.length == 1)
        return [filters];
      else
        return (new sap.ui.model.Filter(filters, true))
        
      },
      onExecutePress: function () {
        this.getView().byId("salesOrderListReport").setVisible(false);
        this.getView().byId("tableForSalesOrderListReport").setVisible(true);
        this.getView().byId("salesOrderListSmartTable").rebindTable();
      },
      onNavBackShelfLifeTable: function () {
        this.getView().byId("salesOrderListReport").setVisible(true);
        this.getView().byId("tableForSalesOrderListReport").setVisible(false);
      },
      onNavBack: function () {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("stockReports");
      },
      onValueHelpArticle: function (evt) {
        if (!this.valueHelpForArticle) {
          this.valueHelpForArticle = new sap.ui.xmlfragment("com.luxasia.salesorder.fragments.valueHelpForArticle", this);
          this.getView().addDependent(this.valueHelpForArticle);
        }

        this.articleInputField = evt.getSource();
        if (evt.getSource().sId.indexOf("articleMultiInput") != (-1))
          this.valueHelpForArticle.setMultiSelect(true);
        else
          this.valueHelpForArticle.setMultiSelect(false);
        this.valueHelpForArticle.getBinding("items").sCustomParams = "";
        this.valueHelpForArticle.getBinding("items").filter([]);
        this.valueHelpForArticle.open();
      },
      onValueHelpForSiteConfirm: function (evt) {
        //var selectedItems = evt.getParameter("selectedItems"), siteValue="";
        var selectedItems = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths(), siteValue = "", formattedText = "";
        if (this.articleInputField.sId.indexOf("articleMultiInput") != (-1)) {
          for (var m = 0; m < selectedItems.length; m++) {
            formattedText = formatter.precendingZerosRemvoal(evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths()[m].replace("/ValueHelpSet('", "").replace("')", ""));
            siteValue = siteValue.length == 0 ? formattedText : siteValue + "," + formattedText;
          }
          this.articleInputField.setValue(siteValue);
          if (selectedItems.length == 1)
            this.getView().byId("articleSingleInput").setEnabled(true);
          else
            this.getView().byId("articleSingleInput").setEnabled(false).setValue();
        }
        else {
          this.articleInputField.setValue(evt.getParameter("selectedItems")[0].getTitle());
          this.getView().byId("articleSingleInput").setEnabled(true);
        }
      },
      onValueHelpBrand: function (evt) {
        if (!this.valueHelpForBrands) {
          this.valueHelpForBrands = new sap.ui.xmlfragment("com.luxasia.salesorder.fragments.valueHelpForBrands", this);
          this.getView().addDependent(this.valueHelpForBrands);
        }
        this.brandInputField = evt.getSource();
        if (evt.getSource().sId.indexOf("brandMultiInput") != (-1))
          this.valueHelpForBrands.setMultiSelect(true);
        else
          this.valueHelpForBrands.setMultiSelect(false);
        this.valueHelpForBrands.getBinding("items").sCustomParams = "";
        this.valueHelpForBrands.getBinding("items").filter([]);
        this.valueHelpForBrands.open();
      },
      onValueHelpForBrandConfirm: function (evt) {
        //var selectedItems = evt.getParameter("selectedItems"), brandValue="";
        var selectedItems = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths(), brandValue = "", formattedText = "";
        if (this.brandInputField.sId.indexOf("brandMultiInput") != (-1)) {
          for (var m = 0; m < selectedItems.length; m++) {
            formattedText = (evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths()[m].replace("/ValueHelpSet('", "").replace("')", ""));
            brandValue = brandValue.length == 0 ? formattedText : brandValue + "," + formattedText;
          }
          this.brandInputField.setValue(brandValue);
          if (selectedItems.length == 1)
            this.getView().byId("brandSingleInput").setEnabled(true);
          else
            this.getView().byId("brandSingleInput").setEnabled(false).setValue();
        }
        else {
          this.brandInputField.setValue(evt.getParameter("selectedItems")[0].getTitle());
          this.getView().byId("brandSingleInput").setEnabled(true);
        }
      },
      onValueHelpCompaignId: function (evt) {
        if (!this.valueHelpForCompaignId) {
          this.valueHelpForCompaignId = new sap.ui.xmlfragment("com.luxasia.salesorder.fragments.valueHelpForCompaignId", this);
          this.getView().addDependent(this.valueHelpForCompaignId);
        }

        this.compaignIdInputField = evt.getSource();
        if (evt.getSource().sId.indexOf("compaignIdMultiInput") != (-1))
          this.valueHelpForCompaignId.setMultiSelect(true);
        else
          this.valueHelpForCompaignId.setMultiSelect(false);
        this.valueHelpForCompaignId.getBinding("items").sCustomParams = "";
        this.valueHelpForCompaignId.getBinding("items").filter([]);
        this.valueHelpForCompaignId.open();
      },
      onValueHelpForCompaignIdConfirm: function (evt) {
        //var selectedItems = evt.getParameter("selectedItems"), siteValue="";
        var selectedItems = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths(), CompaignId = "", formattedText = "";
        if (this.compaignIdInputField.sId.indexOf("compaignIdMultiInput") != (-1)) {
          for (var m = 0; m < selectedItems.length; m++) {
            formattedText = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths()[m].replace("/ValueHelpSet('", "").replace("')", "");
            CompaignId = CompaignId.length == 0 ? formattedText : CompaignId + "," + formattedText;
          }
          this.compaignIdInputField.setValue(CompaignId);
          if (selectedItems.length == 1)
            this.getView().byId("compaignIdSingleInput").setEnabled(true);
          else
            this.getView().byId("compaignIdSingleInput").setEnabled(false).setValue();
        }
        else {
          this.compaignIdInputField.setValue(evt.getParameter("selectedItems")[0].getTitle());
          this.getView().byId("compaignIdSingleInput").setEnabled(true);
        }
      },
      onValueHelpPersonalNo: function (evt) {
        if (!this.valueHelpForPersonalNo) {
          this.valueHelpForPersonalNo = new sap.ui.xmlfragment("com.luxasia.salesorder.fragments.valueHelpForPersonalNo", this);
          this.getView().addDependent(this.valueHelpForPersonalNo);
        }

        this.personalNoInputField = evt.getSource();
        if (evt.getSource().sId.indexOf("personalNoFirstInput") != (-1))
          this.valueHelpForPersonalNo.setMultiSelect(true);
        else
          this.valueHelpForPersonalNo.setMultiSelect(false);
        this.valueHelpForPersonalNo.getBinding("items").sCustomParams = "";
        this.valueHelpForPersonalNo.getBinding("items").filter([]);
        this.valueHelpForPersonalNo.open();
      },
      onValueHelpForPersonalNoConfirm: function (evt) {
        //var selectedItems = evt.getParameter("selectedItems"), siteValue="";
        var selectedItems = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths(), personalNo = "", formattedText = "";
        if (this.personalNoInputField.sId.indexOf("personalNoFirstInput") != (-1)) {
          for (var m = 0; m < selectedItems.length; m++) {
            formattedText = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths()[m].replace("/ValueHelpSet('", "").replace("')", "");
            personalNo = personalNo.length == 0 ? formattedText : personalNo + "," + formattedText;
          }
          this.personalNoInputField.setValue(personalNo);
          if (selectedItems.length == 1)
            this.getView().byId("personalNoSecondInput").setEnabled(true);
          else
            this.getView().byId("personalNoSecondInput").setEnabled(false).setValue();
        }
        else {
          this.personalNoInputField.setValue(evt.getParameter("selectedItems")[0].getTitle());
          this.getView().byId("personalNoSecondInput").setEnabled(true);
        }
      },
      onValueHelpSalesOrg: function (evt) {
        if (!this.valueHelpForSalesOrg) {
          this.valueHelpForSalesOrg = new sap.ui.xmlfragment("com.luxasia.salesorder.fragments.valueHelpForSalesOrg", this);
          this.getView().addDependent(this.valueHelpForSalesOrg);
        }

        this.salesOrgInputField = evt.getSource();
        if (evt.getSource().sId.indexOf("salesOrgMultiInput") != (-1))
          this.valueHelpForSalesOrg.setMultiSelect(true);
        else
          this.valueHelpForSalesOrg.setMultiSelect(false);
        this.valueHelpForSalesOrg.getBinding("items").sCustomParams = "";
        this.valueHelpForSalesOrg.getBinding("items").filter([]);
        this.valueHelpForSalesOrg.open();
      },
      onValueHelpForSalesOrganizationConfirm: function (evt) {
        //var selectedItems = evt.getParameter("selectedItems"), siteValue="";
        var selectedItems = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths(), salesOrg = "", formattedText = "";
        if (this.salesOrgInputField.sId.indexOf("salesOrgMultiInput") != (-1)) {
          for (var m = 0; m < selectedItems.length; m++) {
            formattedText = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths()[m].replace("/ValueHelpSet('", "").replace("')", "");
            salesOrg = salesOrg.length == 0 ? formattedText : salesOrg + "," + formattedText;
          }
          this.salesOrgInputField.setValue(salesOrg);
          if (selectedItems.length == 1)
            this.getView().byId("salesOrgSingleInput").setEnabled(true);
          else
            this.getView().byId("salesOrgSingleInput").setEnabled(false).setValue();
        }
        else {
          this.salesOrgInputField.setValue(evt.getParameter("selectedItems")[0].getTitle());
          this.getView().byId("salesOrgSingleInput").setEnabled(true);
        }
      },
      onValueHelpSalesDoc: function (evt) {
        if (!this.valueHelpForSalesDoc) {
          this.valueHelpForSalesDoc = new sap.ui.xmlfragment("com.luxasia.salesorder.fragments.valueHelpForSalesDoc", this);
          this.getView().addDependent(this.valueHelpForSalesDoc);
        }

        this.salesDocInputField = evt.getSource();
        if (evt.getSource().sId.indexOf("salesDocMultiInput") != (-1))
          this.valueHelpForSalesDoc.setMultiSelect(true);
        else
          this.valueHelpForSalesDoc.setMultiSelect(false);
        this.valueHelpForSalesDoc.getBinding("items").sCustomParams = "";
        this.valueHelpForSalesDoc.getBinding("items").filter([]);
        this.valueHelpForSalesDoc.open();
      },
      onValueHelpForSalesDocumentConfirm: function (evt) {
        //var selectedItems = evt.getParameter("selectedItems"), siteValue="";
        var selectedItems = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths(), salesDoc = "", formattedText = "";
        if (this.salesDocInputField.sId.indexOf("salesDocMultiInput") != (-1)) {
          for (var m = 0; m < selectedItems.length; m++) {
            formattedText = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths()[m].replace("/ValueHelpSet('", "").replace("')", "");
            salesDoc = salesDoc.length == 0 ? formattedText : salesDoc + "," + formattedText;
          }
          this.salesDocInputField.setValue(salesDoc);
          if (selectedItems.length == 1)
            this.getView().byId("salesDocSingleInput").setEnabled(true);
          else
            this.getView().byId("salesDocSingleInput").setEnabled(false).setValue();
        }
        else {
          this.salesDocInputField.setValue(evt.getParameter("selectedItems")[0].getTitle());
          this.getView().byId("salesDocSingleInput").setEnabled(true);
        }
      },
      onValueHelpSalesDocType: function (evt) {
        if (!this.valueHelpForSalesDocType) {
          this.valueHelpForSalesDocType = new sap.ui.xmlfragment("com.luxasia.salesorder.fragments.valueHelpForSalesDocType", this);
          this.getView().addDependent(this.valueHelpForSalesDocType);
        }

        this.salesDocTypeInputField = evt.getSource();
        if (evt.getSource().sId.indexOf("salesDocTypeMultiInput") != (-1))
          this.valueHelpForSalesDocType.setMultiSelect(true);
        else
          this.valueHelpForSalesDocType.setMultiSelect(false);
        this.valueHelpForSalesDocType.getBinding("items").sCustomParams = "";
        this.valueHelpForSalesDocType.getBinding("items").filter([]);
        this.valueHelpForSalesDocType.open();
      },
      onValueHelpForSalesDocumentTypeConfirm: function (evt) {
        //var selectedItems = evt.getParameter("selectedItems"), siteValue="";
        var selectedItems = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths(), salesDocType = "", formattedText = "";
        if (this.salesDocTypeInputField.sId.indexOf("salesDocTypeMultiInput") != (-1)) {
          for (var m = 0; m < selectedItems.length; m++) {
            formattedText = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths()[m].replace("/ValueHelpSet('", "").replace("')", "");
            salesDocType = salesDocType.length == 0 ? formattedText : salesDocType + "," + formattedText;
          }
          this.salesDocTypeInputField.setValue(salesDocType);
          if (selectedItems.length == 1)
            this.getView().byId("salesDocTypeSingleInput").setEnabled(true);
          else
            this.getView().byId("salesDocTypeSingleInput").setEnabled(false).setValue();
        }
        else {
          this.salesDocTypeInputField.setValue(evt.getParameter("selectedItems")[0].getTitle());
          this.getView().byId("salesDocTypeSingleInput").setEnabled(true);
        }
      },

      onValueHelpSoldToParty: function (evt) {
        if (!this.valueHelpForSoldToParty) {
          this.valueHelpForSoldToParty = new sap.ui.xmlfragment("com.luxasia.salesorder.fragments.valueHelpForSoldToParty", this);
          this.getView().addDependent(this.valueHelpForSoldToParty);
        }

        this.soldToPartyInputField = evt.getSource();
        if (evt.getSource().sId.indexOf("soldToPartyMultiInput") != (-1))
          this.valueHelpForSoldToParty.setMultiSelect(true);
        else
          this.valueHelpForSoldToParty.setMultiSelect(false);
        this.valueHelpForSoldToParty.getBinding("items").sCustomParams = "";
        this.valueHelpForSoldToParty.getBinding("items").filter([]);
        this.valueHelpForSoldToParty.open();
      },
      onValueHelpForSoldToPartyConfirm: function (evt) {
        //var selectedItems = evt.getParameter("selectedItems"), siteValue="";
        var selectedItems = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths(), salesDocType = "", formattedText = "";
        if (this.soldToPartyInputField.sId.indexOf("soldToPartyMultiInput") != (-1)) {
          for (var m = 0; m < selectedItems.length; m++) {
            formattedText = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths()[m].replace("/ValueHelpSet('", "").replace("')", "");
            salesDocType = salesDocType.length == 0 ? formattedText : salesDocType + "," + formattedText;
          }
          this.soldToPartyInputField.setValue(salesDocType);
          if (selectedItems.length == 1)
            this.getView().byId("soldToPartySingleInput").setEnabled(true);
          else
            this.getView().byId("soldToPartySingleInput").setEnabled(false).setValue();
        }
        else {
          this.soldToPartyInputField.setValue(evt.getParameter("selectedItems")[0].getTitle());
          this.getView().byId("soldToPartySingleInput").setEnabled(true);
        }
      },
      onSearch: function (evt) {
        var searchString = evt.getParameter("value");
        if (searchString.length > 0) {
          evt.getSource().getBinding("items").sCustomParams = "search=" + searchString;
          evt.getSource().getBinding("items").filter([]);
        } else {
          evt.getSource().getBinding("items").sCustomParams = "";
          evt.getSource().getBinding("items").filter([]);

        }

      },
      onSearchForBrand: function (evt) {
        var searchString = evt.getParameter("value");
        if (searchString.length > 0) {
          evt.getSource().getBinding("items").sCustomParams = "search=" + searchString;
          evt.getSource().getBinding("items").filter([]);
        } else {
          evt.getSource().getBinding("items").sCustomParams = "";
          evt.getSource().getBinding("items").filter([]);
        }
      }
    });
  }
);
