module JavascriptLearningsHelper
  def link_to_github_changes(_label, html_options = {})
    url = "http://github.com/sugilog/experimental/commits/master/app/views/#{controller_name}/#{action_name}.md"
    link_to _label, url, html_options.reverse_merge(target: "_blank")
  end
end
