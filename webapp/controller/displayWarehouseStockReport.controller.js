sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "com/luxasia/salesorder/util/formatter"
  ],
  function (BaseController, formatter) {
    "use strict";

    return BaseController.extend("com.luxasia.salesorder.controller.displayWarehouseStockReport", {
      formatter: formatter,
      onInit: function () {
        sap.ui.core.UIComponent.getRouterFor(this).getRoute("displayWarehouseStockReport").attachPatternMatched(this._onRouteMatched, this);
      },
      _onRouteMatched: function (oEvent) {
        this.getView().byId("displayWarehouseStockReport").setVisible(true);
        this.getView().byId("tableForDisplayWarehouseStockReport").setVisible(false);
        this.clearFields();
      },
      clearFields: function () {
        //Article
        this.getView().byId("articleMultiInput").setValue();
        this.getView().byId("articleSingleInput").setValue();
        //Site
        this.getView().byId("siteFirstInput").setSelectedKey();
        this.getView().byId("siteSecondInput").setSelectedKey();
        //Storage Loc
        this.getView().byId("stgLocMultiInput").setValue();
        this.getView().byId("stgLocSingleInput").setValue();
        //Material Type
        this.getView().byId("matTypeMultiInput").setValue();
        this.getView().byId("matTypeSingleInput").setValue();
        //Material Group
        this.getView().byId("materialGrpFirstInput").setValue();
        this.getView().byId("materialGrpSecondInput").setValue();
        //Purchasing Group
        this.getView().byId("purchasingGroupFirstInput").setValue();
        this.getView().byId("purchasingGroupSecondInput").setValue();
        //Also Select Special Stocks
        this.getView().byId("splStockSelect").setSelected(false);
        //Special Stock Indicator
        this.getView().byId("splStockFirstInput").setValue();
        this.getView().byId("splStockSecondInput").setValue();
        //Display Negative Stocks Only
        this.getView().byId("disNegativeStock").setSelected(false);
        //Display Batch Stocks
        this.getView().byId("disBatchStocks").setSelected(false);
        //No Zero Stock Lines
        this.getView().byId("noZeroStockLines").setSelected(false);
        //Do not Display Values
        this.getView().byId("doNotDisplayValue").setSelected(false);
      },
      onExecutePress: function () {
        this.getView().byId("displayWarehouseStockReport").setVisible(false);
        this.getView().byId("tableForDisplayWarehouseStockReport").setVisible(true);
        this.getView().byId("wareHouseStockReportSmartTable").rebindTable();
      },
      onNavBackShelfLifeTable: function () {
        this.getView().byId("displayWarehouseStockReport").setVisible(true);
        this.getView().byId("tableForDisplayWarehouseStockReport").setVisible(false);
      },
      onNavBack: function () {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("stockReports");
      },
      onBeforeRebindTable: function (oEvent) {
        var binding = oEvent.getParameter("bindingParams");
        //   var materialFilter1 = new sap.ui.model.Filter("Matnr", "EQ", "80948321");
        //   var materialFilter2 = new sap.ui.model.Filter("Matnr", "EQ", "80989241");
        //   var materialFilter3 = new sap.ui.model.Filter("Matnr", "EQ", "81076358");
        //   var materialFilter4 = new sap.ui.model.Filter("Matnr", "EQ", "81076359");
        //   var materialFilter5 = new sap.ui.model.Filter("Matnr", "EQ", "81109461");
        //   var materialFilters = new sap.ui.model.Filter([materialFilter1,materialFilter2,materialFilter3,materialFilter4,materialFilter5],false);
        //   var filter1 = new sap.ui.model.Filter("Werks", "EQ", "6817");
        //   var filter2 = new sap.ui.model.Filter("Lgort", "EQ", "0001");
        //   var filter3 = new sap.ui.model.Filter("PNozero", "EQ", "X");
        //   var filter4 = new sap.ui.model.Filter("PNovalues", "EQ", "X");
        //   var oFilter = new sap.ui.model.Filter([materialFilters,filter1,filter2,filter3,filter4],true);
        //   binding.filters.push(oFilter);
        var oFilter = this.onFilterConstruction();
        binding.filters.push(oFilter);
      },
      onFilterConstruction: function () {
        //Article ValueHelp
        var filters = []
        if (this.getView().byId("articleMultiInput").getValue().length > 0 && this.getView().byId("articleSingleInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Matnr", "BT", this.getView().byId("articleMultiInput").getValue(),
            this.getView().byId("articleSingleInput").getValue()));
        }
        //else if(this.getView().byId("articleMultiInput").getValue().length > 0 && !(this.getView().byId("articleSingleInput").getEnabled())){
        else if (this.getView().byId("articleMultiInput").getValue().length > 0 && this.getView().byId("articleMultiInput").getValue().split(",").length > 1) {
          var articleMultiInput = this.getView().byId("articleMultiInput").getValue().split(","),
            articleValueFilters = [];
          for (var m = 0; m < articleMultiInput.length; m++) {
            articleValueFilters.push(new sap.ui.model.Filter("Matnr", "EQ", articleMultiInput[m]));
          }
          filters.push(new sap.ui.model.Filter(articleValueFilters, false));
        } else if (this.getView().byId("articleMultiInput").getValue().length > 0 && this.getView().byId("articleSingleInput").getValue().length == 0) {
          filters.push(new sap.ui.model.Filter("Matnr", "EQ", this.getView().byId("articleMultiInput").getValue()));
        } else if (this.getView().byId("articleMultiInput").getValue().length == 0 && this.getView().byId("articleSingleInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Matnr", "EQ", this.getView().byId("articleSingleInput").getValue()));
        }
        //site Dropdown
        if (this.getView().byId("siteFirstInput").getSelectedKey().length > 0 && this.getView().byId("siteSecondInput").getSelectedKey().length > 0) {
          filters.push(new sap.ui.model.Filter("Werks", "BT", this.getView().byId("siteFirstInput").getSelectedKey(),
            this.getView().byId("siteSecondInput").getSelectedKey()));
        } else if (this.getView().byId("siteFirstInput").getSelectedKey().length > 0 && this.getView().byId("siteSecondInput").getSelectedKey().length == 0) {
          filters.push(new sap.ui.model.Filter("Werks", "EQ", this.getView().byId("siteFirstInput").getSelectedKey()));
        } else if (this.getView().byId("siteFirstInput").getSelectedKey().length == 0 && this.getView().byId("siteSecondInput").getSelectedKey().length > 0) {
          filters.push(new sap.ui.model.Filter("Werks", "EQ", this.getView().byId("siteSecondInput").getSelectedKey()));
        }
        //Storage Location ValueHelp
        if (this.getView().byId("stgLocMultiInput").getValue().length > 0 && this.getView().byId("stgLocSingleInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Lgort", "BT", this.getView().byId("stgLocMultiInput").getValue(),
            this.getView().byId("stgLocSingleInput").getValue()));
        }
        //else if(this.getView().byId("stgLocMultiInput").getValue().length > 0 && !(this.getView().byId("stgLocSingleInput").getEnabled())){
        else if (this.getView().byId("stgLocMultiInput").getValue().length > 0 && this.getView().byId("stgLocMultiInput").getValue().split(",").length > 1) {
          var stgLocMultiInput = this.getView().byId("stgLocMultiInput").getValue().split(","),
            stgLocValueFilters = [];
          for (var m = 0; m < stgLocMultiInput.length; m++) {
            stgLocValueFilters.push(new sap.ui.model.Filter("Lgort", "EQ", stgLocMultiInput[m]));
          }
          filters.push(new sap.ui.model.Filter(stgLocValueFilters, false));
        } else if (this.getView().byId("stgLocMultiInput").getValue().length > 0 && this.getView().byId("stgLocSingleInput").getValue().length == 0) {
          filters.push(new sap.ui.model.Filter("Lgort", "EQ", this.getView().byId("stgLocMultiInput").getValue()));
        } else if (this.getView().byId("stgLocMultiInput").getValue().length == 0 && this.getView().byId("stgLocSingleInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Lgort", "EQ", this.getView().byId("stgLocSingleInput").getValue()));
        }
        //Material Type valuehelp
        if (this.getView().byId("matTypeMultiInput").getValue().length > 0 && this.getView().byId("matTypeSingleInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Mtart", "BT", this.getView().byId("matTypeMultiInput").getValue(),
            this.getView().byId("matTypeSingleInput").getValue()));
        }
        //else if(this.getView().byId("matTypeMultiInput").getValue().length > 0 && !(this.getView().byId("matTypeSingleInput").getEnabled())){
        else if (this.getView().byId("matTypeMultiInput").getValue().length > 0 && this.getView().byId("matTypeSingleInput").getValue().split(",").length > 1) {
          var matTypeMultiInput = this.getView().byId("matTypeMultiInput").getValue().split(","),
            matTypeValueFilters = [];
          for (var m = 0; m < matTypeMultiInput.length; m++) {
            matTypeValueFilters.push(new sap.ui.model.Filter("Mtart", "EQ", matTypeMultiInput[m]));
          }
          filters.push(new sap.ui.model.Filter(matTypeValueFilters, false));
        } else if (this.getView().byId("matTypeMultiInput").getValue().length > 0 && this.getView().byId("matTypeSingleInput").getValue().length == 0) {
          filters.push(new sap.ui.model.Filter("Mtart", "EQ", this.getView().byId("matTypeMultiInput").getValue()));
        } else if (this.getView().byId("matTypeMultiInput").getValue().length == 0 && this.getView().byId("matTypeSingleInput").getValue().length > 0) {
          filters.push(new sap.ui.model.Filter("Mtart", "EQ", this.getView().byId("matTypeSingleInput").getValue()));
        }


        //Material Group 
        var materialGrpFirstInput = this.getView().byId("materialGrpFirstInput").getValue();
        var materialGrpSecondInput = this.getView().byId("materialGrpSecondInput").getValue();
        if (materialGrpFirstInput.length > 0 && materialGrpSecondInput.length > 0) {
          filters.push(new sap.ui.model.Filter("Matkl", "BT", materialGrpFirstInput, materialGrpSecondInput));
        } else if (materialGrpFirstInput.length > 0 && materialGrpSecondInput.length == 0) {
          filters.push(new sap.ui.model.Filter("Matkl", "EQ", materialGrpFirstInput));
        } else if (materialGrpFirstInput.length == 0 && materialGrpSecondInput.length > 0) {
          filters.push(new sap.ui.model.Filter("Matkl", "EQ", materialGrpSecondInput));
        }

        //Purchasig Group 
        var purchasingGroupFirstInput = this.getView().byId("purchasingGroupFirstInput").getValue();
        var purchasingGroupSecondInput = this.getView().byId("purchasingGroupSecondInput").getValue();
        if (purchasingGroupFirstInput.length > 0 && purchasingGroupSecondInput.length > 0) {
          filters.push(new sap.ui.model.Filter("Ekgrp", "BT", purchasingGroupFirstInput, purchasingGroupSecondInput));
        } else if (purchasingGroupFirstInput.length > 0 && materialGrpSecondpurchasingGroupSecondInputInput.length == 0) {
          filters.push(new sap.ui.model.Filter("Ekgrp", "EQ", purchasingGroupFirstInput));
        } else if (purchasingGroupFirstInput.length == 0 && purchasingGroupSecondInput.length > 0) {
          filters.push(new sap.ui.model.Filter("Ekgrp", "EQ", purchasingGroupSecondInput));
        }

        //Also Select Special Stocks 
        if (this.getView().byId("splStockSelect").getSelected())
          filters.push(new sap.ui.model.Filter("PSond", "EQ", "X"));

        //Special Stock Indicator 
        var splStockFirstInput = this.getView().byId("splStockFirstInput").getValue();
        var splStockSecondInput = this.getView().byId("splStockSecondInput").getValue();
        if (splStockFirstInput.length > 0 && splStockSecondInput.length > 0) {
          filters.push(new sap.ui.model.Filter("Sobkz", "BT", splStockFirstInput, splStockSecondInput));
        } else if (splStockFirstInput.length > 0 && splStockSecondInput.length == 0) {
          filters.push(new sap.ui.model.Filter("Sobkz", "EQ", splStockFirstInput));
        } else if (splStockFirstInput.length == 0 && splStockSecondInput.length > 0) {
          filters.push(new sap.ui.model.Filter("Sobkz", "EQ", splStockSecondInput));
        }


        //Display Negative Stocks Only  
        if (this.getView().byId("disNegativeStock").getSelected())
          filters.push(new sap.ui.model.Filter("PNegativ", "EQ", "X"));

        //Display Batch Stocks 
        if (this.getView().byId("disBatchStocks").getSelected())
          filters.push(new sap.ui.model.Filter("PXmchb", "EQ", "X"));

        //No Zero Stock Lines 
        if (this.getView().byId("noZeroStockLines").getSelected())
          filters.push(new sap.ui.model.Filter("PNozero", "EQ", "X"));

        //Do not Display Values
        if (this.getView().byId("doNotDisplayValue").getSelected())
          filters.push(new sap.ui.model.Filter("PNovalues", "EQ", "X"));

        if (filters.length == 1)
          return [filters];
        else
          return (new sap.ui.model.Filter(filters, true))
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
      onValueHelpStgLoc: function (evt) {
        if (this.getView().byId("siteFirstInput").getSelectedKey().length > 0) {
          if (!this.valueHelpForStorageLoction) {
            this.valueHelpForStorageLoction = new sap.ui.xmlfragment("com.luxasia.salesorder.fragments.valueHelpForStorageLoction", this);
            this.getView().addDependent(this.valueHelpForStorageLoction);
          }
          this.stgLocInputField = evt.getSource();
          if (evt.getSource().sId.indexOf("stgLocMultiInput") != (-1))
            this.valueHelpForStorageLoction.setMultiSelect(true);
          else
            this.valueHelpForStorageLoction.setMultiSelect(false);
          this.valueHelpForStorageLoction.getBinding("items").sCustomParams = "";
          var siteFilter = new sap.ui.model.Filter("StoreId", "EQ", this.getView().byId("siteFirstInput").getSelectedKey());
          this.valueHelpForStorageLoction.getBinding("items").filter([siteFilter]);
          this.valueHelpForStorageLoction.open();
        } else {
          sap.m.MessageBox.error("Please select site before selecting storage location");
        }
      },
      onValueHelpForStgLocConfirm: function (evt) {
        //var selectedItems = evt.getParameter("selectedItems"), stgLocValue="";
        var selectedItems = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths(), stgLocValue = "", formattedText = "";
        if (this.stgLocInputField.sId.indexOf("stgLocMultiInput") != (-1)) {
          for (var m = 0; m < selectedItems.length; m++) {
            formattedText = (evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths()[m].replace("/ValueHelpSet('", "").replace("')", ""));
            stgLocValue = stgLocValue.length == 0 ? formattedText : stgLocValue + "," + formattedText;
          }
          this.stgLocInputField.setValue(stgLocValue);
          if (selectedItems.length == 1)
            this.getView().byId("stgLocSingleInput").setEnabled(true);
          else
            this.getView().byId("stgLocSingleInput").setEnabled(false).setValue();
        }
        else {
          this.stgLocInputField.setValue(evt.getParameter("selectedItems")[0].getTitle());
          this.getView().byId("stgLocSingleInput").setEnabled(true);
        }

      },

      onValueHelpMaterialType: function (evt) {
        if (!this.valueHelpForMaterialType) {
          this.valueHelpForMaterialType = new sap.ui.xmlfragment("com.luxasia.salesorder.fragments.valueHelpForMaterialType", this);
          this.getView().addDependent(this.valueHelpForMaterialType);
        }

        this.matTypeInputField = evt.getSource();
        if (evt.getSource().sId.indexOf("matTypeMultiInput") != (-1))
          this.valueHelpForMaterialType.setMultiSelect(true);
        else
          this.valueHelpForMaterialType.setMultiSelect(false);
        this.valueHelpForMaterialType.getBinding("items").sCustomParams = "";
        this.valueHelpForMaterialType.getBinding("items").filter([]);
        this.valueHelpForMaterialType.open();
      },
      onValueHelpForMaterialTypeConfirm: function (evt) {
        //var selectedItems = evt.getParameter("selectedItems"), siteValue="";
        var selectedItems = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths(), matTypeValue = "", formattedText = "";
        if (this.matTypeInputField.sId.indexOf("matTypeMultiInput") != (-1)) {
          for (var m = 0; m < selectedItems.length; m++) {
            formattedText = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths()[m].replace("/ValueHelpSet('", "").replace("')", "");
            matTypeValue = matTypeValue.length == 0 ? formattedText : matTypeValue + "," + formattedText;
          }
          this.matTypeInputField.setValue(matTypeValue);
          if (selectedItems.length == 1)
            this.getView().byId("matTypeSingleInput").setEnabled(true);
          else
            this.getView().byId("matTypeSingleInput").setEnabled(false).setValue();
        }
        else {
          this.matTypeInputField.setValue(evt.getParameter("selectedItems")[0].getTitle());
          this.getView().byId("matTypeSingleInput").setEnabled(true);
        }

      },

      onSearch: function (evt) {
        var searchString = evt.getParameter("value");
        if (searchString.length > 0) {
          evt.getSource().getBinding("items").sCustomParams = "search=" + searchString;
          if (evt.getSource().getBinding("items").sFilterParams.indexOf("STG_LOC")) {
            var siteFilter = new sap.ui.model.Filter("StoreId", "EQ", this.getView().byId("siteFirstInput").getSelectedKey());
            evt.getSource().getBinding("items").filter([siteFilter]);
          } else
            evt.getSource().getBinding("items").filter([]);
        } else {
          if (evt.getSource().getBinding("items").sFilterParams.indexOf("STG_LOC")) {
            var siteFilter = new sap.ui.model.Filter("StoreId", "EQ", this.getView().byId("siteFirstInput").getSelectedKey());
            evt.getSource().getBinding("items").sCustomParams = "";
            evt.getSource().getBinding("items").filter([siteFilter]);
          } else {
            evt.getSource().getBinding("items").sCustomParams = "";
            evt.getSource().getBinding("items").filter([]);
          }

        }

      },
    });
  }
);
