import Head from 'next/head';

import { config } from '../config/config';

export default function PageContainer({ title, description, children }) {
  return (
    <div className="container">
      <Head>
        <title>{title || config.SITE_TITLE}</title>
        {description !== false && (
          <meta
            name="description"
            content={
              description ||
              config.SITE_DESCRIPTION
            }
          />
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>

      <style jsx>{`
        main {
          display: flex;
          background-color: #fafafa;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          font-family: Roboto;
        }
      `}</style>
    </div>
  );
}
