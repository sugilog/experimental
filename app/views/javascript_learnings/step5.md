JS.Step5 <small>DOM</small>
==========================================================

ブラウザで見える部分の話に戻ってきます！

ここでは、JavaScriptをブラウザ上で扱うために必要な概念の一つを勉強します。


DOMとは
----------------------------------------------------------
DOMとは、Document Object Modelの略です。

といってもピンと来ないと思います。

Documentとは、HTMLのことです。そして、そのHTMLをObjectとします。Objectに抽象化したHTMLを扱う概念をDOMと言います。

まだピンと来ないですね。

例えば、以下のようなHTMLがあったとします。

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

    <div id="container">
      <h2>
        Sample Header
      </h2>

      <span class="message">
        message
      </span>

      <br />

      <img src="http://lorempixel.com/100/100/" />

      <br />

      <span class="title">
        image title
      </span>
    </div>
  </body>
</html>
```

HTMLは入れ子の階層になっているので、以下のような形で表せます。（リストで表現しますが、樹形図的にイメージしてみてください。）

- html
  - head
    - title
      - `Sample`
  - body
    - h1
      - `Sample HTML`
    - div#container
      - h2
        - `Sample Header`
      - span.message
        - `message`
      - br
      - img
      - br
      - span.title
        - `image title`

この階層のリストは、タグの名前と、タグの中のテキストで構成していますが、これがDOMのイメージです。
そして、この階層自体を「DOMツリー」と呼びます。

一つ一つをDOM要素、もしくはNodeと呼びます。まずは突っ込んだ説明を抜くために、DOM要素として説明していきます。

DOM要素は、入れ子の階層ですので、以下のような特徴があります。

- 0個か1個の親要素（parent）をもちます。
- 0個以上の兄弟要素（sibling）をもちます。
- 0個以上の子要素（child）をもちます。

また、DOM要素一つ一つは、表現や構造的なバリエーションが持てるように、以下のような特徴ももちます。

- 属性（idやclass、srcなどなど）をもちます。
  - タグの種類によって、付与できる属性は異なります。
- 一部のDOM要素は、子要素を持つことができません。
  - imgや、metaなど。
- テキストもDOM要素ですが、テキストは属性をもつことも、子要素を持つこともありません。

idやclassについては、以下のようなルールが存在します。

- DOMツリー内での制限
  - idは、DOM要素に対して0個か1個指定でき、DOMツリーの中で唯一である必要があります。
  - classは、DOM要素に対して0個以上指定でき、DOMツリーの中で何回でも指定可能です。
- 表現方法
  - idを表現するときは、頭に「#」をつけます。例えば、containerというidを表す場合、`#container`となります。
  - classを表現するときは、頭に「.」を付けます。例えば、messageというclassを表す場合、`.message`となります。


JavaScriptでHTMLを操作する、と言った場合、このDOMツリーに対して、要素を追加したり、削除したり、書き換えたり、ということを行うことを指します。


DOMを取得する
------------------------------------------------------------

まずは、先ほどサンプルで出したHTMLを使用して、DOM要素を取得することをしてみましょう。
以下のサンプルHTMLをブラウザで開いて、ディベロッパーツールを開き、Consoleペインを開いておいてください。

