import Keycloak from 'keycloak-js'

const keycloakConfig = {
  realm: 'enrgo',
  clientId: 'web-api',
  url: 'https://key.enrgocon.com/auth',
}

const keycloak = new Keycloak(keycloakConfig)

keycloak.onTokenExpired = () => {
  keycloak.updateToken(60)
}

export default keycloak
