import Image from "next/image";
import assaultRifleIcon from "../public/assault-rifle-icon.svg";
import shotgunIcon from "../public/shotgun-icon.svg";
import machinegunIcon from "../public/machinegun-icon.svg";
import rocketLauncherIcon from "../public/rocket-launcher-icon.svg";
import submachineGunIcon from "../public/submachine-gun-icon.png";
import sniperRifleIcon from "../public/sniper-rifle-icon.svg";
import burstOneIcon from "../public/burst-1-icon.svg";
import burstTwoIcon from "../public/burst-2-icon.svg";
import burstThreeIcon from "../public/burst-3-icon.svg";
import iconSlot from "../public/ele_icon_slot_bg_set.png";
import iconFront from "../public/ele_front_bg.png";

function isKeyOfObject<T>(
  key: string | number | symbol,
  obj: T
): key is keyof T {
  return key in obj;
}

interface INikkeCard {
  id: string;
  name: string;
  rarity: string;
  burst: string;
  code: string;
  weapon: string;
  image: string;
}

const NikkeCard = ({
  id,
  name,
  rarity,
  burst,
  code,
  weapon,
  image,
}: INikkeCard) => {
  const renderBurstIcon = (burstType: string) => {
    const iconMapper = {
      I: <Image src={burstOneIcon} alt="" className="left-3 h-10 w-10" />,
      II: <Image src={burstTwoIcon} alt="" className="left-3 h-10 w-10" />,
      III: <Image src={burstThreeIcon} alt="" className="left-3 h-10 w-10" />,
    };

    const isBurstTypeKeyValid = isKeyOfObject<typeof iconMapper>(
      burstType,
      iconMapper
    );

    if (isBurstTypeKeyValid) {
      return iconMapper[burstType];
    }

    return iconMapper["I"];
  };

  const renderWeaponIcon = (weaponType: string) => {
    const iconMapper = {
      AR: <Image src={assaultRifleIcon} alt="" className="left-3 h-10 w-10" />,
      MG: <Image src={machinegunIcon} alt="" className="left-3 h-10 w-10" />,
      SG: <Image src={shotgunIcon} alt="" className="left-3 h-10 w-10" />,
      SMG: (
        <Image src={submachineGunIcon} alt="" className="left-3 h-10 w-10" />
      ),
      RL: (
        <Image src={rocketLauncherIcon} alt="" className="left-3 h-10 w-10" />
      ),
      SR: <Image src={sniperRifleIcon} alt="" className="left-3 h-10 w-10" />,
    };

    const isWeaponTypeKeyValid = isKeyOfObject<typeof iconMapper>(
      weaponType,
      iconMapper
    );

    if (isWeaponTypeKeyValid) {
      return iconMapper[weaponType];
    }

    return iconMapper["AR"];
  };

  return (
    <div
      key={id}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-white lg:h-80 h-96"
    >
      <div className="absolute top-5 right-5">
        <div className="relative z-10 w-64">
          <div className="flex flex-col">
            {renderWeaponIcon(weapon)}
            {renderBurstIcon(burst)}
          </div>
        </div>
      </div>
      <div className="relative bg-transparent group-hover:opacity-75 sm:h-96">
        <Image
          src={iconSlot}
          alt=""
          priority
          className="absolute sm:h-full sm:w-full"
        />
        <div className="w-full h-full absolute">
          <Image
            src={image}
            alt=""
            priority
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            className="absolute sm:h-full sm:w-full object-cover object-center"
          />
        </div>
        <Image
          src={iconFront}
          alt=""
          className="absolute left-0 bottom-0 w-full invert opacity-50"
        />
      </div>
      <div className="hidden flex-1 flex-col space-y-2 p-4 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">
          <a href="#">
            <span aria-hidden="true" className="absolute inset-0" />
            {name}
          </a>
        </h3>
        <p className="text-sm text-gray-500">{rarity}</p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-sm italic text-gray-500">{burst}</p>
          <p className="text-base font-medium text-gray-900">{code}</p>
          <p className="text-base font-medium text-gray-900">{weapon}</p>
        </div>
      </div>
    </div>
  );
};

export { NikkeCard };
