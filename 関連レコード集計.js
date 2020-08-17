(function() {
  'use strict';

  // ※フィールドコード入力部分の[]は不要です。フィールドコードのみ入力してください。

  var events = [
    'app.record.detail.show',
    'app.record.edit.show'
  ];
  kintone.events.on(events, function(event) {
    
    // 関連レコードの合計値を集計
    var record = event.record;
  
    var clientRecordId = event.recordId;
    var relatedAppId = kintone.app.getRelatedRecordsTargetAppId('[集計したい関連レコードのフィールドコード]');
    var query = '[集計したい関連レコードの「表示するレコードの条件」]=' + clientRecordId;
    var outputFields = ['[関連レコード内の集計したいフィールド名]'];
    var appUrl = kintone.api.url('/k/v1/records');

    var params = {
      'app': relatedAppId,
      'query': query,
      'fields': outputFields
    };
    
    var elementId = 'totalAmount';

    kintone.api(appUrl, 'GET', params, function(resp) {
      var amount = 0;
      for (var i = 0; i < resp.records.length; i++) {
        amount += parseFloat(resp.records[i].[関連レコード内の集計したいフィールド名].value);
      }
        
      // 合計値をフィールドに自動更新で代入
      if ( record.[集計値を入力させたいフィールドのフィールドコード].value != amount){
      
      var appid = kintone.app.getId();
      var recid = kintone.app.record.getId();
      
      var Param = {
          "app":appid,
          "id":recid,
          "record":{
          "[集計値を入力させたいフィールドのフィールドコード]":{
            "value": amount
          },
        },
      };
      
      kintone.api("/k/v1/record",
      "PUT",Param,
        function(resp){
          location.reload(true);
            alert("任意の文章を入力");
          },
          function(resp){
            alert("任意の文章を入力");
          }
        );
      }
    });
  });
})();