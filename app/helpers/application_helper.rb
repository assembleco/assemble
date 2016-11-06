module ApplicationHelper
  def highlight_json(json)
    CodeRay.
      scan(json, :json).
      div.
      html_safe
  end

  def highlight_flow(flow)
    language = {
      ruby: :ruby,
      node: :javascript,
      python2: :python,
    }.with_indifferent_access[flow.environment]

    CodeRay.scan(flow.body, language).div.html_safe
  end
end
