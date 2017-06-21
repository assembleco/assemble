# frozen_string_literal: true

Rails.application.routes.draw do
  post "/api", to: "api#query"

  get "/auth/:provider/callback", to: "sessions#create"
  resource :session, only: [:new, :destroy]

  get "/about", to: "about#index", as: :about

  # Block paths
  resources :blocks, only: [:index, :show, :update, :destroy, :create]

  # Webhook paths
  post "/webhook/github", to: "webhook_events#create"

  root to: "blocks#index"

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/api"
  end
end
