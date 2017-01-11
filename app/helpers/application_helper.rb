require 'digest/md5'

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

  def avatar_for(user)
    email_address = user.email.downcase
    hash = Digest::MD5.hexdigest(email_address)
    image_tag(
      "https://www.gravatar.com/avatar/#{hash}",
      alt: "Avatar for #{user.username}",
    )
  end

  def prettify(json)
    JSON.pretty_generate(JSON.parse(json))
  end
end
