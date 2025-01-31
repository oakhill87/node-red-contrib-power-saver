module.exports = {
  lang: "en-US",
  title: "Power Saver",
  description: "A Node-RED note to save money on hourly changing power prices",
  base: "/node-red-contrib-power-saver/",
  themeConfig: {
    navbar: [
      {
        text: "Guide",
        link: "/guide/",
      },
      {
        text: "Nodes",
        link: "/nodes/",
      },
      {
        text: "Examples",
        link: "/examples/",
      },
      {
        text: "Contribute",
        link: "/contribute/",
      },
      {
        text: "Changes",
        link: "/changelog/",
      },
      {
        text: "GitHub",
        link: "https://github.com/ottopaulsen/node-red-contrib-power-saver",
      },
    ],
    sidebar: {
      "/guide/": [{ text: "Guide", children: ["/guide/README.md"] }],
      "/nodes/": [
        {
          text: "Nodes",
          children: [
            { text: "Power Saver", link: "/nodes/power-saver.md" },
            {
              text: "Strategy nodes",
              children: ["/nodes/ps-strategy-best-save.md", "/nodes/ps-strategy-lowest-price.md"],
            },
            { text: "Utility nodes", children: ["/nodes/ps-receive-price.md"] },
            { text: "Grid tariff nodes", children: ["/nodes/ps-elvia-add-tariff.md"] },
          ],
        },
        {
          text: "Data format",
          children: ["/nodes/strategy-input.md"],
        },
      ],
      "/examples/": [
        {
          text: "Examples",
          children: [
            "/examples/example-nordpool-current-state.md",
            "/examples/example-nordpool-events-state.md",
            "/examples/example-tibber-mqtt.md",
          ],
        },
      ],
      "/contribute/": "auto",
      "/changelog/": "auto",
    },
  },
  head: [
    // ["script", { src: "https://c6.patreon.com/becomePatronButton.bundle.js" }],
    ["link", { rel: "icon", href: "/euro.png" }],
  ],
};
