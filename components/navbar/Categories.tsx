"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import {
  GiBarn,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland, GiAncientRuins, GiPineTree, GiFactory, GiPhotoCamera,
  GiSunflower, GiCube, GiLighthouse, GiMountainCave,
  GiArtificialIntelligence, GiFruitBowl
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import Container from "../Container";
import Search from "./Search";



export const categories = [
  {
    label: "Studios",
    icon: GiPhotoCamera,
    description: "For a modern touch, explore futuristic and contemporary spaces!",
  },
  {
    label: "Urban",
    icon: MdOutlineVilla,
    description: "This location is in the heart of the city!",
  },
  // {
  //   label: "Historic",
  //   icon: GiAncientRuins,
  //   description: "Capture the charm of history in this location!",
  // },
  {
    label: "Nature",
    icon: GiPineTree,
    description: "Surrounded by natural beauty, perfect for outdoor shoots!",
  },
  // {
  //   label: "Industrial",
  //   icon: GiFactory,
  //   description: "An industrial setting, ideal for unique and edgy shoots!",
  // },
  // {
  //   label: "Rural",
  //   icon: GiBarn,
  //   description: "Escape to the countryside for a rustic shoot!",
  // },
  {
    label: "Open Spaces",
    icon: GiSunflower,
    description: "A location with expansive open space, great for creative shots!",
  },
  {
    label: "Minimalist",
    icon: GiCube,
    description: "Simplicity at its best, perfect for minimalist aesthetics!",
  },
  // {
  //   label: "Architectural Marvel",
  //   icon: GiCastle,
  //   description: "Explore this architectural marvel for striking compositions!",
  // },
  {
    label: "Seaside",
    icon: GiLighthouse,
    description: "Shoot by the sea, with breathtaking views and natural lighting!",
  },
  {
    label: "Mountain",
    icon: GiMountainCave,
    description: "Find serenity in the mountains, an ideal retreat for your shoot!",
  },
  {
    label: "Artistic",
    icon: GiArtificialIntelligence,
    description: "Discover studios designed for artistic and creative photography!",
  },
  {
    label: "Vintage",
    icon: GiCaveEntrance,
    description: "Step into the past with locations exuding vintage vibes!",
  },
  {
    label: "Chic & Trendy",
    icon: IoDiamond,
    description: "Stay on-trend with chic and stylish shoot locations!",
  },
  {
    label: "Public Spaces",
    icon: GiFruitBowl,
    description: "Capture the essence of vibrant open-air markets in your shoot!",
  },
];


type Props = {};

function Categories({ }: Props) {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        <Search />
        {categories.map((items, index) => (
          <CategoryBox
            key={index}
            icon={items.icon}
            label={items.label}
            selected={category === items.label}
          />
        ))}

      </div>

    </Container>
  );
}

export default Categories;
