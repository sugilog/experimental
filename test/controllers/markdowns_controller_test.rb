require 'test_helper'

class MarkdownsControllerTest < ActionController::TestCase
  setup do
  end

  test "should get index" do
    get :index
    assert_response :success
  end
end
