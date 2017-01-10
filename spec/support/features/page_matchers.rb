module Features
  def have_heading(heading_text)
    have_css("h1", text: heading_text)
  end
end
