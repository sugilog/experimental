require 'test_helper'

class JavascriptLearningsHelperTest < ActionView::TestCase
  helper JavascriptLearningsHelper

  setup do
  end

  test "create link with github url" do
    controller.stubs(:controller_name).returns("javascript_learnings")
    controller.stubs(:action_name).returns("step0")

    assert_equal(
      %!<a href="http://github.com/sugilog/experimental/commits/master/app/views/javascript_learnings/step0.md" target="_blank">changes</a>!,
      link_to_github_changes("changes")
    )
  end

  test "create link with github url with html options" do
    controller.stubs(:controller_name).returns("javascript_learnings")
    controller.stubs(:action_name).returns("step0")

    assert_equal(
      %!<a class="btn" href="http://github.com/sugilog/experimental/commits/master/app/views/javascript_learnings/step0.md" target="_blank">changes</a>!,
      link_to_github_changes("changes", class: "btn")
    )
  end

  test "create link with github url with html target options" do
    controller.stubs(:controller_name).returns("javascript_learnings")
    controller.stubs(:action_name).returns("step0")

    assert_equal(
      %!<a class="btn" href="http://github.com/sugilog/experimental/commits/master/app/views/javascript_learnings/step0.md" target="">changes</a>!,
      link_to_github_changes("changes", class: "btn", target: "")
    )
  end
end
