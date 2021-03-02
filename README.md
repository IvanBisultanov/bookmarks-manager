

# Bookmarks

This project was generated using [Nx](https://nx.dev).

The initial solution based on Angular as a framework, Material as UI library,
NGRX as a state management tool, apollo-angular as a GraphQL client,
Nest.js as a server and Prisma as a DB client.
NX project structure that contains apps and libs features
allows easily scale the application if needed.


### Apps:

`api` - root application for nest.js libs

`bookmarks-e2e` - application for end to end testing via cypress

`bookmarks-manager` - root application for front end


### Libs:

`bookmarks` - nest.js api with GraphQL and Prisma connected

`bookmarks-ui` - pages related to bookmarks feature

`material` - material module that reexports for us only modules we use



### Local development:

`npm i` install dependencies

`ng serve` # run Angular

`nx serve api` # run api server

`npx prisma studio` # prisma UI tool (optional)



![gif](https://github.com/IvanBisultanov/bookmarks-manager/blob/master/image.gif)
