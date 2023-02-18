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
import rRarityIcon from "../public/r_icon.png";
import srRarityIcon from "../public/sr_icon.png";
import ssrRarityIcon from "../public/ssr_icon.png";
import { isKeyOfObject } from "../utils/helpers";

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

  const renderRarityIcon = (rarityType: string) => {
    const iconMapper = {
      R: (
        <Image
          src={rRarityIcon}
          alt=""
          className="h-16 w-16 object-contain object-center"
        />
      ),
      SR: (
        <Image
          src={srRarityIcon}
          alt=""
          className="h-16 w-16 object-contain object-center"
        />
      ),
      SSR: (
        <Image
          src={ssrRarityIcon}
          alt=""
          className="h-16 w-16 object-contain object-center"
        />
      ),
    };

    const isRarityTypeKeyValid = isKeyOfObject<typeof iconMapper>(
      rarityType,
      iconMapper
    );

    if (isRarityTypeKeyValid) {
      return iconMapper[rarityType];
    }

    return iconMapper["R"];
  };

  const renderBorder = (rarityType: string) => {
    const borderMapper = {
      R: (
        <div className="min-h-1 absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-700 via-blue-800 to-blue-900 py-2"></div>
      ),
      SR: (
        <div className="min-h-1 absolute inset-x-0 bottom-0 bg-gradient-to-t from-purple-400 via-purple-600 to-purple-800 py-2"></div>
      ),
      SSR: (
        <div className="min-h-1 absolute inset-x-0 bottom-0 bg-gradient-to-t from-yellow-200 via-yellow-300 to-yellow-400 py-2"></div>
      ),
    };

    const isRarityTypeKeyValid = isKeyOfObject<typeof borderMapper>(
      rarityType,
      borderMapper
    );

    if (isRarityTypeKeyValid) {
      return borderMapper[rarityType];
    }

    return borderMapper["SR"];
  };

  return (
    <div
      key={id}
      className="group relative flex h-80 w-full flex-col overflow-hidden lg:h-full"
    >
      <div className="absolute top-5">
        <div className="relative z-10 w-64">
          <div className="flex flex-col">
            {renderWeaponIcon(weapon)}
            {renderBurstIcon(burst)}
          </div>
        </div>
      </div>
      <div className="relative h-full w-full bg-transparent group-hover:opacity-75 sm:h-full sm:w-full">
        <Image
          src={iconSlot}
          alt=""
          fill
          priority
          className="object-contain object-center sm:h-full sm:w-96"
        />
        <div className="h-full w-full lg:h-96">
          <Image
            src={image}
            alt=""
            priority
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 100vw,
              100vw"
            className="object-cover object-center sm:h-full sm:w-full"
          />
        </div>
        <div className="absolute bottom-0 left-2 z-10">
          {renderRarityIcon(rarity)}
        </div>
        <div className="absolute bottom-5 right-4 z-10">
          <span className="justify-self-end text-white">{name}</span>
        </div>
        <Image
          src={iconFront}
          alt=""
          className="absolute left-0 bottom-0 h-1/3 w-full opacity-70 invert"
        />
        {renderBorder(rarity)}
      </div>
      <div className="hidden flex-1 flex-col space-y-2 border border-gray-200 p-4">
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
