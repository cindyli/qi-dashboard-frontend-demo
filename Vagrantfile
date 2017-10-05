# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "inclusivedesign/centos7"

  config.vm.network "forwarded_port", guest: 8888, host: 8888

  # Mounts node_modules in /var/tmp to work around issues in the VirtualBox shared folders
  config.vm.provision "shell", run: "always", inline: <<-SHELL
    sudo mkdir -p /var/tmp/qi-dashboard/node_modules /vagrant/node_modules
    sudo chown vagrant:vagrant -R /var/tmp/qi-dashboard/node_modules /vagrant/node_modules
    sudo mount -o bind /var/tmp/qi-dashboard/node_modules /vagrant/node_modules
    sudo rpm -i --nosignature --force 'https://rpm.nodesource.com/pub_8.x/el/7/x86_64/nodesource-release-el7-1.noarch.rpm'
    sudo yum install -y nodejs gcc-c++ make
    sudo npm install --global yarn
    yarn global add grunt-cli --no-progress
    cd /vagrant && yarn install --no-progress --ignore-scripts --production=false
    sudo chown -R vagrant /vagrant/node_modules
    cd /vagrant && grunt installFrontEnd
  SHELL
end
