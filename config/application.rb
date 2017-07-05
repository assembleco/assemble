require_relative 'boot'
require 'rails/all'
Bundler.require(*Rails.groups)
module AppFactory
  class Application < Rails::Application
    config.assets.quiet = true
    config.generators do |generate|
      generate.helper false
      generate.javascript_engine false
      generate.request_specs false
      generate.routing_specs false
      generate.stylesheets false
      generate.test_framework :rspec
      generate.view_specs false
    end
    config.action_controller.action_on_unpermitted_parameters = :raise
    config.active_job.queue_adapter = :delayed_job

    config.webpack.dev_server.manifest_host = 'webpack'
    config.webpack.dev_server.manifest_port = 8888
    config.webpack.dev_server.port = 8888

    config.autoload_paths += %W(#{config.root}/lib)
  end
end
