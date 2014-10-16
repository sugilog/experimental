class Markdown
  NO_TURBOLINK_PATTERN = /#no_turbolink$/

  attr_reader :parser

  DEFAULT_PARSER = 'GFM'

  def initialize(options = {})
    @parser = options[:input] || DEFAULT_PARSER
  end

  def render(text)
    text = Kramdown::Document.new(text, input: @parser).to_html
  end
end

module Kramdown
  module Converter
    class Html
      def convert_a_with_no_turbolink(element, indent)
        ActiveRecord::Base.logger.debug caller.join("\n")
        _attr = element.attr

        if Markdown::NO_TURBOLINK_PATTERN =~ element.attr['href']
          element.attr['data-no-turbolink'] = true
          element.attr['href'].sub! Markdown::NO_TURBOLINK_PATTERN, ''
        end

        convert_a_without_no_turbolink element, indent
      end
      alias_method_chain :convert_a, :no_turbolink
    end
  end

  module Parser
    class Kramdown
      CUSTOM_IMAGE_TAG = /\[\[Image\(\d+_\d+\)\]\]/
      RID              = /Image\((\d+)_(\d+)\)/

      def initialize_with_custom_image_tag(source, options)
        initialize_without_custom_image_tag(source, options)
        @span_parsers.unshift(:custom_image_tag)
      end
      alias_method_chain :initialize, :custom_image_tag

      def parse_custom_image_tag
        @src.pos += @src.matched_size
        uid = @src.matched[RID, 1]
        iid = @src.matched[RID, 2]

        raw_html = <<-HTML
<span class="thumbnail_image">
  <div class="image_mask" data-id="#{uid}" style="display: block;">
    <a onclick="alert('hoge#{uid}'); return false;" href="#">
      #{uid.to_i + iid.to_i}
    </a>
  </div>
  <img src="/images/image_#{uid}_#{iid}" />
</span>
        HTML
        @tree.children << Element.new(:raw, raw_html)
      end
      define_parser(:custom_image_tag, CUSTOM_IMAGE_TAG)
    end
  end
end

