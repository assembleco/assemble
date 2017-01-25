require 'digest/md5'

module ApplicationHelper
  def avatar_for(user)
    email_address = user.email.downcase
    hash = Digest::MD5.hexdigest(email_address)
    image_tag(
      "https://www.gravatar.com/avatar/#{hash}",
      alt: "Avatar for #{user.username}",
      class: "avatar",
    )
  end

  def external_link_to(text, url, *args)
    url = /^https?\:\/\//i.match(url) ? url : "http://#{url}"
    link_to(text, url, *args)
  end

  def display_json(json)
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

  def prerender_component(component, options)
    react_component(
      component,
      options,
      { prerender: true },
    )
  end

  def prettify(json)
    if json.present?
      JSON.pretty_generate(json)
    else
      ""
    end
  end
end
