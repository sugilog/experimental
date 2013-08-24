class MarkdownsController < ApplicationController
  before_filter :set_markdown
  layout 'printable', only: :print

  def index
  end

  def print
    @content = @markdown.render params[:markdown]
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
