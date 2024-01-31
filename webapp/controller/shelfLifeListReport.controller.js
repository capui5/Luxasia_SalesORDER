sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "com/luxasia/salesorder/util/formatter"
  ],
  function (BaseController,formatter) {
    "use strict";

    return BaseController.extend("com.luxasia.salesorder.controller.shelfLifeListReport", {
      formatter:formatter,
      onInit: function () {
        sap.ui.core.UIComponent.getRouterFor(this).getRoute("shelfLifeListReport").attachPatternMatched(this._onRouteMatched, this);
      },
      _onRouteMatched: function (oEvent) {
        this.clearFields();
        this.getView().byId("shelfLifeListReport").setVisible(true);
        this.getView().byId("tableForShelfLifeList").setVisible(false);
        
      },
      clearFields:function(){
        this.getView().byId("Remshelflifewhse").setSelectedIndex(-1);
        //this.getView().byId("Totremshelflife").setSelectedIndex(-1);
        this.getView().byId("zeroStockArticle").setSelected(false);
        this.getView().byId("inDays").setSelectedIndex(-1);
        //Article
        this.getView().byId("articleMultiInput").setValue();
        this.getView().byId("articleSingleInput").setValue();
        //Site
        this.getView().byId("siteFirstInput").setSelectedKey();
        this.getView().byId("siteSecondInput").setSelectedKey();
        //Storage Loc
        this.getView().byId("stgLocMultiInput").setValue();
        this.getView().byId("stgLocSingleInput").setValue();
        //Brand
        this.getView().byId("brandMultiInput").setValue();
        this.getView().byId("brandSingleInput").setValue();
        //Date
        this.getView().byId("datePickerFirst").setValue();
        this.getView().byId("datePickerSecond").setValue();
        //Remaining
        this.getView().byId("remainingShelfLifeFirstInput").setValue();
        //this.getView().byId("byPeriod").setSelectedIndex(-1);
      },
      onExecutePress: function () {
        this.getView().byId("shelfLifeListReport").setVisible(false);
        this.getView().byId("tableForShelfLifeList").setVisible(true);
        this.getView().byId("shelfLifeListSmartTable").rebindTable();
        
      },
      onFilterConstruction:function(){
        //Article ValueHelp
        var filters = []
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
        //site Dropdown
        if(this.getView().byId("siteFirstInput").getSelectedKey().length > 0 && this.getView().byId("siteSecondInput").getSelectedKey().length > 0){
          filters.push(new sap.ui.model.Filter("Werks","BT",this.getView().byId("siteFirstInput").getSelectedKey(),
          this.getView().byId("siteSecondInput").getSelectedKey()));
        }else if(this.getView().byId("siteFirstInput").getSelectedKey().length > 0 && this.getView().byId("siteSecondInput").getSelectedKey().length == 0){
          filters.push(new sap.ui.model.Filter("Werks","EQ",this.getView().byId("siteFirstInput").getSelectedKey()));
        }else if(this.getView().byId("siteFirstInput").getSelectedKey().length == 0 && this.getView().byId("siteSecondInput").getSelectedKey().length > 0){
          filters.push(new sap.ui.model.Filter("Werks","EQ",this.getView().byId("siteSecondInput").getSelectedKey()));
        }
        //Storage Location ValueHelp
        if(this.getView().byId("stgLocMultiInput").getValue().length > 0 && this.getView().byId("stgLocSingleInput").getValue().length > 0){
            filters.push(new sap.ui.model.Filter("Lgort","BT",this.getView().byId("stgLocMultiInput").getValue(),
            this.getView().byId("stgLocSingleInput").getValue()));
        }
        //else if(this.getView().byId("stgLocMultiInput").getValue().length > 0 && !(this.getView().byId("stgLocSingleInput").getEnabled())){
          else if(this.getView().byId("stgLocMultiInput").getValue().length > 0 && this.getView().byId("stgLocMultiInput").getValue().split(",").length > 1){      
        var stgLocMultiInput = this.getView().byId("stgLocMultiInput").getValue().split(","),
          stgLocValueFilters = [];
          for(var m =0;m<stgLocMultiInput.length;m++){
            stgLocValueFilters.push(new sap.ui.model.Filter("Lgort","EQ",stgLocMultiInput[m]));
          }
            filters.push(new sap.ui.model.Filter(stgLocValueFilters,false));
        }else if(this.getView().byId("stgLocMultiInput").getValue().length > 0 && this.getView().byId("stgLocSingleInput").getValue().length == 0){
          filters.push(new sap.ui.model.Filter("Lgort","EQ",this.getView().byId("stgLocMultiInput").getValue()));
        }else if(this.getView().byId("stgLocMultiInput").getValue().length == 0 && this.getView().byId("stgLocSingleInput").getValue().length > 0){
          filters.push(new sap.ui.model.Filter("Lgort","EQ",this.getView().byId("stgLocSingleInput").getValue()));
        }
        //Brand Valuehelp
        if(this.getView().byId("brandMultiInput").getValue().length > 0 && this.getView().byId("brandSingleInput").getValue().length > 0){
          filters.push(new sap.ui.model.Filter("BrandId","BT",this.getView().byId("brandMultiInput").getValue(),
          this.getView().byId("brandSingleInput").getValue()));
      }
      //else if(this.getView().byId("brandMultiInput").getValue().length > 0 && !(this.getView().byId("brandSingleInput").getEnabled())){
        else if(this.getView().byId("brandMultiInput").getValue().length > 0 && this.getView().byId("brandMultiInput").getValue().split(",").length > 1){  
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
      //created on Datepicker
      if(this.getView().byId("datePickerFirst").getValue().length > 0 && this.getView().byId("datePickerSecond").getValue().length > 0){
        var formattedBeginDate = new Date(new Date(this.getView().byId("datePickerFirst").getValue()).toString().split("GMT ")[0] + " UTC ").toISOString();
        var formattedEndDate = new Date(new Date(this.getView().byId("datePickerSecond").getValue()).toString().split("GMT ")[0] + " UTC ").toISOString();
        filters.push(new sap.ui.model.Filter("Hsdat", "BT", formattedBeginDate, formattedEndDate));
      }else if(this.getView().byId("datePickerFirst").getValue().length > 0 && this.getView().byId("datePickerSecond").getValue().length == 0){
        var formattedBeginDate = new Date(new Date(this.getView().byId("datePickerFirst").getValue()).toString().split("GMT ")[0] + " UTC ").toISOString();
        filters.push(new sap.ui.model.Filter("Hsdat","EQ",formattedBeginDate));
      }else if(this.getView().byId("datePickerFirst").getValue().length == 0 && this.getView().byId("datePickerSecond").getValue().length > 0){
        var formattedEndDate = new Date(new Date(this.getView().byId("datePickerSecond").getValue()).toString().split("GMT ")[0] + " UTC ").toISOString();
        filters.push(new sap.ui.model.Filter("Hsdat","EQ",formattedEndDate));
      }
      //Remaining Shelf Life input field
      var remainingShelfLifeFirstInput = this.getView().byId("remainingShelfLifeFirstInput").getValue();
      var remainingShelfLifeSecondInput = this.getView().byId("remainingShelfLifeSecondInput").getValue();
      if(remainingShelfLifeFirstInput.length > 0 && remainingShelfLifeSecondInput.length > 0){
       filters.push(new sap.ui.model.Filter("PRestzeit", "BT", remainingShelfLifeFirstInput, remainingShelfLifeSecondInput));
      }else if(remainingShelfLifeFirstInput.length > 0 && remainingShelfLifeSecondInput.length == 0){
        filters.push(new sap.ui.model.Filter("PRestzeit","EQ",remainingShelfLifeFirstInput));
      }else if(remainingShelfLifeFirstInput.length == 0 && remainingShelfLifeSecondInput.length > 0){
        filters.push(new sap.ui.model.Filter("PRestzeit","EQ",remainingShelfLifeSecondInput));
      }  
      //Rem. shelf life whse radiobutton
      if(this.getView().byId("Remshelflifewhse").getSelectedIndex() == 0)
      filters.push(new sap.ui.model.Filter("PLagrlz","EQ",true));
      //Total. rem. shelf life radiobutton
      if(this.getView().byId("Remshelflifewhse").getSelectedIndex() == 1)
      filters.push(new sap.ui.model.Filter("PGesrlz","EQ",true));
      //Article with zero stock chechbox    
      if(this.getView().byId("zeroStockArticle").getSelected())
      filters.push(new sap.ui.model.Filter("PNullb","EQ",true));
      //in days radiobutton
      if(this.getView().byId("inDays").getSelectedIndex() == 0)
      filters.push(new sap.ui.model.Filter("PTagfo","EQ",true));
      //by period radiobutton
      if(this.getView().byId("inDays").getSelectedIndex() == 1)
      filters.push(new sap.ui.model.Filter("PPerfo","EQ",'X'));
      if(filters.length == 1)
      return [filters];
      else
      return (new sap.ui.model.Filter(filters,true))
    },
      onNavBackShelfLifeTable: function () {
        this.getView().byId("shelfLifeListReport").setVisible(true);
        this.getView().byId("tableForShelfLifeList").setVisible(false);
      },
      onNavBack: function () {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("stockReports");
      },
      onBeforeRebindTable: function (oEvent) {
        var binding = oEvent.getParameter("bindingParams");
        // var brandFilter1 = new sap.ui.model.Filter("BrandId", "EQ", "FGF");
        // var brandFilter2 = new sap.ui.model.Filter("BrandId", "EQ", "BVF");
        // var brandFilters = new sap.ui.model.Filter([brandFilter1, brandFilter2], false);
        // var formattedBeginDate = new Date(new Date("2023-10-12").toString().split("GMT ")[0] + " UTC ").toISOString();
        // var formattedEndDate = new Date(new Date("2024-01-12").toString().split("GMT ")[0] + " UTC ").toISOString();
        // var dateFilters = new sap.ui.model.Filter("Hsdat", "BT", formattedBeginDate, formattedEndDate);
        // var filter1 = new sap.ui.model.Filter("Werks", "EQ", "6801");
        // var filter2 = new sap.ui.model.Filter("PGesrlz", "EQ", true);
        // var oFilter = new sap.ui.model.Filter([brandFilters, dateFilters, filter1, filter2], true);
        var oFilter = this.onFilterConstruction();
        binding.filters.push(oFilter);
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
          this.valueHelpForArticle .getBinding("items").filter([]);
        this.valueHelpForArticle.open();
      },
      onValueHelpForSiteConfirm: function (evt) {
        //var selectedItems = evt.getParameter("selectedItems"), siteValue="";
        var selectedItems = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths(), siteValue="", formattedText="";
        if (this.articleInputField.sId.indexOf("articleMultiInput") != (-1)){
            for(var m =0 ;m<selectedItems.length;m++){
              formattedText = formatter.precendingZerosRemvoal(evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths()[m].replace("/ValueHelpSet('","").replace("')",""));
              siteValue = siteValue.length == 0 ? formattedText : siteValue + "," + formattedText;
            }
            this.articleInputField.setValue(siteValue);
            if(selectedItems.length == 1)
            this.getView().byId("articleSingleInput").setEnabled(true);
          else
            this.getView().byId("articleSingleInput").setEnabled(false).setValue();
        }
        else{
          this.articleInputField.setValue(evt.getParameter("selectedItems")[0].getTitle());
          this.getView().byId("articleSingleInput").setEnabled(true);
        }
        
      },
      onValueHelpStgLoc : function (evt) {
          if(this.getView().byId("siteFirstInput").getSelectedKey().length > 0){
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
              var siteFilter = new sap.ui.model.Filter("StoreId","EQ",this.getView().byId("siteFirstInput").getSelectedKey());
              this.valueHelpForStorageLoction .getBinding("items").filter([siteFilter]);
            this.valueHelpForStorageLoction.open();
          }else{
              sap.m.MessageBox.error("Please select site before selecting storage location");
          }       
      },
      onValueHelpForStgLocConfirm: function (evt) {
        //var selectedItems = evt.getParameter("selectedItems"), stgLocValue="";
        var selectedItems = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths(), stgLocValue="" ,formattedText="";
        if (this.stgLocInputField.sId.indexOf("stgLocMultiInput") != (-1)){
            for(var m =0 ;m<selectedItems.length;m++){
              formattedText = (evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths()[m].replace("/ValueHelpSet('","").replace("')",""));
              stgLocValue = stgLocValue.length == 0 ? formattedText : stgLocValue + "," + formattedText;
            }
            this.stgLocInputField.setValue(stgLocValue);
            if(selectedItems.length == 1)
            this.getView().byId("stgLocSingleInput").setEnabled(true);
          else
            this.getView().byId("stgLocSingleInput").setEnabled(false).setValue();
        }
        else{
          this.stgLocInputField.setValue(evt.getParameter("selectedItems")[0].getTitle());
          this.getView().byId("stgLocSingleInput").setEnabled(true);
        }
        
      },
      onValueHelpBrand : function (evt) {
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
        var selectedItems = evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths(), brandValue="" ,formattedText="";
        if (this.brandInputField.sId.indexOf("brandMultiInput") != (-1)){
            for(var m =0 ;m<selectedItems.length;m++){
              formattedText = (evt.getSource().mAggregations._dialog.getContent()[1].getSelectedContextPaths()[m].replace("/ValueHelpSet('","").replace("')",""));
              brandValue = brandValue.length == 0 ? formattedText : brandValue + "," + formattedText;
            }
            this.brandInputField.setValue(brandValue);
            if(selectedItems.length == 1)
            this.getView().byId("brandSingleInput").setEnabled(true);
          else
            this.getView().byId("brandSingleInput").setEnabled(false).setValue();
        }
        else{
          this.brandInputField.setValue(evt.getParameter("selectedItems")[0].getTitle());
          this.getView().byId("brandSingleInput").setEnabled(true);
        }
        
      },
      onSearch:function(evt){
          var searchString = evt.getParameter("value");
          if(searchString.length > 0){
            evt.getSource().getBinding("items").sCustomParams = "search=" + searchString;
            if(evt.getSource().getBinding("items").sFilterParams.indexOf("STG_LOC")){
              var siteFilter = new sap.ui.model.Filter("StoreId","EQ",this.getView().byId("siteFirstInput").getSelectedKey());
              evt.getSource().getBinding("items").filter([siteFilter]);
            }else            
           evt.getSource().getBinding("items").filter([]);
          }else{
            if(evt.getSource().getBinding("items").sFilterParams.indexOf("STG_LOC")){
              var siteFilter = new sap.ui.model.Filter("StoreId","EQ",this.getView().byId("siteFirstInput").getSelectedKey());
              evt.getSource().getBinding("items").sCustomParams = "";
              evt.getSource().getBinding("items").filter([siteFilter]);
            }else{
              evt.getSource().getBinding("items").sCustomParams = "";
            evt.getSource().getBinding("items").filter([]);
            }
         
          }
          
      },
      onSearchForBrand:function(evt){
        var searchString = evt.getParameter("value");
        if(searchString.length > 0){
          evt.getSource().getBinding("items").sCustomParams = "search=" + searchString;   
           evt.getSource().getBinding("items").filter([]);
        }else{
          evt.getSource().getBinding("items").sCustomParams = "";   
           evt.getSource().getBinding("items").filter([]);
        }
      }
      // onValueHelpForSiteClose :function(evt){
      //   this.valueHelpForSite.close();
      // },
    });
  }
);
