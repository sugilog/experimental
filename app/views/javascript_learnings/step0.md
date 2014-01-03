JS.Step0 <small>JavaScriptがウェブアプリケーションで行っていることを知る。</small>
==========================================================

JavaScriptは、もともと書類（document）であった静的なHTMLが、そのコンテンツを動的になり、さらにユーザー操作に対して応えるようになっていくことで、活用の幅が広がってきています。


静的な使い方
----------------------------------------------------------
例えば、このページの下部の copyright 部分にある年の表記。

※このサイトでは都合上、サンプルコードのような表記は使用していませんが。。。

```html
<p>
  &copy;
  sugilog
  <script type="text/javascript">document.write( new Date().getFullYear() );</script>
</p>
```

htmlファイルをサーバーに設置しておくだけにしているようなサイトで、表示されたタイミングに合わせて表示コンテンツを切り替えるために使用します。

例では、`<script ... >`と`</script>`に囲まれている部分の記述がJavaScriptで書かれていて、HTMLが描画される際に一度だけ実行されます。


コンテンツをリッチにする
----------------------------------------------------------
例えば、画像をスライドショーとして表示させたり、大きい画像を表示させるようなこともJavaScriptで実現できます。

コンテンツをリッチに表現することで、ユーザーのコンテンツへの興味をより引き出させたり、ユーザーがもっと詳しく見たいことを見せられるように、書類という域から少しずつ変化していきます。


フォームをインタラクティブにする
----------------------------------------------------------
例えば、、、

- githubで[あたらしいリポジトリを作る（要ログイン）](https://github.com/new)ときのフォームでは、リポジトリの名前のかぶりチェックを入力されていくたびに行われます。
- agodaで[料金チェックの条件を設定する](http://www.agoda.com/)ときのフォームでは、日付の入力やチェックアウト日の再計算が行われます。

sugilogのリポジトリにもフォーム向けのJavaScriptがいくつかコミットされています。

- [jquery.daterangepicker](https://github.com/sugilog/jquery.daterangepicker)
- [jquery.selectpicker](https://github.com/sugilog/jquery.selectpicker)
- [jquery.tokenpicker](https://github.com/sugilog/jquery.tokenpicker)

※githubでのチェックには、[Ajax](https://developer.mozilla.org/en/docs/AJAX)が利用されます。


動的な操作を実現する
----------------------------------------------------------
例えば、、、

- Googleカレンダーのような[インターフェース](/calendar/sample.html#no_turbolink)をつくることで、スケジュールを視覚的に調整できるようにすることができます。
- RubyGems.orgで採用されているような[テキストをクリップボードにコピーする](http://rubygems.org/gems/rails)機能をflashと接続して実現することで、ユーザーにより簡易な操作を提供できるようになります。
- データを入力して、[多彩かつ複雑なグラフ](http://d3js.org/)をユーザーに見せることもできます。
- [3Dのゲーム](http://www.ambiera.com/copperlicht/demos.html)にさえ利用できます。

sugilogのリポジトリでもクリップボードにコピーする仕組みを真似たものがあります。

- [jquery.clipify](https://github.com/sugilog/jquery.clipify)

※flashで使われる言語（actionscript）も[JavaScriptと同じ標準（ECMA Script）](http://www.ecmascript.org/)を元にしている言語です。

※3Dの描画には[WebGL](https://developer.mozilla.org/en-US/docs/Web/WebGL)という仕様が利用されます。


リアルタイムウェブの実現
----------------------------------------------------------
例えば、New Bambooが提供する[Pusher](http://pusher.com/)では、リアルタイムウェブのブラウザ側の技術として、JavaScriptを利用した技術を提供するなど、ページを開いたユーザーの操作がなくても、他のユーザーの行動によって次々に更新されていくような技術としても利用されます。

※[WebSockets](https://developer.mozilla.org/en/docs/WebSockets)という仕様が利用されます。



ウェブアプリケーション以外では、、、
----------------------------------------------------------
ウェブに関連して、JavaScriptが利用されているものがあります。

- Chromeの拡張機能は、Chromeが拡張したJavaScriptによって機能を構成します。
- ChromeやFirefoxのユーザースクリプトは、JavaScriptのファイルを用意することで、ページを簡単に機能拡張できます。
- [node.js](http://nodejs.org/)は、プログラミング言語としてのJavaScriptを、ブラウザではなくサーバーで利用するプログラミング言語に展開しています。
- Google AnalyticsやGoogle Tag managerは、ウェブマスターのためのツールとして、JavaScriptを活用してウェブアプリケーションをより向上させていくために機能提供されています。
  - Google Analytics - ページが表示されたことや、ユーザーがページ内でどんな操作をしたのか、など、ページをユーザーがどのよに利用しているのかを知るために、JavaScriptが活用されています。
  - Google Tag Manager - 直接HTMLを編集して、Google Analyticsを含む様々なツールの「タグ」を挿入しないでも良いようにするために、Google Tag Managerでは、JavaScriptが活用されています。


