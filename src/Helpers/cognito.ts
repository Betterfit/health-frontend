import Amplify, { Auth } from "aws-amplify";

const cognitoConfig = {
  region: process.env.REACT_APP_COGNITO_REGION,
  userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  clientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
};

export const setUpCognito = () => {
  Amplify.configure({
    Auth: {
      region: cognitoConfig.region,
      userPoolId: cognitoConfig.userPoolId,
      userPoolWebClientId: cognitoConfig.clientId,
    },
  });
};

export const signOut = async () => {
  try {
    await Auth.signOut();
    console.log("Successfully logged out");
  } catch (error) {
    console.log("error signing out: ", error);
  }
};

// mocked during jest tests
export const getIdToken = async () => {
  const session = await Auth.currentSession();
  const token = session.getIdToken().getJwtToken();
  return token;
};

// errors thrown by Cognito and our backend
export type ServerException = {
  code: string;
  message: string;
};

export const isServerException = (error: any): error is ServerException => {
  return error?.code !== undefined;
};
