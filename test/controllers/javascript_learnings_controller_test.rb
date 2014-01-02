require 'test_helper'

class JavascriptLearningsControllerTest < ActionController::TestCase
  setup do
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_template :template
    assert_template layout: "layouts/application"
    assert_not_nil assigns(:markdown)
    assert_match /index\.md/, assigns(:markdown_template).inspect
    assert_equal "text/html; charset=utf-8", response["Content-Type"]
  end

  test "should get index with markdown format" do
    get :index, format: :md
    assert_response :success
    assert_template layout: nil
    assert_not_nil assigns(:markdown)
    assert_match /index\.md/, assigns(:markdown_template).inspect
    assert_equal "text/x-markdown; charset=utf-8", response["Content-Type"]
  end

  test "should get index with printable mode" do
    get :index, printable: 1
    assert_response :success
    assert_template :template
    assert_template layout: "layouts/printable"
    assert_not_nil assigns(:markdown)
    assert_match /index\.md/, assigns(:markdown_template).inspect
    assert_equal "text/html; charset=utf-8", response["Content-Type"]
  end

  test "should not get unknown markdown file" do
    assert_raise ActionView::MissingTemplate do
      get :indexx
    end
  end
end
