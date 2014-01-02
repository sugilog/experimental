class JavascriptLearningsController < ApplicationController
  before_filter :set_markdown

  private

  def set_markdown
    @markdown = Markdown.new
  end

  def action_missing(_action_name, *args)
    @markdown_template = find_markdown _action_name
    @content = compile_markdown

    render :template
  end

  # raise ActionView::MissingTemplate
  def find_markdown(name)
    partial = false

    details = {
      formats:  [:md],
      locale:   [],
      handlers: []
    }

    view_paths.find name, controller_name, partial, details
  end

  def compile_markdown
    content = @markdown_template.render view_context, false
    @markdown.render content
  end
end
