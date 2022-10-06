const CombinedSchema = {
  $schema: "https://json-schema.org/draft-07/schema",
  title: "Card set specification",
  type: "object",
  properties: {
    name: {
      title: "Display name for the card set",
      type: "string",
    },
    types: {
      title: "Types of cards",
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          name: {
            title: "Name of the card type",
            type: "string",
          },
          probability: {
            title: "Probability this type of card will occur",
            description: "The sum of all probabilities must be 1",
            type: "number",
            minimum: 0,
            maximum: 1,
          },
          color: {
            title: "Background color for this type",
            type: "string",
          },
          cards: {
            title: "Cards of the card type",
            type: "array",
            minItems: 1,
            items: {
              type: "string",
            },
          },
        },
      },
    },
  },
  required: ["name", "types"],
};
const CombinedSchemaExample = {
  name: "Example card set",
  types: [
    {
      name: "Example type 1",
      probability: 0.333,
      color: "#ff0000",
      cards: ["Example card 1", "Example card 2", "Example card 3"],
    },
    {
      name: "Example type 2",
      probability: 0.333,
      color: "#00ff00",
      cards: ["Example card 4", "Example card 5", "Example card 6"],
    },
    {
      name: "Example type 3",
      probability: 0.333,
      color: "#0000ff",
      cards: ["Example card 7", "Example card 8", "Example card 9"],
    },
  ],
};

const SetSchema = {
  $schema: "https://json-schema.org/draft-07/schema",
  title: "Set",
  type: "object",
  required: ["name", "types", "probabilities", "colors"],
  properties: {
    name: {
      title: "Name of the card set",
      type: "string",
    },
    types: {
      title: "Types of cards",
      type: "array",
      minItems: 1,
      items: {
        type: "string",
      },
    },
    probabilities: {
      title: "Probability of the card type",
      type: "array",
      minItems: 1,
      items: {
        type: "number",
      },
    },
    colors: {
      title: "Color of the card type",
      type: "array",
      minItems: 1,
      items: {
        type: "string",
      },
    },
    cards: {
      title: "Cards of the card type",
      type: "array",
      items: {
        type: "array",
        items: {
          type: "string",
        },
      },
      minItems: 1,
    },
  },
};

const CardsSchema = {
  $schema: "https://json-schema.org/draft-07/schema",
  title: "Cards",
  type: "array",
  minItems: 1,
  items: {
    type: "array",
    minItems: 1,
    items: {
      type: "string",
    },
  },
};

export { CombinedSchema, CombinedSchemaExample, SetSchema, CardsSchema };
