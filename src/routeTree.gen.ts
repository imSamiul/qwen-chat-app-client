/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SearchUserImport } from './routes/search-user'
import { Route as ChatRoomImport } from './routes/chat-room'
import { Route as AuthenticationImport } from './routes/authentication'
import { Route as IndexImport } from './routes/index'
import { Route as AuthenticationRegisterImport } from './routes/authentication/register'
import { Route as AuthenticationLoginImport } from './routes/authentication/login'
import { Route as AuthenticatedChatImport } from './routes/authenticated/chat'
import { Route as AuthenticatedChatChatIdImport } from './routes/authenticated/chat/$chatId'

// Create/Update Routes

const SearchUserRoute = SearchUserImport.update({
  id: '/search-user',
  path: '/search-user',
  getParentRoute: () => rootRoute,
} as any)

const ChatRoomRoute = ChatRoomImport.update({
  id: '/chat-room',
  path: '/chat-room',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticationRoute = AuthenticationImport.update({
  id: '/authentication',
  path: '/authentication',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticationRegisterRoute = AuthenticationRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticationLoginRoute = AuthenticationLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticatedChatRoute = AuthenticatedChatImport.update({
  id: '/authenticated/chat',
  path: '/authenticated/chat',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedChatChatIdRoute = AuthenticatedChatChatIdImport.update({
  id: '/$chatId',
  path: '/$chatId',
  getParentRoute: () => AuthenticatedChatRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/authentication': {
      id: '/authentication'
      path: '/authentication'
      fullPath: '/authentication'
      preLoaderRoute: typeof AuthenticationImport
      parentRoute: typeof rootRoute
    }
    '/chat-room': {
      id: '/chat-room'
      path: '/chat-room'
      fullPath: '/chat-room'
      preLoaderRoute: typeof ChatRoomImport
      parentRoute: typeof rootRoute
    }
    '/search-user': {
      id: '/search-user'
      path: '/search-user'
      fullPath: '/search-user'
      preLoaderRoute: typeof SearchUserImport
      parentRoute: typeof rootRoute
    }
    '/authenticated/chat': {
      id: '/authenticated/chat'
      path: '/authenticated/chat'
      fullPath: '/authenticated/chat'
      preLoaderRoute: typeof AuthenticatedChatImport
      parentRoute: typeof rootRoute
    }
    '/authentication/login': {
      id: '/authentication/login'
      path: '/login'
      fullPath: '/authentication/login'
      preLoaderRoute: typeof AuthenticationLoginImport
      parentRoute: typeof AuthenticationImport
    }
    '/authentication/register': {
      id: '/authentication/register'
      path: '/register'
      fullPath: '/authentication/register'
      preLoaderRoute: typeof AuthenticationRegisterImport
      parentRoute: typeof AuthenticationImport
    }
    '/authenticated/chat/$chatId': {
      id: '/authenticated/chat/$chatId'
      path: '/$chatId'
      fullPath: '/authenticated/chat/$chatId'
      preLoaderRoute: typeof AuthenticatedChatChatIdImport
      parentRoute: typeof AuthenticatedChatImport
    }
  }
}

// Create and export the route tree

interface AuthenticationRouteChildren {
  AuthenticationLoginRoute: typeof AuthenticationLoginRoute
  AuthenticationRegisterRoute: typeof AuthenticationRegisterRoute
}

const AuthenticationRouteChildren: AuthenticationRouteChildren = {
  AuthenticationLoginRoute: AuthenticationLoginRoute,
  AuthenticationRegisterRoute: AuthenticationRegisterRoute,
}

const AuthenticationRouteWithChildren = AuthenticationRoute._addFileChildren(
  AuthenticationRouteChildren,
)

interface AuthenticatedChatRouteChildren {
  AuthenticatedChatChatIdRoute: typeof AuthenticatedChatChatIdRoute
}

const AuthenticatedChatRouteChildren: AuthenticatedChatRouteChildren = {
  AuthenticatedChatChatIdRoute: AuthenticatedChatChatIdRoute,
}

const AuthenticatedChatRouteWithChildren =
  AuthenticatedChatRoute._addFileChildren(AuthenticatedChatRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/authentication': typeof AuthenticationRouteWithChildren
  '/chat-room': typeof ChatRoomRoute
  '/search-user': typeof SearchUserRoute
  '/authenticated/chat': typeof AuthenticatedChatRouteWithChildren
  '/authentication/login': typeof AuthenticationLoginRoute
  '/authentication/register': typeof AuthenticationRegisterRoute
  '/authenticated/chat/$chatId': typeof AuthenticatedChatChatIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/authentication': typeof AuthenticationRouteWithChildren
  '/chat-room': typeof ChatRoomRoute
  '/search-user': typeof SearchUserRoute
  '/authenticated/chat': typeof AuthenticatedChatRouteWithChildren
  '/authentication/login': typeof AuthenticationLoginRoute
  '/authentication/register': typeof AuthenticationRegisterRoute
  '/authenticated/chat/$chatId': typeof AuthenticatedChatChatIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/authentication': typeof AuthenticationRouteWithChildren
  '/chat-room': typeof ChatRoomRoute
  '/search-user': typeof SearchUserRoute
  '/authenticated/chat': typeof AuthenticatedChatRouteWithChildren
  '/authentication/login': typeof AuthenticationLoginRoute
  '/authentication/register': typeof AuthenticationRegisterRoute
  '/authenticated/chat/$chatId': typeof AuthenticatedChatChatIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/authentication'
    | '/chat-room'
    | '/search-user'
    | '/authenticated/chat'
    | '/authentication/login'
    | '/authentication/register'
    | '/authenticated/chat/$chatId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/authentication'
    | '/chat-room'
    | '/search-user'
    | '/authenticated/chat'
    | '/authentication/login'
    | '/authentication/register'
    | '/authenticated/chat/$chatId'
  id:
    | '__root__'
    | '/'
    | '/authentication'
    | '/chat-room'
    | '/search-user'
    | '/authenticated/chat'
    | '/authentication/login'
    | '/authentication/register'
    | '/authenticated/chat/$chatId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticationRoute: typeof AuthenticationRouteWithChildren
  ChatRoomRoute: typeof ChatRoomRoute
  SearchUserRoute: typeof SearchUserRoute
  AuthenticatedChatRoute: typeof AuthenticatedChatRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticationRoute: AuthenticationRouteWithChildren,
  ChatRoomRoute: ChatRoomRoute,
  SearchUserRoute: SearchUserRoute,
  AuthenticatedChatRoute: AuthenticatedChatRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/authentication",
        "/chat-room",
        "/search-user",
        "/authenticated/chat"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/authentication": {
      "filePath": "authentication.tsx",
      "children": [
        "/authentication/login",
        "/authentication/register"
      ]
    },
    "/chat-room": {
      "filePath": "chat-room.tsx"
    },
    "/search-user": {
      "filePath": "search-user.tsx"
    },
    "/authenticated/chat": {
      "filePath": "authenticated/chat.tsx",
      "children": [
        "/authenticated/chat/$chatId"
      ]
    },
    "/authentication/login": {
      "filePath": "authentication/login.tsx",
      "parent": "/authentication"
    },
    "/authentication/register": {
      "filePath": "authentication/register.tsx",
      "parent": "/authentication"
    },
    "/authenticated/chat/$chatId": {
      "filePath": "authenticated/chat/$chatId.tsx",
      "parent": "/authenticated/chat"
    }
  }
}
ROUTE_MANIFEST_END */
