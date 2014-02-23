class Markdown
  NO_TURBOLINK_PATTERN = /#no_turbolink$/

  attr_reader :parser

  DEFAULT_PARSER = 'GFM'

  def initialize(options = {})
    @parser = options[:input] || DEFAULT_PARSER
  end

  def render(text)
    Kramdown::Document.new(text, input: @parser).to_html
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

