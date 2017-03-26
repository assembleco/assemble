FROM ruby:2.4.0

# Add proper source for nodejs
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash
# Add proper source for yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq

RUN apt-get install -y \
      apt-transport-https \
      build-essential \
      ca-certificates \
      chrpath \
      curl \
      libfontconfig1 \
      libfontconfig1-dev \
      libfreetype6 \
      libfreetype6-dev \
      libpq-dev \
      libssl-dev \
      libxft-dev \
      nodejs \
      software-properties-common \
      yarn

# Install Docker, required for `fn` command
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
RUN add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable" && \
   apt-get update -qq && \
   apt-get install -y docker-ce

# Install IronFunctions `fn` command-line tool
RUN curl -LSs https://goo.gl/VZrL8t | sh

RUN mkdir /app
WORKDIR /app

ADD Gemfile Gemfile.lock /app/
RUN bundle install
