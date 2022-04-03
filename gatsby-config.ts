import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Autoshkolla`,
    siteUrl: `https://www.yourdomain.tld`,
    description:
      "Simulim online i testit teorik te patentes per kategorine A1,A2,B1,B",
    image: "src/images/icon.png",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
        name: `Autoshkolla`,
        short_name: `Autoshkolla`,
        start_url: `/`,
        display: `standalone`,
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@components": "src/components",
          "@ui": "src/components/UI/index.tsx",
          "@styles": "src/styles",
          "@interface": "src/interface",
          "@icon": "src/components/CustomIcons.tsx",
          "@context": "src/components/Context.tsx",
        },
      },
    },
  ],
};

export default config;
