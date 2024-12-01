import React, { useState } from "react";
import { IoDocumentsOutline, IoPeople } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import { GiMeshNetwork } from "react-icons/gi";
import { TbLogs } from "react-icons/tb";
import { motion } from "framer-motion";
import Option from "./Option";
import AppName from "./AppName";
import ToggleClose from "./ToggleClose";


export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <AppName open={open} />

      <div className="space-y-1">
        <Option
          Icon={RiDashboardFill}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href = '/'
        />
        <Option
          Icon={IoDocumentsOutline}
          title="Documents"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href = '/docs'
        />
        <Option
          Icon={GiMeshNetwork}
          title="Network Forensics"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href = '/network'
        />
        <Option
          Icon={TbLogs}
          title="Log files"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href = '/log'
        />
        <Option
          Icon={IoPeople}
          title="About Us"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href = '/about'
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

