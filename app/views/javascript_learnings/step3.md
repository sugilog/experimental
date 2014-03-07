JS.Step3 <small>関数とスコープ。</small>
==========================================================

かなり堅い話が続きますが超大事です。

関数
------------------------------------------------------------

Rubyで言うメソッドと同じようなものです。
サブルーチン、とも言えるでしょうか。

ある処理のまとまり、です。


### 呼び出し方
関数の呼び出し方は、決まりがあります。
```js
関数()
```

引数がある場合には、、、
```js
関数(引数...)
```

オブジェクトのメソッド的な呼び出しであれば、
```js
オブジェクト.関数(引数...)
```

となります。

例えば、すでにStep2で出てきていますが、ディベロッパーツールで提供されている関数に、`console.log`という関数があります。
`console.log`は、メッセージとして表示したい文字列やオブジェクトをとるので、

```js
console.log( "message" );
```

として呼び出すことができます。


### JavaScriptとして提供されていて、よく使う関数

`Object#toString();` : 文字列に変換します。

`Array#join( connector );` : 配列を繋ぎます。connectorが指定されていない場合は、カンマ（`,`）で繋ぎます。

`Array#push( object );` : 配列にobjectを追加します。

`Regexp#test( string );` : 文字列を正規表現と比較します。

`String#match( regexp );` : 文字列と正規表現を比較し、マッチした内容を配列で返します。

などなど。



関数の定義
------------------------------------------------------------

### ベーシックな定義
まずは基本から。

```js
function basicStyle( a, b ) {
  // 何か、、、
}
```

### 変数に代入する形で定義
よく使うようになります。

```js
var varStyle = function( a, b ) {
  // 何か、、、
}
```

### 無名関数
引数に関数を渡すような時にたまに使います。
実際には、先程の変数に代入する関数定義も、無名関数です。

```js
console.log( function() { 1 + 1 } );
```

### その場で実行するだけの関数
たまに使いますが、次で説明するスコープを限定する際に、有効です。

```js
var a = 1;

( function( i ) {
  function what() {
    console.log( i.toString() );
  }

  what();
})( a );
```

上記の例だと、consoleに1と表示されます。


### メソッドスタイル
自分でオブジェクトを拡張していくような方法です。

```js
var a = {
  what: function() {
    console.log( this.toString() );
  }
};
a.howLong = function() {
  console.log( this.toString().length );
}
```


### 関数の引数
関数定義時に、引数を0個以上設定することが可能です。

### 関数の返り値
関数の内部で、`return なにか`が書かれている場合のみ、関数に返り値が存在します。returnを省略可能なRubyとはかなりの違いです。

```js
var a = 0;

// 返り値無し
function add( i ) {
  a = i;
}

// 返り値あり
function get() {
  return a;
}

get();    //=> 0
add( 1 ); //=> undefined
get();    //=> 1
add( 3 ); //=> undefined
get();    //=> 4
```


スコープ
------------------------------------------------------------
Rubyや他のプログラミング言語でもスコープ、ということが良く話題になります。
JavaScriptでは特に、変数（オブジェクト）についてのスコープが重要です。

### スコープは関数単位
JavaScriptには、Rubyでいうclassやmoduleという処理をまとめる単位が、明示的には存在しません。
スコープを持つのは、必ず関数単位です。

```js
var a = 0;

function awesome() {
  var suffix = " !!!";
  console.log( a + suffix );
}

awesome();    //=> "0 !!!"
a;            //=> 0
suffix;       //=> エラー
```

関数内部で、`var`つきで定義された変数は、関数の外側からは参照できません。

varを忘れたら、、、
```js
var a = 0;

function awesome() {
  suffix = " !!!";
  console.log( a + suffix );
}

awesome();    //=> "0 !!!"
a;            //=> 0
suffix;       //=> " !!!"
```

外側からみえてしまうのですね。つまり、関数内部の処理が、意図していない形で変化してしまう可能性がある、ということです。

仮に以下のようなことをしたらどうでしょう？？

```js
var a = 0;
function awesome() {
  var a = "!!!"
  consnole.log( a );
}
awesome(); //=> なにが表示されると思いますか？
a;         //=> どの値が変えると思いますか？
```


仮に一時的にだけ色々処理したいけど、関数として定義するまでも無いけど、、、みたいなときに、関数定義のところで扱った、その場で実行スタイルの関数を使います。

```js
var i, j = 100;

( function() {
  var i, j;
  for ( i = 0; i < 10; i++ ) {
    for ( j = 0; j < 2; j++ ) {
      console.log( i + j );
    }
  }
})();

j; //=> 100;

```


### 基本の関数定義とスコープ

```js
function basicStyle( a, b ) {
  // 何か、、、
}
```

と定義した場合、その文脈の中でのスコープに定義されます。

```js
( function() {
  function hoge() {
    console.log( "hoge!!!" );
  }

  hoge();
})();

hoge();
```

`var`と似たような意味合いで覚えておくと良いかもしれません。


* * * *


クロージャ
------------------------------------------------------------
スコープをうまく利用して、処理を限定的に閉じ込めながらプログラミングを行う手法です。

```js
var human = function( name ) {
  var age = 0;

  return {
    profile: function() {
      return "name (" + age ")";
    },
    getOld: function() {
      age++;
    }
  }
};

var sugilog = human( "sugilog" );
sugilog.profile() //=> "sugilog (0)"
sugilog.getOld();
sugilog.profile() //=> "sugilog (1)"
name;             //=> エラー
age;              //=> エラー
sugilog.name      //=> エラー
sugilog.age       //=> エラー
```

スコープの中で説明したとおり、大事なデータを隠しながら、処理を隠蔽しながら、安全に機能提供をすることが可能になります。


call と apply
------------------------------------------------------------
JavaScriptの関数はただただ定義し、使う、ということだけではありません。
関数もひとつのオブジェクトで、呼び出し方を工夫することが可能です。

例えば、
```js
( function() {} ).toString() //=> "function (){}"
```
と表示されるだけですが、
```js
({}).toString().call( function() {} ); //=> [object Function]
```
と表示されるものが変わります。

これは、`toString`という関数でも、その関数が定義されている場所によって処理が違うことがあるからです。
この違いを利用したJavaScriptのプログラミングノウハウも存在しています。


もともとそのオブジェクトに定義されていない関数も実行可能です。

```js
"hoge".join()                       //=> エラー
Array.prototype.join.call( "hoge" ) //=> "h,o,g,e"
```



関数定義時の引数
------------------------------------------------------------
正確には、仮引数と呼ばれるものになります。
仮、なので、仮引数の数より多かったり、少なかったりする引数を渡しても、JavaScriptではエラーになりません。

さらに動的に引数を処理するのであれば、以下のようにします。

```
var dynamic = function() {
  return Array.prototype.slice.call( arguments );
}

dynamic( 1, 2, 3, 4, 5 );
//=> [ 1, 2, 3, 4, 5 ];
```

argumentsというのが、関数内部で参照可能なオブジェクトで、そこには実行時に渡された引数が全て参照可能になっています。

