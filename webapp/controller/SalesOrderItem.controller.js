sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/PDFViewer",
  ],

  function (BaseController, Filter, FilterOperator, PDFViewer) {
    "use strict";
    function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    }
    return BaseController.extend("com.luxasia.salesorder.controller.SalesOrderItem", {
      onInit: function () {
        // this._pdfViewer = new PDFViewer();
        // this.getView().addDependent(this._pdfViewer);
        if (!this.valueHelpForPdfViewer)
          this.valueHelpForPdfViewer = new sap.ui.xmlfragment("com.luxasia.salesorder.view.pdfViewerForSalesOrder", this);
        this.getView().addDependent();
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

        oRouter.getRoute("SalesOrderItem").attachMatched(this._onRouteMatched, this);

        var oModel = this.getOwnerComponent().getModel("SelectedCustomerModel");
        this.getView().setModel(oModel, "SelectedCustomerModel");

      },
      _onRouteMatched: function (oEvent) {
        var that = this;
        var oArgs = oEvent.getParameter("arguments");
        var sSalesOrderNo = oArgs.SSalesno;
        this.sSalesOrderNo = sSalesOrderNo;
        var oModel = this.getOwnerComponent().getModel("mainModel");
        var oJsonModel = this.getView().getModel("SelectedCustomerModel");
        var oFilter = new sap.ui.model.Filter("SalesorderNo", sap.ui.model.FilterOperator.EQ, sSalesOrderNo);

        // Read data from the model using the provided URL
        oModel.read("/SalesOrderItemSet", {
          filters: [oFilter],
          success: function (oData) {
            console.log(oData);


            oData.results.forEach(function (item) {
              item.Discount = parseFloat(item.Discount).toFixed(2);
              item.NetPrice = parseFloat(item.NetPrice).toFixed(2);
              item.RetailPrice = parseFloat(item.RetailPrice).toFixed(2);
              item.TargetQty = parseFloat(item.TargetQty).toFixed(0);
              item.TaxAmount = parseFloat(item.TaxAmount).toFixed(2);
            });// Assuming results contains the array of data
            oJsonModel.setData(oData.results);
            that.getView().setModel(oJsonModel, "SelectedCustomerModel");

            console.log(oJsonModel)
            // You can process the data here
          },
          error: function (error) {
            // Handle errors during the fetch
            console.error("Error fetching data:", error);
          }
        });
      },


      onOpenPDFPress: function () {
      
        var sServiceURl = "/sap/opu/odata/sap/ZSDGW_CE_APP_SRV/PdfPrintSet(SalesOrderNo='" + this.sSalesOrderNo + "',Action='PDF')/$value";

        // Make an AJAX request to fetch the PDF data
        $.ajax({
          url: sServiceURl,
          method: "GET",
          xhrFields: {
            responseType: 'blob'
          },
          success: function (data) {

            var reader = new FileReader();

            reader.onloadend = function () {

              var base64Data = reader.result;
              var html = this.valueHelpForPdfViewer.getContent()[0];
              this.valueHelpForPdfViewer.getCustomHeader().getContentMiddle()[0].setText( this.sSalesOrderNo);
              html.setContent('<iframe src="' + base64Data + '" width="100%" height="1000rem"></iframe>');
              this.valueHelpForPdfViewer.open();
              var getMyFrame = document.getElementById("idFrame");
              getMyFrame.focus();
              getMyFrame.contentWindow.print();
              // var pdfFrame = window.frames["idFrame"];
              // pdfFrame.focus();
              // pdfFrame.print();
              // var myModel = this.getView().getModel();

              //   var base64WithoutPrefix = base64Data.substring(base64Data.indexOf(',') + 1);

              //   if (base64Data) {

              //     if (base64WithoutPrefix) {
              //       var pdfBlob = b64toBlob(base64WithoutPrefix, 'application/pdf');

              //       var pdfBlobUrl = URL.createObjectURL(pdfBlob);
              //       this._pdfViewer.setSource(pdfBlobUrl);
              //       this._pdfViewer.setTitle("My Custom Title");
              //       this._pdfViewer.open();
              //       window.open(pdfBlobUrl);

              //     } else {
              //       console.error("Error splitting base64 data.");
              //     }
              //   } else {
              //     console.error("Base64 data is undefined or null.");
              // }
            }.bind(this);

            // Read the blob data as a data URL
            reader.readAsDataURL(data);
          }.bind(this),
          error: function (error) {
            console.error("Error fetching PDF:", error);
          }
        });
      },

      handlePdfViewerCancel: function () {
        this.valueHelpForPdfViewer.close();
    
      },
      onGoSalesCompletion: function () {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("salescompletion");

    },
    });
  }
);
