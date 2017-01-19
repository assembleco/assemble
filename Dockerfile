FROM ruby:2.4.0

RUN apt-get update -qq

# Add proper source for nodejs
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash

RUN apt-get install -y \
      build-essential \
      build-essential \
      chrpath \
      libfontconfig1 \
      libfontconfig1-dev \
      libfreetype6 \
      libfreetype6-dev \
      libpq-dev \
      libssl-dev \
      libxft-dev \
      nodejs

RUN mkdir /app
WORKDIR /app

ADD Gemfile Gemfile.lock /app/
RUN bundle install
