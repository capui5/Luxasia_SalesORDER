sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.luxasia.salesorder.controller.stockReports", {
        onInit: function() {
        },
        onNavBack:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("mainmenu");
        },
        onShelfLifeListReport:function(){
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.navTo("shelfLifeListReport");
      },
      onDisplayWarehouseStockReport:function(){
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("displayWarehouseStockReport");
    },
    onSalesOrderListReport:function(){
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("salesOrderListReport");
  }
      });
    }
  );
  