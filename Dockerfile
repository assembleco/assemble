FROM ruby:2.4.0

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

# Install phantomJS from the `dependencies/` directory
# ADD dependencies /dependencies
# WORKDIR /dependencies
# RUN tar -xf phantomjs-*.tar.bz2 &&\
    # mv phantomjs-*/bin/phantomjs /bin/ &&\
    # rm -r phantom*

RUN apt-get install -y \
  build-essential \
  chrpath \
  libssl-dev \
  libxft-dev \
  libfreetype6 \
  libfreetype6-dev \
  libfontconfig1 \
  libfontconfig1-dev

RUN mkdir /app
WORKDIR /app

ADD Gemfile Gemfile.lock /app/
RUN bundle install
