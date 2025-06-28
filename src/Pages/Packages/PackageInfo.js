import { useState, useMemo } from "react";
import { useQuery } from "react-query";
import { GoChevronRight, GoChevronDown } from "react-icons/go";

import { fetchPackageInfo } from "@/Common/API";
import Collapse from "@/Components/Collapse";
import Preloader from "@/Components/Preloader";
import Formatted from "@/Components/Formatted";

function PackageInfoContent({ id }) {
  const { data: { data: { description, badges } = {} } = {} } = useQuery(
    ["PackageIntro", id],
    () => fetchPackageInfo(id)
  );

  return (
    <div className="Package__Info">
      <Formatted>{description}</Formatted>
      {/* {!!badges.length && ( */}
        <div className="Package__Badges">
          {badges.map(({ title, link }) => (
            <img
              alt={title}
              src={link}
              className="Package__Badges__Item"
              key={`${id}_${title}`}
            />
          ))}
        </div>
      {/* )} */}
    </div>
  );
}

export default function PackageInfo({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const collapsed = useMemo(() => isOpen, [isOpen]);

  return (
    <>
      <div className="toggle_info" onClick={() => setIsOpen((prev) => !prev)}>
        package info {isOpen ? <GoChevronDown /> : <GoChevronRight />}
      </div>
      <Preloader>
        <Collapse open={collapsed}>
          <PackageInfoContent id={id} />
        </Collapse>
      </Preloader>
    </>
  );
}
