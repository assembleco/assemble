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
    config.browserify_rails.commandline_options = "-t [ babelify --presets [ es2015 react stage-0 ] --plugins [ syntax-async-functions transform-regenerator ] ]"
  end
end
