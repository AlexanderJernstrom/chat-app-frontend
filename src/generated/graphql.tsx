import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getUser: User;
  getServers: Array<Server>;
  getMembersInServer: Array<User>;
  getServer: ServerResponse;
  getChannelsInServer: Array<Channel>;
  getMessages: Array<Message>;
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryGetMembersInServerArgs = {
  serverId: Scalars['String'];
};


export type QueryGetServerArgs = {
  id: Scalars['String'];
};


export type QueryGetChannelsInServerArgs = {
  serverId: Scalars['String'];
};


export type QueryGetMessagesArgs = {
  channelId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  serverIds: Array<Scalars['String']>;
};

export type Server = {
  __typename?: 'Server';
  id: Scalars['ID'];
  name: Scalars['String'];
  ownerId: Scalars['String'];
  owner: User;
};

export type ServerResponse = {
  __typename?: 'ServerResponse';
  server: Server;
  channels: Array<Channel>;
  messages: Array<Message>;
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['ID'];
  serverId: Scalars['String'];
  name: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  userId: Scalars['String'];
  channelId: Scalars['String'];
  user: User;
  channel: Channel;
};


export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
  createUser: Scalars['Boolean'];
  createServer: Scalars['Boolean'];
  inviteMember: Scalars['Boolean'];
  createChannel: Scalars['Boolean'];
  sendMessage: Message;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateUserArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateServerArgs = {
  name: Scalars['String'];
};


export type MutationInviteMemberArgs = {
  serverId: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateChannelArgs = {
  serverId: Scalars['String'];
  channelName: Scalars['String'];
};


export type MutationSendMessageArgs = {
  message: Scalars['String'];
  channelId: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  getMessage: Message;
};


export type SubscriptionGetMessageArgs = {
  channelId: Scalars['String'];
};

export type CreateServerMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateServerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createServer'>
);

export type GetMessagesSubSubscriptionVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type GetMessagesSubSubscription = (
  { __typename?: 'Subscription' }
  & { getMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'body' | 'channelId' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'name' | 'id'>
    ) }
  ) }
);

export type GetMessagesQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type GetMessagesQuery = (
  { __typename?: 'Query' }
  & { getMessages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'body' | 'id' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  )> }
);

export type InviteMemberMutationVariables = Exact<{
  email: Scalars['String'];
  serverId: Scalars['String'];
}>;


export type InviteMemberMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'inviteMember'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
  ) }
);

export type SendMessageMutationVariables = Exact<{
  channelId: Scalars['String'];
  message: Scalars['String'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'body'>
  ) }
);

export type GetServerQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetServerQuery = (
  { __typename?: 'Query' }
  & { getServer: (
    { __typename?: 'ServerResponse' }
    & { server: (
      { __typename?: 'Server' }
      & Pick<Server, 'name'>
    ), channels: Array<(
      { __typename?: 'Channel' }
      & Pick<Channel, 'id' | 'name'>
    )>, messages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'body' | 'channelId' | 'createdAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'name'>
      ) }
    )> }
  ), getMembersInServer: Array<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'id'>
  )> }
);

export type GetServersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServersQuery = (
  { __typename?: 'Query' }
  & { getServers: Array<(
    { __typename?: 'Server' }
    & Pick<Server, 'id' | 'name'>
  )> }
);

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createUser'>
);


export const CreateServerDocument = gql`
    mutation CreateServer($name: String!) {
  createServer(name: $name)
}
    `;
export type CreateServerMutationFn = Apollo.MutationFunction<CreateServerMutation, CreateServerMutationVariables>;

