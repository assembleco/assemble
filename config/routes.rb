# frozen_string_literal: true

Rails.application.routes.draw do
  get "/auth/:provider/callback", to: "sessions#create"

  get "/user_info", to: "users#show", as: :user_info
  get "/about", to: "about#index", as: :about

  resource :session, only: [:new, :destroy]
  resources :feeds, only: [:index, :new, :create, :edit, :update]

  # User path
  resources :users, only: [:show], param: :handle
  resource :user, only: [:edit, :update], as: :profile

  resources :connections, only: [:create]
  resources :subscriptions, only: [:create]

  resources :defaults, only: [:create]

  # Block paths
  get "/blocks/new", to: "blocks#new", as: :new_block
  post "/blocks", to: "blocks#create"
  get "/blocks/:handle/:blockname", to: "blocks#show", as: :block
  get "/blocks/:handle/:blockname/edit", to: "blocks#edit", as: :edit_block
  patch "/blocks/:handle/:blockname", to: "blocks#update", as: :update_block
  delete "/blocks/:handle/:blockname", to: "blocks#destroy"

  # Block runs
  get "/blocks/:handle/:blockname/runs/:block_run_id", to: "block_runs#show", as: :block_run
  post "/blocks/:handle/:blockname/runs", to: "block_runs#create", as: :block_runs

  resources :services, only: [:index]

  root to: "blocks#index"
end
