Step0 <small>JavaScriptがウェブアプリケーションで行っていることを知る。</small>
==========================================================

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



フォームをインタラクティブにする
----------------------------------------------------------
例えば、、、、

- githubで[あたらしいリポジトリを作る](https://github.com/new)ときのフォームでは、リポジトリの名前のかぶりチェックを入力されていくたびに行われます。
- agodaで[料金チェックの条件を設定する](http://www.agoda.com/)ときのフォームでは、日付の入力やチェックアウト日の再計算が行われます。

sugilogのリポジトリにもフォーム向けのJavaScriptがいくつかコミットされています。

- [jquery.daterangepicker](https://github.com/sugilog/jquery.daterangepicker)
- [jquery.selectpicker](https://github.com/sugilog/jquery.selectpicker)
- [jquery.tokenpicker](https://github.com/sugilog/jquery.tokenpicker)


動的な操作を実現する
----------------------------------------------------------
例えば、、、、

- Googleカレンダーのような[インターフェース](/calendar/sample.html#no_turbolink)をつくることで、スケジュールを視覚的に調整できるようにすることができます。
- RubyGems.orgで採用されているような[テキストをクリップボードにコピーする](http://rubygems.org/gems/rails)機能をflashと接続して実現することで、ユーザーにより簡易な操作を提供できるようになります。
- データを入力して、[多彩かつ複雑なグラフ](http://d3js.org/)をユーザーに見せることもできます。
- [3Dのゲーム](http://www.ambiera.com/copperlicht/demos.html)にさえ利用できます。

sugilogのリポジトリでもクリップボードにコピーする仕組みを真似たものがあります。

- [jquery.clipify](https://github.com/sugilog/jquery.clipify)

※ちなみにflashで使われる言語（actionscript）も[JavaScriptと同じ標準（ECMA Script）](http://www.ecmascript.org/)を元にしている言語です。


ウェブマスターのためのツール
----------------------------------------------------------
Googleのサービスを例として

### Google Analytics


### Google Tag Manager


ウェブアプリケーション以外では、、、
----------------------------------------------------------
- chromeの拡張機能
- chromeやfirefoxのユーザースクリプト




