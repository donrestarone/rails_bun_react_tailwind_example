require "test_helper"

class MutationsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get mutations_create_url
    assert_response :success
  end
end
