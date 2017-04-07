require 'digest/md5'

module ApplicationHelper
  DOCS_PATHS = {
    root: "https://www.notion.so/Assemble-Documentation-006d3d9b69a0409ba8c456b08acc9cf1",
    serverless_functions: "https://www.notion.so/assemble/Glossary-107d90a48c6441f79ff35b6943cc3fad#44c9a85610884b45a1f8941e4f9d9f9c",
  }

  def avatar_for(user)
    hash = Digest::MD5.hexdigest(user.email || "")

    image_tag(
      "https://www.gravatar.com/avatar/#{hash}?d=retro",
      alt: "Avatar for #{user.handle}",
      class: "avatar",
    )
  end

  def docs_link(topic = :root)
    path = DOCS_PATHS.fetch(topic)
    link_to t("docs.#{topic}"), path
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

    markdown.render(source.to_s).html_safe
  end

  def react_component(name, props = {}, options = {}, &block)
    html_options = options.reverse_merge(data: {
      react_class: name,
      react_props: (props.is_a?(String) ? props : props.to_json)
    })

    content_tag(:div, '', html_options, &block)
  end
end
