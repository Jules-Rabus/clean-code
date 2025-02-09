"use client";

import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-background shadow">
            <NavigationMenu>
                <NavigationMenuList>
                    {/* Lien Accueil */}
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Accueil
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    {/* Menu déroulant pour la gestion des motos */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                            Motos
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="flex flex-col space-y-2 p-4">
                                <li>
                                    <Link href="/bikes" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Liste des motos
                                        </NavigationMenuLink>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/bikes/new" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Ajouter une moto
                                        </NavigationMenuLink>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/maintenance" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Entretiens
                                        </NavigationMenuLink>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/parts" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Pièces détachées
                                        </NavigationMenuLink>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/trials" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Essais
                                        </NavigationMenuLink>
                                    </Link>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Lien Utilisateurs */}
                    <NavigationMenuItem>
                        <Link href="/users" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Utilisateurs
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuIndicator />
                <NavigationMenuViewport />
            </NavigationMenu>
        </header>
    );
}
