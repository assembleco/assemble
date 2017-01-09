module ApplicationHelper
  def highlight_json(json)
    CodeRay.scan(json, :json).div.html_safe
  end

  def highlight_block(block)
    language = {
      ruby: :ruby,
      node: :javascript,
      python2: :python,
    }.with_indifferent_access.fetch(block.environment)

    CodeRay.scan(block.body, language).div.html_safe
  end

  def prettify(json)
    JSON.pretty_generate(JSON.parse(json))
  end
end
