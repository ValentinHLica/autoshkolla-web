import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { Helmet } from "react-helmet";

type Props = {
  title?: string;
  desc?: string;
  image?: string;
  keywords?: string[];
  url?: string;
};

const Seo: React.FC<Props> = ({ title, desc, image, keywords, url }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery<{
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
        image: string;
      };
    };
  }>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          image
        }
      }
    }
  `);

  const metaTitle = title || siteMetadata.title;
  const metaDesc = desc || siteMetadata.description;
  const metaImage = `${siteMetadata.siteUrl}${
    image ? image : siteMetadata.image
  }`;
  const metaUrl = `${siteMetadata.siteUrl}${url ? `/${url}` : ""}`;
  const metaKeywords = keywords || [
    "autoshkolla",
    "provim online",
    "falas",
    "free",
    "autoshkolla online",
    "online",
    "kosove",
    "Autoshkolla Online Shqiptare",
    "Autoshkolla",
    "Autoshjolla teste",
    "Auto shkolla",
    "Auto shkolla falas",
    "Auto shkolla kategoria d shqiperi",
    "Auto shkolla shqiptare shkarko",
    "Autoshkolla kategoria b",
    "Autoshkolla l",
    "Autoshkolla online al",
    "Autoshkola shqip",
    "Mesimet e autoshkolles",
    "Test per autoshkoll",
    "Teste autoshkolla",
  ];

  return (
    <Helmet
      title={metaTitle}
      htmlAttributes={{
        lang: "en",
      }}
      meta={[
        {
          name: "description",
          content: metaDesc,
        },
        {
          name: "og:title",
          content: metaTitle,
        },
        {
          name: "og:description",
          content: metaDesc,
        },
        {
          name: "og:type",
          content: "website",
        },
        {
          name: "og:image",
          content: metaImage,
        },
        {
          name: "og:url",
          content: metaUrl,
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: metaTitle,
        },
        {
          name: "twitter:description",
          content: metaDesc,
        },
        {
          name: "twitter:image",
          content: metaImage,
        },
        ...(() => {
          if (metaKeywords && metaKeywords.length > 0) {
            return [
              {
                name: "keywords",
                content: metaKeywords.join(", "),
              },
            ];
          }

          return [];
        })(),
      ]}
    />
  );
};

export default Seo;
