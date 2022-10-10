package org.acme;

public class KeycloakInfo {

    private final String url;
    private final String realm;
    private final String clientId;

    public KeycloakInfo(String url, String realm, String clientId) {
        this.url = url;
        this.realm = realm;
        this.clientId = clientId;
    }

    public String getUrl() {
        return url;
    }


    public String getRealm() {
        return realm;
    }


    public String getClientId() {
        return clientId;
    }
}
