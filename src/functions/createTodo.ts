import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";
import crypto from "node:crypto";

interface ICreateUserTodo {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;

  const { deadline, title } = JSON.parse(event.body) as ICreateUserTodo;

  const id = crypto.randomUUID();

  await document
    .put({
      TableName: "users_todo",
      Item: {
        id,
        deadline: new Date(deadline).toUTCString(),
        done: false,
        title,
        user_id,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Tarefa criada!",
      data: { id, deadline, title },
    }),
  };
};
