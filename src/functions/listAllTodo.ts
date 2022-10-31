import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;

  const response = await document
    .scan({
      TableName: "users_todo",
      FilterExpression: "user_id = :user_id",
      ExpressionAttributeValues: {
        ":user_id": id,
      },
    })
    .promise();

  return {
    statusCode: 400,
    body: JSON.stringify({
      data: response.Items,
    }),
  };
};
