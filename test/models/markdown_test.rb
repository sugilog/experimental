require 'test_helper'

class MarkdownTest < ActiveSupport::TestCase
  setup do
    @markdown = Markdown.new
  end

  test "render with no_turbolink_fragment link should add data-no-turbolink" do
    link_text = "[sample](/sample/index.html#no_turbolink)"

    rendered = @markdown.render link_text

    assert_match /<a\s[^>]*data-no-turbolink[^>]*>sample<\/a>/, rendered
    assert_match /<a\s[^>]*href=\"\/sample\/index\.html\"[^>]*>sample<\/a>/, rendered
  end

  test "render without no_turbolink_fragment link should add data-no-turbolink" do
    link_text = "[sample](/sample/index.html)"

    rendered = @markdown.render link_text

    assert_no_match /<a\s[^>]*data-no-turbolink[^>]*>sample<\/a>/, rendered
    assert_match /<a\s[^>]*href=\"\/sample\/index\.html\"[^>]*>sample<\/a>/, rendered
  end

  test "render with converted custom tag" do
    custom_tag_text = "hoge [[Image(123_456)]] fuga [[Image(33_777)]]"

    rendered = @markdown.render custom_tag_text

    assert_match /data-id="123"/, rendered
    assert_match /data-id="33"/, rendered

    assert_match /\/image_123_456/, rendered
    assert_match /\/image_33_777/, rendered
  end
end
