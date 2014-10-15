class Markdown
  NO_TURBOLINK_PATTERN = /#no_turbolink$/

  attr_reader :parser

  DEFAULT_PARSER = 'GFM'

  CUSTOM_TAG = /\[\[Image\((\d+)_(\d+)\)\]\]/

  def initialize(options = {})
    @parser = options[:input] || DEFAULT_PARSER
  end

  def render(text)
    text = Kramdown::Document.new(text, input: @parser).to_html
    convert_custom_tag text
  end

  def convert_custom_tag(text)
    text.gsub CUSTOM_TAG, <<-PATTERN
<span class="thumbnail_image">
  <div class="image_mask" data-id="\\1" style="display: block;">
    <a onclick="alert('hoge\\1'); return false;" href="#">
      \\2
    </a>
  </div>
  <img src="/images/image_\\1_\\2" />
</span>
    PATTERN
  end
end

class Kramdown::Converter::Html
  def convert_a_with_no_turbolink(element, indent)
    _attr = element.attr

    if Markdown::NO_TURBOLINK_PATTERN =~ element.attr['href']
      element.attr['data-no-turbolink'] = true
      element.attr['href'].sub! Markdown::NO_TURBOLINK_PATTERN, ''
    end

    convert_a_without_no_turbolink element, indent
  end
  alias_method_chain :convert_a, :no_turbolink
end

