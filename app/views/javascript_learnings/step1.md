JS.Step1 <small>JavaScriptでのプログラミングに触る。</small>
==========================================================

ここではさわりとして[jQuery](http://jquery.com/)を利用してJavaScriptを体験してみます。
（jQueryとは何か？はまた後で説明します。）

また、ブラウザは[Chrome](https://www.google.com/chrome)を使用します。


JavaScriptに触れてみる
----------------------------------------------------------
サンプルとして以下のHTMLを使ってみます。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>JS.Step 1</title>
  </head>
  <body>
    <section>
      <h1>myself</h1>
      <strong>sugilog</strong><br />
      <img src="http://www.gravatar.com/avatar/0bccf5267899a6a3179031ae5ec1b325.png" />
    </section>

    <section>
      <h2>socail</h2>
      <dl>
        <dt>github</dt>
        <dd><a href="https://github.com/sugilog"><img src="http://localhost:3333/javascript_learnings_resources/step1/images/github.png" /></a></dd>
        <dt>facebook</dt>
        <dd><a href="https://www.facebook.com/sugilog"><img src="http://localhost:3333/javascript_learnings_resources/step1/images/facebook.png" /></a></dd>
      </dl>
    </section>

    <section>
      <h2>languages</h2>
      <ul>
        <li>Ruby :D
        <li>JavaScript :D
      </ul>
    </section>
  </body>
</html>
```

このファイルに、JavaScriptを2つ読み込みます。（headの閉じタグの前にscriptタグを追加します。）

```html
<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="http://localhost:3333/javascript_learnings_resources/step1/slide.js"></script>
```

読み込んだ２つ目のファイル（slide.js）の内容を実行するためのコードを追加します。（headの閉じタグの前にscriptタグを追加します。）

```html
<script type="text/javascript">
  jQuery( function() {
    jQuery( "section" ).html2slide();
  });
</script>
```

ブラウザで見てみましょう。
クリックして、sectionで区切られたなかの内容が順番に表示されましたか？

HTMLだけでは、動きの（あまり）ない文書、でしたが、JavaScriptを組み込むことで、動きが出てきました。


[サンプル](http://localhost:3333/javascript_learnings_resources/step1/slide.html#no_turbolink)



HTML (DOM) を操作してみる
----------------------------------------------------------
また簡単なHTMLを使って体験していきます。
今度のHTMLはjQueryが設置済みの状態から始めます。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>JS.Step 1</title>
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
  </head>
  <body>
    <h1>myself</h1>
    <strong id="myname">sugilog</strong>
  </body>
</html>
```

表示されているのは、myselfでsugilogとなっています。
でも、sugilogはあなたでは無いですよね。

HTMLを直接書き換えてもいいのですが、ここはJavaScriptの勉強。JavaScriptで書き換えてみます。
下のコードを、HTMLのbodyの閉じタグの直前に追加して、**あなたの名前**の部分を、あなたの名前に書き換えてみてください。

```html
<script type="text/javascript">
  var myname = "あなたの名前";
  jQuery( "#myname" ).text( myname );
</script>
```

ブラウザで見てみましょう。
sugilogではない名前が表示されていますか？

かんたんですが、HTMlを操作することができました。

もう少し進めてみましょう。
あなたの名前よりも、myselfという見出しのほうが目立っていますね。名前を目立たせましょう。
下のコードを、先程追加したscriptの閉じタグの前に追加してみてください。

```js
jQuery( "#myname" ).css( { color: "#d52e89" } );
```

ピンクな名前になりました？


[サンプル](http://localhost:3333/javascript_learnings_resources/step1/myname.html#no_turbolink)



デバッガーに触れてみる
----------------------------------------------------------
HTMLを操作してみることはうまくできました？

JavaScriptを使い続けていくと、他のプログラミング言語と同様に、デバッグをしたくなることがあります。

- 正しい状態がHTMLに反映されているのか？
- どこかでバグが発生して、処理が止まってしまってはいないか？

そんなときに、デバッガー（デバッグツール）を使って、確認をします。

今回は、ブラウザとしてChromeを使っているので、[ディベロッパーツール](https://developers.google.com/chrome-developer-tools/)を使用します。

では、先程のHTMLをChromeで開いて、`ctrl`+`shift`+`i`（macなら、`cmd`+`opt`+`i`）でディベロッパーツールを開いてみます。

詳しい使い方は触れませんが、良く見る内容を簡単に解説していきます。
ディベロッパーツールのタブの用に分かれているそれぞれを**ペイン**といいます。

### Elements ペイン
HTMLの現在の状態を確認できます。
先程は、HTMLの操作をしていましたが、HTMLの操作をすれば、もともとのHTMLの内容からは変化した内容に、ブラウザ上ではなっているはずなのです。
その変化した内容を確認したり、はたまた、その場で書き換えてみたりすることができます。
他にも、CSSの内容をチェックしたりもできるので、ディベロッパーツールのホーム的なペインです。

### Network ペイン
開発を進めていくと、大量のファイル（JavaScriptや画像、CSS）をHTMLに読み込ませていくことになるのですが、それらの読み込み時間などなどを見ることができます。

### Sources ペイン
HTMLに読み込まれた、JavaScriptなどを、読み込まれたファイル単位で確認することができます。
ただただファイルの内容を確認するだけではなくて、JavaScriptの処理を途中で止めさせて、その時点でのJavaScriptの内容をチェックしたりできます。（breakpointの挿入）

### Console ペイン
Elementsペインと並んで同じくらい使用するペインです。
一種のログの表示になるのですが、様々な情報を表示させることも可能です。
もちろん、エラーが発生した場合には、エラーの内容も表示されます。
またログを表示するだけではなくて、RubyでいうところのIRB（対話型コンソール）のように使うことができます。



Consoleにログを表示させる
------------------------------------------------------------
ここではためしに、Consoleにログを表示させてみましょう。
あなたの名前、を表示させたHTML内のJavaScriptをすこし編集してみましょう。

この行を追加、と書かれた行（上から２行目）を追加してみてください。

```js
var myname = "あなたの名前";
console.log( myname ); // この行を追加。
jQuery( "#myname" ).text( myname );
jQuery( "#myname" ).css( { color: "#d52e89" } );
```

では、Chromeでディベロッパーツールを表示させ、Consoleペインを表示させたら、HTMLを表示させてみましょう。
Consoleペインにあなたの名前が表示されましたか？

`console.log`は、JavaScriptのデバッグ目的ではとてもよく使う手段です。
もちろん、デバッグ目的に使うのが主なので、サービスリリースするときは、できるだけなくしておくことが必要です。
（ブラウザによっては、`console.log`が何者かわからずに、エラーする場合もあります。）


[サンプル](http://localhost:3333/javascript_learnings_resources/step1/myname_with_console.html#no_turbolink)


Consoleにエラーを表示させてみる
------------------------------------------------------------
もうちょっとだけ、ディベロッパーツールの使い方。

今度は、先程から使っているHTML内のJavaScriptで、エラーが起きるような修正をしてみましょう。
ためしに、文字列をクォーテーションで囲いそこねたとします。

```js
var myname = あなたの名前; // あなたの名前がクォーテーションで囲われていない!!
jQuery( "#myname" ).text( myname );
jQuery( "#myname" ).css( { color: "#d52e89" } );
```

では、Chromeでディベロッパーツールを表示させ、Consoleペインを表示させたら、HTMLを表示させてみましょう。
Consoleペインに赤い文字でエラーが表示されましたか？

Consoleペインでは、あなたのJavaScriptがバグを含んでいた場合に、そのバグの内容を表示してくれます。
実行時に想定していないエラーが確認できるので、Consoleペインを見ることは、JavaScript開発にとってとても重要です。


[サンプル](http://localhost:3333/javascript_learnings_resources/step1/myname_with_error.html#no_turbolink)


Webリファレンスを見る
----------------------------------------------------------
自主学習用途に、ご紹介。

- [MDN JavaScript](https://developer.mozilla.org/ja/docs/Web/JavaScript)
  - ベーシックな検索はMozillaのサイトをおすすめします。
  - 日本語訳されていない内容もあるかもしれないので、英語で慣れてしまうと良いです。
- [MSDN](http://msdn.microsoft.com/library/d1et7k7c.aspx) ※IEのバージョンアップによってURLが変化する可能性があります。
  - IE対応を考える場合は、合わせてMicrosoftのサイトをチェックすると良いです。
- [jQuery API Documentation](http://api.jquery.com/)
  - jQueryのAPIドキュメントです。
  - 日本語サイトもありますが、基本はオフィシャルサイトを利用することですので英語版を。


Webサービスを利用してで学習する
----------------------------------------------------------
自主学習用途に、ご紹介。その2

- [JSFIDDLE](http://jsfiddle.net/)
  - HTML, CSS, JavaScriptを記述して、実行することができます。
  - ライブラリも選択して読み込めるのでサンプルを作って見るときに役立ちます。
- [Codeacademy](http://www.codecademy.com/ja/tracks/javascript)
  - JavaScriptを含め、様々な言語の学習に利用できます。要ログイン。
- [Try jQuery](http://try.jquery.com/)
  - jQueryのラーニングセンターです。


書籍で学ぶ
----------------------------------------------------------
自主学習用途に、ご紹介。その3

- [初めてのJavaScript](http://www.amazon.co.jp/dp/487311425X/?_encoding=UTF8&camp=247&creative=1211&linkCode=ur2&tag=sugilog-js-22)
- [JavaScript 第6版](http://www.amazon.co.jp/dp/4873115736/?_encoding=UTF8&camp=247&creative=1211&linkCode=ur2&tag=sugilog-js-22)
- [パーフェクトJavaScript](http://www.amazon.co.jp/dp/477414813X/?_encoding=UTF8&camp=247&creative=1211&linkCode=ur2&tag=sugilog-js-22)
- [JavaScript Ninjaの極意](http://www.amazon.co.jp/dp/4798128457/?_encoding=UTF8&camp=247&creative=1211&linkCode=ur2&tag=sugilog-js-22)
- [コアjQuery＋プラグイン/jQuery UI 開発実践技法](http://www.amazon.co.jp/dp/4798124281/?_encoding=UTF8&camp=247&creative=1211&linkCode=ur2&tag=sugilog-js-22)


