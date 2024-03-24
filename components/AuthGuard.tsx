import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import React, { FC, ReactNode, useEffect, useState } from "react";
import {AuthenticatorRoute} from '@aws-amplify/ui';
import axios from "axios";
import { BASE_URL } from "../utils";

interface CustomizedAuthenticatorProps{
    children: ReactNode,
}

type AuthGuardProps = CustomizedAuthenticatorProps;

export const CustomizedAuthenticator: FC<CustomizedAuthenticatorProps> = ({children}) =>{
    const {route, user} = useAuthenticator((context) => [context.route]);
    const [prevRoute, setPrevRoute] = useState<AuthenticatorRoute>('idle');
  
    useEffect(() => {
      if(prevRoute === 'transition' && route === 'authenticated'){
        const accessToken = user?.getSignInUserSession()?.getAccessToken().getJwtToken();
        axios.post(`${BASE_URL}/api/v1/user/new`,{
          email: user.attributes?.email
        },{
          headers:{
            'Content-Type': "application/json",
            'cognito-token': accessToken,
          }
        }).then((res) => {
          console.log(res);
        });
      }
      setPrevRoute(route);
    },[route])
  
  
    return(
    <Authenticator
          // will wrap every subcomponent
          Container={(props) => (
            // reuse default `Container` and apply custom background
            <Authenticator.Container
              {...props}
              
            />
          )}
          // will render on every subcomponent
          
          components={{
            SignIn: ({ fields, ...props }) => {
              const customizedSignInFields = [...fields];
              customizedSignInFields[0] = {
                name: "username",
                label: "Email",
                placeholder: "Enter your email address",
                required: true,
                type: "email"
              };
              return (
                <Authenticator.SignIn
                {...props}
                fields={customizedSignInFields}
              />
              );
            },
            SignUp: ({ fields, ...props }) => {
              const customizedSignUpFields = [...fields];
              customizedSignUpFields[0] = {
                name: "username",
                label: "Email",
                placeholder: "Enter your email address",
                required: true,
                type: "email"
              };
              customizedSignUpFields.push({
                name: "familty_name",
                label: "Last name",
                placeholder: "Enter your last name",
                type: "default",
              })
              customizedSignUpFields.push({
                name: "given_name",
                label: "First name",
                placeholder: "Enter your last name",
                type: "default",
              })
  
              return (
                <Authenticator.SignUp
                {...props}
                fields={customizedSignUpFields}
              />
              );
              
            },
          }}
        >
          {children}
        </Authenticator>
  
  )};

export const AuthGuard:FC<AuthGuardProps> = ({children}) => {
    return (
    <Authenticator.Provider>
      <CustomizedAuthenticator>{children}</CustomizedAuthenticator> 
    </Authenticator.Provider>
    )
}