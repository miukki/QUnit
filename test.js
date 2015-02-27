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


