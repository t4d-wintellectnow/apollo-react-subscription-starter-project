import fetch from 'node-fetch';

export const resolvers = {
  Query: {
    message: () => 'Hello World!',
    widgets: (_1, _2, { restURL }) =>
      fetch(`${restURL}/widgets`)
        .then(res => res.json()),
  },
  Mutation: {
    insertWidget: (_, { widget }, { restURL }) =>
      fetch(`${restURL}/widgets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(widget)
      }).then(res => res.json()),
    deleteWidget: (_, { widgetId }, { restURL }) =>
      fetch(`${restURL}/widgets/${encodeURIComponent(widgetId)}`)
        .then(res => res.json())
        .then(widget => {
          return fetch(`${restURL}/widgets/${encodeURIComponent(widgetId)}`, { method: 'DELETE' })
            .then(() => widget);
        }),
  }
};
