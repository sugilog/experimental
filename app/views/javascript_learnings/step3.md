JS.Step3 <small>JavaScriptの値</small>
==========================================================

もう少し、堅い話が続きます。

JavaScriptは、プロトタイプベースのオブジェクト指向、とよく言われます。
このあたりの理解を中心に話を進めます。
（オブジェクト指向が何か、とかそういう話はしないです。）


プリミティブとオブジェクト
------------------------------------------------------------
プログラミング言語で扱う値を分類するためによくある、プリミティブ or オブジェクトで区別しておくと、、、

 型               | 例
------------------|--------------------------------------
 **プリミティブ** | 以下のいずれか
 Undefined        | `undefined`
 Null             | `null`
 Boolean          | `true / false`
 Number           | `0, 1, ...`
 String           | `'test'`
 **オブジェクト** | 一例
 Object           | `{}`
 Array            | `[]`
 Date             | `new Date()`
 Function         | `var a = function() {};`


### オブジェクトの種類
オブジェクトは自分でも定義できますが、ブラウザに存在しているものを例えば、ということで紹介します。

Array
: 配列を扱う。
  例) `Array( 1, 2, 3 ) //=> [ 1, 2, 3 ]`

Date
: 日付と時間を扱う。
  例) `new Date().getTimezoneOffset //=> 日本なら -540`

Function
: 関数を扱う。
  例) `var d = new Function( 'a', 'b', 'c', 'return a + b + c;' ); /* 無名関数 */ d( 1, 2, 3 ) //=> 6`

JSON
: JSONオブジェクトを扱う。
  例) `JSON.stringify( { a: 1, b: 2 } ) //=> '{"a":1,"b":2}'`

Node
: HTMLの要素を扱う。
  例) `var div = document.getElementsByTagName("#div")[0]; /* => <div>...</div> */ div.innerHTML('test') //=> <div>test</div>`

Object
: オブジェクトの親玉的なもの。


オブジェクトのイメージ
----------------------------------------------------------
JavaScriptで扱う値は、全てオブジェクトです。（正確には、一部はプリミティブです。）
全て、というのがポイントで、関数であってもオブジェクトです。

とても乱暴な説明をすると、JavaScriptのオブジェクトとは、` { } ` です。
（正確な表現ではないです。あしからず。イメージです。）

Rubyでは、ハッシュと呼ばれるような、Key-Valueの組合せで構成されるデータの持ち方をする**構造**と言えます。
JavaScriptでは、連想配列と呼ばれます。

振り返りですが、JavaScriptの連想配列は、以下のような代入と参照ができます。

代入:

```js
var map = {
  bar: 1,
  baz: 'sample',
  boo: {
    test: 2
  }
};

map[ 'bar' ] = 2;
map.baz = 'sample2';
map.boo.test = 3;
map.test = 4;

// map
// => {
//   bar: 2,
//   baz: 'sample2'
//   boo: {
//     test: 3
//   },
//   test: 4
// };
```

参照:

```js
var map = {
  bar: 1,
  baz: 'sample',
  boo: {
    test: 2
  }
};

map[ 'bar' ]; //=> 1
map.baz;      //=> 'sample'
map.boo;      //=> { test: 2 }
map.boo.test; //=> 2
map.test;     //=> undefined
```

Rubyのハッシュのように、ブラケット` [ ] `を利用して連想配列の中身を参照したり、中身に代入したり出来ています。
一方で、ドット` . `でつないで、メソッドを呼び出すかのようにして、参照したり、代入したりすることも出来ています。

この連想配列の構造がJavaScriptのオブジェクトの基本となります。




オブジェクトを定義する
------------------------------------------------------------
変数を定義することもオブジェクトを定義することです。

```js
var a = {};
var b = [];
```

関数を定義することもオブジェクトを定義することです。

```js
var c = function( i, j ) { return i + j };
function d( i, j ) { return i + j };
```

関数は名前を持っていたりもします。

```js
function e( i, j ) { return i + j };
e.name //=> 'e'
```

Constructorをつくることでクラス的な振る舞いをさせることもできます。

```js
var Notebook = function() {
  var _lines = [];

  this.add = function( line ) {
    _lines.push( line );
  };

  this.get = function() {
    return _lines;
  };
};

Notebook.prototype.write = function( content ) {
  var lines = content.split( /\r\n|\r|\n/ ),
      i = 0;

  for ( ; i < lines.length; i++ ) {
    this.add( lines[ i ] );
  }
};

Notebook.prototype.read = function( indexes ) {
  var lines = [],
      i = 0;

  for ( ; i < indexes.length; i++ ) {
    lines.push( this.get()[ indexes[ i ] ] );
  }

  return lines;
};

var n = new Notebook();
//=> n is a Notebook;
```

