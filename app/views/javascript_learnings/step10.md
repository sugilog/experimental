JS.Step10 <small>JavaScriptの`this`</small>
=======================================================

`this`はキーワードで、関数を呼び出したオブジェクトを指していたりします。
他の言語の`this`、もしくは`self`とはニュアンスが異なります。


Global Context
-------------------------------------------------------

特にどの関数のスコープにも閉じられていないグローバルなコンテキストの中で`this`を参照した時、その`this`はグローバルオブジェクトを参照します。
例えば、以下の例では、`window`が該当します。

```html
<!-- index1.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script type="text/javascript">
    window.windowName = "index1";
    console.log( this, this.windowName );
  </script>
</body>
</html>
```

ちなみにhtmlがiframeに閉じられた場合、そのhtml（`document`）の`window`（`document.defaultView`）が、グローバルオブジェクトになります。

```html
<!-- index2.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script type="text/javascript">
    window.windowName = "index2";
    console.log( this, this.windowName );
  </script>

  <iframe src="./index1.html"></iframe>
</body>
</html>
```


Function Context
-------------------------------------------------------

関数のコンテキストの中で`this`を参照した時には、その関数の呼び出し方によって`this`が変化します。


### `関数()`

関数に`()`をつけてシンプルに呼び出した場合、その関数が定義されたコンテキストが`this`になります。
ただし、strictモードでは挙動が異なることに注意が必要です。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script type="text/javascript">
    function ref1() {
      console.log( this );
    }

    function ref2() {
      "use strict";
      console.log( this );
    }

    ref1();
    ref2();
  </script>
</body>
</html>
```


### メソッドスタイルで呼び出し

メソッドスタイルで関数呼び出しをした場合、その関数を呼び出したオブジェクトが`this`になります。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <script type="text/javascript">
      var human = {
        name: "Bob",
        age: 28,
        inspect: function() {
          console.log( this );
        },
        birthday: {
          year: ( new Date().getFullYear() - 28 ),
          month: 8,
          date: 8,
          inspect: function() {
            console.log( this );
          }
        }
      };

      human.inspect();
      human.birthday.inspect();
    </script>
  </body>
</html>
```

ちなみに、`human.inspect`と`human.birthday.inspect`が同じ実装になっているのでこんなふうにもできます。
`this`の振る舞いを確認して下さい。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <script type="text/javascript">
      function inspect() {
        console.log( this );
      }

      var human = {
        name: "Bob",
        age: 28,
        birthday: {
          year: ( new Date().getFullYear() - 28 ),
          month: 8,
          date: 8
        }
      };

      human.inspect = inspect;
      human.birthday.inspect = inspect;

      inspect();
      human.inspect();
      human.birthday.inspect();
    </script>
  </body>
</html>
```


Constructor
-------------------------------------------------------

コンストラクターから参照するのは、生成されたインスタンスです。関数呼び出しとは挙動がかなり違ってきます。

- コンストラクターを`new`なしで呼び出した場合：関数呼び出しと同じ。インスタンスではない。
- コンストラクターを`new`ありで呼び出した場合：インスタンスが`this`になる。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <script type="text/javascript">
      function Human( name, age ) {
        console.log( this );
        console.log( this instanceof Human );

        this.name = name;
        this.age  = age;
        this.inspect = function() {
          console.log( this );
        };
      }

      Human( "bob", 28 );
      var human = new Human( "john", 20 );
      human.inspect();
    </script>
  </body>
</html>
```


プロトタイプについても、`this`はインスタンスになります。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <script type="text/javascript">
      function Human( name, age ) {
        this.name = name;
        this.age  = age;
      }

      Human.prototype.inspect = function() {
        console.log( this );
      };

      new Human( "bob", 28 ).inspect();
    </script>
  </body>
</html>
```


Call / Apply
-------------------------------------------------------

`call`や`apply`は、関数の実行コンテキストを強制的に変更して関数を呼び出します。そのため、`this`は変化します。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <script type="text/javascript">
      function inspect() {
        console.log( this );
      }

      var human = {
        name: "Bob",
        age: 28,
        inspect: function() {
          console.log( this );
        }
      };

      var dog = {
        name: "Pochi",
        age: 3
      }

      human.inspect();
      human.inspect.call( dog );
    </script>
  </body>
</html>
```

配列ではない`NodeList`や`arguments`を配列的に扱いたい時によく利用します。

```js
( function() {
  console.log( arguments );
  console.log( arguments.join ); //=> undefined
  console.log( Array.prototype.slice.call( arguments ) );
  console.log( Array.prototype.slice.call( arguments ).join ); //=> function
})( "hoge", 1, [ 10, 20, 30 ] );
```


EventHandler
-------------------------------------------------------

`addEventListener`のコールバックの`this`はイベントが発火した要素が`this`になります。
（含めて、コールバックについては、`this`を意図的なオブジェクトにしている実装はよくあるので、注意。）
ちなみに以下の例で、`div.inner`をクリックした時の、`this`と`event.target`の違いに注意。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <div class="sample">
      Sample1
      <div class="inner">
        inner element
      </div>
    </div>
    <div class="sample">
      Sample2
    </div>

    <script type="text/javascript">
      var nodes = document.querySelectorAll( ".sample" );

      Array.prototype.slice.call( nodes ).forEach( function( node ) {
        node.addEventListener(
          "click",
          function( event ) {
            console.log( this );
            console.log( event );
          },
          false
        );
      });
    </script>
  </body>
</html>
```


* * * *


備考
-------------------------------------------------------

`Object.create`した時の説明、`bind`を使用した時の説明は省略。

`Object.create`については、コンストラクターの話と基本的に同じ。

`bind`したときは`call`でコンテキストが与えられない。





