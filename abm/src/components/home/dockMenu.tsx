"use client"
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconHome,
    IconPhone,
    IconSearch,
    IconTools,
} from "@tabler/icons-react";

const links = [
    {
        title: "Inicio",
        icon: (
            <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#home",
    },
    {
        title: "Descubrir",
        icon: (
            <IconSearch className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#explore",
    },
    {
        title: "Caracteristicas",
        icon: (
            <IconTools className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#features",
    },
    {
        title: "Contacto",
        icon: (
            <IconPhone className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#contact",
    },
];

export function DockMenu() {
    return (
        <FloatingDock
            mobileClassName="fixed bottom-5 right-2 z-50 bg-opacity-50"
            items={links}
            desktopClassName="fixed w-fit top-10 left-[50%] -translate-x-[50%] z-50 bg-opacity-50"
            titlePosition="bottom"
            hide
        />
    );
}