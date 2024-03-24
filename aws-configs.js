// export const awsConfigs = {
    
//     Auth: {
//         Cognito: {
//           userPoolClientId: '5nue6oidi969plt4p9obi38f2r',
//           userPoolId: 'us-east-2_UuBoDO7H1',
//           userRegion:'us-east-2',
//         }}
// }

export const awsConfigs = {
  aws_cognito_region: "us-east-2", // (required) - Region where Amazon Cognito project was created
  aws_user_pools_id: "us-east-2_UuBoDO7H1", // (optional) -  Amazon Cognito User Pool ID
  aws_user_pools_web_client_id: "5nue6oidi969plt4p9obi38f2r", // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
};
