import { useEffect, useState } from "react";
import GameContextProvider from "@/context/gameContext";
import GameBackground from "@/components/gameBackground";
import A2HSPrompt from "@/components/A2HSPrompt";
import type { ReactNode } from "react";

declare global {
  interface Navigator {
    standalone: boolean;
  }
}

const GameLayout = ({ children }: { children: ReactNode }) => {
  // Only show Add to Home Screen prompt on iOS
  const [standalone, setStandalone] = useState(false);
  const [iOSDevice, setIOSDevice] = useState<string>();
  useEffect(() => {
    setStandalone("standalone" in navigator && navigator.standalone);
    setIOSDevice(
      navigator.userAgent.match(/iPhone|iPad|iPod/i)?.toString() ||
        (navigator.userAgent.includes("Mac") && "ontouchend" in document
          ? "iPad"
          : undefined)
    );
  }, []);
  const showPrompt = !standalone && iOSDevice;

  return (
    <GameContextProvider>
      {showPrompt ? (
        // Scale the background down to make room for the prompt
        <div className='absolute w-full h-full flex flex-col'>
          <div className='relative flex flex-1'>
            <GameBackground>{children}</GameBackground>
          </div>
          <A2HSPrompt deviceName={iOSDevice} />
        </div>
      ) : (
        <GameBackground>{children}</GameBackground>
      )}
    </GameContextProvider>
  );
};

export default GameLayout;
