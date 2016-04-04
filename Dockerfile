FROM inclusivedesign/nodejs:4.3.1

COPY . /tmp/build

WORKDIR /tmp/build

RUN yum -y install make && \
    npm install && \
    grunt copy:frontEndDependencies && \
    grunt dist && \
    cp -R ./dist /srv/www && \
    yum -y autoremove make && \
    cd /tmp && \
    rm -rf /tmp/build

COPY provisioning/*.yml /etc/ansible/playbooks/

COPY provisioning/start.sh /usr/local/bin/start.sh

WORKDIR /etc/ansible/playbooks

RUN ansible-galaxy install -fr requirements.yml && \
    ansible-playbook docker.yml --tags "install,configure" && \
    chmod 755 /usr/local/bin/start.sh

EXPOSE 8888

ENTRYPOINT ["/usr/local/bin/start.sh"]
