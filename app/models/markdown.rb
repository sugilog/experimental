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

  DEFAULT_RENDERER_OPTIONS = {
    filter_html:          true,
    safe_links_only:      true,
    with_toc_data:        true,
    hard_wrap:            true,
    prettify:             true,
    link_attributes:      true,
    no_images:            false,
    no_links:             false,
    no_styles:            false,
    xhtml:                false,
  }

  DEFAULT_EXTENSIONS = {
    tables:                       true,
    fenced_code_blocks:           true,
    autolink:                     true,
    strikethrough:                true,
    lax_spacing:                  true,
    underline:                    true,
    highlight:                    true,
    quote:                        true,
    superscript:                  true,
    no_intra_emphasis:            false,
    disable_indented_code_blocks: false,
    space_after_headers:          false,
    superscript:                  false,
  }

  def initialize(options = {})
    renderer_options = DEFAULT_RENDERER_OPTIONS.merge( options[:renderer] || {} )
    extensions =       DEFAULT_EXTENSIONS.merge( options[:extension] || {} )

    renderer = Custom.new renderer_options
    @renderer = Redcarpet::Markdown.new renderer, extensions
  end

  def render(text)
    @renderer.render text
  end
end
