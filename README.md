# RICK AND MORTY APPLICATION
This is an application that allows users to crawl through the rick and morty database and perform the following actions:
1. View the list of all locations
2. Clicking on a location will showcase the characters in that location
3. Clicking on the character will open an view that allows us to view some of the character's details
4. A user can choose to leave comments on the page

## Technology choices
1. This project will be built using nextjs and tailwind css

## Requirements
1. Git
2. Nodejs >=v18
3. Yarn

## Architectural decisions
The decisions below follow from the initial requirements. In a real world product there might be other considerations that will affect the implementation of this project. The pros and cons will be delineated below

| Decision                                           | Pros                                                                                                                                                                                                                                                                                                                                         | Cons                                                                                                                                                                                                                                          | Other notes                                                                                                                                                                                                                                             |
|----------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| NextJs as the full stack framework                 | <ol>   <li>This is a well documented and maintained framework used by a lot of mature companies</li>   <li>This allows us to have a single server that will be responsible for all aspects of the app (client side rendering/server side rendering, hydration, optimistic updates etc) with minimal if any developer intervention</li> </ol> | <ol>   <li>This repo has assumed a minimal set of deliverables that can be served by the *new* app router. With changing requirements it could be the case that the app router might not yet be ready to fulfill them</li>  </ol>             | The developer chose to test the new app router functionality on this project.                                                                                                                                                                           |
| Server rendering majority of the components        | <ol>   <li>This allows us to offload the data fetching work to the server hence we are less reliant on the client's network speeds and also offload any heavy transformation logic to the server</li> </ol>                                                                                                                                  | <ol>   <li>Care needs to be taken to identify user hotpaths that are affected by rendering everything in the server. There could be potential UI/UX wins by sticking to well known SPA patterns</li> </ol>                                    |                                                                                                                                                                                                                                                         |
| Use the rick and morty javascript client           | <ol>   <li>This gives a fully typed client hence making it easy to prototype without having to manually write types</li> </ol>                                                                                                                                                                                                               | <ol>   <li>we lose out on the caching benefits of NextJS' fetch library. If load times are an issue with each navigation/page reload then this is certainly an optimisation opportunity</li> </ol>                                            | It remains to be seen if we can leverage some sort of caching for this sort of thing with the 3rd party client without necessarily having to remove it and drop down to `fetch` e.g using a caching library like `memory-cache` or a 3rd party provider |
| Saving comments in localStorage                    | <ol>  <li>This is a fast way to prototype the save functionality given that this was an option as per requirements</li> </ol>                                                                                                                                                                                                                | <ol>   <li>If we need to persist the data across sessions/browsers and also allow users to view other comments e.g. like hacker news, then we would need a long term storage solution e.g. SQL/NOSQL database, file storage e.t.c</li>  </ol> |                                                                                                                                                                                                                                                         |
| Lack of user authentication/persistent sessions    | We remove one chunk from our overall architecture i.e. the need for a database. This allows for speedy prototyping                                                                                                                                                                                                                           | This cannot work if it's clear that the application needs to store persistent data                                                                                                                                                            |                                                                                                                                                                                                                                                         |
| Using the 3rd party client for search capabilities | We can leverage the 3rd party client's API for search capabilities.                                                                                                                                                                                                                                                                          | If we ever hit rate limits then we would have to consider other strategies e.g. caching, storing a local copy etc                                                                                                                             | While not part of the initial scope, search is a pretty important part of "directory-esque" applications so it will be a nice add-on                                                                                                                    |

## Deployment
The project is deployed on vercel and found on: https://rick-and-morty-agency.vercel.app/

## Initial wireframes
<!-- TODO: attach link to wireframes -->

## Running the application
Once you have the requirements installed in your machine:
1. Clone the repository
2. Run `yarn` and wait for all the dependencies to be installed
3. Run `yarn dev` to run the machine locally

## Checklist
- [X] Setup main responsive layout
- [X] Fetch locations and have a simple table component to list them
- [X] Fetch characters and have a simple table component to list them
- [X] Make a single location clickable and show users belonging to the location
- [X] Make a single character clickable
  - [X] Show customer metadata
  - [X] Allow users to add notes
    - [ ] Preferrably a modal

## Making it polished
- [ ] Add search capabilities
- [ ] Add playwright tests
- [ ] More information on episodes 
