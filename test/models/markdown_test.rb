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
end
