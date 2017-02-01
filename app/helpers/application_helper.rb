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
    react_component("JSONTree", data: json)
  end

  def highlight_block(block)
    language = {
      ruby: :ruby,
      node: :javascript,
      python2: :python,
    }.with_indifferent_access.fetch(block.environment)

    CodeRay.scan(block.body, language).div.html_safe
  end

  def react_component(name, props = {}, options = {}, &block)
    html_options = options.reverse_merge(data: {
      react_class: name,
      react_props: (props.is_a?(String) ? props : props.to_json)
    })

    content_tag(:div, '', html_options, &block)
  end
end
