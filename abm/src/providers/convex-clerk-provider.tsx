"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { esMX } from '@clerk/localizations'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

const localization = {
    ...esMX,
    unstable__errors: {
        ...esMX.unstable__errors,
        form_username_invalid_length:
            'El nombre de usuario debe tener entre 4 y 15 caracteres.',
    },
    signUp: {
        ...esMX.signUp,
        legalConsent: {
            checkbox: {
                label__termsOfServiceAndPrivacyPolicy:
                    'Estoy de acuerdo con los {{ termsOfServiceLink || link("Términos y Condiciones") }} y la {{ privacyPolicyLink || link("Política de Privacidad") }}',
            },
            continue: {
                subtitle: 'Please read and accept the terms to continue',
                title: 'Legal consent',
            },
        },
    }
}

const ConvexClerkProvider = ({ children }: { children: ReactNode }) => (
    <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
        appearance={{
            layout: {
                socialButtonsPlacement: 'bottom',
            },
            elements: {
                logoImage: 'border rounded-full drop-shadow-md',
            }
        }}
        localization={localization}
    >
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
        </ConvexProviderWithClerk>
    </ClerkProvider>
);

export default ConvexClerkProvider;