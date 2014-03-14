JS.Step6 <small>イベントドリブン！</small>
==========================================================

ここでは、JavaScriptをブラウザ向けにプログラミングするうえでとても大切なイベント、というものを学んでいきます。


イベントとは
----------------------------------------------------------

ブラウザ上で起きる出来事を表します。
例えば、、、

- ページが読み込まれた
- ユーザーが画像をクリックした
- ユーザーがキーボードで入力した
- ユーザーページをスクロールした
- 10秒経過した

などなど

多くはユーザーの行動に起因しているもので、JavaScriptがページをより動的にだったり、よりインタラクティブにだったりするような、そんなことをするための仕組みです。

説明を多くしても分かりづらさがますので、早速手を動かしましょう。


windowの読み込みに連動する
------------------------------------------------------------

よくやるのは、windowの読み込みが完了したら何かする、というものです。
windowというのは、documentの上の概念ですが、深く考えなくても大丈夫です。

```html
<html>
  <head>
    <title>
      Sample
    </title>
  </head>
  <body>
    <h1>
      Sample HTML
    </h1>

    <script type="text/javascript">
      window.addEventListener(
        "load",
        function( event ) {
          alert( "読み込み完了！" );
        },
        false
      );
    </script>

    <img src="http://lorempixel.com/100/100/" />
    <img src="http://lorempixel.com/200/100/" />
    <img src="http://lorempixel.com/100/200/" />
  </body>
</html>
```

ここで使っている`addEventListener`というメソッドがイベントドリブンで使う代表的なメソッドです。
第一引数にどんなイベントの種類なのか、第二引数には関数（遅れて実行する内容）が指定されます。第三引数の説明は一旦省略。

このサンプルだと、画像の読み込みに少し時間がかかるので、それらの読み込みを優先して、そのあとで処理が実行される、というケースになります。

[サンプルHTML]( /javascript_learnings_resources/step6/window_load_sample.html#no_turbolink )


クリックに連動する
------------------------------------------------------------

ページをインタラクティブにする方法の代表格が、ユーザーのクリックに反応するイベントです。

```html
<html>
  <head>
    <title>
      Sample
    </title>
  </head>
  <body>
    <h1>
      Sample HTML
    </h1>

    <img src="http://lorempixel.com/100/100/" />
    <span>
      Click image!
    </span>

    <script type="text/javascript">
      var img = document.getElementsByTagName( "img" )[ 0 ]
      img.addEventListener(
        "click",
        function( event ) {
          alert( event.target.src );
        },
        false
      );
    </script>
  </body>
</html>
```

先ほどと同じ`addEventListener`を使っているのですが、ページの読み込みでは処理されませんでした。
第一引数に指定しているのが、クリックに変わったからです。なので、画像をクリックしてみてください。

`addEventListener`で付け加え。
遅れて実行される関数には、`event`というオブジェクトが引数で渡されます。
この`event`というオブジェクトはイベントに関連することをいろいろ知っているので、イベントドリブンなプログラミングにはかなり重要です。

[サンプルHTML]( /javascript_learnings_resources/step6/click_sample.html#no_turbolink )


キーボードの入力に反応する
------------------------------------------------------------

少し変わり種ですが、例えば、ページにショートカットキーを追加したい、という場合に使用します。

```html
<html>
  <head>
    <title>
      Sample
    </title>
  </head>
  <body>
    <h1>
      Sample HTML
    </h1>

    <script type="text/javascript">
      document.addEventListener(
        "keypress",
        function( event ) {
          alert( "Key: " + event.which );
        },
        false
      );
    </script>
  </body>
</html>
```

先程紹介した`event`というオブジェクトから、押されたキーの種類を拾っています。
実際には、「k」とか「5」とかを直接教えてくれるのではないですが、キーの番号から、どのキーが押されたのかを特定可能です。

これを使って、ページにショートカットキーを加えたりいろいろできるようになります。

[サンプルHTML]( /javascript_learnings_resources/step6/key_sample.html#no_turbolink )


ちょっと後に実行する
------------------------------------------------------------

例えば、ページ訪問後5秒後に「読んでくれてありがとう」と表示する、みたいな。

```html
<html>
  <head>
    <title>
      Sample
    </title>
  </head>
  <body>
    <h1>
      Sample HTML
    </h1>

    <script type="text/javascript">
      setTimeout(
        function() {
          alert( "読んでくれてありがとう" );
        },
        5000
      );
    </script>
  </body>
</html>
```

[サンプルHTML]( /javascript_learnings_resources/step6/set_timeout_sample.html#no_turbolink )

`setTimeout`の第一引数には関数（遅れて実行する内容）、第二引数には遅延時間（何ミリ秒後に実行するか）を指定します。
遅延時間はミリ秒単位なので、5000としても、実際には5秒後です。

似たようなメソッドに、`setInterval`というものもあり、これは指定時間ごとに繰り返し実行するために使用します。


* * * *


実行の優先順位を下げる
------------------------------------------------------------

JavaScriptでは、特にページの読み込み開始直後では、様々な処理が大量に走るため、処理は混雑します。
そんなときに、だいたい今のタイミングで実行したいけど、他の処理をブロックしたくない場合に使えるテクニックです。

```js
window.setTimeout(
  function() {
    // some processes
  },
  0
)
```

`setTimeout`で`delay = 0`で実行すると、0ミリ秒後に実行、ということだけを認識させて今は実行しないので、実際には数ミリ秒後に実行されることになります。


















