# frozen_string_literal: true

Rails.application.routes.draw do
  post "/api", to: "api#query"

  get "/auth/:provider/callback", to: "sessions#create"
  resource :session, only: [:new, :destroy]

  get "/about", to: "about#index", as: :about

  # Block paths
  resources :blocks, only: [:index, :show, :update, :destroy, :create] do
    resources :runs, only: [:create], controller: :block_runs, as: :block_runs
  end

  root to: "blocks#index"

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/api"
  end
end
