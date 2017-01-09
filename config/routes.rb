# frozen_string_literal: true

Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]

  resources :users, only: [:new, :create] do
    resources :flows do
      resources :runs, only: [:create, :show]
      resources :env_variables, only: [:new, :create, :destroy]
    end
  end

  resources :triggers, only: [:index, :new, :create, :edit, :update] do
    resources :events, only: [:create]
  end

  get "/explore", to: "flows#index", as: :explore
  root to: "welcome#index"
end
