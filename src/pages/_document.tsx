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
        <meta name='theme-color' content='#F98F8F' />
        <link rel='icon' href='/images/icons/72x72.png' />

        {/* Apple specific tags */}
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <link
          rel='apple-touch-icon'
          href='/images/icons/1024x1024-maskable.png'
        />
        {/* 12.9" iPad Pro */}
        <link
          rel='apple-touch-startup-image'
          href='/images/splash/1024x1366@2x.png'
          media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        {/* 10.5" iPad Pro, 11" iPad Pro */}
        <link
          rel='apple-touch-startup-image'
          href='/images/splash/834x1194@2x.png'
          media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        {/* 10.5" iPad Air */}
        <link
          rel='apple-touch-startup-image'
          href='/images/splash/834x1112@2x.png'
          media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        {/* 10.2" iPad */}
        <link
          rel='apple-touch-startup-image'
          href='/images/splash/810x1080@2x.png'
          media='(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        {/* 9.7" iPad, 9.7" iPad Air */}
        <link
          rel='apple-touch-startup-image'
          href='/images/splash/768x1024@2x.png'
          media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        {/* iPhone 14 Pro Max */}
        <link
          rel='apple-touch-startup-image'
          href='/images/splash/430x932@3x.png'
          media='(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        {/* iPhone 12 Pro Max, iPhone 13 Pro Max, iPhone 14 Plus */}
        <link
          rel='apple-touch-startup-image'
          href='/images/splash/428x926@3x.png'
          media='(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        {/* iPhone Xs Max, iPhone 11 Pro Max */}
        <link
          rel='apple-touch-startup-image'
          href='/images/splash/414x896@3x.png'
          media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        {/* iPhone XR, iPhone 11 */}
        <link
          rel='apple-touch-startup-image'
          href='/images/splash/414x896@2x.png'
          media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        {/* iPhone 6s Plus, iPhone 7 Plus, iPhone 8 Plus */}
        <link
          rel='apple-touch-startup-image'
          href='/images/splash/414x736@3x.png'
          media='(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        {/* iPhone 14 Pro */}
        <link
          rel='apple-touch-startup-image'
          href='/images/splash/393x852@3x.png'
          media='(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        {/* iPhone 12, iPhone 12 Pro, iPhone 13, iPhone 13 Pro, iPhone 14 */}
        <link
          rel='apple-touch-startup-image'
          href='/images/splash/390x884@3x.png'
          media='(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        {/* iPhone X, iPhone Xs, iPhone 11 Pro, iPhone 12 mini */}
        <link
          rel='apple-touch-startup-image'
          href='/images/splash/375x812@3x.png'
          media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        {/* iPhone 6, iPhone 6s, iPhone 7, iPhone 8, 4.7" iPhone SE */}
        <link
          rel='apple-touch-startup-image'
          href='/images/splash/375x667@2x.png'
          media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        {/* iPod touch 5th gen, 4" iPhone SE  */}
        <link
          rel='apple-touch-startup-image'
          href='/images/splash/320x568@2x.png'
          media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
