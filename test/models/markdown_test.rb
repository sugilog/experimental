require 'test_helper'

class MarkdownTest < ActiveSupport::TestCase
  setup do
    @markdown = Markdown.new
  end

  test "render with link should add data-no-turbolink" do
    link_text = "[sample](/sample/index.html)"

    rendered = @markdown.render link_text

    assert_match /<a\s[^>]*data-no-turbolink[^>]*>sample<\/a>/, rendered
  end
end
