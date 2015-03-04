QUnit.test( 'trim()', function( assert ) {
  
  var  trim = function (text) {
    return (text || '').replace(/^\s+|\s+$/g, '');
  }

  assert.ok(trim('') == '', 'Empty string');
  assert.ok(trim('   ') === '', 'String with Spaces');
  assert.ok(trim() === '', 'Without params');

  assert.ok(trim(' x') == 'x', 'Начальные пробелы');
  assert.ok(trim('x ') == 'x', 'Концевые пробелы');
  assert.ok(trim(' x ') == 'x', 'Пробелы с обоих концов');
  assert.ok(trim('    x  ') == 'x', 'Табы');
  assert.ok(trim('    x   y  ') == 'x   y', 'Табы и пробелы внутри строки не трогаем');

});

QUnit.test( 'bytesToSize()', function( assert ) {
  
  var bytesToSize = function (bytes) {
      var sizes = ['Bytes', 'KB', 'MB'];
      if (!bytes) return 0; 
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return (bytes / Math.pow(1024, i)).toFixed(1);
  };
   assert.ok(bytesToSize() === 0 , 'Empty string');
   assert.ok(bytesToSize(1024) == 1.0 , '1 KB');
   assert.ok(bytesToSize(1024*1024) == 1.0 , '1 MB');

});


QUnit.test( 'rFilter()', function( assert ) {
  
    var rFilter = function(arg) {
      var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
      return rFilter.test(arg);    
    }

   assert.ok(rFilter('image/jpeg') , 'image/jpeg passed');
   assert.ok(!rFilter('application/pdf') , 'application/pdf passed');

});

QUnit.test( 'async example', function( assert ) {
  
  var done = assert.async();
  var myAsyncFunc = function (cb) {
    setTimeout(function() {
      assert.ok(true, "test async" );
      cb();
    },5000);   
  };

  myAsyncFunc(function(){
    done();
  });

});


QUnit.test( 'async example with few async functions', function( assert ) {
  
  expect(2);
  var done = assert.async();
  
  (function (cb) {
    setTimeout(function() {
      assert.ok(true, "test async 1" ); //expect1
      cb();
    },1000);   
  })(function(){

    setTimeout(function() {
      assert.ok(true, "test async 2" );//expect2
      done();
    },1000);   

  });


});

QUnit.test( 'test user actions, test tab-key ', function( assert ) {
  

  function KeyLogger( target ) {
    if ( !(this instanceof KeyLogger) ) {
      return new KeyLogger( target ); // this instanceof KeyLogger
    }
    this.target = target;
    this.log = [];
   
    var self = this;
   
    this.target.off('keydown').on('keydown', function( event ) {
      self.log.push( event.keyCode );
    });
  }

  //testing:
  var keys = KeyLogger($(document)); //this instanceof Window === true
  var ev = $.Event( "keydown" ); 
  ev.keyCode = 9;
  $(document).trigger(ev);

  assert.ok(keys.log.length && keys.log[0] === 9, "keyCode 9 success" );

});

QUnit.test( 'test DOM ', function( assert ) {
  var el = $('#qunit-fixture');
  el.append('<div></div>');
  assert.ok($('div', el).length === 1, "success" );
});


