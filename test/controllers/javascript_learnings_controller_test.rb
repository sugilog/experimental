require 'test_helper'

class JavascriptLearningsControllerTest < ActionController::TestCase
  setup do
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_template :template
    assert_not_nil assigns(:markdown)
    assert_match /index\.md/, assigns(:markdown_template).inspect
  end

  test "should not get unknown markdown file" do
    assert_raise ActionView::MissingTemplate do
      get :indexx
    end
  end
end
