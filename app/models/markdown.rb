require 'redcarpet'

class Markdown
  attr_reader :renderer

  def initialize(option = {})
    option.reverse_merge! autolink: true, space_after_headers: true, tables: true
    @renderer = Redcarpet::Markdown.new Redcarpet::Render::HTML, option
  end

  def render(text)
    @renderer.render text
  end
end
