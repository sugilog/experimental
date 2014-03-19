JS.Step8 <small>（実践）RailsとAjaxなアプリケーション。</small>
==========================================================

Railsが提供するAjaxなヘルパー View編
------------------------------------------------------------

### `link_to_remote`

[API Dock]( http://apidock.com/rails/ActionView/Helpers/PrototypeHelper/link_to_remote )

Railsが提供するリンクを生成するメソッド、`link_to` の Ajax仕様版。
Rails 3以降は、`link_to`にオプション`{:remote => true}`を渡すことで実現可能。

`link_to_remote`は、GETリクエスト以外にも、POSTなどのリクエストも生成可能。
削除用のリンクなど、フォームを毎回生成するのはムダだし、でもリクエスト的にはGETじゃだめだし、というような場合にも柔軟に対応可能。


### `remote_form_for`

[API Dock]( http://apidock.com/rails/ActionView/Helpers/PrototypeHelper/remote_form_for )

Railsが提供するフォームを生成するメソッド、`form_for` の Ajax仕様版。
Rails 3以降は、`form_for`にオプション`{:remote => true}`を渡すことで実現可能。


Railsが提供するAjaxなヘルパー Controller編
------------------------------------------------------------

### `render :json`

[API Dock]( http://apidock.com/rails/v2.3.8/ActionController/Base/render )
see: Rendering JSON

JSONとは、JavaScriptの連想配列に近しい、データの構造を表記するための方法。
例えば、以下のような記述を行う。

```js
[{
  "hoge": 1,
  "fuga": {
    "bar": "baz"
  }
}]
```

この表記方法を使って、レスポンスを生成すると、Rails（などのウェブサーバー側のアプリケーション）が扱っているオブジェクトの情報を、ブラウザに教えることが出来る。


### `render :update &block`

[API Dock]( http://apidock.com/rails/v2.3.8/ActionController/Base/render )
see: Rendering inline JavaScriptGenerator page updates

Railsのcontrollerがリクエストに対してレスポンスを指定する際に使う`render`メソッドに、`:update`を指定してあげると、Ajax仕様のレスポンスを作ることができる。
インラインRJSみたいな言い方もする。


### `page`

上記の`render :update &block`のブロックから取得できるオブジェクト。
`page`は、Ajaxなレスポンスを生成するためのメソッドを多く知っている。
直接JavaScriptを書かなかったとしてもRailsのヘルパーメソッドである程度Ajaxなアプリケーションを作ることができる。

