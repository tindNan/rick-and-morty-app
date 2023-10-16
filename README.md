# RICK AND MORTY APPLICATION

This is an application that allows users to crawl through the rick and morty database and perform the following actions:

1. View the list of all locations
2. Clicking on a location will showcase the characters in that location
3. Clicking on a character will open a view that allows a user to view some of the character's details
4. A user can choose to leave notes on the character page

## Technology choices

This project will be built using:

1. using nextjs and tailwind css.
2. daisyUI

## Requirements

1. Git
2. Nodejs >=v18
3. Yarn

## Architectural decisions

The decisions below follow from the initial requirements. In a real world product there might be other considerations that will affect the implementation of this project. The pros and cons will be delineated below

| Decision                                        | Pros                                                                                                                                                                                                                                                                                                                                     | Cons                                                                                                                                                                                                       | Other notes                                                                   |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| NextJs as the full stack framework              | <ol> <li>This is a well documented and maintained framework used by a lot of mature companies</li> <li>This allows us to have a single server that will be responsible for all aspects of the app (client side rendering/server side rendering, hydration, optimistic updates etc) with minimal if any developer intervention</li> </ol> | This repo has assumed a minimal set of deliverables that can be served by the _new_ app router. With changing requirements it could be the case that the app router might not yet be ready to fulfill them | The developer chose to test the new app router functionality on this project. |
| Leverage DaisyUI component library              | Reduces development time for common components if there is not an existing design system. It is also a lightweight abstraction that co-exists with tailwind.                                                                                                                                                                             | Once a design system comes in play then we might have to eject from the library.                                                                                                                           |                                                                               |
| Server rendering majority of the components     | This allows us to offload the data fetching work to the server hence we are less reliant on the client's network speeds and also offload any heavy transformation logic to the server                                                                                                                                                    | Care needs to be taken to identify user hotpaths that are affected by rendering everything in the server. There could be potential UI/UX wins by sticking to well known SPA patterns                       |                                                                               |
| Use the rick and morty javascript client        | <ol> <li>This gives a fully typed client hence making it easy to prototype without having to manually write types</li> <li>Looking at the source code, the library uses `fetch` so we can leverage the monkey-patched fetch library in nextjs</li> </ol>                                                                                 |                                                                                                                                                                                                            |                                                                               |
| Saving notes in localStorage                    | This is a fast way to prototype the save functionality given that this was an option as per requirements                                                                                                                                                                                                                                 | If we need to persist the data across sessions/browsers and also allow users to view other user's notes, then we would need a persistent storage solution e.g. SQL/NOSQL database, file storage e.t.c      |                                                                               |
| Lack of user authentication/persistent sessions | We remove one chunk from our overall architecture i.e. the need for a database. This allows for speedy prototyping                                                                                                                                                                                                                       | This cannot work if it's clear that the application needs to store persistent data                                                                                                                         |                                                                               |

## Initial wireframes

<!-- TODO: attach link to wireframes -->

## REST VS GRAPHQL

I chose to go with the REST pattern because:

1. A lot of the pages were displaying lists with information already received from the REST responses.
2. For lists, it is easy to have paginated responses since there can be many entities e.g. 826 characters.
3. By leveraging server side components, we can reduce processing time needed in the client for any follow up queries required to construct all the info for an entity e.g fetching characters in a location.
4. I am more comfortable with working with REST

However, the pages where I think graphql would offer improvements are the entity pages i.e clicking on a single location/user/episode. This is because the REST responses force us to make additional REST queries in order to fetch other info related to that entity. The problems might not be apparently obvious at this scale since the pages are server rendered but this would be a potential place for optimisation.

I was also keen to ensure that we use the app's URL as the central source of state so that we can easily share links and guarantee a different users will see the same content. I found it easier to sync this up with REST, but I am certain with more research I could have made it work with GRAPHQL.

## Deployment

The project is deployed on vercel and found on: https://rick-and-morty-agency.vercel.app/

## Running the application

Once you have the requirements installed in your machine:

1. Clone the repository
2. Run `yarn` and wait for all the dependencies to be installed
3. Run `yarn dev` to run the application locally

## Checklist

- [x] Setup main responsive layout
- [x] Fetch locations and have a simple table component to list them
- [x] Fetch characters and have a simple table component to list them
- [x] Make a single location clickable and show users belonging to the location
- [x] Make a single character clickable
  - [x] Show customer metadata
  - [x] Allow users to add notes
    - [ ] Preferrably a modal

## Making it polished

- [ ] Add search capabilities
- [ ] Add playwright tests
- [ ] More information on episodes
