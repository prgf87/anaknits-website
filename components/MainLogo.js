import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../public/images/logov3.png";

export default function MainLogo({ width, height }) {
  return (
    <Link href="/" className="flex w-full">
      <Image src={logo} alt={"/"} width={width} height={height} />
    </Link>
  );
}
