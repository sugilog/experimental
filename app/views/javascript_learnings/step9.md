JS.Step9 <small>（実践）Railsのフォームと組み合わせてみる。</small>
==========================================================

`link_to_remote`や`remote_form_for`など、Ajax化するまで逝かなくても、JavaScriptを組み合わせることでユーザビリティを上げる方法を数点紹介します。
Railsのコードも見ながら、組み合わせて例をつくっていきます。

フォームの生成には、Railsのフォームビルダーを使っているとしてみます。

selectに連動する
------------------------------------------------------------
[API Dock]( http://apidock.com/rails/ActionView/Helpers/FormBuilder/select )

```ruby
<%= form_for @post do |f| %>
  <%= f.select :person_id, Person.all.collect {|p| [ p.name, p.id ] }, { include_blank: true } %>
  <%= f.submit %>
<% end %>
```

とすると、例えば、以下のようなHTMLが生成されます。

```html
<form action="省略">
  <select name="post[person_id]">
    <option value=""></option>
    <option value="1" selected="selected">David</option>
    <option value="2">Sam</option>
    <option value="3">Tobias</option>
  </select>
</form>
```

このコードに対して、JavaScriptで「selectのoptionを選択されたら」という操作を加えてみます。

```js
jQuery( function() {
  jQuery( "select[name^=post]" ).on( "change", function( event ) {
    console.log( this );
  });
});
```

例では、`console`に選ばれた要素を表示するだけですが、callback関数で他の要素を編集したり、他のフォームと連動させたりすると、ユーザビリティを上げるための施策を実現できます。


checkboxに連動する
------------------------------------------------------------
[API Dock]( http://apidock.com/rails/ActionView/Helpers/FormBuilder/check_box )

```ruby
<%= fields_for "project[invoice_attributes][]", invoice, index: nil do |form| %>
  <%= form.check_box :paid %>
<% end %>
```

とすると、例えば、以下のようなHTMLが生成されます。

```html
<input name="project[invoice_attributes][paid]" type="hidden" value="0" />
<input checked="checked" type="checkbox" 省略 name="project[invoice_attributes][paid]" value="1" />
```

このコードに対して、JavaScriptで「check boxのチェックの状態が変化したら」という操作を加えてみます。

```js
jQuery( function() {
  jQuery( "input[type=checkbox]" ).on( "click", function( event ) {
    if ( jQuery( this ).is( ":checked" ) ) {
      console.log( this );
    }
    else {
      console.log( "unchecked" );
    }
  });
});
```

例では、チェック状態を先に切り分けて処理を変えてみています。


submitに連動する
------------------------------------------------------------

`m(_ _)m`

