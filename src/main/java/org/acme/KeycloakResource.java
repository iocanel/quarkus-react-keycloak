package org.acme;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.eclipse.microprofile.config.inject.ConfigProperty;

@Path("/api/keycloak")
public class KeycloakResource {

  @ConfigProperty(name="keycloak.url")
  String keycloakUrl;

  String realm="quarkus";

  @ConfigProperty(name="quarkus.oidc.client-id")
  String clientId;

  @GET
  @Path("info.json")
  @Produces(MediaType.APPLICATION_JSON)
  public KeycloakInfo getInfo() {
    return new KeycloakInfo(keycloakUrl, realm, clientId);
  }
}
