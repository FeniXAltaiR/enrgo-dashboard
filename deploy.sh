#!/usr/bin/env bash

yarn build

scp -r dist/monitoring root@enrgocon.com:/opt/traefik/web/app/static/
scp -r dist/index.html root@enrgocon.com:/opt/traefik/web/app/templates/monitoring.html

ssh -t root@enrgocon.com "cd /opt/traefik/web/app/ && docker-compose restart && exit ; bash --login"