import { themes } from "@storybook/theming";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: [
        "Home",
        "Getting Started",
        ["Creating a Map", "Adding a Toolbar", "Working with Interactions"]
      ]
    }
  },
  docs: {
    theme: themes.dark
  }
};
