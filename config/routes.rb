# frozen_string_literal: true

Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]

  resources :users, only: [:new, :create]

  resources :triggers, only: [:index, :new, :create, :edit, :update] do
    resources :events, only: [:create]
  end

  # App paths
  get "/apps/:username/:appname", to: "apps#show", as: :app
  get "/apps/:username", to: "apps#index", as: :user_apps

  # Block paths
  get "/blocks/:username", to: "blocks#index", as: :user_blocks
  get "/blocks/:username/new", to: "blocks#new", as: :new_block
  get "/blocks/:username/:blockname", to: "blocks#show", as: :block
  get "/blocks/:username/:blockname/edit", to: "blocks#edit", as: :edit_block
  post "/blocks/:username", to: "blocks#create"
  # Block runs
  post "/blocks/:username/:blockname/runs", to: "runs#create", as: :runs
  get "/blocks/:username/:blockname/runs/:block_run_id", to: "runs#show", as: :run
  # Block env variables
  get "/blocks/:username/:blockname/env/new", to: "env_variables#new", as: :new_env
  post "/blocks/:username/:blockname/env", to: "env_variables#create", as: :env
  delete "/blocks/:username/:blockname/env/:id", to: "env_variables#destroy", as: :destroy_env

  get "/explore", to: "explore#index", as: :explore
  root to: "welcome#index"
end
