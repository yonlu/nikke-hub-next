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
          className="object-contain object-center w-16 h-16"
        />
      ),
      SR: (
        <Image
          src={srRarityIcon}
          alt=""
          className="object-contain object-center w-16 h-16"
        />
      ),
      SSR: (
        <Image
          src={ssrRarityIcon}
          alt=""
          className="object-contain object-center w-16 h-16"
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
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-700 via-blue-800 to-blue-900 py-2 min-h-1"></div>
      ),
      SR: (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-purple-400 via-purple-600 to-purple-800 py-2 min-h-1"></div>
      ),
      SSR: (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-yellow-200 via-yellow-300 to-yellow-400 py-2 min-h-1"></div>
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
      className="group relative flex flex-col overflow-hidden bg-white h-80 w-full lg:h-full"
    >
      <div className="absolute top-5">
        <div className="relative z-10 w-64">
          <div className="flex flex-col">
            {renderWeaponIcon(weapon)}
            {renderBurstIcon(burst)}
          </div>
        </div>
      </div>
      <div className="relative bg-transparent group-hover:opacity-75 w-full h-full sm:h-full sm:w-full">
        <Image
          src={iconSlot}
          alt=""
          fill
          priority
          className="sm:h-full sm:w-96 object-contain object-center"
        />
        <div className="w-full h-full lg:h-96">
          <Image
            src={image}
            alt=""
            priority
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 100vw,
              100vw"
            className="sm:h-full sm:w-full object-cover object-center"
          />
        </div>
        <div className="absolute bottom-0 left-2 z-10">
          {renderRarityIcon(rarity)}
        </div>
        <Image
          src={iconFront}
          alt=""
          className="absolute left-0 bottom-0 w-full h-1/3 invert opacity-70"
        />
        {renderBorder(rarity)}
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
