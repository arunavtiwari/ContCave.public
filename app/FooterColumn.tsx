import { motion } from "framer-motion";

import React from "react";

type FooterColumnProps = {
  title: string;
  link: string;
};

const FooterColumn: React.FC<FooterColumnProps> = ({ title, link }) => {
  return (
    <motion.div>
      <div className="md:col-span-1 flex items-center space-x-4">
        <p className="text-lg font-semibold">
          <a href={link} className="text-blue-500 underline">
            {title}
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default FooterColumn;