Constructorを使わない、処理内容の集合みたいなものを作ることもできます。

```js
var notebook = {
  _lines: [
    // some contents.
  ],
  write: function( content ) {
    var lines = content.split( /\r\n|\r|\n/ ),
        i = 0;

    for ( ; i < lines.length; i++ ) {
      this._lines.push( lines[ i ] );
    }
  },
  read: function( indexes ) {
    var lines = [],
        i = 0;

    for ( ; i < indexes.length; i++ ) {
      lines.push( this._lines[ i ] );
    }

    return lines;
  }
};
```

Constructorを使うか使わないか、に依らずに、オブジェクト指向的な構造を作り、実装を進めていくことができるようになります。



プロトタイプとプロトタイプチェーン
------------------------------------------------------------

JavaScriptでアプリケーションを作っていく場合、プロトタイプ（Prototype）を活用することで大きな力を得ることができます。
正確には異なるものですが、クラスベースの言語にある、クラスの継承のような実装をとることができます。（ここでは、継承という言葉を使って説明していきます。）

例えば以下の実装では、継承後のオブジェクトのプロトタイプで、`toText`という関数の実装を変更し、他のプロトタイプはそのまま利用します。

```js
var Notebook = function() {
  var _lines = [];

  this.add = function( line ) {
    _lines.push( line );
  };

  this.get = function() {
    return _lines;
  };
};
Notebook.prototype = {
  write: function( content ) {
    var lines = content.split( /\r\n|\r|\n/ ),
        i = 0;

    for ( ; i < lines.length; i++ ) {
      this.add( lines[ i ] );
    }
  },
  read: function( indexes ) {
    var lines = [],
        i = 0;

    for ( ; i < indexes.length; i++ ) {
      lines.push( this.get()[ indexes[ i ] ] );
    }

    return lines;
  },
  toText: function() {
    var lines = this.get();

    return lines.join( "\n" );
  }
};

var NumberedNotebook = Notebook;
var rjust = function( number, length, padding ) {
  var padstr = '',
      i = length,
      padding = padding || ' ';

  while ( i-- ) {
    padstr += padding
  }

  return ( padstr + number.toString() ).slice( -1 * length );
};

NumberedNotebook.prototype.toText = function() {
  var i = 0,
      numbered = [],
      lines = this.get(),
      length = lines.length.toString().length;


  for ( ; i < lines.length; i++ ) {
    numbered.push(
      [ rjust( i + 1, length ), lines[ i ] ].join( ': ' )
    );
  }

  return numbered.join( "\n" );
}
```


これは、**プロトタイプチェーン**と呼ばれるプロトタイプの機能が生きており、必要な部分だけを変更し、それ以外は継承元の実装を利用することが安全にできるようになります。
実際には、プロトタイプチェーンはもっとダイナミックな機能であり、以下のような変更を行うことも可能です。

```js
// 先程の続きとして、、、

Notebook.prototype.write = function( content ) {
  var lines = content.split( /\r\n|\r|\n/ ),
      i = 0;

  for ( ; i < lines.length; i++ ) {
    // 空行を削除する。
    if ( lines[ i ].length > 0 ) {
      this.add( lines[ i ] );
    }
  }
};
```

この変更は以下のようなモノにも適用されます。（正確には適用、というと語弊がありますが、詳細は割愛。）

- NumberedNotebookにも適用される。
- 生成済みのインスタンスにも適用される。



* * * *


取り扱い注意
------------------------------------------------------------

### 勝手な上書き注意

連想配列的にオブジェクトを扱うことに慣れると、クラスを作るような形で変数値やメソッドをまとめることをするようになります。
例えば以下の用に関数定義などは、後からでも柔軟に行なえます。

```js
var notebook = {
  _lines: [
    // some contents.
  ]
};

notebook.connector = "\n";
notebook.toText = function() {
  return this._lines( this.connector );
}
```


Rubyや他の言語でも同じですが、JavaScriptでも、Globalに提供されているようなメソッドやプロパティを変更することは良くないです。

```js
// NG
document.body.appendChild = function( node ) {
  alert( node.toString() );
};
```

```js
// NG
jQuery = {
  name: "jQuery",
  hello: function() {
    console.log( "hello" );
  }
}
```


### Prototype注意

Prototypeを使って実装をしていく場合、以下のコードは不用意な上書きが発生する可能性があります。

```js
var A = function() {}, B = function() {};
A.prototype = { hello: 'Hello', bye: 'Bye!!' };
B.prototype = A.prototype;
B.prototype = { hello: 'zzz' }; // bye が消える。
```


