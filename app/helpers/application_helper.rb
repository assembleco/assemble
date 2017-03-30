require 'digest/md5'

module ApplicationHelper
  def avatar_for(user)
    hash = Digest::MD5.hexdigest(user.email || "")

    image_tag(
      "https://www.gravatar.com/avatar/#{hash}?d=retro",
      alt: "Avatar for #{user.handle}",
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

  def markdown(source)
    markdown = Redcarpet::Markdown.new(
      Redcarpet::Render::HTML,
      autolink: true,
      tables: true,
      fenced_code_blocks: true,
    )

    markdown.render(source).html_safe
  end

  def react_component(name, props = {}, options = {}, &block)
    html_options = options.reverse_merge(data: {
      react_class: name,
      react_props: (props.is_a?(String) ? props : props.to_json)
    })

    content_tag(:div, '', html_options, &block)
  end
end
