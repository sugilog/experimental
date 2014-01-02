require 'redcarpet'

class Markdown
  class Custom < Redcarpet::Render::HTML
    include ActionView::Helpers::UrlHelper

    def link(link, title, content)
      link_to content, link, :title => title, :"data-no-turbolink" => true
    end
  end

  attr_reader :renderer

  def initialize(option = {})
    option.reverse_merge! autolink: true, space_after_headers: true, tables: true
    @renderer = Redcarpet::Markdown.new Custom, option
  end

  def render(text)
    @renderer.render text
  end
end