[サンプルHTML]( /javascript_learnings_resources/step5/dom_sample.html#no_turbolink )


### idで取得する

まずは、idでDOM要素を1つ取得することをしてみます。

```js
document.getElementById( "container" );
```

これは、「container」というIDのDOM要素を取得する、ということを表しています。divが取得できたのではないでしょうか？

ちなみに存在しないIDを指定すると、何もとれないだけです。

```js
document.getElementById("unknown");
```

### タグ名で取得する

タグ名でもDOM要素を取得可能です。

```js
document.getElementsByTagName( "span" );
```

これは、spanというタグのDOM要素を取得する、ということを表しています。spanの要素が配列で取得できたのではないでしょうか？

HTMLに含まれないタグを指定するとどうでしょう？

```js
document.getElementsByTagName( "article" );
```

空の配列が返りましたね。

ここで注意して欲しいのは、idで取得するときと、メソッド名が少し違うことです。TagNameではなく、Elementsのほうです。

idは制限として、DOMツリーの中で唯一、と言いました。なので、単数形です。
一方でTagはDOMの中で何回でも使われます。なので、こちらは複数形です。

デフォルトに存在するメソッドではないですが、クラス名で取得するメソッドも存在しています。
クラス名は、DOMツリーの中で何回でも使われるので、こちらも複数形のメソッド名になります。

```js
document.getElementsByClassName( "message" );
```


### document ??

documentとは、Document、なので、HTML自体です。
HTML自体なので、headもbodyも含みます。



DOMを追加する
------------------------------------------------------------

### innerHTMLを使用する

簡単に追加する方法として、まずは、文字列のHTMLを渡してDOMツリーにDOMを追加する方法を学びます。

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

    <div id="container">
      <h2>
        Sample Header
      </h2>

      <span class="message">
        message
      </span>
    </div>

    <script type="text/javascript">
      var div = document.getElementById( "container" );
      div.innerHTML = "<img src='http://lorempixel.com/100/100/' />";
    </script>
  </body>
</html>
```

[サンプルHTML]( /javascript_learnings_resources/step5/inner_html_sample.html#no_turbolink )

まず、DOMをDOMツリーに追加するには、追加したい場所のDOM要素を取得する必要があります。
ここでは、`div#container`にDOM要素を追加したいので、`document.getElementsById( "container" )`によって、`div#container`を取得しています。

innerHTMLにHTMLの文字列を渡すと、DOM要素の中身が、渡された文字列の内容に置き換えられます。
今回は少し危険目のサンプルにしているのですが、innerHTMLは追加というよりも書き換えを行います。
実際には慎重に対応することが必要です。


### appendChildを使用する

少し手間な実装をする必要がありますが、安全に自由度高くDOMを追加することが可能です。

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

    <div id="container">
      <h2>
        Sample Header
      </h2>

      <span class="message">
        message
      </span>
    </div>

    <script type="text/javascript">
      var div = document.getElementById( "container" );
      var element = document.createElement( "img" );
      element.src = 'http://lorempixel.com/100/100/';
      div.appendChild( element );
    </script>
  </body>
</html>
```

[サンプルHTML]( /javascript_learnings_resources/step5/append_child_sample.html#no_turbolink )

さきほどのinnerHTMLと違い、画像を追加しても、`div`の中身のテキストなどが消えていないですよね。
※使い方次第なので、どちらが良いということはありません。

やっていることは、
- JavaScriptが扱えるDOM要素を、作成します。（`createElement`）
- 作成したDOM要素に、属性を適用します。
- 対象となるDOMに追加します。（`appendChild`）

innerHTMLよりも自由度が高いのは、文字列のHTMLでなく、JavaScriptのオブジェクトを扱える点にあります。
似たような使い方が出来るメソッドに（挙動は異なりますが）`insertBefore`というメソッドも存在します。


### document.writeを使用する

最も簡単にDOMを追加する方法ですが、注意点もあるので、後紹介にしました。

以下のサンプルでは、画像をJavaScriptで追加しています。
appendChildなどでDOMを追加するよりもはるかに簡単です。
注意点は色々ありますが、今は説明は省略します。あまり積極的に使うべきメソッドではありません。

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

    <div id="container">
      <h2>
        Sample Header
      </h2>

      <span class="message">
        message
      </span>

      <script type="text/javascript">
        document.write( "<img src='http://lorempixel.com/100/100/' />" );
      </script>
    </div>
  </body>
</html>
```

[サンプルHTML]( /javascript_learnings_resources/step5/write_sample.html#no_turbolink )



* * * *


innerHTMLとappendChild
------------------------------------------------------------

innerHTMLとappendChildは、実は使い方によっては関連性をもちます。

### 文字列のhtmlをDOM要素に変換したい場合

- 適当なDOM要素（A）を作成して、そこにinnerHTMLする。（DOMツリーの中に追加されていなくて良い）
- DOM要素を取り出すには、`A.childNodes`を参照する。

```js
var tmp, i,
    nodes = [];

tmp = document.createElement("div");
tmp.innerHTML( someHTML );

for (i = 0; i < tmp.childNodes.length; i++) {
  nodes.push(tmp.childNodes[i]);
}
```

### nodeオブジェクトを文字列のhtmlに変換したい場合

- 適当なDOM要素を作成して、そこにappendChildする。（DOMツリーの中に追加されていなくて良い）
- 文字列を取り出すには、node.innerHTMLを参照する。

```js
var tmp, html;

tmp = document.createElement("div");
tmp.appendChild( someNode );

html = tmp.innerHTML;
```



