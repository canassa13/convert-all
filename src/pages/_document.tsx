import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from 'next/document'
import { ColorModeScript } from '@chakra-ui/core'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render(): JSX.Element {
    return (
      <Html lang="pt">
        <Head>
          <meta charSet="utf-8" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <ColorModeScript defaultColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