/**
 * __useCreateServerMutation__
 *
 * To run a mutation, you first call `useCreateServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServerMutation, { data, loading, error }] = useCreateServerMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateServerMutation(baseOptions?: Apollo.MutationHookOptions<CreateServerMutation, CreateServerMutationVariables>) {
        return Apollo.useMutation<CreateServerMutation, CreateServerMutationVariables>(CreateServerDocument, baseOptions);
      }
export type CreateServerMutationHookResult = ReturnType<typeof useCreateServerMutation>;
export type CreateServerMutationResult = Apollo.MutationResult<CreateServerMutation>;
export type CreateServerMutationOptions = Apollo.BaseMutationOptions<CreateServerMutation, CreateServerMutationVariables>;
export const GetMessagesSubDocument = gql`
    subscription GetMessagesSub($channelId: String!) {
  getMessage(channelId: $channelId) {
    body
    user {
      name
      id
    }
    channelId
    createdAt
  }
}
    `;

/**
 * __useGetMessagesSubSubscription__
 *
 * To run a query within a React component, call `useGetMessagesSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesSubSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useGetMessagesSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetMessagesSubSubscription, GetMessagesSubSubscriptionVariables>) {
        return Apollo.useSubscription<GetMessagesSubSubscription, GetMessagesSubSubscriptionVariables>(GetMessagesSubDocument, baseOptions);
      }
export type GetMessagesSubSubscriptionHookResult = ReturnType<typeof useGetMessagesSubSubscription>;
export type GetMessagesSubSubscriptionResult = Apollo.SubscriptionResult<GetMessagesSubSubscription>;
export const GetMessagesDocument = gql`
    query GetMessages($channelId: String!) {
  getMessages(channelId: $channelId) {
    body
    id
    user {
      id
      name
    }
    createdAt
  }
}
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions?: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, baseOptions);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, baseOptions);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const InviteMemberDocument = gql`
    mutation InviteMember($email: String!, $serverId: String!) {
  inviteMember(email: $email, serverId: $serverId)
}
    `;
export type InviteMemberMutationFn = Apollo.MutationFunction<InviteMemberMutation, InviteMemberMutationVariables>;

/**
 * __useInviteMemberMutation__
 *
 * To run a mutation, you first call `useInviteMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteMemberMutation, { data, loading, error }] = useInviteMemberMutation({
 *   variables: {
 *      email: // value for 'email'
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useInviteMemberMutation(baseOptions?: Apollo.MutationHookOptions<InviteMemberMutation, InviteMemberMutationVariables>) {
        return Apollo.useMutation<InviteMemberMutation, InviteMemberMutationVariables>(InviteMemberDocument, baseOptions);
      }
export type InviteMemberMutationHookResult = ReturnType<typeof useInviteMemberMutation>;
export type InviteMemberMutationResult = Apollo.MutationResult<InviteMemberMutation>;
export type InviteMemberMutationOptions = Apollo.BaseMutationOptions<InviteMemberMutation, InviteMemberMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($channelId: String!, $message: String!) {
  sendMessage(message: $message, channelId: $channelId) {
    body
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, baseOptions);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const GetServerDocument = gql`
    query GetServer($id: String!) {
  getServer(id: $id) {
    server {
      name
    }
    channels {
      id
      name
    }
    messages {
      body
      user {
        name
      }
      channelId
      createdAt
    }
  }
  getMembersInServer(serverId: $id) {
    name
    id
  }
}
    `;

/**
 * __useGetServerQuery__
 *
 * To run a query within a React component, call `useGetServerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServerQuery(baseOptions?: Apollo.QueryHookOptions<GetServerQuery, GetServerQueryVariables>) {
        return Apollo.useQuery<GetServerQuery, GetServerQueryVariables>(GetServerDocument, baseOptions);
      }
export function useGetServerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServerQuery, GetServerQueryVariables>) {
          return Apollo.useLazyQuery<GetServerQuery, GetServerQueryVariables>(GetServerDocument, baseOptions);
        }
export type GetServerQueryHookResult = ReturnType<typeof useGetServerQuery>;
export type GetServerLazyQueryHookResult = ReturnType<typeof useGetServerLazyQuery>;
export type GetServerQueryResult = Apollo.QueryResult<GetServerQuery, GetServerQueryVariables>;
export const GetServersDocument = gql`
    query GetServers {
  getServers {
    id
    name
  }
}
    `;

/**
 * __useGetServersQuery__
 *
 * To run a query within a React component, call `useGetServersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetServersQuery(baseOptions?: Apollo.QueryHookOptions<GetServersQuery, GetServersQueryVariables>) {
        return Apollo.useQuery<GetServersQuery, GetServersQueryVariables>(GetServersDocument, baseOptions);
      }
export function useGetServersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServersQuery, GetServersQueryVariables>) {
          return Apollo.useLazyQuery<GetServersQuery, GetServersQueryVariables>(GetServersDocument, baseOptions);
        }
export type GetServersQueryHookResult = ReturnType<typeof useGetServersQuery>;
export type GetServersLazyQueryHookResult = ReturnType<typeof useGetServersLazyQuery>;
export type GetServersQueryResult = Apollo.QueryResult<GetServersQuery, GetServersQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!) {
  createUser(name: $name, email: $email, password: $password)
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;