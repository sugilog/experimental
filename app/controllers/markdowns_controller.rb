class MarkdownsController < ApplicationController
  before_filter :set_markdown

  def index
  end

  def preview
    render json: {
      html: @markdown.render(params[:markdown])
    }
  end

  private

  def set_markdown
    @markdown = Markdown.new
  end
end
