import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import {Config, CognitoIdentityCredentials} from 'aws-sdk';
import {map} from 'ramda';

import {AWS_COGNITO, AWS_REGION} from 'lib/config';

Config.region = AWS_REGION;
Config.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: AWS_COGNITO.identityPoolId
});

const userPool = new CognitoUserPool({
    ClientId: AWS_COGNITO.clientId,
    UserPoolId: AWS_COGNITO.userPoolId
});

export function authenticateUser (username, password, callback) {
    const authenticationData = {
        Username : username,
        Password : password
    };
    const userData = {
        Username : username,
        Pool : userPool
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log(`Cogito authorizer token: ${result.getIdToken().getJwtToken()}`);
            let login = {};
            login[`cognito-idp.${AWS_REGION}.amazonaws.com/${AWS_COGNITO.userPoolId}`] = result.getIdToken().getJwtToken();
            Config.credentials = new CognitoIdentityCredentials({
                IdentityPoolId : AWS_COGNITO.identityPoolId,
                Logins : login
            });
            callback({success: true});
        },

        onFailure: function (err) {
            console.error(err);
            callback({error: err});
        }
    });
}

export function confirmRegistration (username, confirmationCode, callback) {
    const userData = {
        Username : username,
        Pool : userPool
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
            console.error(err);
            callback({error: err});
            return;
        }
        console.log(`call result: ${result}`);
        callback({success: true});
    });
}

export function signUp (email, password, attributes, callback) {
    const attributeList = map(attr => new CognitoUserAttribute({
        Name: attr.name,
        Value: attr.value
    }), attributes);

    userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
            console.error(err);
            callback({error: err});
            return;
        }
        console.log(`user name is ${result.user.getUsername()}!`);
        console.log(`call result: ${result}`);
        callback({success: true});
    });
}

