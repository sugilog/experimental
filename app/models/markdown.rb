class Markdown
  class Custom < Redcarpet::Render::HTML
    include ActionView::Helpers::UrlHelper

    def link(link, title, content)
      no_turbolink_pattern = /#no_turbolink$/

      options = { title: title }

      if link =~ no_turbolink_pattern
        options.update :"data-no-turbolink" => true
        link = link.sub no_turbolink_pattern, ""
      end

      link_to content, link, options
    end
  end

  attr_reader :renderer

  def initialize(option = {})
    option.reverse_merge! autolink: true, space_after_headers: true, tables: true, fenced_code_blocks: true
    @renderer = Redcarpet::Markdown.new Custom, option
  end

  def render(text)
    @renderer.render text
  end
end
