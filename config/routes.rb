# frozen_string_literal: true

Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
  resources :feeds, only: [:index, :new, :create, :edit, :update]

  # User path
  resources :users, only: [:new, :create, :show], param: :username
  resource :user, only: [:edit, :update], as: :profile

  resources :connections, only: [:create]
  resources :subscriptions, only: [:create]

  # App paths
  get "/apps/new", to: "apps#new", as: :new_app
  post "/apps", to: "apps#create"
  get "/apps/:username", to: "apps#index", as: :user_apps
  get "/apps/:username/:appname", to: "apps#show", as: :app
  get "/apps/:username/:appname/edit", to: "apps#edit", as: :edit_app
  patch "/apps/:username/:appname", to: "apps#update", as: :update_app
  # App block runs
  get "/apps/:username/:appname/runs/:block_run_id", to: "block_runs#show", as: :block_run

  # Block paths
  get "/blocks/new", to: "blocks#new", as: :new_block
  post "/blocks", to: "blocks#create"
  get "/blocks/:username", to: "blocks#index", as: :user_blocks
  get "/blocks/:username/:blockname", to: "blocks#show", as: :block
  get "/blocks/:username/:blockname/edit", to: "blocks#edit", as: :edit_block
  patch "/blocks/:username/:blockname", to: "blocks#update", as: :update_block
  # Block env variables
  get "/blocks/:username/:blockname/env/new", to: "env_variables#new", as: :new_env
  post "/blocks/:username/:blockname/env", to: "env_variables#create", as: :env
  delete "/blocks/:username/:blockname/env/:id", to: "env_variables#destroy", as: :destroy_env

  # Event paths
  post "/events/:feed_id", to: "events#create", as: :events

  get "/explore", to: "explore#index", as: :explore
  root to: "welcome#index"
end
