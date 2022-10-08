const A2HSPrompt = ({ deviceName }: { deviceName: string }) => {
  return (
    <div
      className='
        left-0 z-50
        w-full px-7 py-2
        text-black text-sm text-justify
        bg-white/[0.95]
        backdrop-blur-md

        dark:bg-black/[0.53]
        dark:text-white

        landscape:fixed
        sm:fixed
        '
    >
      <p className=''>
        To install Bigge! on your {deviceName}: tap{" "}
        <img
          src='images/ios/share.svg'
          width='20px'
          className='inline-block pb-1 brightness-90 dark:brightness-100'
        />{" "}
        and then Add to Home Screen
        <img
          src='images/ios/add.svg'
          width='15px'
          className='inline-block pb-[0.125rem] mx-1 dark:invert'
        />
      </p>
    </div>
  );
};
export default A2HSPrompt;
