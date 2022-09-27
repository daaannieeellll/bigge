import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name='description'
          content='Bigge! is het leukste drankspelletje om de avond mee te beginnen of te eindigen!'
        />

        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/images/icons/72x72.png' />
        <meta name='theme-color' content='#F98F8F' />

        {/* Apple specific tags */}
        <link
          rel='apple-touch-icon'
          href='/images/icons/1024x1024-maskable.png'
        />

        <meta name='apple-mobile-web-app-capable' content='yes' />
        {/* map supported splash screens to link tag */}
        {[
          /* 12.9" iPad Pro */
          { width: 1024, height: 1366, ratio: 2 },
          /* 10.5" iPad Pro, 11" iPad Pro */
          { width: 834, height: 1194, ratio: 2 },
          /* 10.5" iPad Air */
          { width: 834, height: 1112, ratio: 2 },
          /* 10.2" iPad */
          { width: 810, height: 1080, ratio: 2 },
          /* 9.7" iPad, 9.7" iPad Air */
          { width: 768, height: 1024, ratio: 2 },
          /* iPhone 14 Pro Max */
          { width: 430, height: 932, ratio: 3 },
          /* iPhone 12 Pro Max, iPhone 13 Pro Max, iPhone 14 Plus */
          { width: 428, height: 926, ratio: 3 },
          /* iPhone Xs Max, iPhone 11 Pro Max */
          { width: 414, height: 896, ratio: 3 },
          /* iPhone XR, iPhone 11 */
          { width: 414, height: 896, ratio: 2 },
          /* iPhone 6s Plus, iPhone 7 Plus, iPhone 8 Plus */
          { width: 414, height: 736, ratio: 3 },
          /* iPhone 14 Pro */
          { width: 393, height: 852, ratio: 3 },
          /* iPhone 12, iPhone 12 Pro, iPhone 13, iPhone 13 Pro, iPhone 14 */
          { width: 390, height: 844, ratio: 3 },
          /* iPhone X, iPhone Xs, iPhone 11 Pro, iPhone 12 mini */
          { width: 375, height: 812, ratio: 3 },
          /* iPhone 6, iPhone 6s, iPhone 7, iPhone 8, 4.7" iPhone SE */
          { width: 375, height: 667, ratio: 2 },
          /* iPod touch 5th gen, 4" iPhone SE  */
          { width: 320, height: 568, ratio: 2 },
        ].map(({ width, height, ratio }, idx) => (
          <link
            key={idx}
            rel='apple-mobile-startup-image'
            href={`/images/icons/${width}x${height}@${ratio}x.png`}
            media={`(device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: ${ratio})`}
          />
        ))}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
