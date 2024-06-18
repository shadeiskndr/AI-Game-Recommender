<h1 align="center">
  AI Game Recommender
</h1>
<p align="center">
A video game recommender web application using using AI through vector embeddings. A separate feature of Catalogd-FYP.

Built with <a href="https://nextjs.org" target="_blank">Next.js</a>, <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>, <a href="https://react.dev/" target="_blank">React</a>, <a href="https://tailwindcss.com" target="_blank">Tailwind CSS</a>, <a href="https://rawg.io/apidocs" target="_blank">RAWG API</a>, <a href="https://mistral.ai/" target="_blank">Mistral AI</a> and <a href="https://www.datastax.com/" target="_blank">DataStax Astra</a>. Deployed on <a href="https://www.netlify.com/" target="_blank">Netlify</a>.⚡

Links: https://ai-game-recommender.netlify.app

## Tech Stack

- [Next.js](https://nextjs.org) - React framework for building performant apps with the best developer experience.
- [TypeScript](https://typescriptlang.org) - Static type checker for end-to-end typesafety.
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework for rapid UI development.
- [React](https://react.dev/) - Primitives like drawer, button, etc. to build a stellar user experience.
- [RAWG API](https://rawg.io/apidocs) - RAWG API serves as a data source for the vast catalog of video game information.
- [Mistral AI](https://mistral.ai/) - Used on DataStax Astra to train the vector embeddings which allows for vector searches and recommendations based on video game data.
- [DataStax Astra](https://www.datastax.com/) - A fully managed Apache Cassandra database service for developers that allows for CSV & JSON uploads and vector embedding integration.

Note if the web-app is not working, it is most likely due to the Mistral AI API not being available/out of free trial or the DataStax Astra database not being available.
