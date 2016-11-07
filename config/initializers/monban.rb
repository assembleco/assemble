Monban.configure do |config|
  config.find_method = ->(params) do
    Monban.config.user_class.find_by(params)
  end
end
