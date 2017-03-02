# This script walks you through getting the application 
# up and running on the DigitalOcean One-click Docker server.
#
# It isn't meant to be run as a script,
# because it still requires some manual intervention.
# Still, it should be pretty straightforward to set everything up.

ssh-keygen
# copy `~/.ssh/id_rsa.pub` into GitHub SSH key list

# Make sure we have swap space so we don't run out of memory
free -m
# If the swap space doesn't exist (values are 0), Create a swap file
mkdir -v /var/cache/swap
cd /var/cache/swap
dd if=/dev/zero of=swapfile bs=1K count=4M
chmod 600 swapfile
mkswap swapfile
swapon swapfile
# Turn the swap file on at startup
echo "/var/cache/swap/swapfile none swap sw 0 0" | tee -a /etc/fstab

# Allow ports and turn on the firewall
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 9000/tcp
ufw enable

git clone git@github.com:graysonwright/appfactory
cd appfactory
./bin/setup

# change variables in .env:
ASSET_HOST=foo.example.com
APPLICATION_HOST=foo.example.com
PORT=443
SECRET_KEY_BASE=`rake secret`

# TODO: update this for docker-compose
# See:
# https://community.letsencrypt.org/t/nginx-docker-setup-for-le/2621
# https://thisendout.com/2016/04/21/letsencrypt-certificate-generation-with-docker/
# https://getcarina.com/blog/push-button-lets-encrypt/
# https://github.com/smashwilson/lets-nginx
#
# Set up SSL
# Follow instructions at
# https://github.com/lgromanowski/letsencrypt-plugin/wiki/Installation-guide
# to set up config/letsencrypt_plugin.yml and config/routes.rb
mkdir key certificates challenge
openssl genrsa 4096 > key/keyfile.pem
cat 'gem "letsencrypt_plugin"' >> Gemfile
bundle

# We need to run the server in development mode while the letsencrypt_plugin
# does its thing.
# Make sure `RACK_ENV=development` in the `.env` file
rm bin/serve
cp bin/serve.dev bin/serve
./bin/docker-compose up -d
./bin/docker-compose run --rm web bash -c 'bundle && rake letsencrypt_plugin'
# Now that we're done, switch back to production mode.
# Remember `RACK_ENV=production` in the `.env` file.
rm bin/serve
cp bin/serve.production bin/serve

./bin/docker-compose up -d
